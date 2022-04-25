const Pool = require('pg').Pool
const pool = new Pool({
  user: 'andychan',
  database: 'productsdc'
});

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })

const getProducts = (request, response) => {
  console.log(request.query)
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
  console.log(request.params)
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT p.*, features FROM products p LEFT JOIN (select product_id, json_agg(json_build_object('feature', f.feature, 'value', f.value)) features from features f GROUP BY 1) f ON p.id = f.product_id WHERE p.id = ${currId};`
  , (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(...results.rows)
  })
}

const getCurrProductStyles = (request, response) => {
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT * FROM styles WHERE product_id = ${currId} `, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCurrProductRelated = (request, response) => {
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT * FROM Related_Products WHERE curr_prod_id = ${currId}`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getProducts,
  getCurrProduct,
  getCurrProductStyles,
  getCurrProductRelated
}