<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LogController;


Route::group(["prefix" => "v0.1"], function () {

    Route::group(["prefix" => "guest"], function () {
        Route::get('/ping', fn() => response()->json(['pong' => true]));
        Route::post("/register", [AuthController::class, "register"]);
        Route::post("/login", [AuthController::class, "login"]);
    });

    Route::group(["prefix" => "auth", "middleware" => "auth:api"], function () {
        Route::post("/addLog", [LogController::class, "store"]);
        Route::get("/user", function (Request $request) {
            return $request->user();
        });
    });
});