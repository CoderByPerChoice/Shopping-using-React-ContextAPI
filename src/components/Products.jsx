import { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../ProductContext";

function Products() {
    const { products: allProducts } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const defaultProductFilter = "All";
    const [productFilter, setProductFilter] = useState(defaultProductFilter);

    useEffect(() => {
        fetchProducts(defaultProductFilter);
    }, []);

    const fetchProducts = async (productCategory) => {
        if (productCategory !== defaultProductFilter) {
            const filteredProduct = allProducts.filter(({ category }) => { return category === productCategory });
            setProducts(filteredProduct);
        }
        else {
            setProducts(allProducts);
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
                {products.map((product) => {
                    return <ProductCard product={product} key={product.id} />
                })}
            </div>
        </>
    );
}

export default Products;