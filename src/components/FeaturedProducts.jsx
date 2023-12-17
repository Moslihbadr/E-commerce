import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./ProductCard";
import Spinner from "./Spinner";
import Button from "./Button";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products?featured=true"); // get the featured products only
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="container text-center">
        <h1 className="my-4">Featured Products</h1>
        {featuredProducts.length > 0 ?
          <>
            <div className="row">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                  <Product image={product.image} title={product.title} price={product.price} id={product.id} />
                </div>
              ))}
            </div>
            <Link to={'/products'} className="link-underline link-underline-opacity-0 mb-5" ><Button>All Products</Button></Link>
          </>
          : <Spinner />}
      </div>
    </>
  );
};


export default FeaturedProducts;
