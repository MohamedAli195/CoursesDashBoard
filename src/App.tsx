import { Outlet } from 'react-router-dom';
import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);
  useEffect(()=>{

  },[localStorage.getItem("token")])
  return (
    <>
      <Outlet />
      
    </>
  );
};

export default App;
