import {
  ProductCard,
  Banner,
  BannerCards,
  ProductSlider,
} from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useMediaQuery } from "react-responsive";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import ProductSingleCard from "../ui/ProductSingleCard";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [aladdinProducts, setAladdinProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async (query = "") => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/categories" + query
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setCategories(result.data);
    console.log(latestProducts);
  };
  const fetchProducts = async (query = "") => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/products" + query
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setLatestProducts(result.data);
    console.log(latestProducts);
  };

  const fetchDiscountedProducts = async (query = "") => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/products/discounted" + query
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setDiscountedProducts(result.data);
    console.log(latestProducts);
  };

  const fetchAladdinProducts = async (query = "") => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/products" + query
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setAladdinProducts(result.data);
    console.log(latestProducts);
  };

  useEffect(() => {
    fetchProducts("?limit=6&sort=createdAt&order=desc");
    fetchAladdinProducts("?categories=bottles");
    fetchCategories("?limit=6&sort=createdAt&order=desc");
    fetchDiscountedProducts("?limit=6&sort=createdAt&order=desc&discount=20");
  }, []);

  const imagesHero = [
    {
      imgtitle: "Cosmetics",
      alt: "We have a great deal of 20% off",
      img: "https://img.freepik.com/free-vector/beauty-skin-care-product-banner_33099-2057.jpg?w=1380&t=st=1713876814~exp=1713877414~hmac=395a078e31a05e310ff95ad51404708c0fe998f289327b67767dfb86fadfe388",
    },
    {
      imgtitle: "Premium Weihrauch",
      alt: "100% Pure",
      img: "https://cdn.dribbble.com/users/4201251/screenshots/19307846/media/cae33cf5baeb98e9814e92577a13d052.jpg",
    },
  ];

  const categoriez = [
    {
      categoryName: "Smart Watches",
      categoryImage:
        "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
      link: `/shop?categories=bottles`,
    },
    {
      categoryName: "Casual Shoes",
      categoryImage:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: `/category/categoryName2`,
    },
    {
      categoryName: "Women Trousers",
      categoryImage:
        "https://images.unsplash.com/photo-1598913870097-4281516c3d21?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: `/category/categoryName3`,
    },
    {
      categoryName: "Hoodie",
      categoryImage:
        "https://images.unsplash.com/photo-1609873814058-a8928924184a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: `/category/categoryName4`,
    },
  ];

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1280px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <>
      {/* HERO SECTION  */}
      <div className="w-full h-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-[22rem] md:h-[34rem]">
            {imagesHero.map((imageObj, index) => (
              <CarouselItem key={index}>
                <div className="h-72 md:h-[32rem]">
                  <Card className="h-full w-full flex items-center justify-center relative">
                    <CardContent className="w-full h-full p-0 flex justify-center">
                      <img
                        src={imageObj.img}
                        alt={imageObj.alt}
                        className="rounded-lg h-full w-full !object-cover object-center"
                      />
                    </CardContent>
                    <span className="w-[300px] text-center absolute text-white bottom-0 translate-y-6 text-lg md:text-2xl bg-black/75 !rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 px-10 py-2">
                      {imageObj.imgtitle}
                    </span>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* HERO END SECTION  */}

      {/* <section>
        <BannerCards
          leftLink="/oneRout"
          rightLink="/twoRout"
          leftText="Left"
          leftImage="./src/assets/img/1.webp"
          rightImage="./src/assets/img/2.webp"
          rightText="Right"
        />
      </section> */}

      {/* <section>
        <Banner
          link={"href/index/"}
          image={"./src/assets/img/3.webp"}
          leftBtnText={"Left"}
          rightBtnText={"Right"}
        />
      </section> */}

      <section className="max-w-screen py-10 m-0 my-20">
        <div className="relative flex items-center justify-end px-10 select-none">
          <h2 className="absolute text-[#c4c4c4] -top-2 left-10 md:-top-6 text-3xl md:text-6xl font-bold font-poppins tracking-tight">
            Categories
          </h2>
          <button
            className={`${categories.length < 7 ? "opacity-0" : "opacity-100"}`}
          >
            View All
          </button>
        </div>
        <div
          class={`px-10 grid grid-cols-2 md:grid-cols-4 gap-4 relative top-5`}
        >
          {categories.map((category, index) => (
            <Link
              to={"shop/" + category.slug}
              key={category.slug}
              className={`${
                isDesktopOrLaptop && categories.length < 3
                  ? "md:col-span-2"
                  : isDesktopOrLaptop && categories.length < 4 && index === 0
                  ? "md:col-span-2"
                  : isDesktopOrLaptop && categories.length < 5
                  ? "md:col-span-1"
                  : (isDesktopOrLaptop && categories.length < 5) ||
                    index === 0 ||
                    index === 4
                  ? "md:col-span-2"
                  : "md:col-span-1"
              } max-h-80 w-full group`}
            >
              <div className="h-full w-full max-h-[250px] md:max-h-[600px] relative rounded-lg overflow-hidden">
                <img
                  className="h-full w-full max-w-full rounded-lg object-cover object-center group-hover:scale-110 transition-all duration-500"
                  src={category.image}
                  alt={category.name}
                />
                <div class="absolute h-full w-full bg-black/40 flex items-center justify-center -bottom-20 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-3xl font-poppins font-bold text-white">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {isDesktopOrLaptop && categories.length === 5 && (
            <Link
              to={"shop"}
              className="rounded-lg text-black hover:text-white bg-[#eeeeee] hover:bg-[#1f1f1f] transition-all flex items-center justify-center cursor-pointer"
            >
              <span className="text-2xl select-none">Explore More</span>
            </Link>
          )}
        </div>
      </section>
      <section className="w-full px-10">
        <h2 className="font-poppins text-3xl md:text-4xl tracking-tight font-bold">
          Latest Products
        </h2>
        <Separator className="mb-6" />
        <Carousel
          className="w-full mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {latestProducts.map((product) => {
              return (
                <CarouselItem
                  key={product._id}
                  className="pl-1 h-96 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex h-[330px] justify-center p-4">
                        <ProductSingleCard
                          key={product._id}
                          link={"/shopping/-" + product._id}
                          id={product._id}
                          discount={product.discountPrice}
                          title={product.title}
                          price={product.price}
                          gallery={product.images}
                          sizes={product.sizes}
                          colors={product.colors}
                          description={product.description}
                          stock={product.stock}
                          compact
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="w-full px-10">
        <h2 className="font-poppins text-3xl md:text-4xl tracking-tight font-bold">
          Brands of the Week - Up to 20% off
        </h2>
        <Separator className="mb-6" />
        <Carousel
          className="w-full mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {discountedProducts.map((product) => {
              return (
                <CarouselItem
                  key={product._id}
                  className="pl-1 h-96 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex h-[330px] justify-center p-4">
                        <ProductSingleCard
                          key={product._id}
                          link={"/shopping/-" + product._id}
                          id={product._id}
                          discount={product.discountPrice}
                          title={product.title}
                          price={product.price}
                          gallery={product.images}
                          sizes={product.sizes}
                          colors={product.colors}
                          description={product.description}
                          stock={product.stock}
                          compact
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className="w-full px-10">
        <h2 className="font-poppins text-3xl md:text-4xl tracking-tight font-bold">
          Top Aladdin Bottles
        </h2>
        <Separator className="mb-6" />
        <Carousel
          className="w-full mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1">
            {aladdinProducts.map((product) => {
              return (
                <CarouselItem
                  key={product._id}
                  className="pl-1 h-96 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex h-[330px] justify-center p-4">
                        <ProductSingleCard
                          key={product._id}
                          link={"/shopping/-" + product._id}
                          id={product._id}
                          discount={product.discountPrice}
                          title={product.title}
                          price={product.price}
                          gallery={product.images}
                          sizes={product.sizes}
                          colors={product.colors}
                          description={product.description}
                          stock={product.stock}
                          compact
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default Home;
