import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
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
    const notifySuccess = (productName) => toast(productName + " added to cart.", { type: 'success', autoClose: 2000 });
    const notifyWarning = (productName) => toast(productName + " updated in cart.", { type: 'warning', autoClose: 2000 });
    const notifyError = (msg) => toast(msg, { type: 'error', autoClose: 2000 });

    function emptyCart() {
        setCart([]);
    }

    function removeProductFromCart(prodId) {
        setCart(cart.filter((c) => { return c.product.id !== prodId }));
    }

    function addProductToCart(quantity, size, product) {
        if (parseInt(size) > 0 || size !== "") {
            const itemInCart = cart.filter((p) => p.product.id === product.id);
            if (itemInCart.length > 0) {
                setCart(prevCart => {
                    return cart.map((p) =>
                        p.product.id === product.id ?
                            { ...p, qty: quantity, size } : p
                    );
                });
                notifyWarning(itemInCart[0].product.name);
            }
            else {
                setCart(prevCart => [...prevCart, { product, qty: quantity, size }]);
                notifySuccess(product.name);
            }
        }
        else
            notifyError('Please select size.');
    }

    const contextValue = {
        cart,
        setCart,
        emptyCart,
        removeProductFromCart,
        addProductToCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
}