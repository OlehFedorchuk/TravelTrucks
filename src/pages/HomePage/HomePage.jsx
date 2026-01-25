import clsx from "clsx";
import Button from "../../components/Button/Button";
import css from "./HomePage.module.css";
const HomePage = () => {
  return (
    <section className={clsx(css.geroy)}>
      <div className={clsx(css.wrap)}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Button className={clsx(css.heroiBtn)}>View New</Button>
      </div>
    </section>
  );
};

export default HomePage;
