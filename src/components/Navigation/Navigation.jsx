import { Routes, Route, NavLink } from "react-router";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <header className={css.header}>
        <nav className={css.nav}>
          <p className={css.logo}>
            Travel<span className={css.accent}>Trucks</span>
          </p>

          <div className={css.links}>
            <NavLink to="/" className={buildLinkClass}>
              Home
            </NavLink>
            <NavLink to="/catalog" className={buildLinkClass}>
              Catalog
            </NavLink>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
export default Navigation;
