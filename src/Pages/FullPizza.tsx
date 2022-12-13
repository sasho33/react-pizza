import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems/' + id,
        );
        setPizza(data);
      } catch (e) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>'Loading...';</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₴</h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae error neque modi quos vero
        voluptas ad nostrum ex? Maxime id aperiam fuga, dignissimos ea illum odio facere repellendus
        eius aut! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium mollitia
        sapiente laborum ratione, nemo laudantium amet animi vitae, facilis consequuntur possimus
        quidem esse itaque nesciunt magni autem quia, ad suscipit?
      </p>
    </div>
  );
};

export default FullPizza;
