const express = require('express');
const { getMovie, getMovieById, cacheUtils } = require('../controllers/movieController');

const router = express.Router();

// Search movies by query
router.get('/search/:q', getMovie);

// Get movie details by ID from cache
router.get('/details/:id', getMovieById);

// Legacy route for backward compatibility
router.get('/:q', getMovie);

// Rate movie (you can implement this later)
router.put('/:id', (req, res) => {
    res.status(201).json({message: "Rate Movie", success: true})
});

// Cache management routes (optional - for admin use)
router.delete('/cache/search/:term', async (req, res) => {
    try {
        await cacheUtils.invalidateSearch(req.params.term);
        res.status(200).json({message: "Search cache cleared", success: true});
    } catch (error) {
        res.status(500).json({message: "Error clearing cache", success: false});
    }
});

router.delete('/cache/movie/:id', async (req, res) => {
    try {
        await cacheUtils.invalidateMovie(req.params.id);
        res.status(200).json({message: "Movie cache cleared", success: true});
    } catch (error) {
        res.status(500).json({message: "Error clearing cache", success: false});
    }
});

router.delete('/cache/all', async (req, res) => {
    try {
        await cacheUtils.flushAll();
        res.status(200).json({message: "All cache cleared", success: true});
    } catch (error) {
        res.status(500).json({message: "Error clearing cache", success: false});
    }
});

module.exports = router;

