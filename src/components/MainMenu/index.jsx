import MainMenuItem from "../MainMenuItem"

const menu = [
    {
        menu: "Home",
        url: "#"
    },
    {
        menu: "Pratos",
        url: "#"
    },
    {
        menu: "Meu perfil",
        url: "#"
    },
]

const MainMenu = ({ menuClassName, menuItemClassName }) => {
    return (
        <ul className={menuClassName}>
            {menu.map((item, index) => (
                <MainMenuItem
                    key={`main-menu-item-${index + 1}`}
                    menu={item.menu}
                    url={item.url}
                    className={menuItemClassName} />
            ))}
        </ul>
    )
}

export default MainMenu