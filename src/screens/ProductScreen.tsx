// ProductScreen.tsx
import React, { useState } from 'react';
import { Header } from '../components/ui/Header';
import { images } from '../lib/constants';
import { useNavigate } from 'react-router-dom';

import { ProductTitle } from '../components/ui/Product/ProductTitle';
import { ProductDescription } from '../components/ui/Product/ProductDescription';
import { ProductQuantityAddToCart } from '../components/ui/Product/ProductQuantityAddToCart';
import { ProductShippingInfo } from '../components/ui/Product/ProductShippingInfo';
import { ProductWishlistAndSocial } from '../components/ui/Product/ProductWishlistAndSocial';
import { ProductImageGallery } from '../components/ui/Product/ProductImageGallary';

interface ProductScreenProps {
  getCartItemCount: () => number;
  addToCart: (quantity: number, image: string) => void;
}

export const ProductScreen: React.FC<ProductScreenProps> = ({
  getCartItemCount,
  addToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const socialImgs = ["facebook.png", "twitter.png", "instagram.png", "pinterest.png"];
  const navigate = useNavigate();

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addToCart(quantity, images[selectedIndex]);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <Header getCartItemCount={getCartItemCount} />
      <div className="container mx-auto px-6 lg:px-12 py-12">
    <div className="flex flex-col lg:flex-row items-start justify-between gap-16 lg:gap-24">

  {/* LEFT SIDE - 30% width */}
  <div className="flex-[0_0_30%] max-w-xl flex flex-col justify-between">
    <div className="space-y-6 mt-6 lg:mt-0">
      <ProductTitle />
      <ProductDescription />
      <ProductQuantityAddToCart
        quantity={quantity}
        onDecrease={() => handleQuantityChange(-1)}
        onIncrease={() => handleQuantityChange(1)}
        onAddToCart={handleAddToCart}
      />
      <ProductShippingInfo />
    </div>

    {/* Bottom section */}
    <div className="pt-4  mt-8">
      <ProductWishlistAndSocial socialImgs={socialImgs} />
    </div>
  </div>

  {/* RIGHT SIDE - 70% width */}
  <div className="flex-[0_0_70%] flex flex-col items-center">
    <ProductImageGallery
      images={images}
      selectedIndex={selectedIndex}
      onSelect={setSelectedIndex}
      demoImage="/product-image.png"
    />
  </div>
</div>


      </div>
    </div>
  );
};
