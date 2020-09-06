import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ShowFood from '../ShowFood/ShowFood';
import Axios from 'axios';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';

const CartReview = () => {
    const [cart, setCart] = useState([]);
    const savedCart = getDatabaseCart();
    const foodId = Object.keys(savedCart);
    useEffect(() =>{
        const url = 'https://hot-onion.herokuapp.com/api/v1/foods';
        Axios(url)
        .then(result =>{
            const newFoods=foodId.map(id=>{
                const foundFood=(result.data.data.foods).find(food=>food._id===id);
                foundFood.quantity=savedCart[id];
                return foundFood;
            })
            setCart(newFoods);
        })
    },[])
    const removeButton =(id)=>{
        const newCart=cart.filter(cart=>cart._id!==id);
        setCart(newCart);
        removeFromDatabaseCart(id);
    }
    const placeOrder=()=>{
        processOrder(cart);
    }
    return (
        <div>
        <Container>
        <h1>Ordered Items:</h1>
        <div className="mainContent">
            <div className="row showFood">
            {
                cart.map(food=><ShowFood removeButton={removeButton} key={food._id} food={food}></ShowFood>)
            }
            </div>  
            <div className='showCart'>
                <Cart placeOrder={placeOrder} cart={cart}></Cart>
            </div>  
            
        </div>
        </Container>
        </div>
    );
};

export default CartReview;