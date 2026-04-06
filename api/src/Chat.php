<?php
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class Chat implements MessageComponentInterface {
    protected $clients;
    private $db;
    protected $userConnections = []; 

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->db = new mysqli("localhost", "root", "", "chatapp");
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }


    public function onMessage(ConnectionInterface $from, $msg) {

        $data = json_decode($msg);

        if (is_null($data) || !isset($data->type)) {
            echo "Received invalid data or empty message \n";
            return; 
        }

        if ($data -> type == 'login') {

            $from->user_id = $data->user_id;

            $this->userConnections[$data->user_id] = $from->resourceId;

            $statusMessage = json_encode([
                'type' => 'user_status',
                'user_id' => $data->user_id,
                'status' => '1'
            ]);

            $this ->setStatus($data->user_id, "1");

            foreach ($this->clients as $client) {
            if ($client !== $from) {
                $client->send($statusMessage);
            }
            }
        }

        if ($data -> type == 'message') {
            $this->saveToDatabase($data->sender_id, $data->receiver_id, $data->content);
            foreach ($this->clients as $client) {
                if ($client->user_id == $data-> receiver_id) {

                    $client->send( json_encode([
                        "type" => "new_message",
                        "sender_id" => $data->sender_id,
                        "content" => $data->content
                    ]) );

                }
            }
        }

        if ($data -> type == 'logout') {

            $this-> setStatus($data->user_id, "0");

            $statusMessage = json_encode([
                'type' => 'user_status',
                'user_id' => $data -> user_id,
                'status' => '0'
            ]);

            foreach ($this->clients as $client) {
                if ($client !== $from) {
                    $client->send($statusMessage);
                }
            }
        }
    }


    private function saveToDatabase($sender, $receiver, $msg) {
        $stmt = $this->db->prepare("INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)");
        $stmt->bind_param("iis", $sender, $receiver, $msg);
        $stmt->execute();
    }

    private function setStatus($userId, $status) {
        $stmt = $this->db->prepare("UPDATE users SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $userId);
        $stmt->execute();
    }   

    public function onClose(ConnectionInterface $conn) {

        $this->clients->detach($conn);
        echo "Connection {$conn->user_id} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $conn->close();
    }
}