<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
require dirname(__DIR__) . '/vendor/autoload.php';
require dirname(__DIR__) . '/src/Chat.php'; // هنكريت الملف ده في الخطوة الجاية

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080 // البورت اللي الـ React هيكلمنا عليه
);

echo "Server started on port 8080...\n";
$server->run();