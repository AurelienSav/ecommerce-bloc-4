<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductAdminController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function updateStock(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->stock = $request->input('stock');
        $product->save();
        return response()->json(['message' => 'Stock mis à jour']);
    }

    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Produit supprimé']);
    }
}
