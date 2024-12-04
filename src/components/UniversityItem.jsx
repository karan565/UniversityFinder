import React, { useContext } from 'react';

const UniversityItem = () => {
    return (
        <div className="product-card">
            <img className="product-image"
                src={product.image}
                alt={product.name} />
            <div className="product-details">
                <h3 style={{ fontWeight: "700" }}>
                    {product.name}
                </h3>
                <p style={{ fontWeight: "300" }}>
                    {product.description}
                </p>
                <p style={{ fontWeight: "500" }}>
                    Price: {product.price} Rs/Kg
                </p>
                <button onClick={
                    () => handleAddToCart(product)
                }>
                    Add to Cart
                </button>
                &nbsp;&nbsp;
                <button onClick={
                    () =>
                        handleRemoveToCart(product)
                }>
                    -
                </button>
            </div>
        </div>
    );
}