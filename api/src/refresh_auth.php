<?php
require_once "config.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
 

$data = $_SERVER["HTTP_AUTHORIZATION"] ?? "";

if (!empty($data)) 
{

    try
    {
    
    $token    = str_replace("Bearer " ,"", $data );
    $JWT_data = JWT::decode($token, new Key($key, $alg));
    $userid   = $JWT_data -> data;
    // 1. البحث عن المستخدم
    $query = $conn->prepare("SELECT * FROM users WHERE id = ?");
    $query->bind_param("i", $userid);
    $query->execute();
    $result = $query -> get_result();
    if ($result -> num_rows > 0) {

        $userdata = $result -> fetch_assoc();
        http_response_code(200);
        echo json_encode([
            "status"   => "success",
            "user_id"  => $userdata['id'],
            "username" => $userdata['username'],
            "token"    => $token,
        ]);
    }
    }catch(Exception $error)
    {
        echo json_encode(["status" => "يرجي اعادة تسجيل الدخول "]);
        http_response_code(404);
    }
}
