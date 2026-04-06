<?php
require_once "config.php";
use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)){

    $user = $data->username;
    $pass = $data->password;

    // 1. البحث عن المستخدم
    $query = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
    $query-> bind_param("s", $user);
    $query-> execute();
    $result = $query->get_result() ;

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        // 2. التحقق من الباسورد المشفّر
        if (password_verify($pass, $row['password'])) {
            // نجاح - ابعت 200 وداتا المستخدم
            http_response_code(200);
            $payload = [
                "iat"  => time(),
                "exp"  => time() + 7200 ,
                "data" => $row['id'],
            ];

            $token = JWT::encode($payload ,$key , $alg);

            echo json_encode([
                "status"   => "success",
                "user_id"  => $row['id'],
                "username" => $row['username'],
                "message"  => "أهلاً بك يا {$row['username']}!",
                "token"    => $token , 
            ]);
        } else {
            // خطأ في الباسورد - ابعت 401 (Unauthorized)
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "كلمة المرور غير صحيحة"]);
        }
    } else {
        // المستخدم مش موجود - ابعت 404 (Not Found)
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "هذا المستخدم غير مسجل لدينا"]);
    }
} else {
    // بيانات ناقصة - ابعت 400 (Bad Request)
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "من فضلك أدخل اليوزر والباسورد"]);
}
?>