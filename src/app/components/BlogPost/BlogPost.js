import "./BlogPost.css";
import "../BlogDescription/BlogDescription"
import BlogDesription from "../BlogDescription/BlogDescription";

export default function BlogPost({image, name, description, heading}) {
    
    const postItem = {img: image, name: name, description: description, heading:heading}
    return (
        <div className="post-item">

            <img className="post-image" src={postItem.img.src} alt={postItem.name}></img>
            
            <BlogDesription heading={postItem.heading} description={postItem.description} />

            

        </div>
    )
}