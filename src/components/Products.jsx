import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function Products() {
    const [products, setProducts] = useState([]);
    const defaultProductFilter = "All";
    const [productFilter, setProductFilter] = useState(defaultProductFilter);

    useEffect(() => {
        fetchProducts(defaultProductFilter);
    }, []);

    const fetchProducts = async (productCategory) => {
        const rsp = await fetch("/products.json");
        const allProducts = await rsp.json();
        if (productCategory === defaultProductFilter) {
            setProducts(allProducts);
        }
        else {
            const filteredProduct = allProducts.filter(({ category }) => { return category === productCategory });
            setProducts(filteredProduct);
        }

    };

    function onProductFilterChange(e) {
        setProductFilter(e.target.value);
        fetchProducts(e.target.value);
    }

    return (
        <>
            <div class="container align-items-center filter">
                <select value={productFilter} onChange={onProductFilterChange}>
                    <option value="All">Select category</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Watches">Watches</option>
                    <option value="Shirts">Shirts</option>
                    <option value="LadiesWear">Ladies Wear</option>
                    <option value="Phones">Phones</option>
                </select>
            </div>
            <div class="col-12 col-sm-12 col-md d-flex flex-wrap align-items-center">
                {/* <div className="row row-content align-items-center">
                <div className="col-12 col-sm-4 align-self-center"> */}
                {products.map((product) => {
                    return <ProductCard product={product} key={product.id} />
                })}
                {/* </div>
            </div> */}
            </div>
        </>
    );
}

export default Products;