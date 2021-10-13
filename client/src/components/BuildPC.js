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
        color_id: mongoose.Types.ObjectId(),
        os_id: mongoose.Types.ObjectId(),
        cpu_id: mongoose.Types.ObjectId(),
        gpu_id: mongoose.Types.ObjectId(),
        memory_id: mongoose.Types.ObjectId(),
        storage_id: mongoose.Types.ObjectId()
    });
    // Todo: Add validation for products
    const [errorMessage, setErrorMessage] = useState("");

    const [allParts, setAllParts] = useState([]);
    const [partsForBuild, setPartsForBuild] = useState({
        color_id: {},
        os_id: {},
        cpu_id: {},
        gpu_id: {},
        memory_id: {},
        storage_id: {}
    });
    const [sum, setSum] = useState(0);
    const [allCpu, setAllCpu] = useState([]);
    const [allGpu, setAllGpu] = useState([]);
    const [allMemory, setAllMemory] = useState([]);
    const [allStorage, setAllStorage] = useState([]);
    const [allColor, setAllColor] = useState([]);
    const [allOs, setAllOs] = useState([]);

    const [osPrice, setOSPrice] = useState(0);
    const [gpuPrice, setGpuPrice] = useState(0);
    const [cpuPrice, setCpuPrice] = useState(0);
    const [memoryPrice, setMemoryPrice] = useState(0);
    const [storagePrice, setStoragePrice] = useState(0);
    const [colorPrice, setColorPrice] = useState(0);
    const [dummy, setDummy] = useState({});
    const [completedProduct, setCompletedProduct] = useState({});
    const [productList, setProductList] = useState([]);
    
    
    // Get all parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts')
            .then(res => {
                console.log("This is inside the backend call to get all parts", res.data);
                setAllParts(res.data);
                // console.log(allParts);
            })
            .catch(err => console.log(err));
    }, []);
      // Get cpu parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/cpu')
            .then((res) => {
                console.log("This is inside the backend call to get cpu parts", res.data);
                setAllCpu(res.data);
            })
            .catch(err => console.log(err));
    }, []);
      // Get gpu parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/gpu')
            .then((res) => {
                console.log("This is inside the backend call to get gpu parts", res.data);
                setAllGpu(res.data);
            })
            .catch(err => console.log(err));
    }, []);
      // Get memory parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/memory')
            .then((res) => {
                console.log("This is inside the backend call to get memory parts", res.data);
                setAllMemory(res.data);
            })
            .catch(err => console.log(err));
    }, []);
      // Get storage parts from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/storage')
            .then((res) => {
                console.log("This is inside the backend call to get storage parts", res.data);
                setAllStorage(res.data);
            })
            .catch(err => console.log(err));
    }, []);
      // Get color options from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/color')
            .then((res) => {
                console.log("This is inside the backend call to get color parts", res.data);
                setAllColor(res.data);
            })
            .catch(err => console.log(err));
    }, []);
      // Get os options from backend.
    useEffect(() => {
        axios.get('http://localhost:8000/api/parts/os')
            .then((res) => {
                console.log("This is inside the backend call to get os parts", res.data);
                setAllOs(res.data);
                // console.log("This is inside changeHandler to test allOs", res.data);
                // console.log("This is inside changeHandler to test allOs", allOs.slice(0,1)[0]._id);
            })
            .catch(err => {
                console.log(err)
                alert("Fails in the os useEffect!");
            });
    }, []);
        // Get completed product from backend.
            useEffect(() => {
                
                    axios.get('http://localhost:8000/api/products')
                        .then((res) => {
                            console.log("This is inside the backend call to get products", res.data);
                            setProductList(res.data);
                        })
                        .catch(err => console.log(err));
            }, [completedProduct]);
        
        
    //TODO: Finish figuring out why product is null giving garbage values!! UNDEFINED
    // Compute Sum of all parts selected so far.
    const sumOfAllParts = (e) => {
        let newStateObject = {...partsForBuild}
        // console.log("I am inside sumOfAllParts", e.target.name)
        
            // console.log(product[e.target.name]._id.toString());
            console.log("New target Id " + e.target.value);
            console.log("New target name " + e.target.name);
            console.log(product);
            allParts.map((part) => {
                // console.log(part._id);
                // console.log(product[e.target.name].toString());
                // console.log(e.target.name);
                
                // if(product[e.target.name].toString() === part._id){
                if(e.target.value === part._id){
                    newStateObject[e.target.name] = part;
                    setPartsForBuild(newStateObject);
                    // console.log(newStateObject);
                    console.log("These are all the parts to add to the build", newStateObject)
                }
            })
            let resultPrice = 0;
            for(const key in newStateObject){
                if(newStateObject[key].price){
                    console.log(newStateObject[key].price);
                    resultPrice += newStateObject[key].price;
                }
                

            }
            setSum(resultPrice);
            console.log(resultPrice);
        
    }

    const changeHandler = (e) => {
        let updateProduct = {...product}
        
        // console.log(e.target.name, e.target.value);
        console.log("This is the changeHandler:", mongoose.Types.ObjectId(e.target.value).toString());
        // setDummy(e.target.value.name);
        // console.log(e.target);
        updateProduct[e.target.name] = mongoose.Types.ObjectId(e.target.value);
        

        setProduct(updateProduct);
        
        sumOfAllParts(e);
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
                // console.log(res);
                console.log(res.data);
                // setCompletedProduct(res.data);
                navigate("/ReviewOrder");
                // setProductList([...productList])
            })
            .catch((err) =>{
                console.log(product.color_id.toString());
                alert("Uh oh we have a post error");
                console.log(err);
                // console.log(err.response.data.errors);
            })  
    }
    const clickHandler = (e) => {
        console.log("clicked")
    }
    return(
        // <div className="page">
            
    <div className="form">
        {/* Container that centers the buildPC form. */}
        {/* <p>
            {
                completedProduct ?
                // completedProduct[0].color_id.price + completedProduct[0].os_id.price + completedProduct[0].cpu_id.price + completedProduct[0].gpu_id.price + completedProduct[0].memory_id.price + completedProduct[0].storage_id.price:
                productList[productList.length - 1].color_id.price + productList[productList.length - 1].cpu_id.price :
                null
            }
        </p> */}
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={submitHandler}>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>OS</Form.Label>
                                    <Form.Select onChange={(e) => changeHandler(e)} name="os_id"  value={product.os_id}>
                                        <option value="" defaultValue>Select an OS.</option>
                                {
                                    allOs.map((part, index) => 
                                    
                                    {
                                        return (
                                                <option key={index} value={part._id}>{part.name}</option>
                                            )
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CPU</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="cpu_id"  value={product.cpu_id}>
                                    <option value="" defaultValue>Select a CPU.</option>
                                {
                                    allCpu.map((part, index) => 
                        
                                        {
                                            return (
                                                <option key={index} value={part._id}>{part.name}</option>
                                            )
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
                                    <option value="" defaultValue>Select a GPU.</option>
                                {
                                    allGpu.map((part, index) => 
                        
                                        
                                            (
                                                <option onClick={
                                                    clickHandler} key={index} value={part._id}>{part.name}</option>
                                            )
                                        
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Memory</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="memory_id"  value={product.memory_id}>
                                    <option value="" defaultValue>Select a Memory.</option>
                                {
                                    allMemory.map((part, index) => 
                        
                                        {
                                            return (
                                                <option key={index} value={part._id}>{part.name}</option>
                                            )
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
                                    <option value="" defaultValue>Select a Storage.</option>
                                {
                                    allStorage.map((part, index) => 
                        
                                        {
                                            return (
                                                <option key={index} value={part._id}>{part.name}</option>
                                            )
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Color</Form.Label>
                                    <Form.Select  onChange={(e) => changeHandler(e)} name="color_id"  value={product.color_id}>
                                    <option value="" defaultValue>Select a Color.</option>
                                {
                                    allColor.map((part, index) => 
                        
                                        {
                                            return (
                                                <option key={index} value={part._id}>{part.name}</option>
                                            )
                                        }
                                    )
                                }
                                </Form.Select>
                            </Form.Group>
                        </Row>
                            <h3>{sum}</h3>
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

