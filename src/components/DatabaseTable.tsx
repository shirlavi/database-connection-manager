import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddDatabaseModal from "./AddDatabaseModal";
import { Table, Button, Container, Row, Col, Alert } from "react-bootstrap";
import Loading from "./Loading";

const DatabaseTable: React.FC = () => {
    const [databases, setDatabases] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:4000/databases")
            .then((response) => {
                setDatabases(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col>
                    <h1>Database Connections</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleShowModal}>
                        Add Database
                    </Button>
                </Col>
            </Row>
            {loading && <Loading />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Database Name</th>
                            <th>Username</th>
                            <th>Database Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {databases.map((db) => (
                            <tr key={db.id}>
                                <td>
                                    <Link to={`/database/${db.id}`}>
                                        {db.name}
                                    </Link>
                                </td>
                                <td>{db.username}</td>
                                <td>{db.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <AddDatabaseModal show={showModal} handleClose={handleCloseModal} />
        </Container>
    );
};

export default DatabaseTable;
