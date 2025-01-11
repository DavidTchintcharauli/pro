import AmanitaMuscariaPhoto from "../../../../public/images/Amanita Muscaria.webp"
import AmanitaPanterinaPhoto from "../../../../public/images/Aminta Panterina.jpg"
import LionsManePhoto from "../../../../public/images/Lions Mane.jpeg"
import CordycepsPhoto from "../../../../public/images/Cordyceps.jpg"
import MaitakePhoto from "../../../../public/images/Maitake.jpg"
import ShitakePhoto from "../../../../public/images/Shitake.jpg"
import YamabushitakePhoto from "../../../../public/images/Yamabushitake.jpeg"
import ReishiPhoto from "../../../../public/images/Reishi.jpeg"
import TurkeyTailPhoto from "../../../../public/images/Turkey Tail.webp"
 
import * as Posts from "./Posts.js"





const AmanitaMuscaria = {
    key: 1,
    link: "/amanita-muscaria",
    name: "Amanita Muscaria",
    img: AmanitaMuscariaPhoto,
    Heading: "Amanita Muscaria: The Iconic, Mysterious Mushroom",
    posts: [...Posts.AmanitaMuscariaPost]

}
const AmanitaPanterina = {
    key: 2,
    link: "/amanita-pantherina",
    name: "Amanita Panterina",
    img: AmanitaPanterinaPhoto,
    Heading: "Amanita Panterina: The Stronger, Yet more Mysterious" ,
    posts: [...Posts.AmanitaPanterinaPost]

}
const Cordyceps = {
    key: 3,
    link: "/cordyceps",
    name: "Cordyceps",
    img: CordycepsPhoto,
    Heading: "Cordyceps: Parasitic, yet Symbiotic" ,
    posts: [...Posts.CordycepsPost]

}

const LionsMane = {
    key:4,
    link: "/lions-mane",
    name: "Lions Mane",
    img: LionsManePhoto,
    heading: "Lion's Mane: What if you used more of your brain?" ,
    posts: [...Posts.LionsManePost]
}

const Maitake = {
    key:5,
    link: "/maitake",
    name: "Maitake",
    img: MaitakePhoto,
    heading: "Maitake Magic: Unlocking the Health Benefits of the Dancing Mushroom",
    posts: [...Posts.MaitakePost]

}



const Reishi = {
    key:6,
    link: "/reishi",
    name: "Reishi",
    img: ReishiPhoto,
    heading: "Reishi: The Mushroom of Immortality and Wellness" ,
    posts: [...Posts.ReishiPost]
}
const Shitake = {
    key:7,
    link : "/shiitake",
    name: "Shitake",
    img: ShitakePhoto,
    heading:"Shitake: The Mushroom That Does It All—Flavor, Health, and More!",
    posts: [...Posts.ShitakePost]

}
      
const TurkeyTail = {
    key:8,
    link: "/turkey-tail",
    name : "Turkey Tail",
    heading: "Turkey Tail: Nature's Immune System Ally" ,
    img: TurkeyTailPhoto,
    posts: [...Posts.TurkeyTailPost]
}

const Yamabushitake = {
    key:9,
    link: "/yamabushitake",
    name: "Yamabushitake",
    heading:"Yamabushitake: A Journey into Cognitive Health and Healing",
    img: YamabushitakePhoto,
    posts: [...Posts.YamabushitakePost]
}



export {
    AmanitaPanterina,
    AmanitaMuscaria,
    Cordyceps,
    LionsMane,
    Maitake,
    Yamabushitake,
    TurkeyTail,
    Reishi,
    Shitake
}