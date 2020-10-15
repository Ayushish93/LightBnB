const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {Pool} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
    const queryString = `
    SELECT *  FROM users
    WHERE email = $1
    `;
    const values =  [email];

   return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(() => null);

  

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // return Promise.resolve(users[id]);

  const queryString = `
    SELECT *  FROM users
    WHERE id = $1
    `;
  const values =  [id];

   return pool.query(queryString, values)
  .then(res => res.rows[0])
  .catch(() => null);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  
  return pool.query (`
  INSERT INTO users (name, password, email) VALUES
  ('${user.name}', '${user.password}', '${user.email}')
  RETURNING *;
  `)
  .then(res => res.rows[0]);

}

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id) {
  
  return pool.query(`SELECT properties.*, reservations.*, AVG(property_reviews.rating)
  FROM properties
  JOIN reservations ON reservations.property_id = properties.id 
  JOIN property_reviews ON property_reviews.property_id = properties.id 
  WHERE reservations.guest_id = ${guest_id} AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10;`)
  .then(res => res.rows);

}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options) {
console.log("here is option",options);

  
  let subQuery ='';
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id `;


  if(options.city) {
    subQuery += `WHERE city LIKE '%${options.city}%' `;
    console.log("here is sub query", subQuery);
  }
  if(options.owner_id) {
    if(options.city) {
      subQuery = '';
      subQuery += `WHERE city = '${options.city}' AND owner_id = ${Number(options.owner_id)} `;
    } else {
      subQuery = '';
      subQuery += `WHERE owner_id = ${Number(options.owner_id)} `;
    }
  }
  if(options.minimum_price_per_night && options.maximum_price_per_night) {

    subQuery = '';
    subQuery += `WHERE  cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
  

    if(options.city) {
      subQuery = '';
      subQuery += `WHERE city = '${options.city}' AND cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
    }
    if(options.owner_id) {
      subQuery = '';
      subQuery += `WHERE  owner_id = ${Number(options.owner_id)} AND cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
 
    }
    if(options.city && options.owner_id) {
      subQuery = '';
      subQuery += `WHERE  city = '${options.city}' AND owner_id = ${Number(options.owner_id)} AND cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
 
    }

  }
  if(options.minimum_rating) {
    subQuery = '';
    subQuery += `WHERE  property_reviews.rating >= ${options.minimum_rating} `;

    if(options.city) {
      subQuery = '';
      subQuery += `WHERE city = '${options.city}' AND  property_reviews.rating >= ${options.minimum_rating} `;
    }

    if(options.owner_id) {
      subQuery = '';
      subQuery += `WHERE  owner_id = ${Number(options.owner_id)} AND property_reviews.rating >= ${options.minimum_rating} `;
 
    }

    if(options.minimum_price_per_night && options.maximum_price_per_night) {
      subQuery = '';
      subQuery += `WHERE  property_reviews.rating >= ${options.minimum_rating} AND cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
  
    }

    if(options.city  && options.minimum_rating && options.minimum_price_per_night && options.maximum_price_per_night) {
      subQuery = '';
      subQuery += `WHERE  property_reviews.rating >= ${options.minimum_rating} AND city = '${options.city}'  AND cost_per_night BETWEEN ${Number(options.minimum_price_per_night)} AND ${Number(options.maximum_price_per_night)} `;
 
    }
  
  }


  let afterWhereString =`GROUP BY properties.id
  HAVING avg(property_reviews.rating) >= 4
  ORDER BY cost_per_night
  LIMIT 10;
  `;

  

  if(subQuery === '') {
    queryString += afterWhereString;
  } else {
    queryString += subQuery + afterWhereString;
  }
  console.log("here is final query", queryString);

  return pool.query(queryString)
  .then(res => res.rows);


  
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
