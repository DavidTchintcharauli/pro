import "./Content.css";
import * as assets from "../../../public/images/assets.js";
import Item from "../components/item/Item.js";
import * as descriptions from "./data/description.js";

const Content = () => {
  return (
    <main className="content background">
      <div className="content-grid">
        <Item
          img={assets.AmanitaMuscaria.src}
          title="Amanita Muscaria"
          description={descriptions.AmanitaMuscariaDescription}
        />
        <Item
          img={assets.AmanitaPanterina.src}
          title="Amanita Panterina"
          description={descriptions.AmanitaPanterinaDescription}
        />
        <Item
          img={assets.Shitake.src}
          title="Shitake"
          description={descriptions.ShitakeDescription}
        />
        <Item
          img={assets.Maitake.src}
          title="Maitake"
          description={descriptions.MaitakeDescription}
        />
        <Item
          img={assets.Cordyceps.src}
          title="Cordyceps"
          description={descriptions.CordycepsDescription}
        />
        <Item
          img={assets.LionsMane.src}
          title="Lions Mane"
          description={descriptions.LionsManeDescription}
        />
        <Item
          img={assets.TurkeyTail.src}
          title="Turkey Tail"
          description={descriptions.TurkeyTailDescription}
        />
        <Item
          img={assets.Yamabushitake.src}
          title="Yamabushitake"
          description={descriptions.YamabushitakeDescription}
        />
        <Item
          img={assets.Reishi.src}
          title="Reishi"
          description={descriptions.ReishiDescription}
        />
      </div>
    </main>
  );
};

export default Content;
