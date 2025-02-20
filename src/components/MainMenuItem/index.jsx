const MainMenuItem = ({ menu, url, className }) => {
    return (
        <li className={className}>
            <a href={url}>{menu}</a>
        </li>
    )
}

export default MainMenuItem