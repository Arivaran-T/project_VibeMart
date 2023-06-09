'use client';

import { useState, useEffect } from 'react';

import ProductCard from './ProductCard';

const ProductCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('/api/product');
    const data = await response.json();

    setAllProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
    return allProducts.filter(
      (item) => regex.test(item.name) || regex.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProducts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterProducts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search the product'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Products */}
      {searchText ? (
        <ProductCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <ProductCardList data={allProducts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
