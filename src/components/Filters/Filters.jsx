import clsx from "clsx";
import css from "./Filters.module.css";
import { useState } from "react";
import Location from "./../Location/Location";
import AcIcon from "../../assets/icons/ac.svg?react";
import AutoIcon from "../../assets/icons/automatic.svg?react";
import KitchenIcon from "../../assets/icons/kitchen.svg?react";
import TvIcon from "../../assets/icons/tv.svg?react";
import BathroomIcon from "../../assets/icons/bathroom.svg?react";
import VanIcon from "../../assets/icons/van.svg?react";
import FullyIntegratedIcon from "../../assets/icons/fullyIntegrated.svg?react";
import AlcoveIcon from "../../assets/icons/alcove.svg?react";
import LineIcon from "../../assets/icons/line.svg?react";
import Button from "../Button/Button";

const Filters = () => {
  const [active, setActive] = useState({
    AC: false,
    Automatic: false,
    Kitchen: false,
    TV: false,
    Van: false,
    FullyIntegrated: false,
    Alcove: false,
    Bathroom: false,
  });

  const toggle = (key) => {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  return (
    <section className={css.filters}>
      <Location />
      <div className={clsx(css.wrapEquipment)}>
        <p className={clsx(css.titleFilters)}>Filters</p>
        <h3 className={css.title}>Vehicle equipment</h3>
        <LineIcon className={clsx(css.line)} />
        <ul className={css.grid}>
          <li>
            <button
              type="button"
              className={clsx(css.item, active.AC && css.itemActive)}
              onClick={() => toggle("AC")}
            >
              <AcIcon className={css.icon} />
              <span className={css.label}>AC</span>
            </button>
          </li>

          <li>
            <button
              className={clsx(css.item, active.Automatic && css.itemActive)}
              onClick={() => toggle("Automatic")}
            >
              <AutoIcon className={css.icon} />
              <span className={css.label}>Automatic</span>
            </button>
          </li>

          <li>
            <button
              className={clsx(css.item, active.Kitchen && css.itemActive)}
              onClick={() => toggle("Kitchen")}
            >
              <KitchenIcon className={css.icon} />
              <span className={css.label}>Kitchen</span>
            </button>
          </li>

          <li>
            <button
              className={clsx(css.item, active.TV && css.itemActive)}
              onClick={() => toggle("TV")}
            >
              <TvIcon className={css.icon} />
              <span className={css.label}>TV</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, active.Bathroom && css.itemActive)}
              onClick={() => toggle("Bathroom")}
            >
              <BathroomIcon className={css.icon} />
              <span className={css.label}>Bathroom</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={clsx(css.wrapType)}>
        {" "}
        <h3 className={css.title}>Vehicle Type</h3>
        <LineIcon className={clsx(css.line)} />
        <ul className={css.grid}>
          <li>
            <button
              className={clsx(css.item, active.Van && css.itemActive)}
              onClick={() => toggle("Van")}
            >
              <VanIcon className={css.icon} />
              <span className={css.label}>Van</span>
            </button>
          </li>
          <li>
            <button
              className={clsx(
                css.item,
                active.FullyIntegrated && css.itemActive,
              )}
              onClick={() => toggle("FullyIntegrated")}
            >
              <FullyIntegratedIcon className={css.icon} />
              <span className={css.label}>Fully Integrated</span>
            </button>
          </li>
          <li>
            <button
              className={clsx(css.item, active.Alcove && css.itemActive)}
              onClick={() => toggle("Alcove")}
            >
              <AlcoveIcon className={css.icon} />
              <span className={css.label}>Alcove</span>
            </button>
          </li>
        </ul>
      </div>
      <Button className={clsx(css.searchBtn)}>Search</Button>
    </section>
  );
};
export default Filters;
