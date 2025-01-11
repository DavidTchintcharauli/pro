import Maitake from "../../../assets/images/Maitake.jpg";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";

export default function MaitakePage() {
  return (
    <div>
      <h1>
        Maitake Magic: Unlocking the Health Benefits of the Dancing Mushroom
      </h1>
      <img className="blog-photo" src={Maitake} alt="Maitake"></img>
      {Posts.MaitakePost.map((paragraph, index) => {
        return (
          <p style={{ textAlign: "left", padding: "20px" }} key={index}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
