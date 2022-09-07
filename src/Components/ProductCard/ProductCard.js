import './ProductCard.css';

function ProductCard(props){
    return(
        <a href="/" className="productcard" >
              <img
                src="https://github.com/carlosavilae/Netflix-Clone/blob/master/img/p1.PNG?raw=true"
                alt=""/>
              <label>Label</label>
            </a>
    );
}

export default ProductCard;