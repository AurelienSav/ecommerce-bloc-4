import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function Cart() {
  const [cart, setCart] = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.quantity} x {item.price} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-bold">Total : {total.toFixed(2)} €</p>
            <button
              onClick={clearCart}
              className="mt-2 bg-marine text-white px-4 py-2 rounded hover:bg-marine-dark"
            >
              Passer la commande
            </button>
          </div>
        </>
      )}
    </div>
  );
}
