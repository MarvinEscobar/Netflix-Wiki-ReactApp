import "./TopMenu.css";

function GenresMenu(props) {
  return (
    <nav className="genres">
      <a href="#home" className="genre">
        Home
      </a>
      <a href="#second" className="genre">
        Second
      </a>
      <a href="#third" className="genre">
        third
      </a>
    </nav>
  );
}

export default GenresMenu;
