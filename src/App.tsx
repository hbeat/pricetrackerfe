import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { DisplayChart } from './component/DisplayChart';
import { DisplayTable } from './component/DisplayTable';
import './style.css';

export default function App() {
  // let [year, month, day] = new Date().toISOString().slice(0, 10).split('-');
  //add prevent where product name is null when add track
  const [queryProduct, setQueryProduct] = useState('');

  const [productName, setProductName] = useState('');
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10).split('-')
  );
  const [price, setPrice] = useState(0.0);
  const [source, setSource] = useState('');

  // all product data from db
  const [products, setProducts] = useState({});

  const [focusProduct, setfocusProduct] = useState(null);
  const [focusProductData, setfocusProductData] = useState(null);

  useEffect(() => {
    fetchProudct();
  }, []);

  const resetTrackInput = () => {
    setPrice(0.0);
    setProductName('');
    setSource('');
    setDate(new Date().toISOString().slice(0, 10).split('-'));
  };
  
  const filterFocusProduct = (product) => {
    setfocusProduct(product);
    if (products.data) {
      let productData = products.data.filter(function (el) {
        return el.name == product;
      });
      setfocusProductData(productData);
    }
  };

  const fetchProudct = async () => {
    await axios
      .get('https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product')
      .then((res) => {
        console.log('Fetch result', res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Can not get data from database');
      });
  };

  const insertProduct = async () => {
    if (price && productName && source) {
      await axios
        .post(
          // 'http://localhost:3000/v1/product',
          'https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product',
          {
            price: price,
            name: productName,
            source: source,
            date: date,
          }
        )
        .then((res) => {
          console.log('Result from post', res);
          fetchProudct();
          resetTrackInput();

          filterFocusProduct(res.data.data.name);
          alert('success fully added');
        })
        .catch((err) => {
          console.error(err);
          alert('Can not send to database');
        });
    } else {
      alert(
        'Fail to Track, something wrong with the entered data e.g. leave some field blank'
      );
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Product"
          value={productName}
          onChange={(e) => {
            console.log('input text field = ', e.target.value.toLowerCase());
            setProductName(e.target.value.toLowerCase());
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          pattern="[0-9.]+"
          onChange={(e) => {
            console.log('price input text field = ', e.target.value);
            setPrice(parseFloat(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => {
            console.log(
              'source input text field = ',
              e.target.value.toLowerCase()
            );
            setSource(e.target.value.toLowerCase());
          }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => {
            console.log(e.target.value.split('-'));
            setDate(e.target.value.split('-'));
          }}
        />
        <button
          onClick={() => {
            insertProduct();
          }}
        >
          Track
        </button>
      </div>
      {/* <p>
        {queryProduct}/{productName}/{date}/{source}/{price}
      </p> */}
      <div>
        {/* <div className={"search"}>
          <input
            placeholder="Product"
            onChange={(e) => {
              console.log('search text field = ', e.target.value.toLowerCase());
              setQueryProduct(e.target.value.toLowerCase());
            }}
          />
          <button>Search</button>
        </div> */}
        <div className={"Chart"}>
        {focusProduct && focusProductData && (
          <DisplayChart value={focusProductData} />
        )}
        </div>
      </div>
      <div className={"Table"}>
        <DisplayTable data={products.data} filterFocusProduct={filterFocusProduct} />
      </div>
      {/* {JSON.stringify(products)} */}
    </div>
  );
}
