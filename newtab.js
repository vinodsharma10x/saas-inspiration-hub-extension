document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  document.body.classList.add(currentTheme + '-mode');
  toggleButton.classList.toggle('dark', currentTheme === 'dark');
  
  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    toggleButton.classList.toggle('dark', theme === 'dark');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const notesArea = document.getElementById('notes-area');
  notesArea.value = localStorage.getItem('notes') || '';

  notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const bookmarkIcons = document.getElementById('bookmark-icons');
  const bookmarkInputSection = document.querySelector('.bookmark-input');
  const showInputsButton = document.getElementById('show-inputs');
  const bookmarkList = JSON.parse(localStorage.getItem('bookmarks')) || [];

  // Function to display icons as clickable links
  function displayIcons() {
    bookmarkIcons.innerHTML = bookmarkList.map((bookmark) => {
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}`;
      return `
        <a href="${bookmark.url}" title="${bookmark.name}">
          <img src="${faviconUrl}" alt="${bookmark.name}" />
        </a>
      `;
    }).join('');

    // Append the "+" button to the end of the icons
    bookmarkIcons.appendChild(showInputsButton);
  }

  // Show input fields on "+" button click
  showInputsButton.addEventListener('click', () => {
    bookmarkInputSection.style.display = bookmarkInputSection.style.display === 'none' ? 'flex' : 'none';
  });

  document.getElementById('add-bookmark').addEventListener('click', () => {
    const name = document.getElementById('bookmark-name').value;
    const url = document.getElementById('bookmark-url').value;

    if (name && url) {
      bookmarkList.push({ name, url });
      localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
      displayIcons();

      // Clear the input fields
      document.getElementById('bookmark-name').value = '';
      document.getElementById('bookmark-url').value = '';
      
      // Hide the input fields after adding
      bookmarkInputSection.style.display = 'none';
    }
  });

  // Initial display of icons
  displayIcons();
});

document.addEventListener('DOMContentLoaded', () => {
  const filterIcon = document.getElementById('filter-icon');
  const newsFilters = document.getElementById('news-filters');
  const newsSource = document.getElementById('news-source');
  const applyNewsFiltersButton = document.getElementById('apply-news-filters');

  // Show/hide source-specific options
  newsSource.addEventListener('change', () => {
    document.querySelectorAll('.source-options').forEach(el => el.style.display = 'none');
    document.getElementById(`${newsSource.value}-options`).style.display = 'block';
  });

  // Show/hide filters
  filterIcon.addEventListener('click', () => {
    newsFilters.style.display = newsFilters.style.display === 'none' ? 'block' : 'none';
  });

  // Apply filters
  applyNewsFiltersButton.addEventListener('click', async () => {
    const source = newsSource.value;
    let options = {};

    switch(source) {
      case 'hackernews':
        options = {
          storyType: document.getElementById('news-story-type').value,
          limit: parseInt(document.getElementById('news-limit').value, 10)
        };
        break;
      case 'googlenews':
        options = {
          category: document.getElementById('google-category').value
        };
        break;
      case 'techcrunch':
        options = {
          category: document.getElementById('techcrunch-category').value
        };
        break;
    }

    try {
      const articles = await fetchNews(source, options);
      displayNews(articles);
      newsFilters.style.display = 'none';

      // Save preferences
      chrome.storage.local.set({
        selectedNewsSource: source,
        newsOptions: options
      });
    } catch (error) {
      document.getElementById('news').innerHTML = 'Failed to load news.';
    }
  });

  // Load saved preferences and fetch news
  chrome.storage.local.get(['selectedNewsSource', 'newsOptions'], function(result) {
    const savedSource = result.selectedNewsSource || 'hackernews';
    const savedOptions = result.newsOptions || { storyType: 'top', limit: 10 };

    newsSource.value = savedSource;
    newsSource.dispatchEvent(new Event('change'));

    // Set saved options based on source
    if (savedSource === 'hackernews') {
      document.getElementById('news-story-type').value = savedOptions.storyType;
      document.getElementById('news-limit').value = savedOptions.limit;
    } else if (savedSource === 'googlenews') {
      document.getElementById('google-category').value = savedOptions.category;
    } else if (savedSource === 'techcrunch') {
      document.getElementById('techcrunch-category').value = savedOptions.category;
    }

    // Fetch initial news
    fetchNews(savedSource, savedOptions)
      .then(displayNews)
      .catch(error => {
        document.getElementById('news').innerHTML = 'Failed to load news.';
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const filterIcon = document.getElementById('product-hunt-filter-icon');
  const productHuntFilters = document.getElementById('product-hunt-filters');
  const applyProductHuntFiltersButton = document.getElementById('apply-product-hunt-filters');
  const productHuntContainer = document.getElementById('product-hunt');
  const productHuntHeading = document.querySelector('.product-hunt-column h2');

  // Show or hide filters section on icon click
  filterIcon.addEventListener('click', () => {
    productHuntFilters.style.display = productHuntFilters.style.display === 'none' ? 'block' : 'none';
  });

  // Function to fetch Product Hunt launches based on user-selected filters
  function fetchProductHuntLaunches(timeFrame, upvoteThreshold, showMedia) {
    const apiKey = '-XJKPhHe0yzeKZhMCPfUBwfo6Mzlrjv6_vtNgxeMPFw'; // Replace with your Product Hunt API key
    const baseQuery = `{
      posts(first: 10, order: VOTES`;

    let dateFilter = '';
    const today = new Date();
    switch (timeFrame) {
      case 'daily':
        dateFilter = `, postedAfter: "${new Date(today.setDate(today.getDate() - 1)).toISOString()}"`;
        break;
      case 'weekly':
        dateFilter = `, postedAfter: "${new Date(today.setDate(today.getDate() - 7)).toISOString()}"`;
        break;
      case 'monthly':
        dateFilter = `, postedAfter: "${new Date(today.setMonth(today.getMonth() - 1)).toISOString()}"`;
        break;
      case 'yearly':
        dateFilter = `, postedAfter: "${new Date(today.setFullYear(today.getFullYear() - 1)).toISOString()}"`;
        break;
      case 'all-time':
      default:
        dateFilter = '';
        break;
    }

    const query = `${baseQuery}${dateFilter}) {
      edges {
        node {
          id
          name
          description
          tagline
          votesCount
          url
          thumbnail {
            url
          }
        }
      }
    }}`;

    fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.posts.edges.length > 0) {
        const filteredPosts = data.data.posts.edges.filter(post => post.node.votesCount >= upvoteThreshold);
        chrome.storage.local.set({
          productHuntData: filteredPosts,
          productHuntCacheTime: Date.now()
        });
        displayProductHuntLaunches(filteredPosts, showMedia);
      } else {
        productHuntContainer.innerText = 'No launches found.';
      }
    })
    .catch(error => {
      productHuntContainer.innerText = 'Failed to load Product Hunt launches.';
      console.error('Error fetching launches:', error);
    });
  }

  // Display Product Hunt launches based on user preferences
  function displayProductHuntLaunches(posts, showMedia) {
    productHuntContainer.innerHTML = '';

    posts.forEach(post => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        ${showMedia && post.node.thumbnail.url ? `<img src="${post.node.thumbnail.url}" alt="${post.node.name}" class="product-image">` : ''}
        <div>
          <h3>
            <a href="${post.node.url}" target="_blank">${post.node.name}</a>
            <span class="vote-count">
              (${post.node.votesCount} 
              <span class="arrow">↑</span>)
            </span>
          <h4>${post.node.tagline}</h4>
          <p>${post.node.description}</p>
        </div>
      `;
      productHuntContainer.appendChild(productItem);
    });
  }

  // Function to update the Product Hunt heading based on the time frame
  function updateProductHuntHeading(timeFrame) {
    let headingText = "Product Hunt Launches";
    switch (timeFrame) {
      case 'daily':
        headingText = "Today's Launches";
        break;
      case 'weekly':
        headingText = "This Week's Launches";
        break;
      case 'monthly':
        headingText = "This Month's Launches";
        break;
      case 'yearly':
        headingText = "This Year's Launches";
        break;
      case 'all-time':
        headingText = "All Time Launches";
        break;
    }

    // Update the heading text and reattach the settings icon
    productHuntHeading.innerHTML = `${headingText} <span id="product-hunt-filter-icon" class="filter-icon">⚙️</span>`;
    
    // Reattach the event listener for the newly inserted settings icon
    document.getElementById('product-hunt-filter-icon').addEventListener('click', () => {
      productHuntFilters.style.display = productHuntFilters.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Apply filters and fetch news based on user input
  applyProductHuntFiltersButton.addEventListener('click', () => {
    const timeFrame = document.getElementById('product-hunt-time-frame').value;
    const upvoteThreshold = parseInt(document.getElementById('product-hunt-upvotes').value, 10) || 0;
    const showMedia = document.getElementById('product-hunt-show-media').checked;

    // Save user selections in local storage
    chrome.storage.local.set({
      selectedTimeFrame: timeFrame,
      selectedUpvoteThreshold: upvoteThreshold,
      selectedShowMedia: showMedia
    });

    // Update heading based on the selected time frame
    updateProductHuntHeading(timeFrame);

    // Fetch news with selected filters
    fetchProductHuntLaunches(timeFrame, upvoteThreshold, showMedia);

    // Hide filters after applying
    productHuntFilters.style.display = 'none';
  });

  // Load saved user selections and apply filters on page load
  chrome.storage.local.get(['selectedTimeFrame', 'selectedUpvoteThreshold', 'selectedShowMedia'], function(result) {
    const savedTimeFrame = result.selectedTimeFrame || 'weekly';
    const savedUpvoteThreshold = result.selectedUpvoteThreshold || 0;
    const savedShowMedia = result.selectedShowMedia !== false;

    // Set the time frame, upvote threshold, and media checkbox
    document.getElementById('product-hunt-time-frame').value = savedTimeFrame;
    document.getElementById('product-hunt-upvotes').value = savedUpvoteThreshold;
    document.getElementById('product-hunt-show-media').checked = savedShowMedia;

    // Update heading based on the saved time frame
    updateProductHuntHeading(savedTimeFrame);

    // Fetch news with saved filters
    fetchProductHuntLaunches(savedTimeFrame, savedUpvoteThreshold, savedShowMedia);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const monthlyFilterIcon = document.getElementById('monthly-product-hunt-filter-icon');
  const monthlyProductHuntFilters = document.getElementById('monthly-product-hunt-filters');
  const applyMonthlyProductHuntFiltersButton = document.getElementById('apply-monthly-product-hunt-filters');
  const monthlyProductHuntContainer = document.getElementById('monthly-product-hunt');

  // Show or hide monthly filters section on icon click
  monthlyFilterIcon.addEventListener('click', () => {
    monthlyProductHuntFilters.style.display = monthlyProductHuntFilters.style.display === 'none' ? 'block' : 'none';
  });

  // Function to fetch monthly Product Hunt launches
  function fetchMonthlyProductHuntLaunches(timeFrame, upvoteThreshold, showMedia) {
    const apiKey = '-XJKPhHe0yzeKZhMCPfUBwfo6Mzlrjv6_vtNgxeMPFw'; // Use your API key
    const today = new Date();
    
    // Calculate the date range based on selected time frame
    let dateFilter = '';
    switch (timeFrame) {
      case 'daily':
        dateFilter = `, postedAfter: "${new Date(today.setDate(today.getDate() - 1)).toISOString()}"`;
        break;
      case 'weekly':
        dateFilter = `, postedAfter: "${new Date(today.setDate(today.getDate() - 7)).toISOString()}"`;
        break;
      case 'monthly':
        dateFilter = `, postedAfter: "${new Date(today.setMonth(today.getMonth() - 1)).toISOString()}"`;
        break;
      case 'yearly':
        dateFilter = `, postedAfter: "${new Date(today.setFullYear(today.getFullYear() - 1)).toISOString()}"`;
        break;
      case 'all-time':
      default:
        dateFilter = '';
        break;
    }

    const query = `{
      posts(first: 10, order: VOTES${dateFilter}) {
        edges {
          node {
            id
            name
            description
            tagline
            votesCount
            url
            thumbnail {
              url
            }
          }
        }
      }
    }`;

    fetch('https://api.producthunt.com/v2/api/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.posts.edges.length > 0) {
        const filteredPosts = data.data.posts.edges.filter(post => post.node.votesCount >= upvoteThreshold);
        displayMonthlyProductHuntLaunches(filteredPosts, showMedia);
      } else {
        monthlyProductHuntContainer.innerText = 'No monthly launches found.';
      }
    })
    .catch(error => {
      monthlyProductHuntContainer.innerText = 'Failed to load monthly launches.';
      console.error('Error fetching monthly launches:', error);
    });
  }

  // Function to display monthly Product Hunt launches
  function displayMonthlyProductHuntLaunches(posts, showMedia) {
    monthlyProductHuntContainer.innerHTML = '';

    posts.forEach(post => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.innerHTML = `
        ${showMedia && post.node.thumbnail.url ? `<img src="${post.node.thumbnail.url}" alt="${post.node.name}" class="product-image">` : ''}
        <div>
        <h3>
            <a href="${post.node.url}" target="_blank">${post.node.name}</a>
            <span class="vote-count">
              (${post.node.votesCount} 
              <span class="arrow">↑</span>)
            </span>
          </h3>
          <h4>${post.node.tagline}</h4>
          <p>${post.node.description}</p>
        </div>
      `;
      monthlyProductHuntContainer.appendChild(productItem);
    });
  }

  // Function to update the Monthly Product Hunt heading based on time frame
  function updateMonthlyProductHuntHeading(timeFrame) {
    let headingText = "Monthly Top Launches";
    switch (timeFrame) {
      case 'daily':
        headingText = "Today's Launches";
        break;
      case 'weekly':
        headingText = "This Week's Launches";
        break;
      case 'monthly':
        headingText = "This Month's Launches";
        break;
      case 'yearly':
        headingText = "This Year's Launches";
        break;
      case 'all-time':
        headingText = "All Time Launches";
        break;
    }

    // Update the heading text and reattach the settings icon
    const monthlyProductHuntHeading = document.querySelector('.monthly-product-hunt-column h2');
    monthlyProductHuntHeading.innerHTML = `${headingText} <span id="monthly-product-hunt-filter-icon" class="filter-icon">⚙️</span>`;
    
    // Reattach the event listener for the filter icon
    document.getElementById('monthly-product-hunt-filter-icon').addEventListener('click', () => {
      monthlyProductHuntFilters.style.display = monthlyProductHuntFilters.style.display === 'none' ? 'block' : 'none';
    });
  }

  // Apply monthly filters button click handler
  applyMonthlyProductHuntFiltersButton.addEventListener('click', () => {
    const timeFrame = document.getElementById('monthly-product-hunt-time-frame').value;
    const upvoteThreshold = parseInt(document.getElementById('monthly-product-hunt-upvotes').value, 10) || 0;
    const showMedia = document.getElementById('monthly-product-hunt-show-media').checked;

    // Update heading based on the selected time frame
    updateMonthlyProductHuntHeading(timeFrame);

    // Save user selections in local storage
    chrome.storage.local.set({
      monthlySelectedTimeFrame: timeFrame,
      monthlySelectedUpvoteThreshold: upvoteThreshold,
      monthlySelectedShowMedia: showMedia
    });

    // Fetch monthly launches with selected filters
    fetchMonthlyProductHuntLaunches(timeFrame, upvoteThreshold, showMedia);

    // Hide filters after applying
    monthlyProductHuntFilters.style.display = 'none';
  });

  // Load saved monthly user selections and apply filters on page load
  chrome.storage.local.get(
    ['monthlySelectedTimeFrame', 'monthlySelectedUpvoteThreshold', 'monthlySelectedShowMedia'], 
    function(result) {
      const savedTimeFrame = result.monthlySelectedTimeFrame || 'monthly'; // Default to monthly
      const savedUpvoteThreshold = result.monthlySelectedUpvoteThreshold || 0;
      const savedShowMedia = result.monthlySelectedShowMedia !== false;

      // Set the saved values
      document.getElementById('monthly-product-hunt-time-frame').value = savedTimeFrame;
      document.getElementById('monthly-product-hunt-upvotes').value = savedUpvoteThreshold;
      document.getElementById('monthly-product-hunt-show-media').checked = savedShowMedia;

      // Update heading based on the saved time frame
      updateMonthlyProductHuntHeading(savedTimeFrame);

      // Fetch monthly launches with saved filters
      fetchMonthlyProductHuntLaunches(savedTimeFrame, savedUpvoteThreshold, savedShowMedia);
    }
  );
});

// News fetching functions
async function fetchNews(source, options) {
  const newsContainer = document.getElementById('news');
  newsContainer.innerHTML = 'Loading news...';

  try {
    let articles;
    switch(source) {
      case 'hackernews':
        articles = await fetchHackerNews(options.storyType, options.limit);
        break;
      case 'googlenews':
        articles = await fetchGoogleNews(options.category);
        break;
      case 'techcrunch':
        articles = await fetchTechCrunchNews(options.category);
        break;
      default:
        throw new Error('Invalid news source');
    }
    return articles;
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = `Error loading news: ${error.message}`;
    throw error;
  }
}

// Existing Hacker News function with slight modifications
async function fetchHackerNews(storyType = 'top', limit = 10) {
  try {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json`);
    const storyIds = await response.json();
    const limitedStoryIds = storyIds.slice(0, limit);
    
    const storyPromises = limitedStoryIds.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then(response => response.json())
    );
    
    const stories = await Promise.all(storyPromises);
    return stories.map(story => ({
      title: story.title,
      url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
      source: 'Hacker News',
      publishedAt: story.time * 1000,
      author: story.by,
      score: story.score,
      comments: story.descendants || 0
    }));
  } catch (error) {
    console.error('Error fetching Hacker News:', error);
    throw error;
  }
}

async function fetchGoogleNews(category) {
  try {
    // Using RSS2JSON service to handle CORS and convert RSS to JSON
    const rssToJsonApi = 'https://api.rss2json.com/v1/api.json';
    const googleNewsRss = `https://news.google.com/rss/search?q=${category}&hl=en-US&gl=US&ceid=US:en`;
    
    const response = await fetch(`${rssToJsonApi}?rss_url=${encodeURIComponent(googleNewsRss)}`);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch Google News');
    }

    return data.items.slice(0, 10).map(item => ({
      title: item.title,
      url: item.link,
      source: 'Google News',
      publishedAt: new Date(item.pubDate).getTime(),
      author: item.author || 'Google News',
      description: item.description
    }));
  } catch (error) {
    console.error('Error fetching Google News:', error);
    throw error;
  }
}

async function fetchTechCrunchNews(category = 'startups') {
  try {
    // Using RSS2JSON service (same as Google News)
    const rssToJsonApi = 'https://api.rss2json.com/v1/api.json';
    const techCrunchRss = `https://techcrunch.com/category/${category}/feed/`;
    
    const response = await fetch(`${rssToJsonApi}?rss_url=${encodeURIComponent(techCrunchRss)}`);
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to fetch TechCrunch news');
    }

    return data.items.slice(0, 10).map(item => ({
      title: item.title,
      url: item.link,
      source: 'TechCrunch',
      publishedAt: new Date(item.pubDate).getTime(),
      author: item.author,
      description: item.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
      image: item.thumbnail
    }));
  } catch (error) {
    console.error('Error fetching TechCrunch news:', error);
    throw error;
  }
}

// Display news function
function displayNews(articles) {
  const newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';

  if (!articles || articles.length === 0) {
    newsContainer.innerHTML = 'No news articles found.';
    return;
  }

  articles.forEach(article => {
    if (!article.title || !article.url) return; // Skip invalid articles

    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    
    const timeAgo = calculateTimeAgo(article.publishedAt);
    
    // Clean up description if it exists (remove HTML tags)
    const cleanDescription = article.description ? 
      article.description.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : '';
    
    newsItem.innerHTML = `
      <div class="news-content">
        <h3>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer">
            ${article.title}
          </a>
        </h3>
        <div class="news-metadata">
          ${article.source ? `<span>${article.source}</span>` : ''}
          ${article.author ? `<span>by ${article.author}</span>` : ''}
          <span>${timeAgo}</span>
          ${article.score ? `<span>${article.score} points</span>` : ''}
          ${article.comments ? `
            <a href="https://news.ycombinator.com/item?id=${article.id}" target="_blank">
              ${article.comments} comments
            </a>
          ` : ''}
        </div>
        ${cleanDescription ? `<p class="description">${cleanDescription}</p>` : ''}
      </div>
    `;
    newsContainer.appendChild(newsItem);
  });
}

// Helper function to calculate time ago
function calculateTimeAgo(timestamp) {
  const seconds = Math.floor((new Date() - timestamp) / 1000);

  let interval = seconds / 31536000; // years
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000; // months
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400; // days
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600; // hours
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60; // minutes
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}

async function fetchCombinedStartupNews() {
  try {
    // Fetch from multiple sources in parallel
    const [hackerNews, techCrunch] = await Promise.all([
      fetchHackerNews('top', 5),
      fetchTechCrunchNews()
    ]);

    // Combine and sort by date
    const combined = [...hackerNews, ...techCrunch]
      .sort((a, b) => b.publishedAt - a.publishedAt);

    return combined.slice(0, 10); // Return top 10 most recent
  } catch (error) {
    console.error('Error fetching combined news:', error);
    throw error;
  }
}

// Time and date update function
function updateDateTime() {
  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');
  
  if (!timeElement || !dateElement) {
    console.error('Time or date element not found!');
    return;
  }
  
  const now = new Date();
  
  // Format time (HH:MM PM/AM)
  timeElement.textContent = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  // Format date (Weekday, Month Day, Year)
  dateElement.textContent = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Initialize immediately
updateDateTime();

// Then set up the interval
setInterval(updateDateTime, 1000);

// Also set up the DOMContentLoaded listener as a backup
document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
});

// Hide social icons related code
/* document.addEventListener('DOMContentLoaded', () => {
  const moreOptions = document.querySelector('.more-options');
  // ... rest of social icons code
}); */
