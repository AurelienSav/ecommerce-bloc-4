import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

export default function Navbar() {
  const [cart] = useContext(CartContext);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-marine">HopCraft</Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-marine hover:underline">Produits</Link>
          <Link to="/cart" className="relative">
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-marine text-white text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
