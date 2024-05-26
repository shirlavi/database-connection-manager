import { Outlet } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";

function MainLayout() {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column"}}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/" style={{ fontSize: "2rem", marginLeft: "15px"}}>
                    Database Connections Manager
                </Navbar.Brand>
            </Navbar>
            <Container fluid style={{ flex: 1, padding: "12px" }}>
                <div style={{ padding: "24px", minHeight: "280px", background: "#fff"}}>
                    <Outlet />
                </div>
            </Container>
        </div>
    );
}

export default MainLayout;
