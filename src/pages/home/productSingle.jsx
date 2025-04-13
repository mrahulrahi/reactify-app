import { useParams } from 'react-router';
import Hero from '../../components/Hero';

const Product = () => {
  const { pid } = useParams();
  return <><Hero title={` Product Id: ${pid}`} subTitle={`Product Page`} gradientColor1="from-red-400" gradientColor2="to-amber-300" /></>;
};

export default Product;
