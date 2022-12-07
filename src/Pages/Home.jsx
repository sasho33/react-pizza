import React, { useContext, useEffect, useState, useRef } from 'react';
import qs from 'qs'; //import qs for reference showing url
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate(); //function navigate from useNavigate hooks
  const dispatch = useDispatch(); // dispatch funvtion from redux declaration (default)
  const isSearch = useRef(false); // checkind fetch query necesserity
  const isMounted = useRef(false); // checking url forming necesserity due first render
  const fetchingPizzas = () => {
    //function to fetch JSON data from back-end
    setIsLoading(true); // showing skeletons

    const order = sortType.includes('-') ? 'desc' : 'ask';
    const sortBy = sortType.replace('-', '');
    const search = searchValue;

    axios // fetching data with pizza array from mokapi server
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
  };

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter); //get state from filterSlice
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext); //значение из SearchContext для поиска
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //проверка загружена страницы или нет
  // const [currentPage, setCurrentPage] = useState(1);
  const sortList = [
    { name: 'популярности (ASC)', sortProperty: 'rating' },
    { name: 'популярности (DESC)', sortProperty: '-rating' },
    { name: 'цене (ASC)', sortProperty: 'price' },
    { name: 'цене (DESC)', sortProperty: '-price' },
    { name: 'алфавиту (ASC)', sortProperty: 'title' },
    { name: 'алфавиту (DESC)', sortProperty: '-title' },
  ];

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    //if first render has done, we checking for url parametrs and save them to redux
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); //deleting "?" from the start of url

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      //checking if do we need to commit fetch query without changing any filters
      fetchingPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]); // data, which affect on use Effect statment

  React.useEffect(() => {
    //if some parametrs have been changed and was first render
    if (isMounted.current) {
      // non-first render?
      const queryString = qs.stringify({
        //functionality for adress field url showing
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`); //useNavigate for inserting relative Url
    }
    isMounted.current = true;
  }, [categoryId, sort, categoryId]); // useSelector data retrieving

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
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
