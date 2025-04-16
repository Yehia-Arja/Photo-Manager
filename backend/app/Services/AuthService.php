<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
class AuthService
{
    public static function register($data){
        // Validate and create user
        $user = new User($data);
        $user->save();

        return $user;
    }

    public static function login($credentials){
        // Attempt to log the user in
       if ($token = Auth::attempt($credentials)) {
            $user = Auth::user();
            return [
                'user' => $user,
                'token' => $token,
            ];
        }

        return null;
    }
}