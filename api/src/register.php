<?php 
require_once "config.php";

// استقبال البيانات بصيغة JSON
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password)) {
    
    $user = $data->username;
    
    // تشفير الباسورد
    $pass = password_hash($data->password, PASSWORD_BCRYPT);

    // 1. التأكد إن اسم المستخدم مش موجود قبل كدة
    $check_user = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check_user->bind_param("s", $user);
    $check_user->execute();
    $result = $check_user->get_result();

    if ($result->num_rows > 0) {
        http_response_code(400);
        echo json_encode(["message" => "اسم المستخدم موجود بالفعل!"]);
    } else {
        // 2. إدخال المستخدم الجديد
        $query = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $query->bind_param("ss", $user, $pass);

        if ($query->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "تم إنشاء الحساب بنجاح"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "حدث خطأ أثناء التسجيل"]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "يرجى إكمال جميع البيانات"]);
}
?>