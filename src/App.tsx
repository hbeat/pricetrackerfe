import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
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

  const [products, setProducts] = useState({});

  const fetchProudct = async () => {
    axios
      .get('https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get('https://pricetracker-2ed88b8b3e1f.herokuapp.com/v1/product')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div>
        <div>
          <input
            placeholder="Product"
            onChange={(e) => {
              console.log('search text field = ', e.target.value.toLowerCase());
              setQueryProduct(e.target.value.toLowerCase());
            }}
          />
          <button>Search</button>
        </div>
        <div>Chart Display</div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Product"
          onChange={(e) => {
            console.log('input text field = ', e.target.value.toLowerCase());
            setProductName(e.target.value.toLowerCase());
          }}
        />
        <input
          type="number"
          placeholder="Price"
          pattern="[0-9.]+"
          onChange={(e) => {
            console.log('price input text field = ', e.target.value);
            setPrice(parseFloat(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Source"
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
          onChange={(e) => {
            console.log(e.target.value.split('-'));
            setDate(e.target.value.split('-'));
          }}
        />
        <button
          onClick={() => {
            if (price && productName && source) {
              axios
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
                  console.log(res);
                  fetchProudct();
                  alert('success fully added');
                })
                .catch((err) => console.error(err));
            } else {
              alert(
                'Fail to Track, something wrong with the entered data e.g. leave some field blank'
              );
            }
          }}
        >
          Track
        </button>
      </div>
      <p>
        {queryProduct}/{productName}/{date}/{source}/{price}
      </p>
      {JSON.stringify(products)}
    </div>
  );
}
