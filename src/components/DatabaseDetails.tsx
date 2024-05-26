import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Table, Alert, Button } from "react-bootstrap";
import Loading from "./Loading";

const DatabaseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [database, setDatabase] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:4000/databases/${id}`)
            .then((response) => {
                setDatabase(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setLoading(false);
            });
    }, [id]);

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <h1>Database Details</h1> 
            </Row>
            {loading && <Loading />}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && database && (
                <>
                    <Table striped bordered hover responsive className="mt-3">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{database.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{database.name}</td>
                            </tr>
                            <tr>
                                <th>URL</th>
                                <td>{database.url}</td>
                            </tr>
                            <tr>
                                <th>Username</th>
                                <td>{database.username}</td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>{database.password}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>{database.type}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row className="justify-content-start mt-3">
                        <Col>
                            <Button variant="primary" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default DatabaseDetails;
