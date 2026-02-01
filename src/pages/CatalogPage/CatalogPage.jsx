import clsx from "clsx";
import CatalogList from "../../components/CatalogList/CatalogList";
import Filters from "../../components/Filters/Filters";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <section className={clsx(css.catalogPage)}>
      <Filters />
      <div className={css.listColumn}>
        <CatalogList />
      </div>
    </section>
  );
};

export default CatalogPage;
