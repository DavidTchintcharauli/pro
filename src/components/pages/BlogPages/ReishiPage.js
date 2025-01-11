import Cordyceps from "../../../assets/images/Cordyceps.jpg";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";

export default function ReishiPage() {
  return (
    <div>
      <h1>
        Maitake Magic: Unlocking the Health Benefits of the Dancing Mushroom
      </h1>
      <img className="blog-photo" src={Cordyceps} alt="Reishi"></img>
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
