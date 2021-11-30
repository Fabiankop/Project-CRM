import React from "react";
import Card from "./Card";

import image1 from "./assets/optimus sagitta.jpg";
import image2 from "./assets/Optimus Tucana.png";
import image3 from "./assets/Optimus Aquila.jpg";
import image4 from "./assets/Optimus Koruna.png";
import image5 from "./assets/Optimus Aquila Max.jpg";
import image6 from "./assets/Optimus Cetus.jpg";

const cards = [
  {
    id: 1,
    title: "Optimus Sagitta",
    image: image1,
    text: "ESTA ES LA MEJOR",
  },
  {
    id: 2,
    title: "Optimus Tucana",
    image: image2,
  },
  {
    id: 3,
    title: "Optimus Aquila",
    image: image3,
  },
  {
    id: 4,
    title: "Optimus Koruna",
    image: image4,
  },
  {
    id: 5,
    title: "Optimus Aquila Max",
    image: image5,
  },
  {
    id: 6,
    title: "Optimus Cetus",
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
