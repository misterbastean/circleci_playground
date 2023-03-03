const express     = require('express'),
      router      = express.Router(),
      Recipe      = require('../models/recipe'),
      User        = require('../models/user'),
      passport    = require('passport'),
      middleware  = require('../utils/middleware');


// ========================
// Recipe Routes
// ========================

// Landing - currently redirecting to index
router.get('/', (req, res) => {
  res.redirect('/mealapp/recipes');
});

// Index
router.get('/recipes', (req, res) => {
  let pageNo = req.query.p || 1;
  let lastId = req.query.last || '';

  if (pageNo <= 1) {
    Recipe.find({}).limit(9)
    .exec((err, foundRecipes) => {
      if (err) {
        console.log(err);
        req.flash('error', `Unable to fetch recipes. Sorry about that. Error: ${err}`);
        res.redirect('/mealapp')
      } else {
        res.render('mealApp/indexes/index', { recipes: foundRecipes, pageNum: pageNo });
      }
    });
  } else {
    let numSkip = 9 * (pageNo - 1)
    Recipe.find({}).skip(numSkip).limit(9)
    .exec((err, foundRecipes) => {
      if (err) {
        console.log(err);
        req.flash('error', `Unable to fetch recipes. Sorry about that. Error: ${err}`);
        res.redirect('/')
      } else {
        res.render('mealApp/indexes/index', { recipes: foundRecipes, pageNum: pageNo });
      }
    });
  };
});

// Search
router.get('/recipes/search', (req, res) => {
  Recipe.find({$text:
    {
      $search: req.query.term
    }
  })
  .exec((err, foundRecipes) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to fetch recipes. Sorry about that. Error: ${err}`);
      res.redirect('/mealapp/recipes');
    } else {
      res.render('mealApp/indexes/search', { recipes: foundRecipes });
    };
  });
});

// Random
router.get('/recipes/random', (req, res) => {
  Recipe.aggregate([{
    '$sample': {
      'size': 1
    }
  }])
  .exec((err, foundRecipe) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to fetch random recipe. Sorry about that. Error: ${err}`);
      res.redirect('/mealapp/recipes');
    } else {
      res.redirect(`/mealapp/recipes/${foundRecipe[0]._id}`)
    }
  })
});

// Categories
router.get('/recipes/categories/:category', (req, res) => {
  Recipe.find({protein: req.params.category}, (err, foundRecipes) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to fetch category. Sorry about that. Error: ${err}`);
      res.redirect('back')
    } else {
      res.render('mealApp/indexes/categories', { recipes: foundRecipes });
    }
  })
});

// Show new form
router.get('/recipes/new', middleware.isLoggedIn, (req, res) => {
  res.render('mealApp/newRecipe');
});

// Add recipe to DB
router.post('/recipes', middleware.isLoggedIn, (req, res) => {
  // Set correct imageUrl
  let imageUrl;
  if (!!req.body.imageUrl) {
    imageUrl = req.body.imageUrl;
  } else {
    imageUrl = 'https://via.placeholder.com/150';
  }

  // Create ingredients object
  let ingredients = [];
  req.body.ingredients.forEach((ingredient) => {
    ingredients.push({
      ingredientName: `${ingredient.ingredientName} ${ingredient.ingredientUnit}`,
      ingredientQuantity: parseFloat(ingredient.ingredientQuantity)
    });
  });

  // Build recipe object
  const newRecipe = {
    recipeName: req.body.recipeName,
    protein: req.body.protein,
    ingredients: ingredients,
    directions: req.body.directions,
    imageUrl,
    description: req.body.description,
    prepMinutes: req.body.prepMinutes,
    cookMinutes: req.body.cookMinutes,
    servingNumber: req.body.servingNumber
  };

  // Push new recipe to database
  Recipe.create(newRecipe, (err, recipe) => {
    if (err) {
      console.log(err);
      req.flash('error', 'Unable to add recipe.');
      res.redirect('back');
    } else {
      console.log('Recipe added');
      req.flash('success', 'Recipe Added!');
      res.redirect('recipes');
    }
  })
});

// Show
router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    if (err) {
      console.log(err);
      req.flash('error', 'Unable to find recipe with that ID.')
      res.redirect('/mealapp/recipes');
    } else {
      res.render('mealApp/showRecipe', { recipe: foundRecipe });
    };
  })
});

// Show edit form
router.get('/recipes/:id/edit', middleware.isLoggedIn, (req, res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to show edit form. Sorry about that. :-( Error: ${err}`);
      res.redirect('back');
    } else {
      res.render('mealApp/editRecipe', { recipe: foundRecipe });
    };
  });
});

// Update recipe in DB
router.put('/recipes/:id', middleware.isLoggedIn, (req, res) => {
  // Set default imageUrl if none provided
  let imageUrl;
  if (!!req.body.imageUrl) {
    imageUrl = req.body.imageUrl;
  } else {
    imageUrl = 'https://via.placeholder.com/150';
  }

  let ingredients = [];
  req.body.ingredients.forEach((ingredient) => {
    ingredients.push({
      ingredientName: `${ingredient.ingredientName} ${ingredient.ingredientUnit}`,
      ingredientQuantity: parseFloat(ingredient.ingredientQuantity)
    });
  });

  // Build recipe object
  let updatedRecipe = {
    recipeName: req.body.recipeName,
    protein: req.body.protein,
    ingredients,
    directions: req.body.directions,
    imageUrl,
    description: req.body.description,
    prepMinutes: req.body.prepMinutes,
    cookMinutes: req.body.cookMinutes,
    servingNumber: req.body.servingNumber
  }

  Recipe.findByIdAndUpdate(req.params.id, updatedRecipe, (err, updatedRecipe) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to update recipe. Sorry about that. :-( ${err}`);
      res.redirect('/mealapp/recipes/' + req.params.id);
    } else {
      req.flash('success', 'Recipe updated successfully!');
      res.redirect('/mealapp/recipes/' + req.params.id);
    };
  });
});

// Delete
router.delete('/recipes/:id', middleware.isLoggedIn, (req, res) => {
  Recipe.findByIdAndDelete(req.params.id, (err, removedRecipe) => {
    if (err) {
      console.log(err);
      req.flash('error', `Unable to delete recipe. Sorry about that. Error: ${err}`);
      res.redirect('/mealapp/recipes');
    } else {
      req.flash('success', 'Recipe deleted successfully!');
      res.redirect('/mealapp/recipes');
    }
  })
});

// Cart
router.get('/cart', (req, res) => {
  res.render('mealApp/cart');
});

// ========================
// Authentication Routes
// ========================

// Show register form
router.get('/register', middleware.isLoggedIn, (req, res) => {
  res.render('mealApp/register');
});

// Add new user
router.post('/register', middleware.isLoggedIn, (req, res) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('back')
    }
    res.redirect('/mealapp/recipes');
  })
});

// Show login form
router.get('/login', (req, res) => {
  res.render('mealApp/login');
});

// Log user in
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/mealapp/recipes',
    failureRedirect: '/mealapp/login'
  }
));

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged you out!')
  res.redirect('/mealapp/recipes');
});

module.exports = router;
