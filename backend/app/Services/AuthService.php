<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;

class AuthService
{
    public static function register($data){
        $user = new User($data);
        $user->password = bcrypt($data['password']);
        $user->save();

        return $user;
    }

    public static function login($credentials){
        $ip = request()->ip();
        $geo = Location::get($ip);

        $geoData = [
            'ip_address' => $ip,
            'country'    => $geo?->countryName,
            'region'     => $geo?->regionName,
            'city'       => $geo?->cityName,
            'latitude'   => $geo?->latitude,
            'longitude'  => $geo?->longitude,
        ];

        if ($token = Auth::attempt($credentials)) {
            $user = Auth::user();

            LogService::addLog([
                ...$geoData,
                'action'  => 'login',
                'details' => 'User logged in successfully',
            ]);

            return [
                'user'   => $user,
                'token'  => $token,
                ...$geoData,
            ];
        }

        LogService::addLog([
            ...$geoData,
            'action'  => 'login_failed',
            'details' => 'User login failed',
        ]);

        return null;
    }
}
