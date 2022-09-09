import { Link } from "react-router-dom";
import "./TopMenu.css";

function CategoryMenu(props) {
  if (!props.Prefix)
    return (
      <nav className="genres">
        <a href="#all" className="genre">
          All
        </a>
        <a href="#tmovs" className="genre">
          Movies
        </a>
        <a href="#tseries" className="genre">
          Series
        </a>
        <a href="#expiring" className="genre">
          Expiring
        </a>
      </nav>
    );
  else
    return (
      <nav className="genres">
        <Link to={`${props.Prefix ?? ''}#all`} className="genre">
          All
        </Link>
        <Link to={`${props.Prefix ?? ''}#tmovs`} className="genre">
          Movies
        </Link>
        <Link to={`${props.Prefix ?? ''}#tseries`} className="genre">
          Series
        </Link>
        <Link to={`${props.Prefix ?? ''}#expiring`} className="genre">
          Expiring
        </Link>
      </nav>
    );

}

export default CategoryMenu;
