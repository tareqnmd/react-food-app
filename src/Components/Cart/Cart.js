import React from 'react';
import { Button } from 'react-bootstrap';

const Cart = ({cart,showButton,placeOrder}) => {
    const totalPrice=cart.reduce((sum,cart)=>sum+(cart.price*cart.quantity),0)
    let lastItem='';
    if(cart.length>0){
        lastItem=cart[cart.length-1];
    } 
    return (
        <div>
            <h5>Review : </h5>
            <p>Last Item : {lastItem.title}</p>
            <p>Last Item Quantity : {lastItem.quantity}</p>
            <p>Last Item Price : {lastItem.price}</p>
            <p>Items Ordered : {cart.length}</p>
            <p>Total Price : ${totalPrice}</p>
            {showButton && <Button href='/cart' variant="primary">Review Order</Button>}
            {placeOrder && <Button onClick={() =>placeOrder()} href='/cart' variant="success">Place Order</Button>}
        </div>
    );
};

export default Cart;