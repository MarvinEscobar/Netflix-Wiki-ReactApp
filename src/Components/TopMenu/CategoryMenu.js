import "./TopMenu.css";

function CategoryMenu(props) {
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
}

export default CategoryMenu;
