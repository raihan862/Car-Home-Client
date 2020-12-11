import React from 'react';
import { Button } from 'react-bootstrap';
 
 
import './sidebar.css'
const Sidebar = (props) => {
    const handleOption=(them,title)=>{
      
        props.setThem({them,title})
      }
    return (
        <div style={{backgroundColor:"#FFFF",height:"100vh",padding:"25px"}}>
            
            <div className="sidelink">
            <Button variant="" className="btnStyle" onClick={()=>handleOption('allCars','All Cars')}>
                 <span className="btnText">All Cars</span>
            </Button>
            
            <Button variant="" className="btnStyle" onClick={()=>handleOption('addCar', 'Add Car')}>
                  <span className="btnText">Add Car</span>
            </Button>
            
             
            </div>
        </div>
    );
};  

export default Sidebar;