import { Link } from 'react-router-dom';
import ProductGrid from "../../components/products/product";
import SliderComponent from "../../components/slider/slider";

export default function Home() {
  return (
    <div>
      <SliderComponent />
      <Link to="/products">
        <ProductGrid />
      </Link>
    </div>
  );
}

