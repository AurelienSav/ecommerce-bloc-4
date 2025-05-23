import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosClient.get('/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erreur produits:", error));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-marine mb-6 text-center">Nos Produits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white border shadow rounded overflow-hidden hover:scale-105 transition-transform">
            <img src={`/images/${product.image}`} alt={product.name} />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-marine">{product.name}</h3>
              <p className="text-sm text-gray-700 mb-2">{product.description?.slice(0, 100)}...</p>
              <p className="text-lg font-bold text-marine">{product.price} €</p>
              <Link
                to={`/products/${product.id}`}
                className="inline-block mt-3 bg-marine text-white px-4 py-2 rounded hover:bg-marine-dark"
              >
                Voir
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
