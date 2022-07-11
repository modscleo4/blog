<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OAuthController extends Controller
{
    public function getAuthURL(Request $request)
    {
        $url = env('KEYCLOAK_URL') . '/realms/' . env('KEYCLOAK_REALM') .  '/protocol/openid-connect/auth?' . http_build_query([
            'response_type' => 'code',
            'client_id' => env('KEYCLOAK_CLIENT_ID'),
            'redirect_uri' => $request->get('redirect_uri'),
            'scope' => 'openid profile',
        ]);

        return response()->json(['url' => $url]);
    }

    public function authCallback(Request $request)
    {
        try {
            $client = new \GuzzleHttp\Client(['base_uri' => env('KEYCLOAK_URL')]);

            $url = '/realms/' . env('KEYCLOAK_REALM') .  '/protocol/openid-connect/token';
            $body = [
                'grant_type' => 'authorization_code',
                'code' => $request->get('code'),
                'redirect_uri' => $request->get('redirect_uri'),
            ];
            $headers = [
                'Authorization' => 'Basic ' . base64_encode(env('KEYCLOAK_CLIENT_ID') . ':' . env('KEYCLOAK_CLIENT_SECRET')),
            ];

            $response = $client->request('POST', $url, [
                'form_params' => $body,
                'headers' => $headers,
            ]);

            $data = json_decode($response->getBody()->getContents(), true);

            $url = env('KEYCLOAK_URL') . '/realms/' . env('KEYCLOAK_REALM') .  '/protocol/openid-connect/userinfo';
            $headers = [
                'Authorization' => 'Bearer ' . $data['access_token'],
            ];

            $response = $client->request('POST', $url, [
                'headers' => $headers,
            ]);
        } catch (GuzzleException $e) {
            return response()->json(['error' => 'Invalid credentials', 'info' => $e->getMessage()], 401);
        }

        $data = json_decode($response->getBody()->getContents(), true);

        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            $user = User::create([
                'email' => $data['email'],
                'name' => $data['name'],
                'username' => $data['preferred_username'],
            ]);
        }

        $user->api_token = Str::random(80);
        $user->save();

        return response()->json($user);
    }
}
