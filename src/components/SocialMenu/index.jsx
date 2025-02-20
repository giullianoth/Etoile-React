import { Instagram } from "../../assets/svg/instagram"
import { Facebook } from "../../assets/svg/facebook"
import { WhatsApp } from "../../assets/svg/whatsapp"
import { LocationPin } from "../../assets/svg/location-pin"
import SocialMenuItem from "../SocialMenuItem"

const menu = [
    {
        platform: "Instagram",
        icon: <Instagram />,
        url: "#"
    },
    {
        platform: "Facebook",
        icon: <Facebook />,
        url: "#"
    },
    {
        platform: "WhatsApp",
        icon: <WhatsApp />,
        url: "#"
    },
    {
        platform: "Endereço",
        icon: <LocationPin />,
        url: "#"
    },
]

const SocialMenu = ({ menuClassName, menuItemClassName }) => {
    return (
        <ul className={menuClassName}>
            {menu.map((item, index) => (
                <SocialMenuItem
                    key={`social-menu-item-${index + 1}`}
                    platform={item.platform}
                    icon={item.icon}
                    url={item.url}
                    className={menuItemClassName} />
            ))}
        </ul>
    )
}

export default SocialMenu