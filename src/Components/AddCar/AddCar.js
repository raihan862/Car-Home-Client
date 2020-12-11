import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { HiCloudUpload } from 'react-icons/hi'
import { useHistory } from 'react-router-dom';
const AddCar = () => {
    const [carInfo, setCarInfo] = useState({ Name: "",brandName:"",modelName:"",price:"", file: "" })
    const [error, setError] = useState(false);
    const [content, setContent] = useState(true);
    const history = useHistory()

    const handleChage = e => {
        const newService = { ...carInfo }
        newService[e.target.name] = e.target.value;
        setCarInfo(newService)
    }
    const handleChageFile = e => {
        const newService = { ...carInfo }
        newService.file = e.target.files[0];
        setCarInfo(newService)
        setError(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
         
        if (carInfo.file == "") {
            setError(true)
        }
        else {
            setError(false)
            let data = new FormData();
            console.log(carInfo);
            data.append('Name', carInfo.Name)
            data.append('brandName', carInfo.brandName)
            data.append('modelName', carInfo.modelName)
            data.append('price', carInfo.price)
            data.append('file', carInfo.file)
            
            fetch('http://localhost:5000/addCar', {
                method: "POST",
                body: data

            }).then(res => {
                fetch(`http://localhost:5000/getCar/${carInfo.modelName}`)
                     .then(response => response.json())
                     .then(Data => {
                         history.push({
                     pathname:"/carDetails",
                     state: {
                        info: Data  
                    }
                  })
                       
                 })
                
              
                setContent(false);
                 
            })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    return (
        <div style={{ width: "80%", backgroundColor: "white",margin:"auto"  }}>
            {
                content ? (
                    <Form onSubmit={handleSubmit} style={{padding:"20px",width:"60%",margin:"auto",marginTop:"40px"}} >
                        <div id="addService">
                            <div id="part1">
                                <Form.Group controlId="formBasiccarName">
                                    <Form.Label>Car Name</Form.Label>
                                    <Form.Control type="text" name="Name" value={carInfo.Name} onChange={handleChage} required />

                                </Form.Group>

                                <Form.Group controlId="formBasicbrandName">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control type="text" name="brandName"  value={carInfo.brandName} onChange={handleChage} required />
                                </Form.Group>

                                <Form.Group controlId="formBasicmodel">
                                    <Form.Label>Model Number</Form.Label>
                                     <Form.Control  type="text" name="modelName" onChange={handleChage} required  value={carInfo.modelName}>
                                     </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control  type="text" name="price" onChange={handleChage} required  value={carInfo.price}>
                                     </Form.Control>
                                </Form.Group>
                            </div >
                            <div id="part2" >
                                <Button className="btnstyle2" onClick={() => document.getElementById("file").click()}><HiCloudUpload /> Upload Photo</Button>
                                <input type="file" name="file" id="file"  onChange={handleChageFile} style={{ display: "none" }} />
                                <small style={{ padding: "10px", color: "#009444" }}>{carInfo.file.name}</small>
                                {
                                    error && <small style={{ padding: "10px", color: "red", fontWeight: "600" }}>have to to upload an image</small>
                                }
                            </div>
                        </div>
                        <Button className="btnstyle3" style={{marginTop:"20px",padding:"5px 20px"}} variant="primary" type="submit">
                            Submit
                            </Button>

                    </Form>

                ) : (
                        <div style={{marginTop:"15px"}}>
                            <h3 className="h1Style">Add service Successfully</h3>
                            <Button className="btnstyle2" onClick={() => setContent(true)}>Add Another</Button>
                        </div>
                    )
            }


        </div>
    );
};

export default AddCar;