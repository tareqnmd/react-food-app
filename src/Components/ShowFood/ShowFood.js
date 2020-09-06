import React from 'react';
import './ShowFood.css'
import { Card, Button } from 'react-bootstrap';

const ShowFood = ({ food,handleButton,removeButton }) => {
    const { _id, title, catagories, img, price } = food;
    return (
        <div className="col-10 col-sm-6 col-md-6 col-lg-4 foodDetails">
            <Card>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>Type : {catagories}</Card.Text>
                    <Card.Text>${price}</Card.Text>
                    {handleButton && <Button onClick={() =>handleButton(food)} variant="primary">Order Now</Button>}
                    {removeButton && <Button onClick={() =>removeButton(_id)} variant="primary">Remove</Button>}
                </Card.Body>
            </Card>
        </div>
    );
};

export default ShowFood;

