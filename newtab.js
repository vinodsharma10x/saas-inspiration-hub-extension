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

  // Function to fetch SaaS news based on user-selected filters
  function fetchSaaSNews(categories, keywords) {
    const apiKey = 'ad4f0ec2b8ba51751b6a3353b346b939'; // Replace with your Mediastack API key
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${categories}&keywords=${keywords}&languages=en&limit=5`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.data) {
          chrome.storage.local.set({
            saasNewsData: data.data,
            saasNewsCacheTime: Date.now()
          });
          displayNews(data.data);
        } else {
          newsContainer.innerText = 'No news found.';
        }
      })
      .catch(error => {
        newsContainer.innerText = 'Failed to load news.';
        console.error('Error fetching news:', error);
      });
  }

  // Apply filters and fetch news based on user input
  applyNewsFiltersButton.addEventListener('click', () => {
    const selectedCategories = Array.from(document.querySelectorAll('.checkbox-group input:checked'))
      .map(checkbox => checkbox.value)
      .join(',');

    const keywords = document.getElementById('news-keywords').value.trim();

    // Save user selections in local storage
    chrome.storage.local.set({
      selectedCategories: selectedCategories,
      selectedKeywords: keywords
    });

    // Fetch news with selected filters
    fetchSaaSNews(selectedCategories, keywords);

    // Hide filters after applying
    newsFilters.style.display = 'none';
  });

  // Load saved user selections and apply filters on page load
  chrome.storage.local.get(['selectedCategories', 'selectedKeywords'], function(result) {
    const savedCategories = result.selectedCategories || 'business'; // Default to 'business'
    const savedKeywords = result.selectedKeywords || 'saas'; // Default to 'saas'

    // Check the checkboxes based on saved categories
    savedCategories.split(',').forEach(category => {
      const checkbox = document.querySelector(`.checkbox-group input[value="${category}"]`);
      if (checkbox) checkbox.checked = true;
    });

    // Set the keywords input value
    document.getElementById('news-keywords').value = savedKeywords;

    // Fetch news with saved filters
    fetchSaaSNews(savedCategories, savedKeywords);
  });
});

// Function to display SaaS news articles
function displayNews(articles) {
  const newsContainer = document.getElementById('news');
  newsContainer.innerHTML = '';

  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('news-item');
    newsItem.innerHTML = `
      ${article.image ? `<img src="${article.image}" alt="${article.title}" class="news-image">` : ''}
      <div>
        <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
        <p>${article.description || 'No description available.'}</p>
        <small>Published on: ${new Date(article.published_at).toLocaleDateString()}</small>
      </div>
    `;
    newsContainer.appendChild(newsItem);
  });
}

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
