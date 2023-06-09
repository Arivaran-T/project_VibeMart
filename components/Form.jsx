import Link from 'next/link';

const Form = ({ type, product, setProduct, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Product</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} our newest addition! Discover the perfect product to enhance your
        life.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Name of Product
          </span>
          <input
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            type='text'
            placeholder='Product Name'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Price of Product
          </span>
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type='text'
            placeholder='Product Price'
            required
            className='form_input'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Details
          </span>

          <textarea
            value={product.details}
            onChange={(e) =>
              setProduct({ ...product, details: e.target.value })
            }
            placeholder='Enter Product Details'
            required
            className='form_textarea '
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag{' '}
            <span className='font-normal'>
              (#electronic, #laptop, #new, etc.)
            </span>
          </span>
          <input
            value={product.tag}
            onChange={(e) => setProduct({ ...product, tag: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
