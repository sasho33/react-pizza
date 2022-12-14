import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: string;
};

type PopupClick = MouseEvent & {
  path: Node[]; // typeScrip declaration for path event
};

export const menu: SortItem[] = [
  { name: 'популярности (ASC)', sortProperty: 'rating' },
  { name: 'популярности (DESC)', sortProperty: '-rating' },
  { name: 'цене (ASC)', sortProperty: 'price' },
  { name: 'цене (DESC)', sortProperty: '-price' },
  { name: 'алфавиту (ASC)', sortProperty: 'title' },
  { name: 'алфавиту (DESC)', sortProperty: '-title' },
];

function Sort() {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  // const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const sortRef = useRef<HTMLDivElement>(null); // trigger to close pop-up window
  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj));
    // onChangeSort(obj);
    setOpen(false);
  };

  useEffect(() => {
    //functionality to hide filter sorting-window after click on any place
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false);
        // console.log('click outside');
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
    // removing EventListener for avoiding dublicated event listeners conflict
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {menu.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;