<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
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

    public function index(Request $request)
    {
        $username = $request->input('username');

        $posts = Post::with('user:id,username')->orderBy('id');
        if ($username) {
            $posts = $posts->where('user.username', $username);
        }

        return response()->json($posts->get(), 200);
    }

    public function create(Request $request)
    {
        $post = new Post($request->only(['title', 'resume', 'body', 'image']));
        $post->user_id = $request->user()->id;
        $post->save();

        return response()->json($post, 201);
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);

        return response()->json($post, 200);
    }

    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['error' => 'You are not authorized to update this post.'], 403);
        }

        $post->update($request->only(['title', 'resume', 'body', 'image']));

        return response()->json($post, 200);
    }

    public function destroy(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        if ($request->user()->id !== $post->user_id) {
            return response()->json(['error' => 'You are not authorized to update this post.'], 403);
        }

        $post->delete();

        return response()->json(null, 204);
    }
}
