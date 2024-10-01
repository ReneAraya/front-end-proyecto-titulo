
//import { useImperativeHandle } from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-titple">Ofertas Ayudantias</Link>
            <ul>
                <CustomLink to="/Help">Ayuda</CustomLink>
                <CustomLink to="/Login">Inicio Sesion</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink( {to, children, ...props}) {
    const ResolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: ResolvedPath.pathname, end: true })
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    )
}