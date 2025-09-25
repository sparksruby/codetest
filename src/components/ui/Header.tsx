import React from 'react';
import { Menu, Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  getCartItemCount: () => number;
}

export const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  onBack,
  getCartItemCount
}) => {
  const navigate = useNavigate();

  return (
    <header className="w-full h-16 sm:h-20 bg-white border-b border-gray-200 relative z-20">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="absolute top-4 sm:top-7 left-3 sm:left-5 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Logo */}
      <div className="absolute top-3 sm:top-6 left-14 sm:left-10 text-xl sm:text-2xl font-bold text-[#17183b]">
        Cozy<span className="font-normal">®</span>
      </div>

      {/* Navigation - hidden on mobile, flex on md+ */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-10 absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2">
        {['SHOP', 'COLLECTIVE', 'DESIGNERS', 'ABOUT US', 'CONTACT'].map((item) => (
          <button
            key={item}
            className="font-semibold text-[#17183b] text-xs lg:text-sm hover:text-gray-600"
          >
            {item}
          </button>
        ))}
      </nav>

      {/* Mobile menu button (for nav) */}
      <div className="absolute top-4 sm:top-7 left-3 sm:left-5 md:hidden">
        {!showBackButton && (
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded" aria-label="Menu">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="absolute top-4 sm:top-7 right-3 sm:right-5 flex items-center gap-4 sm:gap-8">
        {/* Hide Menu button on mobile (already at left) */}
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded hidden md:inline-flex" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded" aria-label="Search">
          <Search className="w-6 h-6" />
        </button>
        <div className="relative">
          <button
            onClick={() => navigate('/cart')}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
            aria-label="Cart"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
          {getCartItemCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-10">
              {getCartItemCount()}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};