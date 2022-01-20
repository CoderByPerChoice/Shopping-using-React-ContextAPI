import React, { useState, useEffect } from "react";
export const ProductContext = React.createContext(null);

export function ProductProvider(props) {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const rsp = await fetch("/products.json");
            const allProducts = await rsp.json();
            setProducts(allProducts);
            const filteredProduct = allProducts.filter(({ featured }) => { return featured === true });
            setFeaturedProducts(filteredProduct);
        }
        catch (e) {
            setError(e);
        }
    }

    const contextValue = {
        products,
        featuredProducts,
        error,
    };

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    );
}