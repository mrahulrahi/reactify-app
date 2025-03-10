import { useParams } from 'react-router';

const Product = () => {
  const { uid, pid } = useParams();
  return <div>Product Page - User: {uid}, Product: {pid}</div>;
};

export default Product;
