import React, { useState, useEffect } from 'react';
import ProductCard from "./ProductCard";

function Search() {
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts(searchText);
    }, [searchText]);

    const fetchProducts = async () => {
        const rsp = await fetch("/products.json");
        const allProducts = await rsp.json();
        if (searchText === "") {
            setProducts(allProducts);
        }
        else {
            const filteredProduct = allProducts.filter(({ name, category }) => { return category.toLowerCase().match(searchText.toLowerCase()) || name.toLowerCase().match(searchText.toLowerCase()) });
            setProducts(filteredProduct);
        }
    };

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