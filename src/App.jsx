import Nav from "./components/Nav";
import Home from "./components/Home";
import Products from "./components/Products";
import ContactUs from "./components/ContactUs";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Detail from "./components/Detail";
import OrderSummary from "./components/OrderSummary";
import PageNotFound from "./components/PageNotFound";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Nav />
            <div className="container">
                <Routes>
                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/confirmation" element={<OrderSummary />} />
                    <Route path="/product/:id" element={<Detail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;