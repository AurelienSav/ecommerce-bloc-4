<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Models\Order;
use App\Models\OrderItem;
use App\Http\Controllers\Admin\ProductAdminController;


Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::prefix('admin')->group(function () {
    Route::get('/products', [ProductAdminController::class, 'index']);
    Route::post('/products', [ProductAdminController::class, 'store']);
    Route::put('/products/{id}/stock', [ProductAdminController::class, 'updateStock']);
    Route::delete('/products/{id}', [ProductAdminController::class, 'destroy']);
});

Route::get('/categories', [CategoryController::class, 'index']);

Route::post('/orders', function (Request $request) {
    $items = $request->input('items');

    $totalPrice = collect($items)->reduce(function ($carry, $item) {
        return $carry + ($item['price'] * $item['quantity']);
    }, 0);

    $order = Order::create([
        'user_id' => auth()->id(), // null si non connecté
        'total_price' => $totalPrice,
        'status' => 'pending',
    ]);

    foreach ($items as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['id'],
            'quantity' => $item['quantity'],
            'unit_price' => $item['price'],
        ]);
    }

    return response()->json(['message' => 'Commande créée avec succès'], 201);
});

Route::get('/admin/orders', function () {
    return Order::with('items.product')->latest()->get();
});

use App\Http\Controllers\AdminController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/orders', [AdminController::class, 'orders']);
    Route::get('/admin/products', [AdminController::class, 'products']);
    Route::put('/admin/products/{id}/stock', [AdminController::class, 'updateStock']);
});