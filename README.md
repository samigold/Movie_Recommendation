# 🎬 Movie Recommendation Platform

A modern, full-stack movie recommendation platform built with React, Node.js, Express, and Redis caching. Discover movies, get AI-powered recommendations, and manage your personal watchlist with a beautiful, responsive interface.

## ✨ Features

### 🔍 **Movie Discovery**
- Advanced search functionality by title, genre, or keywords
- Real-time movie data from external APIs
- Detailed movie information with ratings, descriptions, and metadata
- High-quality movie posters and images

### ⚡ **Performance Optimized**
- Redis caching for lightning-fast response times
- Optimized API calls with intelligent cache management
- Background loading with smooth user experience
- Responsive design for all devices

### 🎨 **Modern UI/UX**
- Clean, glassmorphism design with smooth animations
- Interactive movie cards with hover effects
- Modal-based movie details with keyboard navigation
- Loading states and error handling
- Mobile-first responsive design

### 🔧 **Dual Architecture**
- **Static Version**: Vanilla HTML/CSS/JS for lightweight deployment
- **React Version**: Modern component-based architecture for scalability

## 🏗️ Project Structure

```
Movie_Recommendation/
├── 📁 Backend (Node.js + Express + Redis)
│   ├── server.js              # Main server file
│   ├── controllers/
│   │   └── movieController.js # Movie search & caching logic
│   ├── routes/
│   │   └── movieRoutes.js     # API route definitions
│   ├── config/
│   │   └── redis.js           # Redis configuration
│   └── package.json           # Backend dependencies
│
├── 📁 Static Frontend (HTML/CSS/JS)
│   ├── public/
│   │   ├── index.html         # Main UI with modern design
│   │   ├── script.js          # JavaScript functionality
│   │   └── style.css          # Responsive styles
│   └── view/                  # Additional views
│
├── 📁 React Frontend (Modern SPA)
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   │   ├── Navbar.jsx     # Navigation bar
│   │   │   ├── SearchBar.jsx  # Search functionality
│   │   │   ├── MovieCard.jsx  # Individual movie display
│   │   │   ├── MovieList.jsx  # Movie grid layout
│   │   │   └── Loader.jsx     # Loading animations
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx       # Main search page
│   │   │   ├── MovieDetail.jsx# Movie details modal
│   │   │   ├── Profile.jsx    # User watchlist
│   │   │   ├── Login.jsx      # Authentication
│   │   │   └── Register.jsx   # User registration
│   │   ├── api/
│   │   │   └── tmdb.js        # API utilities
│   │   └── App.js             # Main React component
│   └── package.json           # React dependencies
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Redis server
- npm or yarn

### 1. Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Set up your movie API credentials (RapidAPI)
   - Configure Redis connection in `config/redis.js`

3. **Start Redis server:**
   ```bash
   # Windows
   redis-server

   # macOS/Linux
   brew services start redis
   # or
   sudo systemctl start redis
   ```

4. **Start the backend server:**
   ```bash
   npm start
   # or
   node server.js
   ```
   Server will run on `http://localhost:3000`

### 2. Static Frontend (Option 1)

1. **Open the static version:**
   ```bash
   # Simply open public/index.html in your browser
   # or serve it with a simple HTTP server
   python -m http.server 8000
   ```

### 3. React Frontend (Option 2)

1. **Navigate to React app:**
   ```bash
   cd react-app
   ```

2. **Install React dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   React app will run on `http://localhost:3000`

## 🔧 Technologies Used

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Redis** - In-memory caching
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing

### Frontend (Static)
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - Dynamic functionality
- **Responsive Design** - Mobile-first approach

### Frontend (React)
- **React 18** - UI library with hooks
- **React Router** - Client-side routing
- **Axios** - API communication
- **CSS Modules** - Component-scoped styling
- **Functional Components** - Modern React patterns

## 📱 API Endpoints

### Movie Search
```http
GET /api/movies/:query
```
Search for movies by title, genre, or keywords.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 123,
      "title": "Movie Title",
      "overview": "Movie description...",
      "poster_url": "https://image.url",
      "release_date": "2023-01-01",
      "vote_average": 8.5,
      "vote_count": 1234
    }
  ],
  "cached": false,
  "timestamp": "2023-01-01T00:00:00.000Z"
}
```

### Movie Details
```http
GET /api/movies/details/:id
```
Get detailed information about a specific movie.

### Cache Management
```http
DELETE /api/movies/cache/:key
```
Clear specific cache entries (admin functionality).

## 🎨 UI Components

### Static Version Components
- **Search Interface** - Clean search form with real-time feedback
- **Movie Grid** - Responsive 4-column layout (adapts to screen size)
- **Movie Cards** - Interactive cards with hover effects
- **Modal Popup** - Detailed movie information overlay
- **Loading States** - Smooth loading animations

### React Version Components
- **`<Navbar />`** - Navigation with routing links
- **`<SearchBar />`** - Reusable search component
- **`<MovieCard />`** - Individual movie display
- **`<MovieList />`** - Grid layout manager
- **`<Loader />`** - Loading spinner component
- **`<MovieDetail />`** - Modal for movie details

## 🔄 Caching Strategy

### Redis Implementation
- **Search Results**: Cached for 1 hour
- **Movie Details**: Cached for 24 hours
- **Cache Keys**: Structured as `movies:search:{query}` and `movies:details:{id}`
- **Fallback**: Graceful degradation if Redis is unavailable

### Benefits
- **Reduced API Calls**: Minimize external API requests
- **Faster Response Times**: Sub-second response for cached data
- **Cost Efficiency**: Lower API usage costs
- **Better UX**: Immediate results for repeated searches

## 🎯 Features Roadmap

### Current Features ✅
- [x] Movie search functionality
- [x] Redis caching implementation
- [x] Responsive design
- [x] Modal movie details
- [x] Loading states
- [x] Error handling
- [x] React component architecture

### Planned Features 🚧
- [ ] User authentication system
- [ ] Personal watchlist management
- [ ] Movie recommendations based on viewing history
- [ ] User reviews and ratings
- [ ] Social features (sharing, following)
- [ ] Advanced filtering (year, genre, rating)
- [ ] Movie trailers integration
- [ ] Offline support with service workers

## 🛠️ Development

### Code Structure
```bash
# Backend development
npm run dev          # Start with nodemon for auto-reload
npm run start        # Production server
npm run test         # Run tests

# React development
cd react-app
npm start            # Development server with hot reload
npm run build        # Production build
npm test             # Run component tests
npm run eject        # Eject from Create React App
```

### Environment Variables
Create a `.env` file in the root directory:
```env
# API Configuration
RAPIDAPI_KEY=your_rapidapi_key_here
RAPIDAPI_HOST=moviesdatabase.p.rapidapi.com

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Adding New Features

1. **Backend API Endpoints:**
   - Add routes in `routes/movieRoutes.js`
   - Implement logic in `controllers/movieController.js`
   - Update caching strategies as needed

2. **React Components:**
   - Create new components in `src/components/`
   - Add pages in `src/pages/`
   - Update routing in `App.js`

3. **Static Frontend:**
   - Update `public/index.html` for UI changes
   - Modify `public/script.js` for functionality
   - Enhance `public/style.css` for styling

## 🐛 Troubleshooting

### Common Issues

1. **Redis Connection Failed:**
   ```bash
   # Check if Redis is running
   redis-cli ping
   
   # Start Redis server
   redis-server
   ```

2. **API Rate Limiting:**
   - Check your RapidAPI quota
   - Implement request throttling
   - Use caching to reduce API calls

3. **CORS Issues:**
   - Ensure CORS is properly configured in `server.js`
   - Check frontend URL in CORS origin settings

4. **React Build Errors:**
   ```bash
   # Clear cache and reinstall
   cd react-app
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

- **Developer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Project Link**: [https://github.com/yourusername/Movie_Recommendation](https://github.com/yourusername/Movie_Recommendation)

---

⭐ **Star this repository if you found it helpful!**

🎬 **Happy movie browsing!**
