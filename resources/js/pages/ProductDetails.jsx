import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { CartContext } from '../contexts/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useContext(CartContext);

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    const exists = cart.find(p => p.id === product.id);
    if (exists) {
      setCart(cart.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={`/images/${product.image}`} alt={product.name} className="w-full h-96 object-cover mb-6 rounded" />
      <h1 className="text-3xl font-bold text-marine mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold text-marine mb-4">{product.price} €</p>
      <button
        onClick={addToCart}
        className="bg-marine text-white px-6 py-2 rounded hover:bg-marine-dark"
      >
        Ajouter au panier
      </button>
    </div>
  );
}
