"use client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useLocale } from "../providers/LanguageContext";
import { Switch } from "@mui/material";
import ReactCountryFlag from "react-country-flag";

function LocaleChange() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { locale, setLocale } = useLocale();
  const pathname = usePathname();
  const lngs = [
    { locale: "en-US", name: "EN", countryCode: "US" },
    { locale: "ka", name: "GE", countryCode: "GE" },
  ];

  useEffect(() => {
    setChecked(locale === "ka");
  }, [locale]);

  const toggleLanguage = () => {
    const updatedLocale = locale === "ka" ? "en-US" : "ka";
    setChecked(updatedLocale === "ka");

    const updatedPath = pathname.replace(`/${locale}`, `/${updatedLocale}`);
    setLocale(updatedLocale);
    router.push(updatedPath);
  };

  return (
    <div className="flex items-center justify-between space-x-4 py-2 px-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-2">
        <ReactCountryFlag
          countryCode={lngs[0].countryCode}
          svg
          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
          cdnSuffix="svg"
          title={lngs[0].name}
          className="w-6 h-6"
        />
        <span className="text-gray-600 text-sm font-semibold">{lngs[0].name}</span>
      </div>

      <Switch
        checked={checked}
        onChange={toggleLanguage}
        color="primary"
        className="transform transition-all duration-300"
        inputProps={{
          "aria-label": "Toggle language",
        }}
      />

      <div className="flex items-center space-x-2">
        <span className="text-gray-600 text-sm font-semibold">{lngs[1].name}</span>
        <ReactCountryFlag
          countryCode={lngs[1].countryCode}
          svg
          cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
          cdnSuffix="svg"
          title={lngs[1].name}
          className="w-6 h-6"
        />
      </div>
    </div>
  );
}

export default LocaleChange;
