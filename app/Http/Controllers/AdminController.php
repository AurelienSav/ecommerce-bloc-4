<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;

class AdminController extends Controller
{
    // Affiche toutes les commandes avec leurs produits et utilisateurs
    public function orders()
    {
        $orders = Order::with('user', 'orderItems.product')->get();
        return response()->json($orders); // ou vue blade si nécessaire
    }

    // Liste tous les produits
    public function products()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Met à jour le stock d’un produit
    public function updateStock(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'stock' => 'required|integer|min:0'
        ]);

        $product->stock = $request->stock;
        $product->save();

        return response()->json(['message' => 'Stock mis à jour']);
    }
}
