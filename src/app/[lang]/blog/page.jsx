import BlogPost from "../../components/BlogPost/BlogPost.js";
import * as Mushrooms from "../../components/data/Mushrooms.js";

import "./index.css";
const MushroomsList = [
  Mushrooms.AmanitaMuscaria,
  Mushrooms.AmanitaPanterina,
  Mushrooms.Cordyceps,
  Mushrooms.LionsMane,
  Mushrooms.Maitake,
];

export default function Blog() {
  return (
    <div>
      <div className="blog-container">
        {MushroomsList.map((mushroom) => {
          return (
            <BlogPost
              key={mushroom.key}
              image={mushroom.img}
              name={mushroom.name}
              description={mushroom.posts}
              heading={mushroom.Heading}
            />
          );
        })}
      </div>
    </div>
  );
}
