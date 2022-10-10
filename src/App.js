import React from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';
import pizzas from './assets/pizzas.json';

console.log(pizzas);

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {pizzas.map((obj) => (
              <PizzaBlock {...obj} />
              // title={obj.title}
              // price={obj.price}
              // sizes={obj.sizes}
              // imageUrl={obj.imageUrl}
              // types={obj.types}
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
