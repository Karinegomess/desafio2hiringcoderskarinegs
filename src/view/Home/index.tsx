import React, { useState, useEffect } from 'react';

import Cart from '../../assets/cart.png'

import { Container } from './style';

import api from '../../services/api';

interface IProduct{ 
    id: number;
    photo: string;
    name: string;
    description: string;
    price: number;
}

const Home: React.FC = () => {
    const [ data, setData ] = useState <IProduct[]>([]);
    const [ cart, setCart ] = useState <IProduct[]>([]);


    useEffect(() =>{
        api.get('').then(
        response => {
                setData(response.data)
            }
        )
    }, [])
  
    const handleCart = (index: number) => {
      let push: any = [ ... cart, cart.push(data[index])]
      setCart(push)
      const productStore = JSON.stringify (cart);
      localStorage.setItem('@cart', productStore)
    }

    return (
      <Container>
          <div className="nav">
            <div>
                <img src="https://scontent.fcgh23-1.fna.fbcdn.net/v/t1.18169-9/12741869_450072291849058_482038605668147902_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=eNwA7q-rTHIAX8GEdKd&_nc_ht=scontent.fcgh23-1.fna&oh=4d97efb30fdabbf64b17e17b8a47a531&oe=6120E4E7" alt="Criarerecriar" width="100px" height="auto" />
            </div>
            <div className="cart">
                <img src={Cart} alt= "shopcart" width="50px" height="auto" />
            <span>( {cart.length} ) - Itens</span>
            </div>
              
          </div>
          <section>
              { data.map( (prod, index) => (
                <div className= "product-content" key={prod.id}>
                    <img src={prod.photo} alt="Cursos" width="200" height="auto" />
                    <h4>{prod.name}</h4>
                    <span>{prod.description}</span>
                    <h6>{prod.price}</h6>
                    <button onClick={ () => handleCart(index)}>Adicionar ao carrinho </button>
                </div>      
              ))}
            
          </section>
      </Container>
  );
}

export default Home;