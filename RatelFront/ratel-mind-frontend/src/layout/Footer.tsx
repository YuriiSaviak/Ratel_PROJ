import LogoWhite from "../assets/SVG_ratel_mind_logo_white.svg";

import { Layout, Row, Col, Space, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export default function Footer() {
    return (
        <AntFooter
            style={{
                background: '#111216',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                padding: '0 24px',
            }}
        >
            <Row
                justify="space-between"
                align="middle"
                style={{
                    minHeight: 84,
                }}
            >
                <Col>
                    <Space size={12} align="center">
                        <img
                            src={LogoWhite}
                            alt="Ratel Mind"
                            style={{ height: 22 }}
                        />
                        <Text style={{ color: 'rgba(255,255,255,0.84)', fontSize: 13 }}>
                            © 2025 Ratel Mind
                        </Text>
                    </Space>
                </Col>

                <Col>
                    <Text style={{ color: 'rgba(255,255,255,0.84)', fontSize: 13 }}>
                        Mental resilience development
                    </Text>
                </Col>
            </Row>
        </AntFooter>
    );
}