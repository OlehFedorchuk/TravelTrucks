import { useParams } from "react-router-dom";

const DetailsPage = () => {
  const { productId } = useParams();
  return <div>Now showing product with id - {productId}</div>;
};
export default DetailsPage;
