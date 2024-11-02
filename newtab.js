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
  const applyNewsFiltersButton = document.getElementById('apply-news-filters');
  const newsContainer = document.getElementById('news');

  // Show or hide filters section on icon click
  filterIcon.addEventListener('click', () => {
    newsFilters.style.display = newsFilters.style.display === 'none' ? 'block' : 'none';
  });

  // Function to fetch Hacker News stories
  async function fetchHackerNews(storyType = 'top', limit = 10) {
    try {
      // First fetch the story IDs
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json`);
      const storyIds = await response.json();
      
      // Take only the number of stories we want
      const limitedStoryIds = storyIds.slice(0, limit);
      
      // Fetch all story details in parallel
      const storyPromises = limitedStoryIds.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(response => response.json())
      );
      
      const stories = await Promise.all(storyPromises);
      displayNews(stories);
    } catch (error) {
      console.error('Error fetching Hacker News:', error);
      document.getElementById('news').innerHTML = 'Failed to load news.';
    }
  }

  // Function to display the news
  function displayNews(stories) {
    const newsContainer = document.getElementById('news');
    newsContainer.innerHTML = '';

    stories.forEach(story => {
      if (!story) return; // Skip if story is null

      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');
      
      // Calculate time ago
      const timeAgo = calculateTimeAgo(story.time * 1000); // Convert Unix timestamp to milliseconds
      
      newsItem.innerHTML = `
        <div class="news-content">
          <h3>
            <a href="${story.url || `https://news.ycombinator.com/item?id=${story.id}`}" target="_blank">
              ${story.title}
            </a>
          </h3>
          <div class="news-metadata">
            <span>${story.score} points</span>
            <span>by ${story.by}</span>
            <span>${timeAgo}</span>
            <a href="https://news.ycombinator.com/item?id=${story.id}" target="_blank">
              ${story.descendants || 0} comments
            </a>
          </div>
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

  // Apply filters and fetch news based on user input
  applyNewsFiltersButton.addEventListener('click', () => {
    const storyType = document.getElementById('news-story-type').value;
    const limit = parseInt(document.getElementById('news-limit').value, 10);
    
    // Save preferences
    chrome.storage.local.set({
      selectedStoryType: storyType,
      selectedLimit: limit
    });

    fetchHackerNews(storyType, limit);
    newsFilters.style.display = 'none';
  });

  // Load saved preferences and fetch news
  chrome.storage.local.get(['selectedStoryType', 'selectedLimit'], function(result) {
    const savedStoryType = result.selectedStoryType || 'top';
    const savedLimit = result.selectedLimit || 10;

    document.getElementById('news-story-type').value = savedStoryType;
    document.getElementById('news-limit').value = savedLimit;

    fetchHackerNews(savedStoryType, savedLimit);
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
          <h3><a href="${post.node.url}" target="_blank">${post.node.name}</a></h3>
          <p>${post.node.tagline}</p>
          <p>${post.node.description}</p>
        </div>
        <div class="product-votes">
          <div class="vote-box">
            <span class="vote-count">${post.node.votesCount} Votes</span>
          </div>
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
        headingText = "Today's Product Hunt Launches";
        break;
      case 'weekly':
        headingText = "This Week's Product Hunt Launches";
        break;
      case 'monthly':
        headingText = "This Month's Product Hunt Launches";
        break;
      case 'yearly':
        headingText = "This Year's Product Hunt Launches";
        break;
      case 'all-time':
        headingText = "All Time Product Hunt Launches";
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
      posts(first: 20, order: VOTES${dateFilter}) {
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
          <h3><a href="${post.node.url}" target="_blank">${post.node.name}</a></h3>
          <p>${post.node.tagline}</p>
          <p>${post.node.description}</p>
        </div>
        <div class="product-votes">
          <div class="vote-box">
            <span class="vote-count">${post.node.votesCount} Votes</span>
          </div>
        </div>
      `;
      monthlyProductHuntContainer.appendChild(productItem);
    });
  }

  // Apply monthly filters button click handler
  applyMonthlyProductHuntFiltersButton.addEventListener('click', () => {
    const timeFrame = document.getElementById('monthly-product-hunt-time-frame').value;
    const upvoteThreshold = parseInt(document.getElementById('monthly-product-hunt-upvotes').value, 10) || 0;
    const showMedia = document.getElementById('monthly-product-hunt-show-media').checked;

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

      // Fetch monthly launches with saved filters
      fetchMonthlyProductHuntLaunches(savedTimeFrame, savedUpvoteThreshold, savedShowMedia);
    }
  );
});
