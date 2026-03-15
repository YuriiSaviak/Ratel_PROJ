import {useMemo, useState} from "react";
import {Routes, Route, Link, useLocation} from "react-router-dom";

import HomePage from "./pages/HomePage.tsx";
import TestPage from "./pages/TestPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import WorkshopsPage from "./pages/WorkshopsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";

import Logo from "./assets/SVG_ratel_mind_logo.svg";
import LogoWhite from "./assets/SVG_ratel_mind_logo_white.svg";

export default function App() {
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
        <div className="app">
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

            <main className="main">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/test" element={<TestPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="/workshops" element={<WorkshopsPage/>}/>
                        <Route path="/contact" element={<ContactPage/>}/>
                    </Routes>
                </div>
            </main>

            <footer className="footer">
                <div className="container footer__inner">
                    <div className="footer__left">
                        <img className="footer__logo" src={LogoWhite} alt="Ratel Mind"/>
                        <span>© 2025 Ratel Mind</span>
                    </div>
                    <span>Mental resilience development</span>
                </div>
            </footer>
        </div>
    );
}
