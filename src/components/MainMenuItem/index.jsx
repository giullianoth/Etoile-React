import { Link } from "react-router-dom"

const MainMenuItem = ({ menu, url, className }) => {
    return (
        <li className={className}>
            <Link to={url}>{menu}</Link>
        </li>
    )
}

export default MainMenuItem