import './ProductComponents.css';

function ProductCard(props){
    return(
        <a id={props.Id} href={`/item/${props.Value.netflix_id}`} className="productcard" >
              <img
                src={props.Value.img}
                alt=""/>
              <label>{props.Value.title} </label>
            </a>
    );
}

export default ProductCard;