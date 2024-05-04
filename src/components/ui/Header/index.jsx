import { Notice } from "@/components/ui";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Bag, Search, HeartFill } from "react-bootstrap-icons";
import { slide as BugerMenu } from "react-burger-menu";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/context/UserContext";
import useBag from "@/components/hooks/useBag";
import useWishlist from "@/components/hooks/useWishlist";
import useAuth from "@/components/hooks/useAuth";
import Input from "../FormControls/Input";

const Header = () => {
  const mainMenu = [
    {
      id: 1,
      name: "Sale",
      link: "/shop",
    },
    {
      id: 2,
      name: "New In",
      link: "/shop",
    },
    {
      id: 3,
      name: "Man",
      link: "/shop",
    },
    {
      id: 4,
      name: "Woman",
      link: "/shop",
    },
    {
      id: 5,
      name: "Eyewear",
      link: "/shop",
    },
    {
      id: 6,
      name: "Kids",
      link: "/shop",
    },
  ];

  const [stickyClass, setStickyClass] = useState("relative");
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchStatus, setSearchStatus] = useState("idle");
  const [searchPopupOpen, setSearchPopupOpen] = useState(false);

  const auth = useAuth();
  const { bag } = useBag();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.addEventListener('scroll', stickNavbar);

  //   return () => {
  //     window.removeEventListener('scroll', stickNavbar);
  //   };
  // }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 150
        ? setStickyClass("fixed top-0 left-0 z-50")
        : setStickyClass("relative");
    }
  };

  const handleSearch = async (event) => {
    const search = event.target.value;

    // hit search api after 300ms
    let timer;
    if (search.length > 0) {
      setSearchStatus("loading");
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/admin/products?search=" + search
        );
        const result = await response.json();
        console.log(result.data);
        setSearchProducts(result.data);
        setSearchStatus("done");
      }, 500);
    }
  };

  const handleSearchPopup = (e) => {
    setSearchPopupOpen(!searchPopupOpen);

    if (searchPopupOpen) {
      setSearchStatus("idle");
      setSearchProducts([]);

      const productId = e.target.dataset.id;
      if (productId) {
        window.location.href = "/shopping/" + productId;
      }
    }
  };

  return (
    <header className={`w-full ${stickyClass} z-50`}>
      {/* Notice */}
      <Notice
        status="info"
        noticeBodyClass={"bg-primary"}
        noticeTextClass={"text-white"}
      >
        UP TO 50% OFF ON SELECTED STYLES.
      </Notice>

      <div className="pageContent flex justify-between py-2 border-b bg-white">
        {/* Mobile Menu */}
        <div className="relative lg:hidden">
          <BugerMenu customBurgerIcon={<HamburgerIcon />}>
            {mainMenu.map((item) => {
              return (
                <NavLink
                  key={"burger_" + item.id}
                  className={`uppercase text-base font-semibold hover:text-primary`}
                  to={item.link}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </BugerMenu>
        </div>

        <div className="logo text-2xl font-bold">
          <NavLink to={"/"}>King & Queen</NavLink>
        </div>
        <div className="middleMenu lg:flex gap-6 items-center hidden">
          {mainMenu.map((item) => {
            return (
              <NavLink
                key={"header_" + item.id}
                className={`uppercase text-base font-semibold hover:text-primary`}
                to={item.link}
              >
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div className="rightMenu hidden lg:flex gap-6 items-center">
          <Popover isLazy isOpen={searchPopupOpen}>
            <PopoverTrigger>
              <span
                onClick={handleSearchPopup}
                variant="link"
                className="uppercase text-base font-semibold cursor-pointer hover:text-primary p-0"
              >
                Search
              </span>
            </PopoverTrigger>
            <PopoverContent className="bg-white p-4 border w-[400px]">
              <PopoverHeader fontWeight="semibold">
                Search product
              </PopoverHeader>
              <PopoverCloseButton
                onClick={handleSearchPopup}
                className="absolute right-4 top-5"
              />
              <PopoverBody>
                <Input
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search"
                />

                {searchStatus == "loading" ? (
                  <p className="mt-4">Loading...</p>
                ) : (
                  searchStatus == "done" &&
                  (searchProducts.length > 0 ? (
                    <ul className="mt-4 flex flex-col gap-2">
                      {searchProducts.map((product) => {
                        return (
                          <li key={product._id}>
                            <span
                              className="cursor-pointer"
                              onClick={handleSearchPopup}
                              data-id={product._id}
                            >
                              {product.title}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="mt-4">No product found</p>
                  ))
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              className={`uppercase text-base font-semibold hover:text-primary z-[99] p-0`}
            >
              EN
            </MenuButton>
            <MenuList
              gap={4}
              className="bg-white z-[99] px-6 py-8 flex flex-col gap-6 border"
            >
              <h3 className="text-xl font-bold uppercase mb-4">
                Select Language
              </h3>
              <MenuItem>
                <span className="uppercase underline">English</span>
              </MenuItem>
              <MenuItem>
                <span className="uppercase underline">Italiano</span>
              </MenuItem>
            </MenuList>
          </Menu>

          {auth.isAuthenticated() ? (
            <NavLink
              to={"/account/account-details"}
              className={`uppercase text-base font-semibold hover:text-primary`}
            >
              Account
            </NavLink>
          ) : (
            <NavLink
              to={"/login"}
              className={`uppercase text-base font-semibold hover:text-primary`}
            >
              Login
            </NavLink>
          )}

          <NavLink
            to={"/wishlist"}
            className={`uppercase text-base font-semibold hover:text-primary`}
          >
            Wishlist (<span>{wishlist.length}</span>)
          </NavLink>

          <NavLink
            to={"/bag"}
            className={`uppercase text-base font-semibold hover:text-primary`}
          >
            Bag (<span>{bag.items.length}</span>)
          </NavLink>
        </div>

        <div className="mobileRightMenu lg:hidden flex gap-4 items-center">
          <NavLink className={"flex items-center gap-2"}>
            <Popover isLazy isOpen={searchPopupOpen}>
              <PopoverTrigger>
                <span
                  onClick={handleSearchPopup}
                  variant="link"
                  className="uppercase text-base font-semibold cursor-pointer hover:text-primary p-0"
                >
                  <Search className="text-xl" />
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white p-4 mt-1 border w-screen">
                <PopoverHeader fontWeight="semibold">
                  Search product
                </PopoverHeader>
                <PopoverCloseButton
                  onClick={handleSearchPopup}
                  className="absolute right-10 top-4"
                />
                <PopoverBody>
                  <Input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                  />

                  {searchStatus == "loading" ? (
                    <p className="mt-4">Loading...</p>
                  ) : (
                    searchStatus == "done" &&
                    (searchProducts.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-2">
                        {searchProducts.map((product) => {
                          return (
                            <li key={product._id}>
                              <span
                                className="cursor-pointer"
                                onClick={handleSearchPopup}
                                data-id={product._id}
                              >
                                {product.title}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-4">No product found</p>
                    ))
                  )}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </NavLink>
          <NavLink
            to={"/wishlist"}
            className={"flex items-center gap-2 relative"}
          >
            <HeartFill className="text-xl" />
            <span className="rounded-full bg-[#1171f8] text-xs text-white p-2 h-4 w-4 flex items-center justify-center absolute -bottom-2 -right-2">{`${wishlist.length}`}</span>
          </NavLink>

          <NavLink to={"/bag"} className={"flex items-center gap-2 relative"}>
            <Bag className="text-xl" />
            <span className="rounded-full bg-[#085acc] text-xs text-white p-2 h-4 w-4 flex items-center justify-center absolute -bottom-2 -right-2">{`${bag.items.length}`}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
