import { Link } from "react-router-dom";

function CustomLink(props) {
    return (
        <Link className="link" to={props.To}>{props.Title}</Link>
    );
}

export default CustomLink;