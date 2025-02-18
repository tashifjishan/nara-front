import { useState, useEffect, Suspense } from "react";
import { fetchProducts } from "../apis/getAllProducts";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../components/products/categories";
import ProductHeader from "../components/products/header";
import ProductItem from "../components/products/product-item";
import Loading from "../components/utils/Loading";
import NavbarRelative from "../components/Navbar/NavbarRelative";
import PageLoader from "../components/utils/PageLoader";

const Products = () => {
  const colors = ["black", "brown", "beige", "gray"];
  const [activeProductColor, setActiveProductColor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [copiedProducts, setCopiedProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        // const productsData = await fetchProducts();
        let response = await fetch(import.meta.env.VITE_BACKEND_HOST+'/product/all');
       
        if(!response.ok) {
          response = await response.json();
          console.log(response);
          throw new Error("Something went wrong!")
        }

        response = await response.json();
        console.log(response);
        setProducts(response.message);
        // setCopiedProducts(productsData); // Initialize copied products
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // useEffect(() => {
  //   if (!isLoading && products.length > 0) {
  //     // Wait until the next frame to ensure painting
  //     requestAnimationFrame(() => {
  //       // alert("All products have been rendered!");
  //     });
  //   }
  // }, [isLoading, products]);

  return (
    <div className="dark:!bg-black p-[0.2px] overflow-x-hidden  xl:h-screen ">
      <NavbarRelative />

      <div className=" dark:!bg-black bg-[#ffff]  dark:text-[#ffff] mt-8">
        <div className="bg-[#F7F7F7]  dark:bg-black dark:border-b-[#ffff] dark:border-b-2  pb-2 mt-20">
          <ProductHeader
            setIsLoading={setIsLoading}
            products={products}
            setProducts={setProducts}
            copyProducts={copiedProducts}
          />
        </div>
        <div className="overflow-hidden min-h-screen ">
        {isLoading ? (
          <PageLoader  />
        ) : (
          // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-x-16 p-4 place-items-center">
          <div className="flex flex-wrap gap-4 justify-center  py-4">
            {products.length===0? <h1 className="text-3xl text-center p-12 ">Could not get any product for you!</h1>: null}
            {products.map((product, index) => (
              <ProductItem
                key={product._id}
                img={`${import.meta.env.VITE_BACKEND_HOST}/images/${product.image}`}
                colors={colors}
                setActiveProductColor={setActiveProductColor}
                price={product.price}
                name={product.title}
                discount={""}
                message={""}
                productId={product._id}
              />
            ))}

          </div>
        )}

        </div>
      </div>
    </div>
  );
};

export default Products;