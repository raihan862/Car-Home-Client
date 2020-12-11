import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { HiCloudUpload } from 'react-icons/hi'
 
import { useHistory, useLocation } from 'react-router-dom';
const UpdateCarInfo = () => {
    const location = useLocation()
    const Info = location.state.info;
    const {Name,brandName,modelName,price} = Info
     console.log(Info.uploadedPhoto);
    const [carInfo, setCarInfo] = useState({ Name,brandName,modelName,price,file: "" })
    const [error, setError] = useState(false);
     const history = useHistory()
    
    const handleChage = e => {
        const newService = { ...carInfo }
        newService[e.target.name] = e.target.value;
        setCarInfo(newService)
    }
    const handleChageFile = e => {
        const newService = { ...carInfo }
        newService.file = e.target.files[0]
        setCarInfo(newService)
        setError(false)
    }

    const handleSubmit = e => {
        e.preventDefault();
        
    
        let data = new FormData();
       
        data.append('Name', carInfo.Name)
        data.append('brandName', carInfo.brandName)
        data.append('modelName', carInfo.modelName)
        data.append('price', carInfo.price)
        if (Info.uploadedPhoto) {
            data.append('contentType', Info.uploadedPhoto.contentType)
            data.append('size', Info.uploadedPhoto.size)
            data.append('img', Info.uploadedPhoto.img)
        }
       if (Info.photo) {
        data.append('photo', Info.photo)
       }
       console.log(data.get('uploadedPhoto'));
        
        data.append('file', carInfo.file)
        
       
            fetch(`https://guarded-caverns-49792.herokuapp.com/updateCar/${Info._id}`, {
                method: "PUT",
                body:data

            }).then(res => {
               
                fetch(`https://guarded-caverns-49792.herokuapp.com/getCar/${Info.modelName}`)
                .then(response => response.json())
                .then(Data => {
                    history.push({
                pathname:"/carDetails",
                state: {
                   info: Data  
               }
             })
                  
            })
                 
            })
                .catch(err => {
                   
                })
        

    }

    
    return (
        <div style={{ width: "80%", backgroundColor: "white",margin:"auto"  }}>
            
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
                                <small style={{ padding: "10px", color: "#009444" }}>{carInfo.file.name  }</small>
                                {
                                    error && <small style={{ padding: "10px", color: "red", fontWeight: "600" }}>have to to upload an image</small>
                                }
                            </div>
                        </div>
                        <Button className="btnstyle3" style={{marginTop:"20px",padding:"5px 20px"}} variant="primary" type="submit">
                            Update
                            </Button>

                    </Form>

                
            


        </div>
    );
};

export default UpdateCarInfo;