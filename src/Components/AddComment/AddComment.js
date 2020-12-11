import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = (props) => {
    const [commentData, setCommentData] = useState({carId:props.carId,name:"",commentBody:""})
    
    const handleChage = e => {
        const newComment = { ...commentData }
        newComment[e.target.name] = e.target.value;
        setCommentData(newComment)
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(commentData);
        fetch('https://guarded-caverns-49792.herokuapp.com/addComments', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                
              },
            body: JSON.stringify(commentData)

        })
        .then(res=>{
            props.setComments([...props.Comments, commentData])
            setCommentData({carId:props.carId,name:"",commentBody:""})
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div>
            <h2>Add A Comment</h2>
                <Form onSubmit={handleSubmit} style={{padding:"20px",width:"60%",margin:"auto",marginTop:"10px"}} >
                       
                            <Form.Group controlId="formBasiccarName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" name="name" value={commentData.Name} onChange={handleChage} required />

                                </Form.Group>

                                <Form.Group controlId="formBasicbrandName">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" rows="3"  name="commentBody"  value={commentData.commentBody} onChange={handleChage} required />
                                </Form.Group>
                                <Button type="submit">Send</Button>
                        </Form>
        </div>
    );
};

export default AddComment;