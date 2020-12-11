import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AddComment from '../AddComment/AddComment';
import CarInfo from '../AllCars/CarInfo';

const CarDetails = () => {
    const location = useLocation()
    const Info = location.state.info;
    const history = useHistory()
    const {Name,brandName,modelName,price} = Info

    const [Comments, setComments] = useState([])

    useEffect(()=>{
        fetch(`https://guarded-caverns-49792.herokuapp.com/getComments/${Info._id}`)
        .then(response => response.json())
        .then(Data => {
            
            setComments(Data)
        })
    },[])
    const handleDelete = id=>{
        fetch(`https://guarded-caverns-49792.herokuapp.com/deleteCar/${id}`, {
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

            <div style={{width:"60%",margin:"auto"}} id="comments">
                <h2 >All Comments</h2>
                {
                    Comments.length ==0 && <h3 style={{textAlign:"center",color:"red"}}>No Comments</h3>
                }
                {
                    Comments.map(com=>
                        <div style={{backgroundColor: "#fff", marginTop: "10px", padding: "20px"}}>
                        <h4>{com.name}</h4>
                        <p>{com.commentBody}</p>
                         </div>
                        )
                }
                <AddComment carId= {Info._id} Comments ={Comments} setComments = {setComments} ></AddComment>
            </div>
            </div>
        </div>
    );
};

export default CarDetails;