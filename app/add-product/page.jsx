'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const AddProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    details: '',
    tag: '',
  });

  const createItem = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/product/new', {
        method: 'POST',
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          details: product.details,
          tag: product.tag,
          userId: session?.user.id,
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
      type='Add'
      product={product}
      setProduct={setProduct}
      submitting={submitting}
      handleSubmit={createItem}
    />
  );
};
export default AddProduct;
