<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$dbname = "radiok";
$user = "radiok";
$pass = "0jelszo1";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["status" => "Adatbázis hiba: " . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM telepules ORDER BY nev ASC");
        echo json_encode(["readData" => $stmt->fetchAll(PDO::FETCH_ASSOC), "status" => "Sikeres lekérdezés"]);
        break;

    case 'POST':
        $stmt = $pdo->prepare("INSERT INTO telepules (nev, megye) VALUES (?, ?)");
        $stmt->execute([$input['nev'], $input['megye']]);
        echo json_encode(["status" => "Település hozzáadva"]);
        break;

    case 'PUT':
        $stmt = $pdo->prepare("UPDATE telepules SET nev = ?, megye = ? WHERE nev = ?");
        $stmt->execute([$input['nev'], $input['megye'], $input['oldNev']]);
        echo json_encode(["status" => "Település frissítve"]);
        break;

    case 'DELETE':
        $stmt = $pdo->prepare("DELETE FROM telepules WHERE nev = ?");
        $stmt->execute([$input['nev']]);
        echo json_encode(["status" => "Település törölve"]);
        break;

    default:
        echo json_encode(["status" => "Ismeretlen kérés"]);
        break;
}
?>