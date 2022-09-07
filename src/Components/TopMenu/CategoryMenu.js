import "./TopMenu.css";

function CategoryMenu(props) {
  return (
    <nav className="categories">
      <a href="#home" className="category">
        Home
      </a>
      <a href="#second" className="category">
        Second
      </a>
      <a href="#third" className="category">
        third
      </a>
    </nav>
  );
}

export default CategoryMenu;
