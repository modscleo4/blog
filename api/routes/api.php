<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

$router->group(['prefix' => '/api/v1'], function () use ($router) {
    $router->get('/user', 'AuthController@user');
    $router->post('/login', 'AuthController@login');

    $router->group(['prefix' => '/post'], function () use ($router) {
        $router->get('/', [
            'as' => 'api.post.index',
            'uses' => 'PostController@index',
        ]);
        $router->post('/', [
            'middleware' => 'auth',
            'as' => 'api.post.create',
            'uses' => 'PostController@create',
        ]);

        $router->group(['prefix' => '/{id}'], function () use ($router) {
            $router->get('/', [
                'as' => 'api.post.show',
                'uses' => 'PostController@show',
            ]);

            $router->put('/', [
                'middleware' => 'auth',
                'as' => 'api.post.update',
                'uses' => 'PostController@update',
            ]);

            $router->delete('/', [
                'middleware' => 'auth',
                'as' => 'api.post.destroy',
                'uses' => 'PostController@destroy',
            ]);
        });
    });
});
