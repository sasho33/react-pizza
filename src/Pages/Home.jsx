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
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useNavigate } from 'react-router-dom';
import { menu as sortList } from '../components/Sort';

const Home = () => {
  const navigate = useNavigate(); //function navigate from useNavigate hooks
  const dispatch = useDispatch(); // dispatch funvtion from redux declaration (default)
  const isSearch = useRef(false); // checkind fetch query necesserity
  const isMounted = useRef(false); // checking url forming necesserity due first render

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter); //get state from filterSlice
  const { items, status } = useSelector((state) => state.pizza);
  const sortType = sort.sortProperty;
  const { searchValue } = useContext(SearchContext); //значение из SearchContext для поиска
  // const [items, setItems] = useState([]); //pizzas array
  // const [isLoading, setIsLoading] = useState(true); //проверка загружена страницы или нет
  // const sortList = [
  //   { name: 'популярности (ASC)', sortProperty: 'rating' },
  //   { name: 'популярности (DESC)', sortProperty: '-rating' },
  //   { name: 'цене (ASC)', sortProperty: 'price' },
  //   { name: 'цене (DESC)', sortProperty: '-price' },
  //   { name: 'алфавиту (ASC)', sortProperty: 'title' },
  //   { name: 'алфавиту (DESC)', sortProperty: '-title' },
  // ];

  const fetchingPizzas = async () => {
    //function to fetch JSON data from back-end
    // setIsLoading(true); // showing skeletons

    const order = sortType.includes('-') ? 'desc' : 'ask';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue;

    dispatch(fetchPizzas({ currentPage, order, sortBy, search, categoryId }));

    window.scrollTo(0, 0);
  };

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
    // if (!isSearch.current) {
    //checking if do we need to commit fetch query without changing any filters
    fetchingPizzas();
    // }

    // isSearch.current = false;
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
      {status === 'rejected' ? (
        <div class="content__error-info">
          <h2>Произошла ошибка :(</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позжею</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
