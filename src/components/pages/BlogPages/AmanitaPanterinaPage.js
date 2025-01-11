import AmanitaPanterina from "../../../assets/images/Aminta Panterina.jpg";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";

export default function AmanitaPanterinaPage() {
  return (
    <div>
      <h1>Amanita Panterina: The Stronger, Yet more Mysterious</h1>
      <img
        className="blog-photo"
        src={AmanitaPanterina}
        alt="Amanita-panterina"
      ></img>
      {Posts.AmanitaPanterinaPost.map((paragraph, index) => {
        return (
          <p style={{ textAlign: "left", padding: "20px" }} key={index}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
