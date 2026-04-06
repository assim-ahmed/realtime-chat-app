<?php 

require_once "config.php";

$my_id = isset($_GET['my_id']) ? intval($_GET['my_id']) : 0;

if ($my_id == 0) {
    echo json_encode([
        "status" => "error",
        "message" => "معرف المستخدم غير موجود"
    ]);
    exit;
}

// استعلام لجلب كل المستخدمين ما عدا المستخدم الحالي
$sql = "SELECT id, username , status FROM users WHERE id != ? ORDER BY id DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $my_id);
$stmt->execute();
$result = $stmt->get_result();

$users = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode([
        "status" => "success",
        "users" => $users
    ]);
} else {
    echo json_encode([
        "status" => "success",
        "users" => [],
        "message" => "لا يوجد مستخدمين آخرين حالياً"
    ]);
}

$conn->close();
?>