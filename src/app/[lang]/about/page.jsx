import React from "react";

import "./index.css";

const paragraphStyle = "p-2 text-2xl";
function About() {
  return (
    <div className="flex flex-col justify-between">
      <div className="border border-white flex flex-col text-start h-80vh">
        <p className={paragraphStyle}>
          This project is a test project for TbcXUsaid React course assignments.
        </p>
        <p className={paragraphStyle}>
          The application consists of several pages. Mainly - Content (Welcone)
          page, About page and contact page. All three pages represent a single
          React page.
        </p>
        <p className={paragraphStyle}>
          The welcome page showcases medicinal mushroom species that "can" be
          bought from the web-site, photos, info and "Add-to-cart" button for
          each of them.
        </p>
        <p className={paragraphStyle}>
          Contact page is a page that consists of a text area for contacting the
          vendor for futher questions and advises.
        </p>
        <p className={paragraphStyle}>
          About page is a page that consists of explanation of the project.
        </p>
      </div>
    </div>
  );
}

export default About;
