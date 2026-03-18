import LogoWhite from "../assets/SVG_ratel_mind_logo_white.svg";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__left">
                    <img className="footer__logo" src={LogoWhite} alt="Ratel Mind"/>
                    <span>© 2025 Ratel Mind</span>
                </div>
                <span>Mental resilience development</span>
            </div>
        </footer>
    );
}