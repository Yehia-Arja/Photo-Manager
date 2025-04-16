<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\ApiResponseTrait;

class RegisterRequest extends FormRequest {
    use ApiResponseTrait;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array {
        return [
            'name' => 'required|string|min:3|max:20',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ];
    }

    /**
     * Custom validation messages.
     */
    public function messages(): array {
        return [
            'name.required' => 'Please enter your name.',
            'name.min' => 'Your name must be at least 3 characters.',
            'name.max' => 'Your name cannot exceed 20 characters.',
            'email.required' => 'An email address is required.',
            'email.email' => 'Please provide a valid email.',
            'email.unique' => 'This email is already registered.',
            'password.required' => 'A password is required.',
            'password.min' => 'Password must be at least 6 characters long.',
        ];
    }

    /**
     * Custom attribute names for validation errors.
     */
    public function attributes(): array {
        return [
            'name' => 'name',
            'email' => 'Email Address',
            'password' => 'Password',
        ];
    }
}
