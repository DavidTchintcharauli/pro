"use client";
import "./Header.css";
import Link from "next/link";
import Logo from "../../../../public/images/Header Logo.webp";
import DropDown from "../DropDown/DropDown";
import { cilSun, cilMoon, cilScreenDesktop, cilSync } from "@coreui/icons";
import { useEffect, useState } from "react";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { CSpinner } from "@coreui/react";
// import AuthenticationButton from "../logoutButton/LoggoutButton";
import { useLocale } from "../providers/LanguageContext";

import LocaleChange from "../LanguageChange/LanguageChange";
import HeaderAuth from "./header-auth";

const Header = (dict) => {
  const [user, setUser] = useState(null);
  const { locale, setLocale } = useLocale();
  const [currentTheme, setCurrentTheme] = useState(cilSync);

  useEffect(() => {
    function checkTheme() {
      const systemSetting = localStorage.getItem("system");
      const theme = localStorage.getItem("theme");

      if (systemSetting === "true") {
        setCurrentTheme(cilScreenDesktop);
      } else if (systemSetting === "false") {
        setCurrentTheme(theme === "dark" ? cilMoon : cilSun);
      }
    }

    checkTheme();
  }, []);

  const themeOptions = [
    {
      label: "light",
      icon: cilSun,
      changeTheme: () => {
        localStorage.setItem("theme", "light");
        localStorage.setItem("system", false);
        setCurrentTheme(cilSun);
      },
    },
    {
      label: "dark",
      icon: cilMoon,
      changeTheme: () => {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("system", false);

        setCurrentTheme(cilMoon);
      },
    },
    {
      label: "system",
      icon: cilScreenDesktop,
      changeTheme: () => {
        localStorage.setItem("system", true);
        localStorage.removeItem("theme");

        setCurrentTheme(cilScreenDesktop);
      },
    },
  ];
  useEffect(() => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", theme ? "dark" : "light");
      localStorage.setItem("system", true);
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, []);
  const themeHandler = () => {
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };
  useEffect(() => {
    if (currentTheme !== cilScreenDesktop) return;
    const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    themeQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      themeQuery.removeEventListener("change", handleSystemThemeChange);
  }, [currentTheme]);

  const listItemStyle =
    "text-black hover:bg-gray-400 dark:hover:bg-header-hover-dark hover:rounded-3xl font-serif font-normal dark:text-yellow-500 p-5 text-center transition-header-hover-transition cursor-pointer";

  return (
    <header className="flex flex-row justify-between bg-neutral-300 dark:bg-dark-header  w-full overflow-hidden  ">
      <div className="flex gap-38  pt-5 pb-5 pr-5">
        <Link
          href={`/${locale}`}
          className="mt-4 pr-2 w-14 h-14 bg-transparent  cursor-pointer items-center"
        >
          <img src={Logo.src} alt="logo"></img>
        </Link>
        <nav className="rounded-3xl flex- flex-row  border border-solid dark:border-header-hover-dark h-20 items-center p-2  hidden sm:block">
          <ul className="gap-5 flex  list-none flex-row">
            {/* <li className={listItemStyle}>{dict.dict.Equipment}</li>
            <li className={listItemStyle}>{dict.dict.Trainers}</li> */}
            {/* <li className={listItemStyle}>{dict.dict.Certificates}</li>
            <li className={listItemStyle}>{dict.dict.Schedules}</li> */}
            <li className={`${listItemStyle} hidden l:block`}>
              {dict.dict.Locations}
            </li>
            {/* <Link href={`/${locale}/profile`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {dict.dict.Profile}
              </li>
            </Link> */}

            {user ? (
              <Link href={`/${locale}/profile`}>
                <li className={`${listItemStyle} hidden xl:block`}>
                  {dict.dict.Profile}
                </li>
              </Link>
            ) : (
              <div></div>
            )}

            {/* <Link href={`/${locale}/blog`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {dict.dict.Blog}
              </li>
            </Link> */}
            {/* <Link href={`/${locale}/products`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {dict.dict.Products}
              </li>
            </Link> */}
            <Link href={`/${locale}/product-list`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {dict.dict.Products}
              </li>
            </Link>
            {/* <Link href={`/${locale}/posts`}>
              <li className={`${listItemStyle} hidden xl:block`}>
                {dict.dict.Posts}
              </li>
            </Link> */}
            <Link href={`/${locale}/addNewProduct`}>
              <li className={`${listItemStyle} hidden xl:block`}>Add New</li>
            </Link>
            {user ? (
              <Link href={`/${locale}/cart`}>
                <li className={`${listItemStyle} hidden xl:block`}>Cart</li>
              </Link>
            ) : (
              <div></div>
            )}
            <li className=" p-5 text-center cursor-pointer"></li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row gap-2 items-center mr-5 justify-center z-10">
        <HeaderAuth user={user} setUser={setUser} />
        <LocaleChange></LocaleChange>
        <div>
          <DropDown
            content={themeOptions}
            buttonText={currentTheme}
            toggleHandler={themeHandler}
            type="Theme"
          ></DropDown>
        </div>
        {/* <div className="">
          {isLoading ? (
            <AuthenticationButton
              type="Loading"
              buttonText={"Loading"}
            ></AuthenticationButton>
          ) : user ? (
            <AuthenticationButton
              href={`/api/auth/logout`}
              type="logout"
              buttonText={dict.dict.Logout}
            ></AuthenticationButton>
          ) : (
            <AuthenticationButton
              href={`/api/auth/login`}
              type="login"
              buttonText={dict.dict.Login}
            ></AuthenticationButton>
          )}
        </div> */}
      </div>
    </header>
  );
};

export default Header;
