import React from "react";
import { Stack, Link } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";

import Accordion from "@/components/ui/Accordion";
import AccordionItem from "@/components/ui/AccordionItem";
import Button from "@/components/ui/Button/index";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const customerServiceMenus = [
    { id: 1, href: "/contact-us", text: "Contact Us" },
    { id: 2, href: "/track-order", text: "Track Your Order" },
    { id: 3, href: "/return-order", text: "Return Your Order" },
    { id: 4, href: "/shipping-returns", text: "Shipping & Returns" },
    { id: 5, href: "/order-payment", text: "Orders & Payments" },
    { id: 6, href: "/term-condition", text: "Terms & Conditions" },
    { id: 7, href: "/privacy-policy", text: "Privacy Policy" },
    { id: 8, href: "/cookie-policy", text: "Cookie Policy" },
    { id: 9, href: "/cookie-preferences", text: "Cookie Preferences" },
    { id: 10, href: "/dop", text: "DPO" },
    { id: 11, href: "/eyewear-certificates", text: "Eyewear Certificates" },
    { id: 12, href: "/faqs", text: "FAQs" },
  ];
  const aboutMenus = [
    { id: 1, href: "/about", text: "About" },
    { id: 2, href: "/store-locator", text: "Store Locator" },
  ];
  const socialMenus = [
    { id: 1, href: "/instagram", text: "Inatagram" },
    { id: 2, href: "/weibo", text: "Weibo" },
    { id: 3, href: "/wechat", text: "Wechat" },
  ];
  const countryMenus = [
    {
      id: 1,
      countryhref: "/bangladesh",
      countrytext: "Bangladesh",
      currencyhref: "/change",
      currencytext: "Change",
    },
    {
      id: 2,
      countryhref: "/india",
      countrytext: "india",
      currencyhref: "/change",
      currencytext: "Change",
    },
  ];

  return (
    <div className="mt-10">
      <div className="grid  lg:grid-rows-none lg:grid-cols-2 gap-2 bg-black text-white p-4 pt-8 lg:p-6 ">
        {/* Short Menu Section  */}
        <div className="order-2 m-auto lg:order-1">
          <div className="grid gap-2 ">
            <div className="hidden lg:grid grid-cols-3 gap-3 mb-8 ">
              {/* Customer Service  */}
              <div>
                <h3 className="font-helvetica text-[13px] uppercase mb-2">
                  Customer Service
                </h3>
                <div>
                  <ul className="uppercase font-semibold">
                    {customerServiceMenus.map((menu) => (
                      <li
                        key={"customer_service_01_" + menu.id}
                        className="py-3 text-[15px]"
                      >
                        <NavLink
                          className="hover:text-[#535353]"
                          to={"customer-service" + menu.href}
                        >
                          {menu.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Discover Palm Angels  */}
              <div>
                <div className="grid grid-rows-2 gap-2">
                  <div>
                    <h3 className="font-helvetica text-[13px] uppercase mb-2">
                      Discover Palm Angels
                    </h3>
                    <ul className="uppercase font-semibold">
                      {aboutMenus.map((menu) => (
                        <li
                          key={"about_menu_01_" + menu.id}
                          className="py-3 text-[15px]"
                        >
                          <Link
                            className="hover:text-[#535353]"
                            href={menu.href}
                          >
                            {menu.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="block md:hidden">
                    <div className="grid grid-rows-2 gap-2">
                      <div>
                        <h3 className="font-helvetica text-[13px] uppercase mb-2">
                          Country / Region / Currency:
                        </h3>
                        <ul className="uppercase font-semibold">
                          {countryMenus.map((menu) => (
                            <li
                              key={"country_menu_01_" + menu.id}
                              className="py-3 text-[15px]"
                            >
                              <Link
                                className="mr-2 hover:text-[#535353]"
                                href={menu.countryhref}
                              >
                                {menu.countrytext} / $
                              </Link>
                              <Link
                                className="hover:text-[#535353]"
                                href={menu.currencyhref}
                              >
                                {menu.currencytext}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-helvetica text-[13px] uppercase mb-2">
                          Follow Us
                        </h3>

                        <div>
                          <ul className="uppercase font-semibold">
                            {socialMenus.map((menu) => (
                              <li
                                key={"social_menu_01_" + menu.id}
                                className="py-3 text-[15px]"
                              >
                                <Link
                                  className="mr-2 hover:text-[#535353]"
                                  href={menu.href}
                                >
                                  {menu.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Country / Region / Currency  */}
              <div>
                <div className="grid grid-rows-2 gap-2">
                  <div>
                    <h3 className="font-helvetica text-[13px] uppercase mb-2">
                      Country / Region / Currency:
                    </h3>

                    <div>
                      <ul className="uppercase font-semibold">
                        {countryMenus.map((menu) => (
                          <li
                            key={"country_menu_02_" + menu.id}
                            className="py-3 text-[15px]"
                          >
                            <Link
                              className="mr-2 hover:text-[#535353]"
                              href={menu.countryhref}
                            >
                              {menu.countrytext} / $
                            </Link>
                            <Link
                              className="hover:text-[#535353]"
                              href={menu.currencyhref}
                            >
                              {menu.currencytext}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-helvetica text-[13px] uppercase mb-2">
                      Follow Us
                    </h3>

                    <div>
                      <ul className="uppercase font-semibold">
                        {socialMenus.map((menu) => (
                          <li
                            key={"social_menu_02_" + menu.id}
                            className="py-3 text-[15px]"
                          >
                            <Link
                              className="mr-2 hover:text-[#535353]"
                              href={menu.href}
                            >
                              {menu.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 lg:hidden">
              <Accordion>
                <AccordionItem
                  className="text-base hover:text-white "
                  borderStyle="border-none"
                  title="Customer Service"
                >
                  <div>
                    <ul className="uppercase font-semibold">
                      {customerServiceMenus.map((menu) => (
                        <li
                          key={"customer_service_02_" + menu.id}
                          className="py-3 text-[15px]"
                        >
                          <NavLink
                            className="hover:text-[#535353]"
                            to={"customer-service" + menu.href}
                          >
                            {menu.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  className=" text-[#838383] text-base hover:text-white"
                  borderStyle="border-none"
                  title="Discover Palm Angels"
                >
                  <div>
                    <ul className="uppercase font-semibold">
                      {aboutMenus.map((menu) => (
                        <li
                          key={"about_menu_02_" + menu.id}
                          className="py-3 text-[15px]"
                        >
                          <Link
                            className="hover:text-[#535353]"
                            href={menu.href}
                          >
                            {menu.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  className=" text-[#838383] text-base hover:text-white"
                  borderStyle="border-none"
                  title="Follow Us"
                >
                  <div>
                    <ul className="uppercase font-semibold">
                      {socialMenus.map((menu) => (
                        <li
                          key={"social_menu_03" + menu.id}
                          className="py-3 text-[15px]"
                        >
                          <Link
                            className="mr-2 hover:text-[#535353]"
                            href={menu.href}
                          >
                            {menu.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionItem>
              </Accordion>
              <Accordion>
                <AccordionItem
                  className=" text-[#838383] text-base hover:text-white"
                  borderStyle="border-none"
                  title="Country / Region / Currency:"
                >
                  <div>
                    <ul className="uppercase font-semibold">
                      {countryMenus.map((menu) => (
                        <li
                          key={"country_menu_03_" + menu.id}
                          className="py-3 text-[15px]"
                        >
                          <Link
                            className="mr-2 hover:text-[#535353]"
                            href={menu.countryhref}
                          >
                            {menu.countrytext} / $
                          </Link>
                          <Link
                            className="hover:text-[#535353]"
                            href={menu.currencyhref}
                          >
                            {menu.currencytext}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>
            {/* Copyright section  */}
            <div className="text-sm md:text-base ">
              ©2023 Palm Angels. All Rights Reserved. Company Subject to
              Management and Coordination by New Guards Group Holding S.p.A,
              Pursuant to Art. 2497 and Following of the Italian Civil Code.
              Venice SRL | Via Filippo Turati, 12 | 20121 Milano | REA
              MI-2056611 | P.IVA 08927120967 | venicesrl@pec.net Share Capital
              Declared on the Form Used to File the List of Shareholders:
              €10,000.00 | Sole Shareholder
            </div>
          </div>
        </div>

        {/* Form Section  */}
        <div className="order-1  lg:order-2 ">
          <h3 className="uppercase font-extrabold text-sm">
            Subscribe to Our Newsletter
          </h3>
          <p className="font-helvetica uppercase text-[13px] my-2 tracking-wide leading-6">
            Don't miss out on the latest news, promotions and exclusive offers.
          </p>

          <form action="" method="post" className="my-4">
            <label htmlFor="email" className="flex justify-between py-2">
              <p className="font-helvetica uppercase text-[13px]">
                Email Address*
              </p>
              <p className="font-helvetica uppercase text-[13px]">*Required</p>
            </label>
            <input
              type="email"
              name="subscribeEmail"
              id="subscribeEmail"
              className="w-full border bg-black py-3 px-2 focus:outline-none font-helvetica text-[13px] tracking-wider"
            />
            <p className="text-xs font-semibold my-3 text-red-600 font-helvetica">
              Please enter your email address
            </p>
            <div className="my-8">
              <h3 className="font-helvetica uppercase text-[13px] my-2 tracking-wide">
                Are you interested in:
              </h3>
              <div className="flex flex-row gap-10">
                <label className="text-sm uppercase">
                  <input type="checkbox" />
                  Womenswear
                </label>

                <label className="text-sm uppercase">
                  <input type="checkbox" />
                  Menswear
                </label>
              </div>
            </div>

            <p className="font-helvetica uppercase text-[13px] leading-6">
              I have read the
              <a
                className="underline font-helvetica uppercase text-[13px] mx-1 leading-6"
                href="/en-bd/policy-feed/privacy-and-cookies-policy"
              >
                Privacy Policy
              </a>
              and I consent the processing of my personal data for marketing
              purposes. Opt out at any time by clicking{" "}
              <em className=" font-helvetica uppercase text-[13px] mx-1 tracking-wider leading-6">
                Unsubscribe
              </em>
              at the bottom of any of our emails.
            </p>

            <div className="w-full">
              <Button
                type="submit"
                className="bg-white text-black hover:bg-black border-white hover:text-white mx-0 mt-4"
              >
                Sing Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
