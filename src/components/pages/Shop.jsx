import {
  Accordion,
  AccordionItem,
  Pagination,
  ProductCard,
  SmallButton,
} from "@/components/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  filter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import RecursiveCheckbox from "../ui/FormControls/RecursiveCheckbox";
import ReactPaginate from "react-paginate";
import ProductSingleCard from "../ui/ProductSingleCard";
import { Card, CardContent } from "../ui/card";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [catCheckedValues, setCatCheckedValues] = useState([]);
  const [sizeCheckedValues, setSizeCheckedValues] = useState([]);
  const [colorCheckedValues, setColorCheckedValues] = useState([]);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({});

  const location = useLocation();
  const params = useParams();

  const fetchProducts = async (query = "") => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/products" + query
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    console.log(result);
    setProducts(result.data);
    setPagination(result.pagination);
  };

  const fetchCategories = async () => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/admin/categories"
    );
    const result = await response.json();

    if (!response.ok) {
      toast.error(result.message);
      return;
    }

    setCategories(result.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    // Set filters from url
    const urlSearchParams = new URLSearchParams(location.search);
    const sort = urlSearchParams.get("sort");
    const order = urlSearchParams.get("order");
    const categories = params.category
      ? params.category
      : urlSearchParams.get("categories");

    if (sort) {
      setFilters((prev) => {
        return {
          ...prev,
          sort,
          order,
        };
      });
    }

    if (categories) {
      setCatCheckedValues(categories.split("|"));
    }

    // Make breadcrumb link
  }, []);

  useEffect(() => {
    const filterKeys = Object.keys(filters);
    console.log("Filters", filters);
    if (filterKeys.length == 0) {
      setSearchParams({});
      return;
    }

    filterKeys.forEach((key) => {
      if (filters[key] !== "") {
        searchParams.set([key], filters[key]);
      } else {
        searchParams.delete([key]);
      }
    });
    setSearchParams(searchParams);
  }, [filters]);

  useEffect(() => {
    const query = searchParams.toString() ? "?" + searchParams.toString() : "";
    fetchProducts(query);
  }, [searchParams]);

  const handleSortChange = (e) => {
    let sort = e.target.value;
    let order = "desc";

    if (sort.includes("price")) {
      order = sort.split("_")[1];
      sort = "price";
    }

    setFilters((prev) => {
      return {
        ...prev,
        sort,
        order,
      };
    });
  };

  const handleCatChange = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      setCatCheckedValues((prev) => {
        return [...prev, checkbox.value];
      });
    } else if (!checkbox.checked) {
      console.log("Unchecked");
      setCatCheckedValues((prev) => {
        return prev.filter((item) => item !== checkbox.value);
      });
    }
  };

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        categories: catCheckedValues.join("|"),
      };
    });
  }, [catCheckedValues]);

  const handleSizeChange = (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      setSizeCheckedValues((prev) => {
        return [...prev, checkbox.value];
      });
    } else if (!checkbox.checked) {
      setSizeCheckedValues((prev) => {
        return prev.filter((item) => item !== checkbox.value);
      });
    }
  };

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        sizes: sizeCheckedValues.join("|"),
      };
    });
  }, [sizeCheckedValues]);

  const handleColorChange = (e) => {
    const checkbox = e.target;
    if (checkbox.checked) {
      setColorCheckedValues((prev) => {
        return [...prev, checkbox.value];
      });
    } else if (!checkbox.checked) {
      setColorCheckedValues((prev) => {
        return prev.filter((item) => item !== checkbox.value);
      });
    }
  };

  useEffect(() => {
    setFilters((prev) => {
      return {
        ...prev,
        colors: colorCheckedValues.join("|"),
      };
    });
  }, [colorCheckedValues]);

  const handlePaginationChange = (event) => {
    const selectedPage = event.selected + 1;
    setFilters((prev) => {
      return {
        ...prev,
        page: selectedPage,
      };
    });
  };

  return (
    <>
      {/* Shop Header */}
      <div className="shopHeader flex justify-between py-2 pageContent border-b">
        <div className="breadcrumb text-sm">
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Man</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="title font-bold">Man</div>

        <div className="quantity text-sm">{pagination.total ?? 0} Products</div>
      </div>

      {/* Main Section */}
      <div className="flex pageContent">
        <div className="sidebar max-md:hidden w-1/4 py-4 pr-8">
          <Accordion>
            <AccordionItem title={"Sory By"}>
              <div className="flex flex-col gap-2 uppercase">
                <div>
                  <input
                    onChange={handleSortChange}
                    type="radio"
                    name="sort"
                    id="latest"
                    value="createdAt"
                    className="mr-2"
                  />
                  <label htmlFor="latest">Latest</label>
                </div>
                <div>
                  <input
                    onChange={handleSortChange}
                    type="radio"
                    name="sort"
                    id="price_asc"
                    value="price_asc"
                    className="mr-2"
                  />
                  <label htmlFor="price_asc">Price (Low to High)</label>
                </div>
                <div>
                  <input
                    onChange={handleSortChange}
                    type="radio"
                    name="sort"
                    id="price_desc"
                    value="price_desc"
                    className="mr-2"
                  />
                  <label htmlFor="price_desc">Price (High to Low)</label>
                </div>
              </div>
            </AccordionItem>
            <AccordionItem title={"Categories"}>
              <div>
                <RecursiveCheckbox
                  data={categories}
                  catCheckedValues={catCheckedValues}
                  onChangeHandler={handleCatChange}
                />
              </div>
            </AccordionItem>
            <AccordionItem title={"Sizes"}>
              <div>
                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="xs"
                  value="xs"
                  className="mr-2"
                />
                <label htmlFor="xs">XS</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="sm"
                  value="sm"
                  className="mr-2"
                />
                <label htmlFor="sm">SM</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="md"
                  value="MD"
                  className="mr-2"
                />
                <label htmlFor="md">MD</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="lg"
                  value="lg"
                  className="mr-2"
                />
                <label htmlFor="lg">LG</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="xl"
                  value="xl"
                  className="mr-2"
                />
                <label htmlFor="xl">XL</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="xxl"
                  value="xxl"
                  className="mr-2"
                />
                <label htmlFor="xxl">XXL</label>
                <br />

                <input
                  onChange={handleSizeChange}
                  type="checkbox"
                  name="size"
                  id="xxxl"
                  value="xxxl"
                  className="mr-2"
                />
                <label htmlFor="xxxl">XXXL</label>
                <br />
              </div>
            </AccordionItem>
            <AccordionItem title={"Colors"}>
              <div>
                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="red"
                  value="red"
                  className="mr-2"
                />
                <label htmlFor="red">Red</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="blue"
                  value="blue"
                  className="mr-2"
                />
                <label htmlFor="blue">Blue</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="green"
                  value="green"
                  className="mr-2"
                />
                <label htmlFor="green">Green</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="yellow"
                  value="yellow"
                  className="mr-2"
                />
                <label htmlFor="yellow">Yellow</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="black"
                  value="black"
                  className="mr-2"
                />
                <label htmlFor="black">Black</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="white"
                  value="white"
                  className="mr-2"
                />
                <label htmlFor="white">White</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="grey"
                  value="grey"
                  className="mr-2"
                />
                <label htmlFor="grey">Grey</label>
                <br />

                <input
                  onChange={handleColorChange}
                  type="checkbox"
                  name="color"
                  id="brown"
                  value="brown"
                  className="mr-2"
                />
                <label htmlFor="brown">Brown</label>
                <br />
              </div>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-3/4 max-md:w-full flex flex-col items-center">
          <div className="products grid grid-cols-3 md:grid-cols-4 max-sm:grid-cols-2 max-xsm:grid-cols-1 gap-6 p-2">
            {products.length > 0 ? (
              products.map((product) => {
                return (
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
                );
              })
            ) : (
              <div className="text-center w-full my-10">No products found</div>
            )}
          </div>
          {products.length > 0 && (
            <div className="pagination py-6">
              <ReactPaginate
                breakLabel={"..."}
                nextLabel={"Next"}
                previousLabel={"Previous"}
                pageCount={Math.ceil(pagination.total / pagination.pageSize)}
                forcePage={pagination.current - 1}
                onPageChange={handlePaginationChange}
                marginPagesDisplayed={1}
                pageLinkClassName="px-4 py-3 border border-gray-300 rounded-sm hover:bg-gray-300"
                activeLinkClassName="bg-gray-300"
                containerClassName="flex justify-center gap-2"
                disabledLinkClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
