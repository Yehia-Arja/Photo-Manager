<?php

namespace App\Http\Controllers;

use App\Http\Requests\LogRequest;
use App\Services\LogService;


class LogController extends Controller {
    public function store(LogRequest $request) {
        $validated = $request->validated();
        $log = LogService::addLog($validated);
        if (!$log) {
            return $this->errorResponse("Log creation failed", 400);
        }

        return $this->successResponse($log, "Log created successfully", 201);
    } 
}
