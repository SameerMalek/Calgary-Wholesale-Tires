import React from 'react';
import './product.scss';
import ProductCard from '../productCard/productCard';
import products from "../../lib/products.json";

const ProductGrid = () => {
  return (
    <>
    <div className="title">Products Categories</div>
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={index} name={product.name} image={product.image} />
      ))}
    </div>
    </>
  );
};

export default ProductGrid;

