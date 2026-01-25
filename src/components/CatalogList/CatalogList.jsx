import clsx from "clsx";
import { selectItemsArray } from "../../redux/carsSlice";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import css from "./CatalogList.module.css";

const CatalogList = () => {
  const items = useSelector(selectItemsArray);
  const loading = useSelector((state) => state.cars.loading);
  console.log("items", items);
  if (loading) return <p>Завантаження...</p>;
  if (items.length === 0) return <p>Товари ще не завантажені</p>;

  return (
    <ul className={clsx(css.list)}>
      {items.map((item) => (
        <Card key={item.id} data={item} />
      ))}
    </ul>
  );
};

export default CatalogList;
