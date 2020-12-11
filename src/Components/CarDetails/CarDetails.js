import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CarInfo from '../AllCars/CarInfo';

const CarDetails = () => {
    const location = useLocation()
    const Info = location.state.info;
    const history = useHistory()
    const {Name,brandName,modelName,price} = Info

    const handleDelete = id=>{
        fetch(`http://localhost:5000/deleteCar/${id}`, {
                        method:"DELETE"
                }).then(res=>{  
                      history.replace('/')
                })
    }
    return (
        <div >
            <div style={{backgroundColor: "#eee", marginTop: "15px", padding: "20px"}}>
            <CarInfo data={Info} ></CarInfo>
            <div style={{textAlign:"center",paddingLeft:"200px"}}>
            <Link to={{
                 pathname:"/updateCarInfo",
                 state: {
                    info: Info  
                }
            }}>
            <Button style={{ padding:"5px 30px"}} variant="warning" >Update</Button>
            </Link>
            <Button style={{marginLeft:"5px",padding:"5px 30px"}} variant="danger" onClick = {()=>handleDelete(Info._id)}>Delete</Button>
            </div>
            </div>
        </div>
    );
};

export default CarDetails;