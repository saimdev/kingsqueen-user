import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SuitHeart, HeartFill } from "react-bootstrap-icons";
import useWishlist from "@/components/hooks/useWishlist";
const imagePath = import.meta.env.VITE_API_URL + "/images/products/";

const ProductSingleCard = ({
  id,
  title,
  description,
  link,
  gallery,
  price,
  discount,
  offerPrice,
  sizes,
  colors,
  stock,
  compact = false,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const { wishlist, addWishlist, removeWishlist, isInWishlist } = useWishlist();

  const discountPercent = ((price - discount) / price) * 100;

  useEffect(() => {
    setIsWishlist(isInWishlist(id));
  }, [wishlist]);

  const wishlistClickHandler = () => {
    const productId = id;
    if (!isInWishlist(productId)) {
      addWishlist({
        id: productId,
        title,
        price,
        image: gallery[0],
        colors,
        sizes,
        selectedSize: "",
        selectedColor: "",
      });
      return;
    }

    removeWishlist(productId);
  };
  return (
    <div
      className={`flex flex-col w-full items-between justify-between relative`}
    >
      <Link
        to={link}
        className={`${
          stock === 0
            ? "bg-white/60 h-full w-full absolute top-0 z-40 select-none"
            : "hidden"
        }`}
      >
        Out of stock
      </Link>

      <Link
        to={link}
        className="overflow-hidden !h-[300px] w-full mx-auto mb-4"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative" }}
      >
        <img
          src={
            gallery.length > 1 && hover
              ? imagePath + gallery[1]
              : imagePath + gallery[0]
          }
          alt=""
          style={{
            transition: "transform .5s ease",
            transform: hover ? "scale(1.05)" : "scale(1)",
          }}
          className="h-full w-full overflow-hidden object-contain"
        />
      </Link>

      {discount > 0 && (
        <Link to={link} className="absolute top-0 left-0">
          {discountPercent.toFixed(0)}% off
        </Link>
      )}
      <span
        className="absolute text-lg top-0 right-0 cursor-pointer hover:text-primary"
        data-id={id}
        onClick={wishlistClickHandler}
      >
        {isWishlist ? (
          <HeartFill className="text-red-500" />
        ) : (
          <SuitHeart className="text-primary text-red-500" />
        )}
      </span>
      <Link
        to={link}
        className="flex flex-col justify-between w-full h-full overflow-hidden"
      >
        <div>
          <p className="text-center font-bold text-md w-full select-none">
            {title}
          </p>
          <p className="text-start text-md w-full select-none line-clamp-3">
            {description}
          </p>
        </div>
        <div className="select-none content-end flex items-center justify-between text-sm font-bold w-full">
          {discount ? (
            <span className="text-red-600 text-2xl">${discount}</span>
          ) : (
            ""
          )}
          <span className={`text-lg ${discount ? "line-through" : ""}`}>
            ${price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductSingleCard;
