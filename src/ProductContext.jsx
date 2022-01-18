import React, { useState, useEffect } from "react";
export const ProductContext = React.createContext(null);

export function ProductProvider(props) {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const rsp = await fetch("/products.json");
        const allProducts = await rsp.json();
        setProducts(allProducts);
        const filteredProduct = allProducts.filter(({ featured }) => { return featured === true });
        setFeaturedProducts(filteredProduct);
    }

    const contextValue = {
        products,
        featuredProducts,
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    );
}