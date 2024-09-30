
export default function Navbar() {
    return (
        <nav className="nav">
            <a href="/" className="site-titple">Ofertas Ayudantias</a>
            <ul>
                <CustomLink href="/Help">Ayuda</CustomLink>
                <CustomLink href="/Login">Inicio Sesion</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink( {href, children, ...props}) {
    const path = window.location.pathname

    return (
        <li className={path === href ? "active" : ""}>
            <a href={href} {...props}>{children}</a>
        </li>
        
    )
}