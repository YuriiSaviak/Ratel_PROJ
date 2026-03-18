import {Link, useLocation} from "react-router-dom";
import Logo from "../assets/SVG_ratel_mind_logo.svg";
import {useMemo, useState} from "react";

export default function Header() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = useMemo(
        () => [
            {to: "/", label: "Home"},
            {to: "/about", label: "About Us"},
            {to: "/workshops", label: "Workshops"},
            {to: "/contact", label: "Contact"},
        ],
        []
    );

    const isActive = (path: string) => (location.pathname === path ? "active" : "");

    return (
        <header className="header">
            <div className="container header__inner">
                <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
                    <img className="brand__logo" src={Logo} alt="Ratel Mind"/>
                </Link>

                <nav className="nav nav--desktop">
                    {navItems.map((x) => (
                        <Link key={x.to} to={x.to} className={`nav__link ${isActive(x.to)}`}>
                            {x.label}
                        </Link>
                    ))}
                </nav>

                <div className="header__actions">
                    <Link to="/test" className="btn btn--outline" onClick={() => setMobileOpen(false)}>
                        Take a Test
                    </Link>

                    <button
                        className="burger"
                        aria-label="Open menu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <span/>
                        <span/>
                        <span/>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="mobileNav">
                    <div className="container mobileNav__inner">
                        {navItems.map((x) => (
                            <Link
                                key={x.to}
                                to={x.to}
                                className={`mobileNav__link ${isActive(x.to)}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {x.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    )
}