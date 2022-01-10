import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../CartContext";
import { ToastContainer, toast } from 'react-toastify';

function Detail() {
    const { cart, setCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQty] = useState(1);
    const [size, setSize] = useState("");
    const notifySuccess = (productName) => toast(productName + " added to cart.", { type: 'success', autoClose: 2000 });
    const notifyWarning = (productName) => toast(productName + " updated in cart.", { type: 'warning', autoClose: 2000 });
    const notifyError = (msg) => toast(msg, { type: 'error', autoClose: 2000 });

    useEffect(() => {
        const fetchFilteredProduct = async () => {
            // If there are no items in the cart, get the details from the database.
            if (cart.length === 0) {
                const rsp = await fetch("/products.json");
                const allProducts = await rsp.json();
                const filteredProduct = allProducts.filter((p) => { return p.id === parseInt(id) });
                setProduct(filteredProduct[0]);
                console.log(product);
            }
            else {
                //If item already added to cart then pull it out and populate quantity field.
                //This is when user wants to edit the product added to cart.
                const p = cart.filter((c) => { return c.product.id === parseInt(id) });
                if (p.length > 0) {
                    setProduct(p[0].product);
                    setQty(p[0].qty);
                    setSize(p[0].size);
                }
                else {
                    //If product have not been added to cart yet, get details from database.
                    const rsp = await fetch("/products.json");
                    const allProducts = await rsp.json();
                    const filteredProduct = allProducts.filter((p) => { return p.id === parseInt(id) });
                    setProduct(filteredProduct[0]);
                }
            }
        };
        fetchFilteredProduct();
        document.getElementById('qty').select();
    }, []);

    function addCart() {
        if (quantity > 0) {
            if (parseInt(size) > 0 || size !== "") {
                const itemInCart = cart.filter((p) => p.product.id === product.id);
                if (itemInCart.length > 0) {
                    //console.log(itemInCart);
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
        else
            notifyError('Please select quantity.');
    }

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 align-self-center">
                    <img class="align-self-center" src={`/images/${product.photo}`} />
                </div>
                <div className="col-12 col-md-6 align-self-center">
                    <div class="mb-3 row">
                        <h2>{product.name}</h2>
                    </div>
                    <div class="mb-3 row">
                        <div className="col-sm-12 Italic">{product.description}</div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-3">
                            Best Price:
                        </div>
                        <div class="col-sm-9 Italic">
                            <i class="fa fa-inr"></i>{product.price}/-
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-3">
                            Quantity:
                        </div>
                        <div class="col-sm-9 qty">
                            <input id="qty" type="text" value={quantity} onChange={(e) => setQty(e.target.value)} />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <div class="col-sm-3">
                            Size:
                        </div>
                        <div class="col-sm-9">
                            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                                <option value="">Size?</option>
                                {product.sizes && product.sizes.map((s) => (
                                    <option key={s.sizeid} value={s.size}>
                                        {s.size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div><a class="btn btn-outline-dark" onClick={addCart}>Add to cart</a></div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Detail;