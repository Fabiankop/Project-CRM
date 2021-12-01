import React from "react";
import Card from "./Card";

import image1 from "./assets/casco.png";
import image2 from "./assets/cascos.png";
import image3 from "./assets/gafas transparentes.jpg";
import image4 from "./assets/gafas.jpg";
import image5 from "./assets/Guantes-1.jpg";
import image6 from "./assets/Guantes.jpg";

const cards = [
  {
    id: 1,
    title: "casco",
    image: image1,
  },
  {
    id: 2,
    title: "cascos",
    image: image2,
  },
  {
    id: 3,
    title: "gafas transparentes",
    image: image3,
  },
  {
    id: 4,
    title: "gafas",
    image: image4,
  },
  {
    id: 5,
    title: "Guantes-1",
    image: image5,
  },
  {
    id: 6,
    title: "Guantes",
    image: image6,
  },
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {cards.map(({ title, image, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
