import React from 'react';
import ProductCard from './ProductCard';

const Profile = ({ data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>User Dashboard</span>
      </h1>
      <p className='desc text-left'>Edit and Delete created Products</p>

      <div className='mt-10 prompt_layout'>
        {data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleEdit={() => handleEdit && handleEdit(product)}
            handleDelete={() => handleDelete && handleDelete(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
