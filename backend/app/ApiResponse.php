<?php

namespace App;

trait ApiResponse {
    public static function success($data = null, $message = null, $code = 200) {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message
        ], $code);
    }
    public static function error($error = null, $code = 400) {
        return response()->json([
            'success' => false,
            'error' => $error
        ], $code);
    }

}
