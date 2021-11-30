import React from "react";
import PropTypes from "prop-types";

import "./card.css";

function Card({ imageSource, title, text, url }) {
  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" />
      </div>

      <div className="card-body text-light">
        <h4 className="card-title">{title}</h4>
        <p className="card-text text-secondary">
          {text
            ? text
            : "La Sagitta se categoriza como una de las bicicletas de montaña de más alta calidad dados sus componentes, principalmente por su marco tipo carbono y soldadura pulida, que dará una nueva estética a tus aventuras. Y si de estética se trata, esta bicicleta no solo cuenta con 12 nuevas velocidades, sino con una pacha que puedes disfrutar en cualquiera de sus dos presentaciones: petrolizada o dorada, agregándole más a la experiencia de montar donde quieras."}
        </p>
        <a
          href={url ? url : "#!"}
          target="_black"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Go to {title}
        </a>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

export default Card;
