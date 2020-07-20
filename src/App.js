import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Banner from './components/main/Banner';
import Footer from './components/footer/Footer';
import MainPage from './components/main/MainPage';
import CatalogPage from './components/catalog/CatalogPage';
import AboutPage from './components/about/AboutPage';
import ContactsPage from './components/contacts/ContactsPage';
import Page404 from './components/error404/Page404';
import ProductPage from './components/catalog/Product/ProductPage';
import CartPage from './components/cart/CartPage';
import './App.css';
require.context('./img');

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner />
              <Switch>
                <Route exact path={`/catalog/:id`} component={ProductPage} />
                <Route exact path={`/catalog`} component={CatalogPage} />
                <Route exact path={`/about`} component={AboutPage} />
                <Route exact path={`/contacts`} component={ContactsPage} />
                <Route exact path={`/cart`} component={CartPage} />
                <Route exact path={`/`} component={MainPage} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </div>
        </main>
        <Footer />
      </Router>
    </>
  );
}
