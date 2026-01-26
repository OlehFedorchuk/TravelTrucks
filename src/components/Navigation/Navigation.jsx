import { Routes, Route, NavLink } from "react-router";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import HomePage from "../../pages/HomePage/HomePage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import DetailsPage from "../../pages/DetailsPage/Details";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    // console.log("isActive", isActive);
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <header className={clsx(css.header)}>
        <nav>
          <span className={clsx(css.logo)}>TrevelTrucks</span>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={buildLinkClass}>
            Catalog
          </NavLink>
          {/* <NavLink to="/catalog/:id">Details</NavLink> */}
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
