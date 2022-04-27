const Pool = require('pg').Pool
const pool = new Pool({
  user: 'andychan',
  database: 'productsdc'
});

const getProducts = (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const count = parseInt(request.query.count) || 5;
  pool.query(`SELECT * FROM products ORDER BY id OFFSET ${((page * count) - count)} ROWS FETCH FIRST ${count} ROW ONLY;`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
// json_build_object('id', p.id, 'name', p.name, 'slogan', p.slogan, 'description', p.description, 'category', p.category, 'default_price', p.default_price, 'features', feature)

const getCurrProduct = (request, response) => {
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT p.*, features FROM products p LEFT JOIN (select product_id, json_agg(json_build_object('feature', f.feature, 'value', f.value)) features from features f GROUP BY 1) f ON p.id = f.product_id WHERE p.id = ${currId};`
  , (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(...results.rows)
  })
}
// SELECT
//                 s.product_id, results
//               FROM styles s
//               LEFT JOIN (
//                 SELECT
//                   product_id,
//                   json_agg(
//                     json_build_object(
//                       'style_id', s1.id,
//                       'name', s1.name,
//                       'original_price', s1.original_price,
//                       'sale_price', s1.sale_price,
//                       'default?', s1.default_style,
//                       'photos', photos
//                     )
//                   ) results
//                 FROM styles s1
//                   LEFT JOIN (
//                     SELECT
//                       style_id,
//                       json_agg(
//                         json_build_object(
//                           'thumbnail_url', p.thumbnail_url,
//                           'url', p.url
//                         )
//                       ) photos
//                     FROM photos p
//                     GROUP BY 1
//                   ) p ON s1.id = p.style_id
//                 GROUP BY product_id
//                 ) s1 ON s.product_id = s1.product_id WHERE s.product_id = ${currId};

async function getCurrProductStyles (currProd) {
  const currId = parseInt(currProd);
  const returnObj = {product_id: currId};
  const res = await pool.query(`SELECT id AS style_id, name, original_price,sale_price, default_style AS "default?" FROM styles WHERE product_id = ${currId};`)
  returnObj.results = res.rows;
  await Promise.all(returnObj.results.map(async (style) => {
    // console.log(style);
    const photos = await getPhotos(style.style_id);
    style.photos = photos;
  }));
  await Promise.all(returnObj.results.map(async (style) =>{
    const skus = await getSkus(style.style_id);
    style.skus = {};
    skus.forEach(sku=>{
      style.skus[sku.id] = {quantity: sku.quantity, size: sku.size}
    })
  }));
  // returnObj.results[0].photos = photos;

  return returnObj;
}
async function getPhotos(styleId) {
  const photos = await pool.query(`SELECT thumbnail_url, url FROM photos WHERE style_id = ${styleId}`)
  return photos.rows;
}
async function getSkus(styleId) {
  const skus = await pool.query(`SELECT id, size, quantity FROM skus WHERE style_id=${styleId}`)
  return skus.rows;
}

const getCurrProductRelated = (request, response) => {
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT related_prod_id FROM Related_Products WHERE curr_prod_id = ${currId}`, (error, results) => {
    if (error) {
      throw error
    }
    const related = [];
    results.rows.forEach(row=>{
      related.push(row.related_prod_id)
    })
    response.status(200).json(related)
  })
}

module.exports = {
  getProducts,
  getCurrProduct,
  getCurrProductStyles,
  getCurrProductRelated
}