import clsx from "clsx";
import css from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import Location from "../Location/Location";
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
import { applyFilters } from "../../redux/carsSlice";

import {
  toggleEquipment,
  setBodyType,
  selectEquipmentFilters,
  selectBodyType,
  clearFilters,
} from "../../redux/filtersSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const equipment = useSelector(selectEquipmentFilters);
  const bodyType = useSelector(selectBodyType);

const filters = useSelector((state) => state.filters);

const handleSearch = () => {
  dispatch(applyFilters(filters));
  dispatch(clearFilters());      
  document.activeElement?.blur();
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
              className={clsx(css.item, equipment.AC && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("AC"))}
            >
              <AcIcon className={css.icon} />
              <span className={css.label}>AC</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Automatic && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Automatic"))}
            >
              <AutoIcon className={css.icon} />
              <span className={css.label}>Automatic</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Kitchen && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Kitchen"))}
            >
              <KitchenIcon className={css.icon} />
              <span className={css.label}>Kitchen</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.TV && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("TV"))}
            >
              <TvIcon className={css.icon} />
              <span className={css.label}>TV</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, equipment.Bathroom && css.itemActive)}
              onClick={() => dispatch(toggleEquipment("Bathroom"))}
            >
              <BathroomIcon className={css.icon} />
              <span className={css.label}>Bathroom</span>
            </button>
          </li>
        </ul>
      </div>

      <div className={clsx(css.wrapType)}>
        <h3 className={css.title}>Vehicle Type</h3>
        <LineIcon className={clsx(css.line)} />

        <ul className={css.grid}>
          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "Van" && css.itemActive)}
              onClick={() => dispatch(setBodyType("Van"))}
            >
              <VanIcon className={css.icon} />
              <span className={css.label}>Van</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "FullyIntegrated" && css.itemActive)}
              onClick={() => dispatch(setBodyType("FullyIntegrated"))}
            >
              <FullyIntegratedIcon className={css.icon} />
              <span className={css.label}>Fully Integrated</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={clsx(css.item, bodyType === "Alcove" && css.itemActive)}
              onClick={() => dispatch(setBodyType("Alcove"))}
            >
              <AlcoveIcon className={css.icon} />
              <span className={css.label}>Alcove</span>
            </button>
          </li>
        </ul>
      </div>

      <Button
        className={clsx(css.searchBtn)}
        type="button"
        onClick={handleSearch}
      >
        Search
      </Button>
    </section>
  );
};

export default Filters;
