import React, { useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'популярности (ASC)',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sort.includes('-') ? 'desc' : 'ask';
    const sortBy = sortType.sort.replace('-', '');
    const search = searchValue;

    fetch(
      `https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=${order}&search=${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map(
    (obj) => <PizzaBlock key={obj.id} {...obj} />,
    // title={obj.title}
    // price={obj.price}
    // sizes={obj.sizes}
    // imageUrl={obj.imageUrl}
    // types={obj.types}
  );
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        onChangePage={(number) => {
          setCurrentPage(number);
        }}
      />
    </div>
  );
};

export default Home;
