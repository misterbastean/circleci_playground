const express   = require('express'),
      router    = express.Router(),
      Episode   = require('../models/episode');


// Landing page
router.get('/', (req, res) => {
  res.render('techInfusion/landing');
});

router.get('/episodes', (req, res) => {
  // Get all episodes from DB
  Episode.find({}, (err, allEpisodes) => {
    if (err) {
      console.log(err);
    } else {
      res.render('techInfusion/episodes/index', { episodes: allEpisodes });
    }''
  });
});

router.get('/episodes/:id', (req, res) => {
  // Find episode with provided ID
  Episode.findById(req.params.id, (err, foundEpisode) => {
    if (err || !foundEpisode) {
      req.flash('error', 'Episode not found');
      res.redirect('back');
    } else {
      res.render('techInfusion/episodes/show', { episode: foundEpisode });
    };
  });
});

module.exports = router;
