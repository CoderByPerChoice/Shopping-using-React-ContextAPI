import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { CartContext } from '../CartContext';

function Nav() {
    const { cart } = useContext(CartContext);

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between shadow-sm">
            <img class="nav-img" src="http://localhost:3000/images/cloth1.png" />
            <NavLink className="navbar-brand" to="/">
                Shop-On
            </NavLink>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/products">
                            Products
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/contactus">
                            Contact Us
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/search">
                            <i class="fa fa-search"></i>
                        </NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to="/cart">
                            <i class="fa fa-shopping-bag"></i>
                            {cart.length > 0 &&
                                <span class="desktop-badge">
                                    {cart.length}
                                </span>
                            }
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;