import { Link } from 'react-router-dom';
import './ProductComponents.css';

function ProductCard(props) {
  let title = props?.Value?.title?.replace('&#39;', '\'');
  return (
    <Link id={props.Id} to={`/productdetails/${props.Value.netflix_id}`} className="productcard" >
      <img
        src={props.Value.img}
        alt="" />
      <label>{title} </label>
    </Link>
  );
}

export default ProductCard;