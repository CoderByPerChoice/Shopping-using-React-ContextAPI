import React, { useContext } from 'react';
import { CartContext } from '../CartContext';

function Checkout() {
    const { cart, setCart } = useContext(CartContext);

    function clearCart() {
        setCart([]);
    }

    return (
        <>
            {
                cart.length > 0 ?
                    <>
                        <h1>Shipping Details</h1>
                        <div><a class="btn btn-primary" onClick={clearCart}>Empty Cart</a></div>
                    </>
                    : <h4>Your cart is empty</h4>
            }
        </>
    );
}

export default Checkout;