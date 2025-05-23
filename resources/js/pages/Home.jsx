import React from 'react';
import ProductList from '../components/ProductList.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <ProductList />
        {/* Bouton vers l'admin */}
        <div className="text-center my-10">
          <Link
            to="/admin"
            className="inline-block bg-marine text-white px-6 py-2 rounded shadow hover:bg-marine-dark transition"
          >
            Accès Admin
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
