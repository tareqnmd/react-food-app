import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './Food.css';
import { Carousel, Container } from 'react-bootstrap';
import car1 from '../../images/carousel/carousel1.jpg'
import car2 from '../../images/carousel/carousel2.jpg'
import car3 from '../../images/carousel/carousel3.jpg'
import ShowFood from '../ShowFood/ShowFood';
import Cart from '../Cart/Cart';
import Paginate from '../Paginate/Paginate'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Foods = () => {
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const url = 'https://hot-onion.herokuapp.com/api/v1/foods';
        Axios(url)
            .then(result => setFoods(result.data.data.foods))
    }, [])
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

    const handleButton=(food) => {
        console.log(food._id)
        const sameFood=cart.find(cart=>cart._id===food._id);
        let count=1;
        let newCart;
        if(sameFood){
          count=food.quantity+1;
          food.quantity=count;
          const others=cart.filter(cart=>cart._id!==food._id);
          newCart=[...others,sameFood];
        }
        else{
           food.quantity=1;
           newCart=[...cart,food];
        }
        setCart(newCart);
         addToDatabaseCart(food._id,count);
    }
    const[currentPage,setCurrentPage] =useState(1); 
    const[perPage]=useState(6); 

    const indexOfLastContent=currentPage*perPage; 
    const indexOfFirstContent=indexOfLastContent-perPage; 
    const currentContent=foods.slice(indexOfFirstContent,indexOfLastContent);

    const paginate=(number) => { setCurrentPage(number); }

    return (
        <div>
            <Container>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={car1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Black Bean Fajitas</h3>
                            <p>Stunningly delicious street food, magnificent banquets, quiet family dinners: each is beautiful in it's own right.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={car2}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className="colorStyle">Vegetables</h3>
                            <p className="colorStyle">Stunningly delicious street food, magnificent banquets, quiet family dinners: each is beautiful in it's own right.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 imgStyle"
                            src={car3}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 >Beautiful Fries</h3>
                            <p >Stunningly delicious street food, magnificent banquets, quiet family dinners: each is beautiful in it's own right.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="mainContent">
                    <div className='row showFood'>
                        {
                            currentContent.map(food => <ShowFood handleButton={handleButton} key={food._id} food={food}></ShowFood>)
                        }
                        <div style={{marginLeft:'45%'}}>
                        <Paginate currentPage={currentPage} paginate={paginate} perPage={perPage} total={foods.length}></Paginate>
                        </div>  
                    </div>
                    <div className='showCart'>
                        <Cart showButton={true} cart={cart}></Cart>
                    </div>

                </div>
            </Container>

        </div>
    );
};

export default Foods;
