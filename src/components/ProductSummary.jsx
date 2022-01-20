import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import { useNavigate } from "react-router-dom";
import StripeCheckout from 'react-stripe-checkout';

function ProductSummary() {
    const navigate = useNavigate();
    const { cart, emptyCart, error } = useContext(CartContext);
    let TotalAmount = 0;
    cart.map((c) => {
        TotalAmount = TotalAmount + (c.qty * c.product.price);
    });
    function tokenHandler(token) {
        //console.log(token);
        emptyCart();
        navigate("/confirmation", { state: token });
    }

    if (error) throw error;

    return (
        <>
            {
                cart.length > 0 ?
                    <>
                        <div className="row">
                            <div className="col pt-4">
                                <h6>Price details ({cart.length}) {cart.length > 1 ? "items." : "item."}</h6>
                                <h6>Subtotal: <i class="fa fa-inr"></i>{TotalAmount}</h6>
                                <hr />
                                <h6>Total: <i class="fa fa-inr"></i>{TotalAmount}</h6>
                                <div class="d-flex justify-content-between">
                                    <StripeCheckout
                                        name="Shop-On"
                                        image="http://localhost:3000/images/cloth1.png"
                                        amount={TotalAmount * 100}
                                        shippingAddress
                                        token={tokenHandler}
                                        stripeKey='pk_test_51JSwc7SJugH4e1kT9UvwxONc2fMLnHcpjrQyroXa8163q2aeOLmvEEroRRkZeWnmzju6jfez35evdOSTKTrErdtP00McoW45sP'
                                        currency='INR'
                                    >
                                        <button className="btn btn-primary mt-3">Checkout</button>
                                    </StripeCheckout>
                                    <span>
                                        <button className="btn btn-primary mt-3" onClick={emptyCart}>Clear Cart</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                    : <h4>Your cart is empty</h4>
            }
        </>
    );
}

export default ProductSummary;