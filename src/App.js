import React, { useState } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock/index';
import Skeleton from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetch('https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : items.map(
                  (obj) => <PizzaBlock key={obj.id} {...obj} />,

                  // title={obj.title}
                  // price={obj.price}
                  // sizes={obj.sizes}
                  // imageUrl={obj.imageUrl}
                  // types={obj.types}
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
