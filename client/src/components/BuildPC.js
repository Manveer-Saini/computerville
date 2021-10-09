
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/esm/Container";
var mongoose = require('mongoose');



const BuildPC = () => {

    const [product, setProduct] = useState({
        color: mongoose.Types.ObjectId(),
        os: mongoose.Types.ObjectId(),
        cpu_id: mongoose.Types.ObjectId(),
        gpu_id: mongoose.Types.ObjectId(),
        memory_id: mongoose.Types.ObjectId(),
        storage_id: mongoose.Types.ObjectId()
    });
    // Todo: Add validation for products
    const [errorMessage, setErrorMessage] = useState("");
    // Obtain sorted parts from backend.
    // const [cpuList, setCpuList] = useState([]);
    // const [gpuList, setGpuList] = useState([]);
    // const [memoryList, setMemoryList] = useState([]);
    

    const [allParts, setAllParts] = useState([]);
    const [sum, setSum] = useState(0);
    
    // Get all parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts')
            .then((res) => {
                console.log("This is inside the backend call to get all parts", res.data);
                setAllParts(res.data);
                // //cpuLand
                // for(let i = 0; i < allParts.length; i++){
                //     if(allParts[i].type === "cpu"){
                //         console.log("I am inside if")
                //         setCpuList(...cpuList, allParts[i]);
                //     }
                // }
                // for(let i = 0; i < cpuList.length; i++){
                //     console.log(cpuList[i]);
                // }
                
            })
            .catch(err => console.log(err));
    }, []);


    const changeHandler = (e) => {
        let newStateObject = {...product}
        
        // console.log(e.target.name, e.target.value);
        console.log("This is the changeHandler:", e.target.value);
        newStateObject[e.target.name] = mongoose.Types.ObjectId(e.target.value);

        setProduct(newStateObject);
    }
    // Build Order by sending product object to backend.
    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/products',
        product,
        {
            withCredentials:true
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })
            .catch((err) =>{
                console.log(err);
                console.log(err.response.data.errors);
            })
    }

    return(
        // <div className="page">
            
    <div className="form">
        {/* Container that centers the buildPC form. */}
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                            {/* <Form.Group as={Col}>
                                <Form.Label>Operating System</Form.Label>
                                <Form.Select onChange={(e) => changeHandler(e)} name="os" value={product.os}>
                                    <option value="RockCandyOS 21.04" defaultValue hidden>
                                        RockCandyOS 21.04
                                    </option>
                                    <option value="RockCandyOS 21.04">RockCandyOS 21.04</option>
                                    <option value="RockCandyOS 20.10 LTS">RockCandyOS 20.10 LTS</option>
                                    <option value="Ubuntu">Ubuntu</option>
                                </Form.Select>
                            </Form.Group> */}
                            <Form.Group as={Col}>
                                <Form.Label>OS</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="os_id"  value={product.os_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "os" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPU</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="cpu_id"  value={product.cpu_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "cpu" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>GPU</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="gpu_id"  value={product.gpu_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "gpu" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Memory</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="memory_id"  value={product.memory_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "memory" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col}>
                                <Form.Label>Storage</Form.Label>
                                    <Form.Select onChange={(e) => changeHandler(e)} name="storage_id"  value={product.storage_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "storage" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPU</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="color_id"  value={product.color_id}>
                                
                                {
                                    allParts.map((part, index) => 
                        
                                        {
                                            return (part.type === "color" ?
                                            <option key={index} value={part._id}>{part.name}</option>
                                            : null)
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                            <div className="center">
                                <Button type="submit" variant="primary" size="lg">Add To Order</Button>
                            </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
    )

}

export default BuildPC;

