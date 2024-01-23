import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const RatingStars = ({ rating }) => {
  const MAX_STARS = 5;
  const filledStars = Math.floor(rating);
  const decimalPart = rating % 1;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= MAX_STARS; i++) {
      if (i <= filledStars) {
        // Render a filled star
        stars.push(
          <FontAwesomeIcon key={i} icon={faStar} className="star filled" />
        );
      } else if (i === filledStars + 1 && decimalPart > 0) {
        // Render a partially filled star
        // const style = { width: `${decimalPart * 100}%` };
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfAlt}
            className="star partial-filled"
            // style={style}
          />
        );
      } else {
        // Render an empty star
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" />);
      }
    }

    return stars;
  };

  return <div className="rating-stars">{renderStars()}</div>;
};

export default RatingStars;
