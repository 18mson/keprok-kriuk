import React from 'react';

type VariantPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (variant: string) => void;
  variants: string[];
  selectedVariant: string;
};

const VariantPopup: React.FC<VariantPopupProps> = ({
  isOpen,
  onClose,
  onSelect,
  variants,
  selectedVariant
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 px-4 py-6 backdrop-blur-sm">
      <div className="bg-white/70 backdrop-blur-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Pilih Varian Rasa</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto">
          {variants.map((variant) => (
            <button
              key={variant}
              onClick={() => onSelect(variant)}
              className={`w-full text-left px-4 py-2 rounded-xl text-green-700 cursor-pointer font-semibold border ${
                selectedVariant === variant
                  ? 'bg-yellow-200'
                  : 'hover:bg-green-100 bg-white'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VariantPopup;