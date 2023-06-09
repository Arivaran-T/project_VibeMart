'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdateProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const [submitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    details: '',
    tag: '',
  });

  useEffect(() => {
    const getProductDetails = async () => {
      const response = await fetch(`/api/product/${productId}`);
      const data = await response.json();

      setProduct({
        name: data.name,
        price: data.price,
        details: data.details,
        tag: data.tag,
      });
    };

    if (productId) getProductDetails();
  }, [productId]);

  const updateProduct = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/product/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          details: product.details,
          tag: product.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={updateProduct}
    />
  );
};
export default UpdateProduct;
