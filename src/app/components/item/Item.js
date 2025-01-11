import React from "react";
import "./Item.css"
const Item = (props) => {
    const image = props.img;
    const title = props.title;
    const description = props.description;
    return (
        <div className="grid-item">
            <div className="image-container">
                <div className="text-overlay">{title}</div>
                <img className="image" alt={title} src={image} style={{width:"150px", height:"150px"}}></img>
                <button className="add-to-cart-button">Add to Cart</button>
            </div>
            <div className="description">
                {description}
            </div>
            
        </div>
    )
};
export default Item;