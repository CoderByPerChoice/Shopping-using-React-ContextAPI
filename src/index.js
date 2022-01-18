import ReactDOM from "react-dom";
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./CartContext";
import { ProductProvider } from "./ProductContext";
import "./styles.css";

ReactDOM.render(
    <BrowserRouter>
        <ProductProvider>
            <CartProvider>
                <App />
            </CartProvider>
        </ProductProvider>
    </BrowserRouter>
    ,
    document.getElementById("root"));