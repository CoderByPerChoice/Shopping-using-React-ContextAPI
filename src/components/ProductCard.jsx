import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router';
import { CartContext } from "../CartContext";
import { ToastContainer, toast } from 'react-toastify';

function ProductCard(props) {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const [size, setSize] = useState("");
    const notifySuccess = (productName) => toast(productName + " added to cart.", { type: 'success', autoClose: 2000 });
    const notifyWarning = (productName) => toast(productName + " updated in cart.", { type: 'warning', autoClose: 2000 });
    const notifyError = (msg) => toast(msg, { type: 'error', autoClose: 2000 });

    function addCart(quantity, product) {
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
                notifySuccess(props.product.name);
            }
        }
        else
            notifyError('Please select size.');
    }

    return (
        <>
            {/*  */}
            <div class="m-2 card">
                <img class="card-img-top img-fluid img-thumbnail align-self-center" src={`/images/${props.product.photo}`} alt="Card image cap" onClick={(evt) => { navigate(`/product/${props.product.id}`) }} />
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-center">{props.product.name}</h5>
                    <div class="d-flex price-panel">
                        <p class="card-text"><i class="fa fa-inr"></i>{props.product.price}/-</p>
                        <p class="card-text">
                            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="0">Size?</option>
                                {props.product.sizes && props.product.sizes.map((s) => (
                                    <option key={s.sizeid} value={s.size}>
                                        {s.size}
                                    </option>
                                ))}
                            </select>
                        </p>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); addCart(1, props.product) }}>
                        <div><input disabled={!size} type="submit" class="btn btn-outline-dark" value="Add to cart"></input></div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default ProductCard;