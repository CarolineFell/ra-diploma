/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React from 'react';
import { useHistory } from 'react-router-dom';

// Uploading cards in catalog

export default function Card(props) {
  const { item } = props;
  const history = useHistory();

  const handleProduct = (event, id) => {
    event.preventDefault();
    history.push(`catalog/${id}`);
  };

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={item.images[0]}
             className="card-img-top img-fluid"
             onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://akson.ru/upload/iblock/dd7/dd7f416c31b988aae3e6d8e774927b3e.jpg';
             }}
             alt={item.title} />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price} руб.</p>
          <a onClick={() => {handleProduct(event, item.id);}} className="btn btn-outline-primary">Заказать</a>
        </div>
      </div>
    </div>
  );
}
