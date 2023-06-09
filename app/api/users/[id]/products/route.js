import Product from '@models/product';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const products = await Product.find({ creator: params.id }).populate(
      'creator'
    );

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all Products', { status: 500 });
  }
};
