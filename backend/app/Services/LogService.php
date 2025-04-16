<?php

namespace App\Services;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log as FacadeLog;

class LogService{
    public static function addLog($data){
        // Validate and create log entry
        $log = new Log($data);
        $log->user_id = Auth::id();
        $log->save();

        // Optionally, you can log to a file or external service
        FacadeLog::info('Log entry created', ['log' => $log]);

        return $log;
    }
}