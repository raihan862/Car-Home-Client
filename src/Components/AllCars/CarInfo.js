import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CarInfo = ({data}) => {
    return (
        <Row style={{ backgroundColor: "#eee", marginTop: "15px", padding: "20px"}}>
                        <Col>
                            {
                            data.uploadedPhoto ? (
                                <img src={`data:image/png;base64,${data.uploadedPhoto.img}`} width="60%" style={{maxHeight:"400px"}} alt="" />
                            ) : (
                                    <img src={data.photo} width="70%" alt="" style={{maxHeight:"350px"}} />
                                )
                                }

                        </Col>
                        <Col id="carInfo">
                            <h2>{data.Name}</h2>
                            <h6>{data.brandName}</h6>
                            <h6>{data.modelName}</h6>
                            <h6> ${data.price}</h6>
                                    

                        </Col>

                    </Row>
    );
};

export default CarInfo;