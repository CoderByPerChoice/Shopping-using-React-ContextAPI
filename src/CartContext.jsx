import React, { useState, useEffect } from "react";

export const CartContext = React.createContext(null);
let initialCart;
try {
    initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
    initialCart = [];
}

export function CartProvider(props) {
    const [cart, setCart] = useState(initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

    function emptyCart() {
        setCart([]);
    }

    const contextValue = {
        cart,
        setCart,
        emptyCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}