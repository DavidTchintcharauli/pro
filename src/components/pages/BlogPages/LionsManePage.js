import LionsMane from "../../../assets/images/Lions Mane.jpeg";
import * as Posts from "../../../assets/Posts.js";

import "./BlogPages.css";

export default function LionsManePage() {
  return (
    <div>
      <h1>Lion's Mane: What if you used more of your brain?</h1>
      <img className="blog-photo" src={LionsMane} alt="Lions-mane"></img>
      {Posts.LionsManePost.map((paragraph, index) => {
        return (
          <p style={{ textAlign: "left", padding: "20px" }} key={index}>
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
