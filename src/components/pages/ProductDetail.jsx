import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram, Circle } from "react-bootstrap-icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Accordion, AccordionItem, Button, SmallButton } from "../ui";
import useWishlist from "../hooks/useWishlist";
import { useNavigate, useParams } from "react-router-dom";
import useBag from "../hooks/useBag";

const ProductDetail = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { addWishlist, isInWishlist } = useWishlist();
  const { addToBag, isInBag } = useBag();
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [attributeErrors, setAttributeErrors] = useState({
    color: false,
    size: false,
  });

  const navigate = useNavigate();
  const params = useParams();

  const fetchProduct = async (id) => {
    console.log(id);
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/admin/products/" + id
    );
    if (res.status === 404) return navigate("/404");

    const result = await res.json();
    setProduct(result.data);
  };

  useEffect(() => {
    const { slug } = params;
    const id = slug.split("-").pop();

    fetchProduct(id);
  }, []);

  const handleWishlistClick = (event) => {
    if (!isInWishlist(product._id)) {
      addWishlist({
        id: product._id,
        title: product.title,
        price:
          product.discountPrice > 0 ? product.discountPrice : product.price,
        image: product.images[0],
        selectedColor,
        selectedSize,
        sizes: product.sizes,
        colors: product.colors,
      });
      return;
    }
  };

  const handleAddToBag = (event) => {
    if (!selectedColor || !selectedSize) {
      setAttributeErrors({
        color: !selectedColor,
        size: !selectedSize,
      });
      return;
    }

    addToBag({
      id: product._id,
      title: product.title,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image: product.images[0],
      color: selectedColor,
      colors: product.colors,
      selectedSize: selectedSize,
      sizes: product.sizes,
      stock: product.stock,
      qty: 1,
    });
  };

  const handleColorClick = (event) => {
    const color = event.target.dataset.value;
    setSelectedColor(color);
    setAttributeErrors((prev) => ({ ...prev, color: false }));
  };

  const handleSizeClick = (event) => {
    const size = event.target.dataset.value;
    setSelectedSize(size);
    setAttributeErrors((prev) => ({ ...prev, size: false }));
  };

  const discountPercentage = product.price - product.discountPrice;

  const sliderElements = product.images?.map((image, index) => (
    <SwiperSlide key={index} className="mx-auto rounded-lg overflow-hidden">
      <img
        src={import.meta.env.VITE_API_URL + "/images/products/" + image}
        className="!w-[65vh] mx-auto aspect-square object-contain"
      />
    </SwiperSlide>
  ));

  return (
    <>
      <div className="flex justify-between py-2 pageContent border-b">
        <div className="breadcrumb text-sm">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/shopping/${product._id}`}>
                {product.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2">
          <div className="p-4 h-full !max-h-[500px] grid grid-cols-6">
            <div className="my-auto col-span-1">
              <Swiper
                onSwiper={setThumbsSwiper}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productGalleryThumbs"
              >
                {sliderElements}
              </Swiper>
            </div>
            <div className="col-span-5">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  "--swiper-navigation-size": "20px",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productGallery"
              >
                {sliderElements}
              </Swiper>
            </div>
          </div>
        </div>

        <div className={`py-6 !px-10 max-lg:px-10 max-md:px-0 w-full md:w-1/2`}>
          {/* Title */}
          <div className="title text-start py-2">
            <h1 className="text-2xl font-bold tracking-tight uppercase">
              {product.title ?? ""}
            </h1>
            <div className="price text-lg font-bold">
              <div className="flex gap-1.5 justify-start my-2">
                {product.discountPrice > 0 && (
                  <div>
                    <span className="text-3xl">${product.discountPrice}</span>
                    <div className="text-xs flex items-center text-red-500 relative border-2 border-red-400 w-fit px-2 rounded-full">
                      <span>{discountPercentage}% off</span>
                    </div>
                  </div>
                )}
                <span
                  className={`${
                    product.discountPrice > 0 ? "line-through" : "text-2xl"
                  }`}
                >
                  ${product.price ?? ""}
                </span>
              </div>
            </div>
          </div>

          {/* Colors */}
          {product.sizes?.length > 0 && (
            <div className="mt-4">
              <h3 className="uppercase mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors?.map((color, index) => (
                  <SmallButton
                    onClick={handleColorClick}
                    data-value={color}
                    fill={selectedColor == color}
                    key={index}
                  >
                    {color}
                  </SmallButton>
                ))}
              </div>
              {attributeErrors.color && (
                <p className="text-sm text-red-500">Select a color.</p>
              )}
            </div>
          )}

          {/* Sizes */}
          {product.colors?.length > 0 && (
            <div className="mt-4">
              <h3 className="uppercase mb-2">Size</h3>
              <div className="flex gap-2">
                {product.sizes?.map((size, index) => (
                  <SmallButton
                    onClick={handleSizeClick}
                    data-value={size}
                    fill={selectedSize == size}
                    key={index}
                  >
                    {size}
                  </SmallButton>
                ))}
              </div>
              {attributeErrors.size && (
                <p className="text-sm text-red-500">Select a size.</p>
              )}
            </div>
          )}

          {/* Cart Buttons */}
          <div className="mt-10 flex flex-col gap-4">
            {/* Add to Cart Button */}
            {isInBag(product._id) ? (
              <Button
                dark
                onClick={() => {
                  navigate("/bag");
                }}
              >
                See Your Bag
              </Button>
            ) : (
              <Button dark data-id={"1234"} onClick={handleAddToBag}>
                ADD TO BAG
              </Button>
            )}

            {/* Wishlist Button */}
            {isInWishlist(product._id) ? (
              <Button
                onClick={() => {
                  navigate("/wishlist");
                }}
              >
                See Your Wishlist
              </Button>
            ) : (
              <Button data-id={"1234"} onClick={handleWishlistClick}>
                ADD TO WIHSHLIST
              </Button>
            )}
          </div>

          {/* Description */}
          <div className="mt-10">
            <Accordion>
              <AccordionItem title={"Description"}>
                {product.description ?? ""}
              </AccordionItem>
              <AccordionItem title={"Shipping and Returns"}>
                ALL ORDERS ARE PROCESSED WITHIN ONE WORKING DAY. - ONE SHIPPING
                FEE - FREE RETURNS WITHIN 14 DAYS (EXCLUDES CUSTOMISED PIECES)
                DELIVERY DUTIES ARE INCLUDED IN THE ITEM PRICE WHEN SHIPPING TO
                EUROPEAN UNION COUNTRIES, NEW EUROPE COUNTRIES, SWITZERLAND,
                JAPAN, SOUTH KOREA, HONG KONG SAR, CANADA, CHINA MAINLAND,
                SINGAPORE, AUSTRALIA, TAIWAN REGION, THAILAND, UNITED ARAB
                EMIRATES AND THE UNITED STATES. NEED MORE INFORMATION? READ OUR
                SHIPPING AND DELIVERY CONDITIONS. PAYMENT METHODS: WE ACCEPT ALL
                MAJOR CREDITS CARDS AS WELL AS PAYPAL AND APPLE PAY. MORE INFO
              </AccordionItem>
              <AccordionItem title={"Share"}>
                <div className="flex gap-4">
                  <SmallButton>
                    <Facebook />
                  </SmallButton>
                  <SmallButton>
                    <Twitter />
                  </SmallButton>
                  <SmallButton>
                    <Instagram />
                  </SmallButton>
                </div>
              </AccordionItem>
              <AccordionItem title="Need Help?">
                CUSTOMER SERVICE SUPPORT, INQUIRIES RELATED TO: PRICES AND
                CURRENCY, ORDER AND PREORDER PAYMENT, ORDER STATUS, SHIPMENT
                INFO, RETURN, AND EXCHANGE.
                <br />
                <br />
                WORKING HOURS MONDAY-FRIDAY 9AM - 6PM GMT/EST.
                <br />
                <br />
                NEED MORE INFORMATION? SEND US A MESSAGE.
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
