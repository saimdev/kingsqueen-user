import React, { useEffect, useState } from "react";
import SimpleSlider from "../SimpleSlider";
import { Link, NavLink } from "react-router-dom";
import { Star, StarFill, SuitHeart } from "react-bootstrap-icons";
import useWishlist from "@/components/hooks/useWishlist";

const imagePath = import.meta.env.VITE_API_URL + "/images/products/";

const ProductCard = ({
  id,
  title,
  link,
  gallery,
  price,
  disscount,
  offerPrice,
  sizes,
  colors,
  compact = false,
  className,
}) => {
  const [hover, setHover] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const { wishlist, addWishlist, removeWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    setIsWishlist(isInWishlist(id));
  }, [wishlist]);

  const hoverHandler = () => {
    setHover(!hover);
  };

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
    <div className={`productCard relative flex flex-col ${className}`}>
      <div
        className="cardTop"
        onMouseEnter={hoverHandler}
        onMouseLeave={hoverHandler}
      >
        <div className={`layerOne ${hover ? "hidden" : ""}`}>
          <NavLink to={link}>
            <img className="w-full" src={imagePath + gallery[0]} alt={title} />
          </NavLink>
        </div>
        <div className={`layerTwo w-full h-full ${hover ? "" : "hidden"}`}>
          {compact ? (
            <NavLink to={link}>
              <img
                className="w-full"
                src={imagePath + gallery[1]}
                alt={title}
              />
            </NavLink>
          ) : (
            <SimpleSlider>
              {gallery.map((image, index) => (
                <img key={index} src={imagePath + image} alt={title} />
              ))}
            </SimpleSlider>
          )}
        </div>
      </div>
      <NavLink to={link}>
        <div className="cardBottom text-center py-2">
          <h1 className="text-sm font-bold">{title}</h1>
          <div className="price text-sm font-bold">
            <div className="flex gap-1.5 justify-center my-2">
              <span className={`${disscount ? "line-through" : ""}`}>
                ${price}
              </span>
              {disscount ? <span>-{disscount}</span> : ""}
            </div>
            {disscount ? (
              <span className="text-red-500">${offerPrice}</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </NavLink>

      <span
        className="absolute text-lg top-2 right-2 p-2 cursor-pointer hover:text-primary"
        data-id={id}
        onClick={wishlistClickHandler}
      >
        {isWishlist ? <StarFill className="text-primary" /> : <Star />}
      </span>
    </div>
  );
};

export default ProductCard;
