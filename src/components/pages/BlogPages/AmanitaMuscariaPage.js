import AmanitaMuscariaPhoto from "../../../assets/images/Amanita Muscaria.webp";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";
export default function AmanitaMuscariaPage() {
  return (
    <div>
      <h1>Amanita Muscaria: The Iconic, Mysterious Mushroom</h1>
      <img
        className="blog-photo"
        src={AmanitaMuscariaPhoto}
        alt="Amanita-muscaria"
      ></img>
      {Posts.AmanitaMuscariaPost.map((paragraph, index) => {
        return (
          <p style={{ textAlign: "left", padding: "20px" }} key={index}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
