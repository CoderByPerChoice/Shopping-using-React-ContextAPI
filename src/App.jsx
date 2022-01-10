import Nav from "./components/Nav";
import Home from "./components/Home";
import Products from "./components/Products";
import ContactUs from "./components/ContactUs";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Detail from "./components/Detail";
import OrderSummary from "./components/OrderSummary";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Nav />
            <div className="container">
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/search" element={<Search />} />
                    <Route exact path="/contactus" element={<ContactUs />} />
                    <Route exact path="/products" element={<Products />} />
                    <Route exact path="/confirmation" element={<OrderSummary />} />
                    <Route path="/product/:id" element={<Detail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;