import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LoadingGif from '../LodingSpinner/LodingGif';
import Pagination from '../Paggination/Pagination';
import CarInfo from './CarInfo';
const AllCars = () => {
    const [carData, setCarData] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const itemPerPage = 5;
    const [activePage,setActivePage] = useState(1)

    useEffect(() => {
        fetch('https://guarded-caverns-49792.herokuapp.com/getCars')
            .then(response => response.json())
            .then(Data => {
                
                setCarData(Data)
            })
    }, [carData])

     
    const  item = carData.filter(data=> data.brandName.toLowerCase().match(searchValue.toLowerCase()) )
    const lastPage = activePage * itemPerPage
    const firstPage = lastPage  - itemPerPage;
    const filterData = item.slice(firstPage, lastPage )
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(item.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSerach = event =>{
        setSearchValue(event.target.value);

    }
    const handlePage=number=>{
         
        setActivePage(number)
    }
    return (

        <div style={{ width: "80%", margin: "auto", padding: "30px" }}>
            {
                carData.length == 0 && <LoadingGif></LoadingGif>
            }
            
            <div id="search" >
                <input id="inp"  type="text" onChange={handleSerach} placeholder="search here"></input> 
                <Button id= "btn" type="submit">Submit</Button>
            </div>
            {
                filterData.map(data =>
                    <Link to={{pathname:"/carDetails",
                    state: {
                       info: data
                   }}}>
                    <CarInfo data={data}></CarInfo>
                    </Link>
                )
            }
            {
                filterData.length == 0 && <h1 style={{textAlign:"center",padding:"20px 5px"}}>No Data Found</h1>
            }
            <div style={{ margin:"auto",padding:"10px"}}>
            <Pagination  handlePage ={handlePage} pageNumbers ={pageNumbers}></Pagination>
            </div>
       
        </div>
    )
};

export default AllCars;