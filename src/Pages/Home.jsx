import React, { useContext, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort } = useSelector((state) => state.filter); //get state from filterSlice
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext); //значение из SearchContext для поиска
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //проверка загружена страницы или нет
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  console.log(sortType);
  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'desc' : 'ask';
    const sortBy = sortType.replace('-', '');
    const search = searchValue;

    // fetch(
    //   //fetching data from mokapi database
    //   ,
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://634548cb39ca915a69fa9fb0.mockapi.io/pizzaItems?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortBy}&order=${order}&search=${search}`,
      )
      .then((res) => {
        setItems(res.data);
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
        <Categories value={categoryId} onClickCategory={(id) => onChangeCategory(id)} />
        <Sort />
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
