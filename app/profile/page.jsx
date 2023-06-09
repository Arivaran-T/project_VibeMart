'use client';
import { useSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/products`);
      const data = await response.json();

      setMyProducts(data);
    };

    if (session?.user.id) fetchProducts();
  }, [session?.user.id]);

  const handleEdit = (product) => {
    router.push(`/update-product?id=${product._id}`);
  };

  const handleDelete = async (product) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this Product?'
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/product/${product._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredProducts = myProducts.filter(
          (item) => item._id !== product._id
        );

        setMyProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      data={myProducts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
