<?php

require_once "config.php";

// 1. استلام معرف المرسل والمستقبل
// الـ React هيبعتهم كدة: get_messages.php?my_id=1&target_id=2
$my_id     = isset($_GET['my_id']) ? intval($_GET['my_id']) : 0;
$target_id = isset($_GET['target_id']) ? intval($_GET['target_id']) : 0;

if ($my_id == 0 || $target_id == 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "بيانات المستخدمين غير مكتملة"]);
    exit;
}
// 2. الاستعلام عن الرسائل المتبادلة بين الطرفين
// بنستخدم الـ Composite Index اللي عملناه عشان السرعة
$sql = "SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) 
        OR (sender_id = ? AND receiver_id = ?) 
    ORDER BY created_at ASC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $my_id, $target_id, $target_id, $my_id);
$stmt->execute();
$result = $stmt->get_result();

$messages = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = [
            "content" => $row['content'],
            "mines" => $row['sender_id'] == $my_id , 
        ];
    }
}

// 3. إرسال النتيجة حتى لو المصفوفة فاضية (يعني مفيش شات قديم)
http_response_code(200);
echo json_encode(['messages' => $messages]);

$conn->close();
