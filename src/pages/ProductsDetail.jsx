import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import NavbarRelative from "../components/Navbar/NavbarRelative";
import ImageGallery from "../components/productsDetail/ImageGallery";
import DetailSection from "../components/productsDetail/DetailSection";
import SizeSelector from "../components/productsDetail/SizeSelector";
import ActionButtons from "../components/productsDetail/ActionButtons";
import "react-toastify/dist/ReactToastify.css";
import PageLoader from "../components/utils/PageLoader";
import useQuery from "../hooks/useQuery";
import { useDispatch } from "react-redux";
import { setCurrentVariant } from "../store";


export default function ProductsDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState([]);

  const [currentSize, setCurrentSize] = useState(null);
  const query = useQuery();
  const [cameFrom, setCameFrom] = useState({ page: "", link: "" });

  const dispatch = useDispatch()


  const params = useParams();
  const imageRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProductInfo = async (productId) => {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST+ "/product/" +productId);
      if(!response.ok){
        response = await response.json()
        console.log(response);
        throw new Error("Error fetching product");
      }
      response = await response.json()
      const fetchedProduct = await response.message;
      setProduct(fetchedProduct);
      setCurrentSize(fetchedProduct.sizes[0])
      dispatch(setCurrentVariant({id: fetchedProduct._id, size: fetchedProduct.sizes[0]}))
    } catch (error) {
      console.error("Error fetching product info:", error);
    } finally {
      setIsLoading(false);
    }
  };
 
  // Throttle function
  function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return fn(...args);
    };
  }

  const scrollToImage = useCallback(
    throttle((index) => {
      const imageElement = imageRefs.current[index];
      if (imageElement) {
        const container = imageRefs.current[0]?.parentElement;
        const offsetTop = imageElement?.offsetTop - container?.offsetTop;
        container?.scrollTo({ top: offsetTop, behavior: "smooth" });
        setCurrentIndex(index);
      }
    }, 300),
    []
  );



  const handleUp = () => {
    if (currentIndex > 0) {
      scrollToImage(currentIndex - 1);
    }
  };

  const handleDown = () => {
    if (currentIndex < imageRefs.current.length - 1) {
      scrollToImage(currentIndex + 1);
    }
  };

  useEffect(() => {
    fetchProductInfo(params.id);
  }, [params.id]);

  useEffect(() => {
    const camefrompage = query.get("camefrompage");
    if (camefrompage === "collection") {
      const collectionId = query.get("id");
      const title = query.get("title");
      setCameFrom({ page: title, link: `/collection?id=${collectionId}` });
    } else {
      setCameFrom({ page: camefrompage, link: `/${camefrompage}` });
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className=" flex flex-col bg-[#F7F7F7] dark:bg-black dark:text-[#ffff]  font-antikor xl-h-screen xl:max-h-screen lg:overflow-hidden">
          <NavbarRelative />

          <div className="mt-[74px]  flex flex-col gap-4 items-center justify-center xl:items-start xl:justify-center xl:flex-row dark:bg-black xl:!p-2 p-2 ">
            {/* breadcrumb  */}
            <div className="md:w-3/4 flex xl:hidden text-sm gap-4 font-outfit w-full ">
              <Link className="underline flex items-center gap-3" to="/">
                Home <img src="/icons/leftTriangleIcon.svg" alt="" />
              </Link>
              <Link
                to={cameFrom.link}
                className="underline whitespace-nowrap flex items-center gap-3"
              >
                {cameFrom.page} <img src="/icons/leftTriangleIcon.svg" alt="" />
              </Link>
              <Link className="text-[#656565] whitespace-nowrap overflow-hidden text-ellipsis ">
                {product.title}
              </Link>
            </div>

            <ImageGallery
              images={product.images}
              currentIndex={currentIndex}
              handleUp={handleUp}
              handleDown={handleDown}
              scrollToImage={scrollToImage}
              imageRefs={imageRefs}
            />
            <div className="xl:w-2/5 md:w-3/4 flex flex-col gap-8 p-4    !pb-12 !px-8 xl:overflow-auto xl:h-screen xl:!pb-36 scrollbar-hide ">
              <DetailSection
                title={product.title}
                descriptionHtml={product.description}
                cameFrom={cameFrom}
                price={product.price}
              />


              <SizeSelector
                defaultSize={currentSize}
                sizes={product.sizes}
                selectSize={(size)=>{setCurrentSize(size); alert(size);}}
                />

              <ActionButtons />
          
              <img src="/dividers/star_divider.svg" alt="" />
            
            </div>
          </div>
        </div>
      )}

  
    </>
  );
}
