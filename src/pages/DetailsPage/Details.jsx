import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchById } from "../../redux/carsOps";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  const selectedCar = useSelector((state) => state.cars.data.selectedCar);

  console.log(selectedCar);

  return <div>Now showing product with id - {id}</div>;
};
export default DetailsPage;
