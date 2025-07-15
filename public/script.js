 const search = document.getElementById('search'),
submit = document.getElementById('submit'),
random = document.getElementById('random'),
movieEl = document.getElementById('movies'),
resultHeading = document.getElementById('result-heading'),
single_movieEL = document.getElementById('single-movie'),
loader = document.getElementById('loader');

// Show loader function
function showLoader(text = 'Searching for movies...') {
    const loaderText = loader.querySelector('.loader-text');
    loaderText.textContent = text;
    loader.classList.add('show');
}

// Hide loader function
function hideLoader() {
    loader.classList.remove('show');
}

//Search movie and fetch from api
function searchmovie(e) {
    e.preventDefault();

    //Clear single movie
    single_movieEL.innerHTML = '';

    //Get search term
    const term = search.value;
    if(navigator.onLine){
        console.log("Connected")
    } else{
        console.log("there is a problem")
    }
     if(term.trim()) {
        // Show loader
        showLoader(`Searching for "${term}"...`);
        
        // Clear previous results
        movieEl.innerHTML = '';
        resultHeading.innerHTML = '';
        
        fetch(`http://localhost:3000/api/movies/${term}`)
        .then(res => res.json())
        .then(data =>{
            // Hide loader
            hideLoader();
            
            console.log(data);

            resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

            if(data === null || !data.data || data.data.length === 0){
                resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
                movieEl.innerHTML = '';
            } else{
                movieEl.innerHTML = data.data.map(
                    movie =>`
                    <div class="movie">
                        <img src="${movie.poster_url}" alt="${movie.original_title}"/>
                        <div class="movie-info" data-movieID="${movie.id}">
                            <h3>${movie.overview}</h3>
                        </div>
                    </div>
                    `
                )
                .join('');
            }
        })
        .catch(error => {
            // Hide loader on error
            hideLoader();
            console.error('Error fetching movies:', error);
            resultHeading.innerHTML = `<p>Error fetching movies. Please try again!</p>`;
            movieEl.innerHTML = '';
        });
        search.value = '';
     } else {
        alert("Please enter a search term");
     }
}

//Fetch movie by id
function getmovieById(id) {
    // Show loader for movie details
    showLoader('Loading movie details...');
    
    fetch(`http://localhost:3000/api/movies/details/${id}`)
    .then(res => res.json())
    .then(data => {
        // Hide loader
        hideLoader();
        
        console.log(data.data);
      if(data.success === false){
        alert(data.message);
        return;
      }
      const movie =  data.data;
      console.log(movie)
      updateDom (movie)
    })
    .catch(error => {
        // Hide loader on error
        hideLoader();
        console.error('Error fetching movie details:', error);
        alert('Error loading movie details. Please try again!');
    });
}

//update the dom with single movie


function updateDom(movie) {
    console.log(movie);
    
    // Handle both direct movie object and response object with data property
    const movieData = movie.data || movie;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('movie-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'movie-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);
    }
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close modal">&times;</button>
                <div class="modal-body">
                    <div class="movie-poster">
                        <img src="${movieData.poster_url}" alt="${movieData.title || movieData.original_title}"/>
                    </div>
                    <div class="movie-info-content">
                        <h1>${movieData.title || movieData.original_title}</h1>
                        
                        <div class="movie-meta">
                            ${movieData.release_date ? `<span class="release-date">📅 ${new Date(movieData.release_date).getFullYear()}</span>` : ''}
                            ${movieData.vote_average ? `<span class="rating">⭐ ${movieData.vote_average}/10</span>` : ''}
                            ${movieData.original_language ? `<span class="language">🌍 ${movieData.original_language.toUpperCase()}</span>` : ''}
                        </div>
                        
                        <div class="overview">
                            <h3>Overview</h3>
                            <p>${movieData.overview}</p>
                        </div>
                        
                        <div class="additional-info">
                            ${movieData.vote_count ? `<p><strong>Vote Count:</strong> ${movieData.vote_count.toLocaleString()}</p>` : ''}
                            ${movieData.popularity ? `<p><strong>Popularity:</strong> ${movieData.popularity.toFixed(1)}</p>` : ''}
                            <p><strong>Adult Content:</strong> ${movieData.adult ? 'Yes' : 'No'}</p>
                            
                            ${movieData.genre_ids && movieData.genre_ids.length > 0 ? `
                                <div class="genres">
                                    <strong>Genre IDs:</strong>
                                    <div class="genre-tags">
                                        ${movieData.genre_ids.map(genreId => `<span class="genre-tag">Genre ${genreId}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}


//Event listeners
submit.addEventListener('submit', searchmovie);
// 

movieEl.addEventListener('click', e => {
    const movieInfo = e.composedPath().find(item => {
        if(item.classList){
            return item.classList.contains('movie-info')
        } else{
            return false
        }
    })
    //check if movieinfo is true
    if(movieInfo){
        const movieId = movieInfo.getAttribute('data-movieid')
        getmovieById(movieId);
    }
})