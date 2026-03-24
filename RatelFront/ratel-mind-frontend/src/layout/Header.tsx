import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/SVG_ratel_mind_logo.svg";
import { useMemo, useState } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

export default function Header() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = useMemo(
        () => [
            { key: "/", label: "Home" },
            { key: "/about", label: "About Us" },
            { key: "/workshops", label: "Workshops" },
            { key: "/contact", label: "Contact" },
        ],
        []
    );

    const menuItems = navItems.map(item => ({
        key: item.key,
        label: <Link to={item.key} onClick={() => setMobileOpen(false)}>{item.label}</Link>,
    }));

    return (
        <AntHeader className="header">
            <div className="container header__inner">
                <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
                    <img className="brand__logo" src={Logo} alt="Ratel Mind" />
                </Link>

                <Menu
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    className="nav--desktop"
                    disabledOverflow
                />

                <div className="header__actions">
                    <Link to="/test" onClick={() => setMobileOpen(false)}>
                        <Button shape="round" className="btn--header-action">
                            Take a Test
                        </Button>
                    </Link>

                    <Button
                        className="burger"
                        icon={<MenuOutlined />}
                        onClick={() => setMobileOpen((v) => !v)}
                        type="text"
                    />
                </div>
            </div>

            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
                styles={{ body: { padding: 0 } }}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                />
            </Drawer>
        </AntHeader>
    );
}