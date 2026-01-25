import clsx from "clsx";
import css from "./Card.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "../Button/Button";

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
    reviews = [],
    gallery = [],
  } = data;

  return (
    <li className={clsx(css.item)}>
      <img
        className={css.image}
        src={gallery?.[0]?.original}
        alt={name}
        loading="lazy"
      />

      <div className={css.content}>
        <div className={css.header}>
          <h3 className={css.title}>{name}</h3>

          <div className={css.priceBlock}>
            <span className={css.price}>€{price}.00</span>

            <button
              type="button"
              className={css.favBtn}
              aria-label="Add to favorites"
            >
              <FavoriteBorderOutlinedIcon className={css.favIcon} />
            </button>
          </div>
        </div>

        <p className={css.rating}>
          {rating} ({reviews.length} Reviews)
        </p>

        <p className={css.desc}>{description}</p>

        <ul className={css.features}>
          <li className={css.feature}>{transmission}</li>
          <li className={css.feature}>{engine}</li>
          {kitchen && <li className={css.feature}>Kitchen</li>}
          {AC && <li className={css.feature}>AC</li>}
        </ul>
        <Button>Show more</Button>
      </div>
    </li>
  );
};

export default Card;
