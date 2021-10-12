import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
// import { navigate } from "@reach/router";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ReviewOrder = () => {
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    const [userPhone, setUserPhone] = useState({
        phone: ""
    });
    // Get completed product from backend.
    useEffect(() => {
                
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                console.log("This is inside the backend call to get products", res.data);
                setOrder(res.data);
                grandTotal();
            })
            .catch(err => console.log(err));
            }, []);
            
    const grandTotal = () => {
        let result = 0;
        console.log(order);
        if(order){
            result = order[order.length - 1].color_id.price + order[order.length - 1].os_id.price + order[order.length - 1].cpu_id.price + order[order.length - 1].gpu_id.price + order[order.length - 1].memory_id.price + order[order.length - 1].storage_id.price;
        }

        setTotal(result);
    }

    const changeHandler = (e) => {
        let newState = {...userPhone};
        newState[e.target.name] = e.target.value
        setUserPhone(newState);
    }


    const submitHandler = () => {
        axios.post('http://localhost:8000/api/products/phoneNumber',
        userPhone,
        {
            withCredentials:true
        })
            .then((res) => {
                // console.log(res);
                console.log(res.data);
            })
            .catch((err) =>{
                alert("Uh oh we have a post error");
                console.log(err);
            })  
    }

    return(
        
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>Your Order</h3>
                        <p>Customized Excelsior</p>

                        <hr/>
                
                        <h2>Price: {total}</h2>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type='text' name="phone" value={userPhone.phone} placeholder="Enter phone number" onChange={e => changeHandler(e)} />
                            </Form.Group>

                            <div className="center">
                                <Button type="submit" variant="primary" size="lg">Purchase</Button>
                            </div>
                        </Form>

                    </Col>
                </Row>
            </Container>

        </div>
    );

}

export default ReviewOrder;