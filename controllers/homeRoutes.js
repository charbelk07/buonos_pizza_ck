const router = require('express').Router();

// require models here

// require auth here

router.get('/', async (req, res) => {

  res.render('meet-the-team'
      // res.render('404-pages');
      // res.render('about-us');
      // res.render('baseball');
      // res.render('category-filters');
      // res.render('contact-us');
      // res.render('deactivate-account');
      // res.render('homepage');
      // res.render('meet-the-team');
      // res.render('menu-main');
      // res.render('product-quick-view');
      // res.render('shopping-cart');
      // res.render('sign-in-registration');
      // res.render('store-navigation');
      // res.render('yelp');
      // res.render('create-an-account');
      , {
        layout: 'main',
  });
});

router.get('/about', async (req, res) => {
  res.render('about-us', {
    layout: 'main',
  });
});

router.get('/menu', async (req, res) => {
  res.render('menu', {
    layout: 'main',
  });
});

router.get('/scores', async (req, res) => {
  res.render('baseball', {
    layout: 'main',
  });
});

router.get('/reviews', async (req, res) => {
  res.render('yelp', {
    layout: 'main',
  });
});
module.exports = router;
