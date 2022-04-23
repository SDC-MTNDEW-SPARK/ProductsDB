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

const getCurrProduct = (request, response) => {
  console.log(request.params)
  const currId = parseInt(request.params.product_id);
  pool.query(`SELECT * FROM products JOIN (select features.feature, features.value from features WHERE features.product_id = ${currId}) feature ON products.id = features.product_id WHERE products.id = ${currId};`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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