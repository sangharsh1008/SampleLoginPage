import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

function Category(props) {
  const [cateData, setCateData] = useState([]);

  let { categoryName } = useParams();

  useEffect(() => {
    fetchCategory(categoryName);
  }, [categoryName]);

  const fetchCategory = async (categoryName) => {
    let res = await axios
      .get(`https://fakestoreapi.com/products/category/${categoryName}`)
      .catch((err) => console.error(err));
    setCateData(res.data);
    //console.log(category);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        {cateData
          ? cateData.map((d, i) => {
              return (
                <ProductCard
                  data={d}
                  index={d.id}
                  key={d.id}
                  className="product-card"
                />
              );
            })
          : 'Loading'}
      </div>
    </div>
  );
}
export default Category;
