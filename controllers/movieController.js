const axios = require('axios');
const redisClient = require('../config/redis');

const getMovie = async (req, res) => {
    const movieName = req.params.q;
    if (!movieName) {
        return res.status(400).json({ message: "Movie name is required", success: false });
    }

    // Create cache key for search results
    const searchCacheKey = `search:${movieName.toLowerCase()}`;

    console.log("Fetching movies with name:", movieName);

    try {
        // Step 1: Check if data exists in Redis cache
        const cachedResult = await redisClient.get(searchCacheKey);
        if (cachedResult) {
            console.log("Data found in cache");
            const parsedData = JSON.parse(cachedResult);
            return res.status(200).json({
                ...parsedData,
                fromCache: true
            });
        }

        console.log("Data not in cache, fetching from API");

        // Step 2: If not in cache, fetch from external API
        const apiUrl = {
            method: 'GET',
            url: 'https://ai-movie-recommender.p.rapidapi.com/api/search',
            params: { q: movieName },
            headers: {
                'x-rapidapi-key': 'a34eb75292msh7b5e69aca4a2d8dp14404bjsnb25c720da036',
                'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com'
            }
        };

        const response = await axios.request(apiUrl);

        // Step 3: Process the response data
        const movies = response.data.movies.map(movie => ({
            ...movie,
            poster_url: getFullPosterUrl(movie.poster_path),
            poster_path: movie.poster_path
        }));

        const processedData = {
            message: "Movies fetched successfully",
            success: true,
            data: movies
        };

        // Step 4: Cache the search results (1 hour TTL)
        await redisClient.setEx(searchCacheKey, 3600, JSON.stringify(processedData));
        console.log("Search results cached");

        // Step 5: Cache individual movies (24 hour TTL)
        for (const movie of movies) {
            const movieKey = `movie:${movie.id}`;
            await redisClient.setEx(movieKey, 86400, JSON.stringify(movie));
        }
        console.log(`Cached ${movies.length} individual movies`);

        // Step 6: Return the response
        res.status(200).json({
            ...processedData,
            fromCache: false
        });

    } catch (error) {
        console.error("Error fetching movies:", error);
        
        // If Redis fails, try to still serve from API without caching
        if (error.message && error.message.includes('Redis')) {
            console.log("Redis error, attempting direct API call");
            try {
                const apiUrl = {
                    method: 'GET',
                    url: 'https://ai-movie-recommender.p.rapidapi.com/api/search',
                    params: { q: movieName },
                    headers: {
                        'x-rapidapi-key': 'a34eb75292msh7b5e69aca4a2d8dp14404bjsnb25c720da036',
                        'x-rapidapi-host': 'ai-movie-recommender.p.rapidapi.com'
                    }
                };

                const response = await axios.request(apiUrl);
                const movies = response.data.movies.map(movie => ({
                    ...movie,
                    poster_url: getFullPosterUrl(movie.poster_path),
                    poster_path: movie.poster_path
                }));

                return res.status(200).json({
                    message: "Movies fetched successfully (cache unavailable)",
                    success: true,
                    data: movies,
                    fromCache: false
                });
            } catch (apiError) {
                console.error("API error:", apiError);
                return res.status(500).json({ 
                    message: "Error fetching movies", 
                    success: false 
                });
            }
        }
        
        res.status(500).json({ 
            message: "Error fetching movies", 
            success: false 
        });
    }
};

// Function to get movie details by ID from cache
const getMovieById = async (req, res) => {
    const movieId = req.params.id;
    if (!movieId) {
        return res.status(400).json({ message: "Movie ID is required", success: false });
    }

    const movieCacheKey = `movie:${movieId}`;

    try {
        // Check cache for individual movie
        const cachedMovie = await redisClient.get(movieCacheKey);
        if (cachedMovie) {
            console.log(`Movie ${movieId} found in cache`);
            return res.status(200).json({
                success: true,
                data: JSON.parse(cachedMovie),
                fromCache: true
            });
        }

        // If not in cache, return not found
        // In a real application, you might want to fetch from another API endpoint
        return res.status(404).json({
            success: false,
            message: "Movie not found in cache. Please search first to cache movie data."
        });

    } catch (error) {
        console.error("Error fetching movie by ID:", error);
        res.status(500).json({ 
            message: "Error fetching movie details", 
            success: false 
        });
    }
};

// Utility function to get full poster URL
function getFullPosterUrl(posterPath) {
    if (!posterPath) return null;
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

// Cache management utilities
const cacheUtils = {
    // Clear cache for specific search
    async invalidateSearch(searchTerm) {
        try {
            const key = `search:${searchTerm.toLowerCase()}`;
            await redisClient.del(key);
            console.log(`Cache cleared for search: ${searchTerm}`);
        } catch (error) {
            console.error('Error clearing search cache:', error);
        }
    },

    // Clear cache for specific movie
    async invalidateMovie(movieId) {
        try {
            const key = `movie:${movieId}`;
            await redisClient.del(key);
            console.log(`Cache cleared for movie: ${movieId}`);
        } catch (error) {
            console.error('Error clearing movie cache:', error);
        }
    },

    // Clear all cache
    async flushAll() {
        try {
            await redisClient.flushAll();
            console.log('All cache cleared');
        } catch (error) {
            console.error('Error clearing all cache:', error);
        }
    }
};

module.exports = {
    getMovie,
    getMovieById,
    cacheUtils
};