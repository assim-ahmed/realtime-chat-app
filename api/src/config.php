<?php

// 1. السماح لأي دومين بالوصول (في التطوير فقط)
header("Access-Control-Allow-Origin: *"); 

// 2. السماح بأنواع معينة من الطلبات (GET للمعلومات، POST للـ Login/Register)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

// 3. السماح ببعت Headers مخصصة (زي الـ Content-Type أو الـ Authorization بتاع الـ JWT)
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// 4. تحديد إن الرد دايماً هيكون بصيغة JSON
header("Content-Type: application/json; charset=UTF-8");

// حته فنية: لو المتصفح بعت طلب "OPTIONS" (بتحصل قبل الـ POST) اقفل السكريبت هنا
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$conn = new mysqli("localhost" , "root" , "" , "chatapp");


if ($conn->connect_error) {
    echo json_encode(["message" => "Connection failed"]);
    exit();
}

require_once "../vendor/autoload.php";

   $key     = sha1("chat");
   $alg     = "HS256" ;

?>