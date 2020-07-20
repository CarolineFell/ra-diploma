import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchProductRequest, fetchProductClear } from '../../../actions/productActions';
import { changeBasket } from '../../../utils/basket-storage';

// Product personal page

export default function ProductPage(props) {
  const { item, loading, error } = useSelector((state) => state.productItem);
  const [avalibleSize, setAvalibleSize] = useState({ selectedSize: '', sizes: [] });
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const { match } = props;
  const id = Number(match.params.id);

  useEffect(() => {
    dispatch(fetchProductRequest(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (item.id) {
      setAvalibleSize({
        sizes: item.sizes
          .filter((item) => item.avalible)
          // eslint-disable-next-line array-callback-return
          .map((itemSize, index) => {
            if (itemSize.avalible) {
              return {
                id: index,
                size: itemSize.size,
                selected: false,
              };
            }
          })
      });
    }
  }, [item]);

  const handleChangeSize = (id) => {
    setAvalibleSize((prevAvalibleSize) => ({
      selectedSize: prevAvalibleSize.sizes[id].size,
      sizes: prevAvalibleSize.sizes.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: true,
          };
        }
        return {
          ...item,
          selected: false,
        };
      }),
    }));
  };

  const handleChangeAmount = (value) => {
    const changeAmount = amount + value;
    if (changeAmount > 0 && changeAmount <= 10) {
      setAmount(changeAmount);
    }
  };

  const handleAddProduct = () => {
    const product = {
      id: item.id,
      title: item.title,
      size: avalibleSize.selectedSize,
      price: item.price,
      amount,
    };
    changeBasket(product);

    dispatch(fetchProductClear());
    history.push('/cart');
  };

  const handleRepeat = () => {
    dispatch(fetchProductRequest(id));
  };

  return (
    <>
      {error && <div className="error-msg">
        <p>Произошла ошибка</p>
        <div onClick={handleRepeat}>Повторить запрос</div>
      </div>}
      
      {loading && <div className="preloader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>}
      
      {!loading && item.id &&
        <section className="catalog-item">
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>Размеры в наличии:
                  {avalibleSize.sizes.map((itemSize) => <span
                    className={`catalog-item-size${itemSize.selected && ' selected'}`}
                    key={itemSize.id}
                    onClick={() => { handleChangeSize(itemSize.id) }}>
                      {` ${itemSize.size}`}
                  </span>)
                }</p>
                {!!avalibleSize.sizes.length && <p>Количество: <span className="btn-group btn-group-sm pl-2">
                  <button className="btn btn-secondary" onClick={() => handleChangeAmount(-1)}>-</button>
                  <span className="btn btn-outline-primary">{amount}</span>
                  <button className="btn btn-secondary" onClick={() => handleChangeAmount(1)}>+</button></span>
                </p>}
              </div>
              {!!avalibleSize.sizes.length && <button className="btn btn-danger btn-block btn-lg" disabled={!avalibleSize.selectedSize} onClick={handleAddProduct}>В корзину</button>}
            </div>
          </div>
        </section>
      }
    </>
  );
}
