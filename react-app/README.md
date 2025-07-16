# Movie Recommendation React App

This is a React conversion of the original HTML/CSS movie recommendation platform. The app provides a modern, scalable frontend for discovering movies with AI-powered recommendations.

## 🚀 Features

- **Movie Search**: Search for movies by genre, title, or keywords
- **Movie Details**: View detailed information about each movie in a modal
- **Watchlist**: Add movies to your personal watchlist
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, glassmorphism design with smooth animations
- **API Integration**: Connects to your existing Node.js backend

## 📁 Project Structure

```
react-app/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── MovieCard.jsx       # Individual movie card
│   │   ├── MovieList.jsx       # Grid of movie cards
│   │   └── Loader.jsx          # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx            # Main search page
│   │   ├── MovieDetail.jsx     # Movie details modal
│   │   ├── Profile.jsx         # User watchlist
│   │   ├── Login.jsx           # Login form
│   │   └── Register.jsx        # Registration form
│   ├── api/
│   │   └── tmdb.js            # API utilities
│   ├── App.js                 # Main app component
│   ├── index.js               # App entry point
│   └── index.css              # Global styles
└── package.json
```

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   cd react-app
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔗 Backend Integration

The React app is configured to connect to your existing Node.js backend:

- **Base URL**: `http://localhost:3000/api`
- **Search Endpoint**: `GET /movies/:query`
- **Movie Details**: `GET /movies/details/:id`
- **Cache Management**: `DELETE /movies/cache/*`

Make sure your backend server is running on port 3000.

## 🎨 Key React Concepts Used

### 1. **Functional Components & Hooks**
```jsx
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Component lifecycle
  }, []);
  
  return <div>...</div>;
};
```

### 2. **React Router for Navigation**
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetail />} />
</Routes>
```

### 3. **Component Composition**
```jsx
<MovieList 
  movies={movies} 
  loading={loading}
  onAddToWatchlist={handleAddToWatchlist}
/>
```

### 4. **Event Handling**
```jsx
const handleSearch = async (query) => {
  setLoading(true);
  const results = await movieAPI.searchMovies(query);
  setMovies(results.data);
  setLoading(false);
};
```

## 🔄 Migration from HTML/CSS

### **What Was Converted:**

1. **Static HTML** → **React Components**
   - Header → `Navbar` component
   - Search form → `SearchBar` component
   - Movie cards → `MovieCard` component

2. **Vanilla JavaScript** → **React Hooks**
   - `document.getElementById()` → `useState()`
   - Event listeners → React event handlers
   - DOM manipulation → State updates

3. **Single Page** → **Multi-page Routing**
   - Different views for Home, Profile, Login
   - URL-based navigation with React Router

### **What's New:**

- **Component Reusability**: Movie cards, search bars can be used anywhere
- **State Management**: Centralized state with hooks
- **Better Performance**: Virtual DOM updates
- **Developer Experience**: Hot reloading, better debugging

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (4 movies per row)
- **Tablet**: 768px-1199px (3 movies per row)
- **Mobile**: 480px-767px (2 movies per row)
- **Small Mobile**: <480px (1 movie per row)

## 🎯 Next Steps for Enhancement

1. **State Management**: Add Redux or Context API for global state
2. **Authentication**: Implement real login/logout functionality
3. **Watchlist API**: Connect watchlist to backend database
4. **Error Boundaries**: Add error handling components
5. **Testing**: Add unit tests with Jest and React Testing Library
6. **Performance**: Add lazy loading and code splitting

## 🛠️ Development Tips

### **Adding New Components:**
```jsx
// 1. Create component file
const NewComponent = ({ prop1, prop2 }) => {
  return <div>{prop1}</div>;
};

// 2. Add styles
import './NewComponent.css';

// 3. Export
export default NewComponent;
```

### **API Integration:**
```jsx
// Use the existing API utility
import { movieAPI } from '../api/tmdb';

const fetchData = async () => {
  try {
    const result = await movieAPI.searchMovies(query);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

### **Styling Guidelines:**
- Use CSS custom properties (variables) from `index.css`
- Follow the existing color scheme and spacing
- Make components responsive by default

## 🚨 Common Issues

1. **CORS Errors**: Ensure backend has CORS enabled
2. **API Connection**: Check backend is running on correct port
3. **Build Issues**: Clear `node_modules` and reinstall if needed

This React app provides a solid foundation for scaling your movie recommendation platform while maintaining the original design and functionality.
