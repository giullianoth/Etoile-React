const SocialMenuItem = ({ platform, icon, url, className }) => {
    return (
        <li className={className}>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={platform}
                className="button primary">{icon}</a>
        </li>
    )
}

export default SocialMenuItem