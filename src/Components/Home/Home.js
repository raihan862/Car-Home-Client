import React, { useState } from 'react';
import {Button, Col, Row} from 'react-bootstrap'
import AddCar from '../AddCar/AddCar';
import AllCars from '../AllCars/AllCars';
import Sidebar from '../SideBar/Sidebar';
const Home = () => {
    const [Them, setThem] = useState({ them: "allCars", title: "All Cars" });
    return (
        <Row style={{ backgroundColor: "#F4F7FC", width: "100%" }} id="librarian">
            <Col xs={4} sm={4} md={3} lg={3} xl={2} style={{ padding: "0px" }}>
                <Sidebar setThem={setThem} />
            </Col>
            <Col xs={8} sm={8} md={9} lg={9} xl={10} style={{ padding: "0px" }}>
                <div className="title" id="homeStyle">
                    <h4 className="h1Style">{Them.title}</h4>
                </div>
                <div>
                    {
                        Them.them == "allCars" && <AllCars />
                    }
                    {
                        Them.them == "addCar" && <AddCar />
                    }
                </div>
            </Col>
        </Row>
    );
};


export default Home;