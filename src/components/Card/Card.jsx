import clsx from "clsx";
import css from "./Card.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Button from "../Button/Button";
import AutoIcon from "../../assets/icons/automatic.svg?react";
import PetrolIcon from "../../assets/icons/petrol.svg?react";
import KitchenIcon from "../../assets/icons/kitchen.svg?react";
import AcIcon from "../../assets/icons/ac.svg?react";
import StarIcon from "../../assets/icons/star.svg?react";
import MapIcon from "../../assets/icons/map.svg?react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  selectIsFavoriteById,
} from "../../redux/favoritesSlice";

const Card = ({ data }) => {
  const dispatch = useDispatch();

  const {
    id,
    name,
    price,
    kitchen,
    engine,
    transmission,
    AC,
    description,
    rating,
    location,
    reviews = [],
    gallery = [],
  } = data;

  const isFavorite = useSelector(selectIsFavoriteById(id));

  const handleToggleFavorite = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

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
              className={clsx(css.favBtn, isFavorite && css.favBtnActive)}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              onClick={handleToggleFavorite}
            >
              {isFavorite ? (
                <FavoriteOutlinedIcon className={css.favIconActive} />
              ) : (
                <FavoriteBorderOutlinedIcon className={css.favIcon} />
              )}
            </button>
          </div>
        </div>

        <p className={css.rating}>
          <StarIcon className={clsx(css.starIcon)} />
          {rating} ({reviews.length} Reviews)
          <MapIcon className={clsx(css.mapIcon)} />
          {location}
        </p>

        <p className={css.desc}>{description}</p>

        <ul className={css.features}>
          <li className={css.feature}>
            <AutoIcon className={clsx(css.autoIcon)} />
            {transmission}
          </li>
          <li className={css.feature}>
            <PetrolIcon />
            {engine}
          </li>

          {kitchen && (
            <li className={css.feature}>
              <KitchenIcon className={clsx(css.kitchenIcon)} />
              Kitchen
            </li>
          )}

          {AC && (
            <li className={css.feature}>
              <AcIcon className={clsx(css.acIcon)} />
              AC
            </li>
          )}
        </ul>

        <Link to={`/catalog/${id}`}>
          <Button>Show more</Button>
        </Link>
      </div>
    </li>
  );
};

export default Card;
