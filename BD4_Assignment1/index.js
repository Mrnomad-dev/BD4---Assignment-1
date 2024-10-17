const express = require('express');
let cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
let PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './BD4_Assignment1/database.sqlite',
    driver: sqlite3.Database,
  });
})();

//function for EndPoint 1:
async function fetchAllRestaurants() {
  let query = 'SELECT * FROM restaurants ';
  let response = await db.all(query, []);

  return { restaurants: response };
}
//EndPOint 1:
app.get('/restaurants', async (req, res) => {
  try {
    let results = await fetchAllRestaurants();

    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants  found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//restaurants

//function for EndPoint 2:
async function fetchRestaurantsById(id) {
  let query = 'SELECT * FROM restaurants WHERE id=?';
  let response = await db.all(query, [id]);
  return { restaurants: response };
}

//EndPoint 2:
app.get('/restaurants/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchRestaurantsById(id);

    if (results.restaurants.length === 0) {
      return res
        .status(404)
        .json({ message: 'No restaurants found By this ID' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//restaurants/details/1

//function for EndPoint 3:
async function fetchRestaurantsCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine=?';
  let response = await db.all(query, [cuisine]);

  return { restaurants: response };
}
//EndPoint 3:
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await fetchRestaurantsCuisine(cuisine);

    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'no restaurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//restaurants/cuisine/Indian

//function for EndPoint 4:
async function fetchRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg=? AND hasOutdoorSeating=? AND isLuxury=?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

  return { restaurants: response };
}
//EndPoint 4:
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let result = await fetchRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );

    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'no restaurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false

//function for EndPoint 5:
async function fetchRestaurantsByRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);

  return { restaurants: response };
}
//EndPoint 5:
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await fetchRestaurantsByRating();

    if (result.restaurants.length === 0) {
      return res.status(404).json({ message: 'no restaurants Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//restaurants/sort-by-rating

//function for EndPoint 6:
async function fetchAlldishes() {
  let query = 'SELECT * FROM dishes ';
  let response = await db.all(query, []);

  return { dishes: response };
}
//EndPOint 6:
app.get('/dishes', async (req, res) => {
  try {
    let results = await fetchAlldishes();

    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes  found' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//dishes

//function for EndPoint 7:
async function fetchDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id=?';
  let response = await db.all(query, [id]);
  return { dishes: response };
}

//EndPoint 7:
app.get('/dishes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchDishesById(id);

    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found By this ID' });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//dishes/details/1

//function for EndPoint 8:
async function fetchDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg=? ';
  let response = await db.all(query, [isVeg]);

  return { dishes: response };
}
//EndPoint 8:
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;

  try {
    let result = await fetchDishesByFilter(isVeg);

    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'no dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//dishes/filter?isVeg=true

//function for EndPoint 9:
async function fetchDishesByPrice() {
  let query = 'SELECT * FROM dishes ORDER BY price ';
  let response = await db.all(query, []);

  return { dishes: response };
}
//EndPoint 9:
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let result = await fetchDishesByPrice();

    if (result.dishes.length === 0) {
      return res.status(404).json({ message: 'no dishes Found' });
    }
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
//dishes/sort-by-price

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
