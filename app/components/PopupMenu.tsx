import React from 'react';

type MenuItem = {
  name: string;
  price: number;
};

type PopupMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (menu: MenuItem) => void;
  menuItems: MenuItem[];
  selectedMenu: string;
};

const PopupMenu: React.FC<PopupMenuProps> = ({ isOpen, onClose, onSelect, menuItems, selectedMenu }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 px-4 py-6 backdrop-blur-sm">
      <div className="bg-white/70 backdrop-blur-lg rounded-lg p-6 w-full max-w-md overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Pilih Menu</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => onSelect(item)}
              className={`w-full text-left px-4 py-2 rounded-xl text-green-700 cursor-pointer font-semibold border ${
                selectedMenu === item.name
                  ? 'bg-yellow-200'
                  : 'hover:bg-green-100 bg-white'
              }`}
            >
              {item.name} - {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
              }).format(item.price)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;