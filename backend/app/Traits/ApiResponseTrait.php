<?php

namespace App\Traits;


trait ApiResponseTrait {
    public function successResponse($data = null, $message = null, $code = 200) {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message
        ], $code);
    }
    public function errorResponse($error = null, $code = 400) {
        return response()->json([
            'success' => false,
            'error' => $error
        ], $code);
    }

}
