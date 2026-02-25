<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApartmentController;

Route::get('/', function () {
 return redirect('/apartments');
});

Route::get('/create-database', function () {

    $statement = "CREATE DATABASE IF NOT EXISTS apartments_db";
    DB::connection()->getPdo()->exec($statement);

    return "База даних apartments_db створена!";
});

Route::get('/create-db-user', function () {

    DB::statement("CREATE USER 'apt_user'@'localhost' IDENTIFIED BY '12345'");
    DB::statement("GRANT ALL PRIVILEGES ON apartments_db.* TO 'apt_user'@'localhost'");
    DB::statement("FLUSH PRIVILEGES");

    return "Користувача MySQL створено!";
});

Route::get('/create-table1', function () {

    DB::statement("
        CREATE TABLE owners (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            email VARCHAR(100)
        )
    ");

    return "Таблицю owners створено!";
});

Route::get('/apartments', [ApartmentController::class, 'index']);
Route::get('/apartment/{id}', [ApartmentController::class, 'show']);

Route::get('/create', [ApartmentController::class, 'create']);
Route::post('/store', [ApartmentController::class, 'store']);

Route::get('/edit/{id}', [ApartmentController::class, 'edit']);
Route::post('/update/{id}', [ApartmentController::class, 'update']);

Route::get('/delete/{id}', [ApartmentController::class, 'destroy']);

Route::get('/statistics', [ApartmentController::class, 'statistics']);
Route::get('/search', [ApartmentController::class, 'search']);
