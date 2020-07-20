export function changeBasket(itemProduct) {
  let productList = JSON.parse(localStorage.getItem('basketProdct'));
  const indexProducts = productList.findIndex((item) => item.id === itemProduct.id && item.size === itemProduct.size);
  if (indexProducts !== -1) {
    productList = productList.map((product) => {
      if (product.id === itemProduct.id) {
        return {
          ...product,
          amount: Number(product.amount) + Number(itemProduct.amount),
        };
      } else {
        return { ...product };
      }
    });
  } else {
    productList.push(itemProduct);
  }
  localStorage.setItem('basketProdct', JSON.stringify(productList));
  return productList;
}

export function removeBasket(idAndSize) {
  let productList = JSON.parse(localStorage.getItem('basketProdct'));
  productList = productList.filter((item) => `${item.id}${item.size}` !== idAndSize);
  localStorage.setItem('basketProdct', JSON.stringify(productList));
  return productList;
}

export function clearBasket() {
  localStorage.setItem('basketProdct', JSON.stringify([]));
  return [];
}

export function getLastBasket() {
  return JSON.parse(localStorage.getItem('basketProdct'));
}
