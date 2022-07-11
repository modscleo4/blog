<?php

namespace App\Http\Controllers;

use App\Models\Token;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        /** @var User */
        $user = User::where('email', $request->email)->first();
        if (!$user || !$user->password || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $token = Token::create([
            'user_id' => $user->id,
            'token' => Str::random(60),
        ]);

        return response()->json(['user' => $user, 'token' => $token->token]);
    }

    public function user(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $request->user();
    }
}
