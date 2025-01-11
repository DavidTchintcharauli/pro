import Cordyceps from "../../../assets/images/Cordyceps.jpg";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";

export default function CordyCepsPage() {
  return (
    <div>
      <h1>Cordyceps: Parasitic, yet Symbiotic</h1>
      <img className="blog-photo" src={Cordyceps} alt="Cordyceps"></img>
      {Posts.CordycepsPost.map((paragraph, index) => {
        return (
          <p style={{ textAlign: "left", padding: "20px" }} key={index}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
