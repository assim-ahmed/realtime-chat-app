<?php 

require_once "config.php";
// 1. استلام الـ ID بتاعك (عشان نشيلك من القائمة)
// بنجيبه من الـ GET param اللي هيبعته الـ React
$my_id = isset($_GET['my_id']) ? intval($_GET['my_id']) : 0;

if ($my_id == 0) {
    http_response_code(400);
    echo json_encode(["message" => "حدث خطأ في تحديد هويتك"]);
    exit;
}

// 2. Query تجيب كل المستخدمين ما عدا "أنا"

$sql = "SELECT id, username FROM users WHERE id != $my_id ORDER BY username ASC";

$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    http_response_code(200);
    echo json_encode($users); // هيرجع Array من الـ Objects
} else {
    // حالة لو مفيش مستخدمين غيرك في الداتا بيز
    http_response_code(200);
    echo json_encode([]);
}

$conn->close();