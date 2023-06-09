'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const ProductCard = ({ product, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log(product);

    if (product.creator._id === session?.user.id) {
      return router.push('/profile');
    } else {
      return router.push('/');
    }

    router.push(
      `/profile/${product.creator._id}?name=${product.creator.username}`
    );
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900 text-3xl '>
              {product.name}
            </h3>
            <p className='font-inter text-base text-gray-500 text-xl'>
              {' '}
              ${product.price}
            </p>
          </div>
        </div>
      </div>

      <p className='my-4 font-satoshi text-base text-gray-700'>
        {product.details}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'>
        {product.tag}
      </p>

      {session?.user.id === product.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-5 border-t border-gray-100 pt-4'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default ProductCard;
