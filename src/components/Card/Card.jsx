import clsx from "clsx";
import css from "./Card.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
const Card = ({ data }) => {
  const {
    name,
    price,
    kitchen,
    engine,
    transmission,
    AC,
    description,
    rating,
    reviews,
    gallery,
  } = data;
  return (
    <li className={clsx(css.item)}>
      <img src={gallery[0].original} alt={name} />

      <div>
        <h3>{name}</h3>
        <p>
          {rating}({reviews.length} Reviews)
        </p>

        <p>{description}</p>
        <ul>
          <li>{transmission}</li>
          <li>{engine}</li>
          <li>{kitchen}</li>
          <li>{AC}</li>
        </ul>
      </div>
      <span className={clsx(css.price)}>
        €{price}
        <FavoriteBorderOutlinedIcon />
      </span>
    </li>
  );
};
export default Card;
