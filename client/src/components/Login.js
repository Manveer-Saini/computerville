import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Link } from "@reach/router";
import Container from "react-bootstrap/esm/Container";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login", { 
            email: email, 
            password: password,
        },
        {
            // this will force the sending of the credentials / cookies so they can be updated
            //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
            //    unless withCredentials is set to true before making the request
            withCredentials: true,
        }
        )
        .then((res) => {
            console.log(res.cookie, "cookie");
            console.log(res, "res");
            console.log(res.data, 'is res data!');
            navigate("/cartoon");
        })
        .catch(err => {
            console.log(err.response);
            setErrorMessage(err.response.data.message);
        });
    };

    return (
        <div>
            <Nav className="justify-content-end" >
                <Nav.Item>
                    <Nav.Link ><Link to="/Register">Don't Have an Account? Register</Link></Nav.Link>
                </Nav.Item>
            </Nav>

            <h2>Welcome Back!</h2>
            <p className="error-text" style={{color:"red"}}>{errorMessage ? errorMessage : ""}</p>

            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={login}>
                            <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </Form.Group>
                            <div className="center">
                            <Button type="submit" variant="primary" size="lg">Log In</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        
        </div>
    );
};

export default Login;