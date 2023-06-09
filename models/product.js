import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
  },
  details: {
    type: String,
    required: [true, 'Details is required!'],
  },
  tag: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;
