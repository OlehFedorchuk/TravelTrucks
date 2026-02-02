import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <h1 className={css.code}>404</h1>
        <h2 className={css.title}>Page not found</h2>
        <p className={css.text}>
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className={css.link}>
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
