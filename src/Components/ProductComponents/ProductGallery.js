import ProductCard from './ProductCard';
import LoadingSpinner from '../../Resources/Images/Loading-spinner.svg';
function ProductGallery(props) {
  
    if(props.Data && props.Data.length === 0){
      return (
        <div className="location" id={props.Id}>
        <h1 id={props.Id}>{props.Title}<a href={props.Href}> {` | Show all (${props.Count})`}</a> </h1>
        <div className="box">
          <p>No data available</p>
        </div>
      </div>
      );
    }

    return (
        <div className="location" id={props.Id}>
        <h1 id={`p-${props.Id}`}>{props.Title}<a href={props.Href}> {` | Show all (${props.Count})`}</a> </h1>
        <div className="box">
          {props.Data ? props.Data.map((item, index) => {
            return (
              <ProductCard id={`${props.Id}-${index}`} Id={`${props.Id}-id-${index}`} key={`${props.Id}-key-${index}`} Value={item} />
              
            );
          })
            :
            (<img className="spinner" src={LoadingSpinner} alt="Loading.."/>)
          }
        </div>
      </div>
    );
}

export default ProductGallery;