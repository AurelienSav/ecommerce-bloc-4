<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $category = Category::firstOrCreate(['name' => 'Bières artisanales']);

        Product::create([
            'name' => 'IPA blonde',
            'description' => 'Une bière IPA fruitée et fraîche',
            'price' => 4.50,
            'category_id' => $category->id,
            'image' => 'ipa-blonde.jpg',
        ]);

        Product::create([
            'name' => 'Stout noire',
            'description' => 'Une bière brune corsée au goût intense',
            'price' => 5.20,
            'category_id' => $category->id,
            'image' => 'stout-noir.png',
        ]);

        Product::create([
            'name' => 'Blonde légère',
            'description' => 'Une bière blonde douce au goût fruité',
            'price' => 4.20,
            'category_id' => $category->id,
            'image' => 'Blonde-Legere.jpg',
        ]);

        Product::create([
            'name' => 'Blanche épicée',
            'description' => 'Une bière blanche au goût intense',
            'price' => 3.80,
            'category_id' => $category->id,
            'image' => 'blanche-épicée.jpg',
        ]);
    }
}