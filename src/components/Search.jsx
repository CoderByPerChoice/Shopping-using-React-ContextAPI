import React, { useState, useEffect, useContext } from 'react';
import ProductCard from "./ProductCard";
import { ProductContext } from "../ProductContext";

function Search() {
    const [searchText, setSearchText] = useState("");
    const { products: allProducts, error } = useContext(ProductContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(searchText);
    }, [searchText]);

    const fetchProducts = async () => {
        if (searchText !== "") {
            const filteredProduct = allProducts.filter(({ name, category }) => { return category.toLowerCase().match(searchText.toLowerCase()) || name.toLowerCase().match(searchText.toLowerCase()) });
            setProducts(filteredProduct);
        }
        else {
            setProducts(allProducts);
        }
    };
    if (error) return error;

    return (
        <>
            <h1>Search</h1>
            <hr />
            <div class="container align-items-center filter">
                <input type="text" value={searchText} placeholder="Enter search text" onChange={(e) => setSearchText(e.target.value)} />
            </div>
            {
                products.length > 0 ?
                    <div class="col-12 col-sm-12 col-md d-flex flex-wrap align-items-center">
                        {
                            products.map((product) => {
                                return <ProductCard product={product} key={product.id} />
                            })
                        }
                    </div>
                    :
                    <div class="col-12 col-sm col-md d-flex justify-content-center">
                        <h4>No product/s found...</h4>
                    </div>
            }
        </>
    );
}

export default Search;