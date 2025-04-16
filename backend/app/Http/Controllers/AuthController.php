<?php

namespace App\Http\Controllers;

use App\ApiResponse;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;


class AuthController extends Controller {
    public function register(RegisterRequest $request) {
        $validated = $request->validated();
        $user = AuthService::register($validated);
        if (!$user) {
            return ApiResponse::error("User registration failed", 400);
        }

        return ApiResponse::success($user, "User registered successfully", 201);
    }
    public function login(LoginRequest $request) {
        $validated = $request->validated();
        $result = AuthService::login($validated);
        if (!$result) {
            return ApiResponse::error("Invalid credentials", 401);
        }

        return ApiResponse::success($result, "User logged in successfully", 200);
    }
}
