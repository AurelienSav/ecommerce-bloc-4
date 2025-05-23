import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    axiosClient.get('/admin/orders').then(res => setOrders(res.data));
    axiosClient.get('/admin/products').then(res => setProducts(res.data));
  }, []);

  const updateStock = async (id, newStock) => {
    try {
      await axiosClient.put(`/admin/products/${id}/stock`, { stock: newStock });
      setProducts(products.map(p => p.id === id ? { ...p, stock: newStock } : p));
    } catch (err) {
      alert("Erreur mise à jour stock");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/admin/products', newProduct);
      setProducts([...products, res.data]);
      setNewProduct({ name: '', description: '', price: '', stock: '', image: '' });
      alert("Produit ajouté !");
    } catch (err) {
      alert("Erreur lors de l'ajout du produit");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await axiosClient.delete(`/admin/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      alert("Erreur suppression");
    }
  };

  return (
    <div className="p-10 bg-white min-h-screen space-y-10">
      <h1 className="text-3xl font-bold text-marine mb-6">Tableau de bord Admin</h1>

      {/* Ajout de produit */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Ajouter un nouveau produit</h2>
        <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <input
            type="text"
            placeholder="Nom"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="border p-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border p-2"
            required
          />
          <input
            type="number"
            placeholder="Prix"
            step="0.01"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="border p-2"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            className="border p-2"
            required
          />
          <input
            type="text"
            placeholder="Image (nom du fichier)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            className="border p-2"
          />
          <button type="submit" className="bg-marine text-white py-2 px-4 rounded col-span-1 md:col-span-2">
            Ajouter
          </button>
        </form>
      </section>

      {/* Gestion des stocks */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Produits & Stocks</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Produit</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} className="border-t">
                <td className="p-2">{prod.name}</td>
                <td className="p-2">{prod.stock}</td>
                <td className="p-2 space-x-2">
                  <input
                    type="number"
                    defaultValue={prod.stock}
                    min={0}
                    onBlur={(e) => updateStock(prod.id, parseInt(e.target.value))}
                    className="border p-1 w-20"
                  />
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Commandes */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Commandes</h2>
        {orders.length === 0 ? (
          <p>Aucune commande enregistrée.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map(order => (
              <li key={order.id} className="border p-3 rounded">
                Commande #{order.id} par {order.user?.name} - Total : {order.total_price} €
                <ul className="ml-4 list-disc">
                  {order.order_items.map(item => (
                    <li key={item.id}>{item.product?.name} x {item.quantity}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
