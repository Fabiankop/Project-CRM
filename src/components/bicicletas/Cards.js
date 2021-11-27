import React from "react";
import Card from "./Card";

import image1 from "./assets/optimus sagitta.jpg";
import image2 from "./assets/Optimus Tucana.png";


const cards = [
  {
    id: 1,
    title: "Optimus Sagitta",
    image: image1,
    
  },
  {
    id: 2,
    title: "Optimus Tucana",
    image: image2,
    
  },
  
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ title, image, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title}  />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
