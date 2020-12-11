import React from 'react';
import loding from '../../loding.gif'
const LoadingGif = () => {
    return (
        <div style={{textAlign:"center"}}> 
            <h5 className="h1Style">Data is loding....</h5>
            <img src={loding} alt=""/>
        </div>
    );
};  
 
export default LoadingGif;