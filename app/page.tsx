"use client";

import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

type MenuItem = {
  name: string;
  price: number;
};

type Order = {
  id: string;
  menu: MenuItem;
  variant: string;
};

const MENU_1: MenuItem[] = [
  { name: "Ayam Kriuk", price: 16000 },
  { name: "Cumi Ring", price: 20000 },
  { name: "Kenting Kriuk", price: 16000 },
  { name: "Pastel", price: 17000 },
  { name: "Dori Kriuk", price: 20000 },
  { name: "Pisang Coklat", price: 15000 },
];

const MENU_2: MenuItem[] = [
  { name: "Otak-otak Kriuk", price: 15000 },
  { name: "Enoki Kriuk", price: 14000 },
  { name: "Mie Kriuk", price: 12000 },
  { name: "Tahu Kriuk", price: 13000 },
  { name: "Kulit Kriuk", price: 14000 },
];

const VARIANTS = [
  "Original",
  "Keju",
  "BBQ",
  "Cabe",
  "Balado",
  "Jagung Manis",
  "Sapi Panggang",
  "Jagung Bakar",
  "Saus Cabe",
  "Saus Keju",
  "Saus Tomat",
  "Mayo",
  "Madu (+3K)",
];

export default function Home() {
  const [customerName, setCustomerName] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("Original");

  const allMenuItems = [...MENU_1, ...MENU_2];

  const addOrder = () => {
    if (!selectedMenu) return;

    const menuItem = allMenuItems.find((item) => item.name === selectedMenu);
    if (!menuItem) return;

    const newOrder: Order = {
      id: Date.now().toString(),
      menu: menuItem,
      variant: selectedVariant,
    };

    setOrders([...orders, newOrder]);
  };

  const removeOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const calculateTotal = () => {
    return orders.reduce((total, order) => {
      const price = order.menu.price;
      const extraPrice = order.variant.includes("+3K") ? 3000 : 0;
      return total + price + extraPrice;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sendToWhatsApp = () => {
    if (!customerName.trim()) {
      alert("Mohon isi nama Anda");
      return;
    }

    if (orders.length === 0) {
      alert("Mohon tambahkan minimal 1 pesanan");
      return;
    }

    let message = `*PESANAN KEPROK KRIUK*\n\n`;
    message += `Nama: ${customerName}\n\n`;
    message += `*Detail Pesanan:*\n`;

    orders.forEach((order, index) => {
      const price = order.menu.price;
      const extraPrice = order.variant.includes("+3K") ? 3000 : 0;
      const totalPrice = price + extraPrice;
      message += `${index + 1}. ${order.menu.name}\n`;
      message += `   Varian: ${order.variant}\n`;
      message += `   Harga: ${formatPrice(totalPrice)}\n\n`;
    });

    message += `*Total: ${formatPrice(calculateTotal())}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6282216267796?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700 mb-2">
            Keprok Kriuk
          </h1>
          <p className="text-gray-600">Pesan Menu Favorit Anda</p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-green-100">
          <div className="mb-6">
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nama Anda
            </label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="menu"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pilih Menu
              </label>
              <select
                id="menu"
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Pilih menu...</option>
                <optgroup label="Menu 1">
                  {MENU_1.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} - {formatPrice(item.price)}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Menu 2">
                  {MENU_2.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name} - {formatPrice(item.price)}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label
                htmlFor="variant"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pilih Varian Rasa
              </label>
              <select
                id="variant"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {VARIANTS.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={addOrder}
            disabled={!selectedMenu}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Tambah Pesanan
          </button>
        </div>

        {orders.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-green-100">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              Pesanan Anda
            </h2>
            <div className="space-y-3 mb-4">
              {orders.map((order) => {
                const price = order.menu.price;
                const extraPrice = order.variant.includes("+3K") ? 3000 : 0;
                const totalPrice = price + extraPrice;

                return (
                  <div
                    key={order.id}
                    className="flex items-start justify-between bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {order.menu.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Varian: {order.variant}
                      </p>
                      <p className="text-sm font-medium text-green-700 mt-1">
                        {formatPrice(totalPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-colors"
                      aria-label="Hapus pesanan"
                    >
                      <IoClose size={24} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center text-xl font-bold mb-4">
                <span>Total:</span>
                <span className="text-green-700">
                  {formatPrice(calculateTotal())}
                </span>
              </div>

              <button
                onClick={sendToWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={24} />
                Kirim Pesanan via WhatsApp
              </button>
            </div>
          </div>
        )}

        {orders.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500 border border-green-100">
            <p>Belum ada pesanan. Tambahkan menu favorit Anda!</p>
          </div>
        )}
      </div>
    </div>
  );
}
