import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchById } from "../../redux/carsOps";
import clsx from "clsx";
import css from "./Details.module.css";
import KitchenIcon from "../../assets/icons/kitchen.svg?react";
import AutoIcon from "../../assets/icons/automatic.svg?react";
import PetrolIcon from "../../assets/icons/petrol.svg?react";
import AcIcon from "../../assets/icons/ac.svg?react";
import StarIcon from "../../assets/icons/star.svg?react";
import MapIcon from "../../assets/icons/map.svg?react";
import BathroomIcon from "../../assets/icons/bathroom.svg?react";
import RadioIcon from "../../assets/icons/radio.svg?react";
import RefrigeratorIcon from "../../assets/icons/refrigerator.svg?react";
import MicrowaveIcon from "../../assets/icons/microwave.svg?react";
import WaterIcon from "../../assets/icons/water.svg?react";
import GasIcon from "../../assets/icons/gas.svg?react";
const selectSelectedCar = (state) => state.cars.data.selectedCar;
const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  const car = useSelector(selectSelectedCar);

  if (!car) return null;

  const {
    name,
    price,
    rating,
    location,
    description,
    gallery,
    reviews,
    transmission,
    engine,
    form,
    length,
    width,
    height,
    tank,
    consumption,

    // features booleans:
    AC,
    TV,
    bathroom,
    kitchen,
    radio,
    microwave,
    refrigerator,
    water,
    gas,
  } = car;

  // 1) Галерея: у тебе gallery = масив обʼєктів. Часто там є { thumb } або { original } або { url }.
  // Зробимо універсально:
  const photos = (gallery || [])
    .map((g) => g?.original || g?.thumb)
    .filter(Boolean);

  // 2) Бейджі фіч: беремо boolean-и і показуємо тільки true + базові текстові (engine/transmission)

  const FEATURE_ICONS = {
    transmission: AutoIcon,
    AC: AcIcon,
    kitchen: KitchenIcon,
    engine: PetrolIcon,
    bathroom: BathroomIcon,
    radio: RadioIcon,
    refrigerator: RefrigeratorIcon,
    microwave: MicrowaveIcon,
    water: WaterIcon,
    gas: GasIcon,
  };
  const featureBadges = [
    {
      key: "transmission",
      label:
        transmission && transmission[0].toUpperCase() + transmission.slice(1),
    },
    { key: "AC", label: "AC", show: AC },
    { key: "kitchen", label: "Kitchen", show: kitchen },
    { key: "bathroom", label: "Bathroom", show: bathroom },
    { key: "radio", label: "Radio", show: radio },
    { key: "refrigerator", label: "Refrigerator", show: refrigerator },
    { key: "microwave", label: "Microwave", show: microwave },
    { key: "water", label: "Water", show: water },
    { key: "gas", label: "Gas", show: gas },
    {
      key: "engine",
      label: engine ? engine[0].toUpperCase() + engine.slice(1) : null,
    },
  ].filter((x) => x?.label && (x.show === undefined ? true : x.show));

  // 3) Vehicle details
  const details = [
    ["Form", form],
    ["Length", length],
    ["Width", width],
    ["Height", height],
    ["Tank", tank],
    ["Consumption", consumption],
  ].filter(([, v]) => Boolean(v));

  const reviewsCount = Array.isArray(reviews) ? reviews.length : 0;
  return (
    <section className={css.page}>
      <div className={css.container}>
        {/* HEADER */}
        <header className={css.header}>
          <h1 className={css.title}>{name}</h1>

          <div className={css.metaRow}>
            <span className={css.rating}>
              <span className={css.star}>
                <StarIcon className={clsx(css.starIcon)} />
              </span>
              {rating}
              <span className={css.muted}>({reviewsCount} Reviews)</span>
            </span>
            <span className={css.dot}>
              <MapIcon className={clsx(css.mapIcon)} />
            </span>
            <span className={css.location}>{location}</span>
          </div>

          <p className={css.price}>€{Number(price).toFixed(2)}</p>
        </header>

        {/* GALLERY */}
        <div className={css.gallery}>
          {photos.map((src, idx) => (
            <div key={idx} className={css.photoWrap}>
              <img src={src} alt={`photo-${idx + 1}`} />
            </div>
          ))}
        </div>
        {/* DESCRIPTION */}
        <p className={css.description}>{description}</p>

        {/* TABS */}
        <div className={css.tabs}>
          <button className={`${css.tab} ${css.tabActive}`} type="button">
            Features
          </button>
          <button className={css.tab} type="button">
            Reviews
          </button>
        </div>
        <div className={css.tabsLine} />

        {/* MAIN */}
        <div className={css.main}>
          {/* LEFT CARD */}
          <div className={css.leftCard}>
            <ul className={css.badges}>
              {featureBadges.map((f) => {
                const Icon = FEATURE_ICONS[f.key];
                return (
                  <li key={f.key} className={css.badge}>
                    {Icon && <Icon className={css.badgeIcon} />}
                    {f.label}
                  </li>
                );
              })}
            </ul>

            <h2 className={css.blockTitle}>Vehicle details</h2>
            <div className={css.divider} />

            <ul className={css.details}>
              {details.map(([label, value]) => (
                <li key={label} className={css.detailRow}>
                  <span className={css.detailLabel}>{label}</span>
                  <span className={css.detailValue}>{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CARD */}
          <aside className={css.rightCard}>
            <h2 className={css.formTitle}>Book your campervan now</h2>
            <p className={css.formSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form className={css.form}>
              <input className={css.input} type="text" placeholder="Name*" />
              <input className={css.input} type="email" placeholder="Email*" />
              <input
                className={css.input}
                type="text"
                placeholder="Booking date*"
              />
              <textarea
                className={css.textarea}
                placeholder="Comment"
                rows={4}
              />
              <button className={css.submit} type="submit">
                Send
              </button>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
