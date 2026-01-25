import MapIcon from "../../assets/icons/map.svg?react";
import css from "./Location.module.css";
const Location = () => {
  return (
    <section className={css.location}>
      <h3 className={css.title}>Location</h3>

      <div className={css.inputWrap}>
        <MapIcon className={css.icon} />

        <input
          type="text"
          name="location"
          placeholder="City, country"
          className={css.input}
        />
      </div>
    </section>
  );
};
export default Location;
