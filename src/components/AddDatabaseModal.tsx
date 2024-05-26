import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

interface AddDatabaseModalProps {
    show: boolean;
    handleClose: () => void;
}

const AddDatabaseModal: React.FC<AddDatabaseModalProps> = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        username: "",
        password: "",
        type: "Snowflake",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        
        axios
            .post("http://localhost:4000/databases", formData)
            .then((response) => {
                console.log("Database added:", response.data);
                setSuccess("Database added successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                console.error("Error adding database:", error);
                setError("Error adding database");
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Database Connection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Database Name</Form.Label>
                        <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="url" name="url" value={formData.url} onChange={handleInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select name="type" value={formData.type} onChange={handleSelectChange}>
                            <option value="Snowflake">Snowflake</option>
                            <option value="Trino">Trino</option>
                            <option value="MySQL">MySQL</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-4">
                        Add
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddDatabaseModal;
