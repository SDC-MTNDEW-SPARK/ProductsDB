const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const productSchema = new mongoose.schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [featureSchema],
  related: [Number],
  styles: [stylesSchema]
});

const featureSchema = new mongoose.schema({
  id: Number,
  feature_name: String,
  value: String
});

const stylesSchema = new mongoose.schema({
  id: Number,
  results: [resultSchema],
  photos: [photoSchema],
  skus: [skuSchema]
});

const resultSchema = new mongoose.schema({
  id: Number,
  name: String,
  original_price: Number,
  sale_price: Number,
  default: Boolean
});

const photoSchema = new mongoose.schema({
  id: Number,
  thumbnail_url: String,
  url: String
});

const skuSchema = new mongoose.schema({
  id: Number,
  quantity: Number,
  size: String
});

const product = mongoose.model('product', productSchema);

module.exports = {
  productSchema: productSchema,
  featureSchema: featureSchema,
  stylesSchema: stylesSchema,
  resultSchema: resultSchema,
  photoSchema: photoSchema,
  skuSchema: skuSchema,
  product: product
}