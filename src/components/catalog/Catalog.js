import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCatalogCategories, fetchCatalogCategoriesChange, fetchCatalogItemsRequest } from '../../actions/catalogActions';
import Card from './product/Card';

// Catalog

export default function Catalog() {
  const {
    categories,
    activeCategory,
    responseItemsAmount,
    items,
    search,
    loading,
    loadingCategory,
    error
  } = useSelector((state) => state.catalogList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogCategories());
  },[dispatch]);

  const handleChangeCategory = (event, id) => {
    event.preventDefault();
    dispatch(fetchCatalogCategoriesChange(id));
  };

  const handleMoreItems = () => {
    dispatch(fetchCatalogItemsRequest());
  };

  const handleError = () => {
    if (categories.length <= 1) {
      dispatch(fetchCatalogCategories());
    } else {
      dispatch(fetchCatalogItemsRequest());
    }
  };

  return (
    <>
      {!loadingCategory && <React.Fragment>
        {categories.length > 1 && <ul className="catalog-categories nav justify-content-center">
          {categories.map((item) => (
            <li className="nav-item" key={item.id}>
              <a className={item.id === activeCategory ? "nav-link active" : "nav-link"}
                 href="#0"
                 // eslint-disable-next-line no-restricted-globals
                 onClick={() => {handleChangeCategory(event, item.id)}}>{item.title}</a>
            </li>
          ))}
        </ul>}
        <div className="row">
          {!loading && search && !items.length && <p>Ничего не найдено</p>}
          {items.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </React.Fragment>}

      {loading && <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>}

      {error && <div className="error-msg">
        <p>Произошла ошибка.</p>
        <div onClick={handleError}>Повторить</div>
      </div>}

      {responseItemsAmount > 5 && <div className="text-center">
        <button onClick={handleMoreItems} className="btn btn-outline-primary" disabled={loading}>Загрузить ещё</button>
      </div>}
    </>
  )
}
