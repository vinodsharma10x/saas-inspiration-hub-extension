// Array of handpicked motivational quotes related to building a SaaS application, a SaaS business, and entrepreneurs' pain points, etc. 
// I will move these to a cloud storage in the future.
const quotes = [
  { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
  { text: "Don’t worry about failure; you only have to be right once.", author: "Drew Houston" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "You don’t learn to walk by following rules. You learn by doing and falling over.", author: "Richard Branson" },
  { text: "Make every detail perfect and limit the number of details to perfect.", author: "Jack Dorsey" },
  { text: "If you are not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
  { text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.", author: "Mark Zuckerberg" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Your brand is what people say about you when you’re not in the room.", author: "Jeff Bezos" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "We must learn what customers really want, not what they say they want or what we think they should want.", author: "Eric Ries" },
  { text: "Great companies are built on great products.", author: "Elon Musk" },
  { text: "The only thing worse than starting something and failing is not starting something.", author: "Seth Godin" },
  { text: "Ideas are easy. Implementation is hard.", author: "Guy Kawasaki" },
  { text: "Don’t let the noise of others’ opinions drown out your own inner voice.", author: "Steve Jobs" },
  { text: "Focus on the user and all else will follow.", author: "Google's Corporate Philosophy" },
  { text: "You don’t need to have a 100-person company to develop that idea.", author: "Larry Page" },
  { text: "Success is not about being the best. It’s about always getting better.", author: "Jeff Bezos" },
  { text: "I always did something I was a little not ready to do. I think that’s how you grow.", author: "Marissa Mayer" },
  { text: "Don’t compare yourself with anyone in this world… if you do so, you are insulting yourself.", author: "Bill Gates" },
  { text: "Risk more than others think is safe. Dream more than others think is practical.", author: "Howard Schultz" },
  { text: "Timing, perseverance, and ten years of trying will eventually make you look like an overnight success.", author: "Biz Stone" },
  { text: "Fail often so you can succeed sooner.", author: "Tom Kelley" },
  { text: "A goal without a timeline is just a dream.", author: "Robert Herjavec" },
  { text: "Quality is more important than quantity. One home run is much better than two doubles.", author: "Steve Jobs" },
  { text: "It's not about how to get started; it's about how to keep going.", author: "Simon Sinek" },
  { text: "The most valuable thing you can make is a mistake—you can't learn anything from being perfect.", author: "Adam Osborne" },
  { text: "You just have to pay attention to what people need and what has not been done.", author: "Russell Simmons" },
  { text: "The secret to successful hiring is this: look for the people who want to change the world.", author: "Marc Benioff" },
  { text: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn" },
  { text: "Don't find customers for your products, find products for your customers.", author: "Seth Godin" },
  { text: "The value of an idea lies in the using of it.", author: "Thomas Edison" },
  { text: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
  { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Do not be embarrassed by your failures, learn from them and start again.", author: "Richard Branson" },
  { text: "Great things in business are never done by one person. They're done by a team of people.", author: "Steve Jobs" },
  { text: "The fastest way to change yourself is to hang out with people who are already the way you want to be.", author: "Reid Hoffman" },
  { text: "What we learn from history is that people don’t learn from history.", author: "Warren Buffett" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Growth is never by mere chance; it is the result of forces working together.", author: "James Cash Penney" },
{ text: "The only way to win is to learn faster than anyone else.", author: "Eric Ries" },
{ text: "We don’t have to be smarter than the rest; we have to be more disciplined than the rest.", author: "Warren Buffett" },
{ text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
{ text: "If you want to build something great, you should focus on what the customer wants, not what you want.", author: "Steve Jobs" },
{ text: "Do things that don’t scale.", author: "Paul Graham" },
{ text: "If you define the problem correctly, you almost have the solution.", author: "Steve Jobs" },
{ text: "If you can’t feed a team with two pizzas, it’s too large.", author: "Jeff Bezos" },
{ text: "Don't let your learning lead to knowledge. Let your learning lead to action.", author: "Jim Rohn" },
{ text: "You don't need to have a company of a thousand people to develop that idea.", author: "Larry Page" },
{ text: "Sell the problem you solve, not the product.", author: "Anonymous" },
{ text: "You have to see failure as the beginning and the middle, but never entertain it as an end.", author: "Jessica Herrin" },
{ text: "The secret of change is to focus all your energy not on fighting the old but on building the new.", author: "Socrates" },
{ text: "A product that makes people better off and a business model that makes money is sustainable.", author: "Tim O'Reilly" },
{ text: "Don’t count the things you do; do the things that count.", author: "Zig Ziglar" },
{ text: "Solve a real problem that a lot of people have.", author: "Paul Graham" },
{ text: "Don’t try to be all things to all people.", author: "Andrew Wilkinson" },
{ text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
{ text: "Your most loyal customers aren’t the ones you’ve just acquired.", author: "Brian Balfour" },
{ text: "Create a customer, not a sale.", author: "Katherine Barchetti" },
{ text: "The future belongs to those who prepare for it today.", author: "Malcolm X" },
{ text: "Don’t optimize for conversions; optimize for customer happiness.", author: "Dharmesh Shah" },
{ text: "A startup is a human institution designed to create a new product or service under conditions of extreme uncertainty.", author: "Eric Ries" },
{ text: "Customer service shouldn’t just be a department, it should be the entire company.", author: "Tony Hsieh" },
{ text: "It’s not about having the right opportunities. It’s about handling the opportunities right.", author: "Mark Hunter" },
{ text: "Get closer than ever to your customers. So close that you tell them what they need well before they realize it themselves.", author: "Steve Jobs" },
{ text: "We must look for the opportunity in every difficulty instead of being paralyzed at the thought of the difficulty in every opportunity.", author: "Walter E. Cole" },
{ text: "If you can’t explain it simply, you don’t understand it well enough.", author: "Albert Einstein" },
{ text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
{ text: "Be undeniably good. No marketing effort or social media buzzword can be a substitute for that.", author: "Anthony Volodkin" },
{ text: "When something is important enough, you do it even if the odds are not in your favor.", author: "Elon Musk" },
{ text: "Find your niche, find your voice. Build what you would use.", author: "Daniel Ek" },
{ text: "Don't worry about funding if you don’t need it. Today it’s cheaper to start a business than ever.", author: "Noah Everett" },
{ text: "If you are not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
{ text: "Don’t worry about being successful but work toward being significant and the success will naturally follow.", author: "Oprah Winfrey" },
{ text: "The more you engage with customers, the clearer things become and the easier it is to determine what you should be doing.", author: "John Russell" },
{ text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" },
{ text: "If you don’t build your dream, someone else will hire you to help them build theirs.", author: "Dhirubhai Ambani" },
{ text: "We must test to the very limit of exhaustion. The success of our mission may depend on it.", author: "Elon Musk" },
{ text: "Learn to see what customers don’t yet realize they need.", author: "David Marcus" },
{ text: "Build a business that fits your life, not a life that fits your business.", author: "Laura Roeder" },
{ text: "People don’t buy what you do, they buy why you do it.", author: "Simon Sinek" },
{ text: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.", author: "Harold R. McAlindon" },
{ text: "Solve for the customer, not for your ego.", author: "Dharmesh Shah" },
{ text: "If you don’t know where you’re going, you’ll end up someplace else.", author: "Yogi Berra" },
{ text: "Revenue is vanity, profit is sanity, but cash is king.", author: "Anonymous" },
{ text: "Find a group of people who challenge and inspire you, spend a lot of time with them, and it will change your life.", author: "Amy Poehler" },
{ text: "It's not about ideas. It's about making ideas happen.", author: "Scott Belsky" },
{ text: "The key to success is to start before you are ready.", author: "Marie Forleo" },
{ text: "Don’t be afraid to give up the good to go for the great.", author: "John D. Rockefeller" },
{ text: "Do what you love, and success will follow. Passion is the fuel behind a successful career.", author: "Meg Whitman" },
{ text: "Build something 100 people love, not something 1 million people kind of like.", author: "Brian Chesky" },
{ text: "Don’t try to be original, just try to be good.", author: "Paul Rand" },
{ text: "You don’t build a business. You build people, and people build the business.", author: "Zig Ziglar" },
{ text: "Business opportunities are like buses, there’s always another one coming.", author: "Richard Branson" },
{ text: "Your reputation is more important than your paycheck, and your integrity is worth more than your career.", author: "Ryan Freitas" },
{ text: "Make something people want includes making a company that people want to work for.", author: "Sahil Lavingia" },
{ text: "Always deliver more than expected.", author: "Larry Page" },
{ text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", author: "Steve Jobs" },
{ text: "The best startups generally come from somebody needing to scratch an itch.", author: "Michael Arrington" },
{ text: "If you’re not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
{ text: "Entrepreneurship is about creating change, not just companies.", author: "Mark Zuckerberg" },
{ text: "The question isn’t who is going to let me; it’s who is going to stop me.", author: "Ayn Rand" },
{ text: "It’s not that we need new ideas, but we need to stop having old ideas.", author: "Edwin Land" },
{ text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
{ text: "Make your customers feel like superheroes.", author: "Chris Brogan" },
{ text: "Don’t try to be a thought leader. Just try to be a leader. And the rest will follow.", author: "Seth Godin" },
{ text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
{ text: "When you find an idea that you just can’t stop thinking about, that’s probably a good one to pursue.", author: "Josh James" },
{ text: "Find what makes you unique and focus on being different from everyone else.", author: "Kevin Stirtz" },
{ text: "Entrepreneurs don’t finish when we are tired. We finish when we are done.", author: "Robert T. Kiyosaki" },
{ text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
{ text: "Focus on building a painkiller, not a vitamin.", author: "Shashank Nigam" },
{ text: "The most dangerous thing for a SaaS company is customer churn.", author: "David Skok" },
{ text: "The goal is not to build a website, but to build your business.", author: "Amit Kalantri" },
{ text: "Execution is everything in a startup. It's easy to have ideas, it's hard to build them.", author: "John Collison" },
{ text: "If you’re not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
{ text: "In SaaS, your product should always be in beta, always evolving.", author: "Jason Fried" },
{ text: "Solve a real problem for your customers, and the business will follow.", author: "Ryan Smith" },
{ text: "The best way to get a startup to succeed is to get customers who want to pay for it.", author: "Dharmesh Shah" },
{ text: "You need to prioritize and say no to great opportunities to pursue even greater ones.", author: "David Cancel" },
{ text: "Stay true to your principles, but be flexible with your product.", author: "Gaurav Dhillon" },
{ text: "Revenue is important, but retention is what matters most in SaaS.", author: "Lincoln Murphy" },
{ text: "Customer success is not a department, it’s a philosophy.", author: "Nick Mehta" },
{ text: "SaaS businesses need to continually prove their value to keep customers.", author: "Tomasz Tunguz" },
{ text: "Focus on your strengths and outsource your weaknesses.", author: "Ryan Kulp" },
{ text: "Never assume your SaaS product is perfect; it's always a work in progress.", author: "Hiten Shah" },
{ text: "Your product has to be ten times better than the competition to win.", author: "Paul Graham" },
{ text: "Don't start a business unless it's an obsession and something you love.", author: "Mark Cuban" },
{ text: "Success is not final; failure is not fatal. It is the courage to continue that counts.", author: "Winston Churchill" },
{ text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
{ text: "Ideas are commodities. Execution of them is not.", author: "Michael Dell" },
{ text: "Build a business that people want to talk about.", author: "Seth Godin" },
{ text: "It’s not about how to sell; it’s about how to help.", author: "Dharmesh Shah" },
{ text: "Every startup should start with a problem that needs solving.", author: "Kevin Systrom" },
{ text: "A SaaS product is never done. You have to keep iterating to succeed.", author: "David Skok" },
{ text: "If you don’t find a way to make money while you sleep, you will work until you die.", author: "Warren Buffett" },
{ text: "Your SaaS company should be solving problems, not just selling software.", author: "Patrick Campbell" },
{ text: "You can't sell anything if you can't tell anything.", author: "Beth Comstock" },
{ text: "A great product alone is not enough. You have to have a scalable, repeatable go-to-market strategy.", author: "Jason Lemkin" },
{ text: "Customer retention is the new growth.", author: "Brian Balfour" },
{ text: "Growth is never by mere chance; it is the result of forces working together.", author: "James Cash Penney" },
{ text: "If you are not embarrassed by the first version of your product, you’ve launched too late.", author: "Reid Hoffman" },
{ text: "In SaaS, you’re always building a plane while flying it.", author: "Des Traynor" },
{ text: "Understand your customers deeply, not just their business.", author: "April Dunford" },
{ text: "In SaaS, every user action is a potential data point to learn from.", author: "Aaron Ross" },
{ text: "In SaaS, the best user experience is the one that’s not in the way.", author: "Ryan Singer" },
{ text: "The most successful SaaS companies focus on the smallest possible problem they can solve well.", author: "Dharmesh Shah" },
{ text: "Revenue is important, but churn is deadly.", author: "Jason Lemkin" },
{ text: "Price is what you pay; value is what you get.", author: "Warren Buffett" },
{ text: "Create something people want before they know they want it.", author: "Steve Jobs" },
{ text: "You cannot scale customer success. You have to be customer-success driven from day one.", author: "Lincoln Murphy" },
{ text: "Successful entrepreneurs are givers and not takers of positive energy.", author: "Anonymous" },
{ text: "Build a brand that makes your customers feel proud.", author: "Brian Chesky" },
{ text: "People buy into the leader before they buy into the vision.", author: "John Maxwell" },
{ text: "SaaS is a marathon, not a sprint.", author: "Jason Lemkin" },
{ text: "Don’t aim for success if you want it; just do what you love and believe in, and it will come naturally.", author: "David Frost" },
{ text: "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.", author: "Charles Darwin" },
{ text: "Always listen to your customers, especially when they’re unhappy.", author: "Mark Cuban" },
{ text: "If you’re not building something worth scaling, you’re wasting your time.", author: "David Skok" },
{ text: "Entrepreneurs are willing to work 80 hours a week to avoid working 40 hours a week.", author: "Lori Greiner" },
{ text: "You can't just ask customers what they want and then try to give that to them. By the time you get it built, they’ll want something new.", author: "Steve Jobs" },
{ text: "A true entrepreneur is a doer, not a dreamer.", author: "Nolan Bushnell" },
{ text: "If you define the problem correctly, you almost have the solution.", author: "Steve Jobs" },
{ text: "We are what we repeatedly do. Excellence, therefore, is not an act, but a habit.", author: "Aristotle" },
{ text: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs" },
{ text: "Being a great place to work is the difference between being a good company and a great company.", author: "Brian Kristofek" },
{ text: "Great companies start because the founders want to change the world, not make a fast buck.", author: "Guy Kawasaki" },
{ text: "In SaaS, every feature has a cost, and sometimes the cost is customer confusion.", author: "Des Traynor" },
{ text: "SaaS companies grow when they help their customers grow.", author: "Nick Mehta" },
{ text: "If you double the number of experiments you do per year, you’re going to double your inventiveness.", author: "Jeff Bezos" },
{ text: "If you can’t measure it, you can’t improve it.", author: "Peter Drucker" },
{ text: "Success in SaaS is about solving the customer’s problem, not building the fanciest solution.", author: "Lincoln Murphy" },
{ text: "You can't predict what customers want, but you can ask.", author: "Steve Blank" },
{ text: "If you don't know your numbers, you don't know your business.", author: "Marcus Lemonis" },
{ text: "The product is not just what you sell; it’s the entire experience from start to finish.", author: "Ann Handley" },
{ text: "Solve a real problem, not an imaginary one.", author: "Paul Graham" },
{ text: "SaaS is a long-term game, and you need to be in it for the long haul.", author: "Jason Lemkin" },
{ text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
{ text: "Your brand is what other people say about you when you’re not in the room.", author: "Jeff Bezos" },
{ text: "Don't find customers for your products; find products for your customers.", author: "Seth Godin" },
{ text: "The best products don’t focus on features; they focus on clarity.", author: "Scott Belsky" },
{ text: "A satisfied customer is the best business strategy of all.", author: "Michael LeBoeuf" },
{ text: "Always deliver more than expected.", author: "Larry Page" },
{ text: "Chase the vision, not the money; the money will end up following you.", author: "Tony Hsieh" },
{ text: "It’s not just about ideas; it’s about making ideas happen.", author: "Scott Belsky" },
{ text: "In the world of internet customer service, it’s important to remember your competitor is only one mouse click away.", author: "Doug Warner" }
];

// Array of handpicked daily journaling prompts for SaaS founders and entrepreneurs. I will move these to a cloud storage in the future.
const journalingPrompts = [
  "What is one customer pain point you solved today? How did it impact your product?",
  "What key metric are you focusing on this week, and why?",
  "What was the most challenging decision you made today, and what were the key factors?",
  "How can you add more value to your customers this week?",
  "What is the biggest risk facing your business right now, and how are you mitigating it?",
  "What are your top three priorities for this week, and why?",
  "How are you empowering your team to take ownership and lead?",
  "What feedback did you receive today that could improve your product or service?",
  "What’s one experiment you want to try this week to accelerate growth?",
  "How are you balancing long-term vision with short-term execution?",
  "What was your biggest learning moment today, and how will it influence your next steps?",
  "What was the most significant milestone you achieved this week, and how did you celebrate it?",
"How are you differentiating your product from competitors in the market?",
"What did you delegate today, and how did it free up your time for strategic tasks?",
"What unexpected challenge did you face this week, and how did you overcome it?",
"What is the biggest insight you gained from analyzing customer data this week?",
"How did you improve your onboarding process today?",
"What partnership opportunities did you explore this week?",
"How did you manage work-life balance today?",
"What new skill did you or your team learn this week?",
"What is one feature you wish you had time to build this month?",
"How did you ensure your team stayed aligned with your company vision today?",
"What is the most valuable resource you discovered this week, and how will you use it?",
"What proactive step did you take to prevent customer churn today?",
"What advice would you give to a fellow entrepreneur facing a similar challenge?",
"How did you validate a new product idea this week?",
"What is one task you wish you had done differently today?",
"How did you celebrate small wins with your team this week?",
"What improvement did you make to your customer support process today?",
"What’s one way you enhanced team collaboration this week?",
"How did you maintain focus on your long-term goals today?",
"What unexpected opportunity did you pursue this week?",
"How did you adapt to changing customer needs this week?",
"What KPI are you most proud of this month, and why?",
"What steps did you take today to improve your product’s user experience?",
"What’s one piece of advice you wish you had received when starting your SaaS journey?",
"What did you learn from your competitors this week that could influence your strategy?",
"How did you ensure your product met customer expectations today?",
"What process did you optimize today to improve efficiency?",
"What new marketing strategy are you excited to implement this month?",
"How did you keep your team motivated during a challenging project?",
"What was the most rewarding feedback you received from a customer this week?",
"How did you foster a culture of innovation within your team today?",
"What new tools or technologies did you explore this week, and how could they benefit your business?",
"How did you use data to make an informed decision today?",
"What are the top three goals you want to achieve this quarter, and why?",
"What actions did you take today to strengthen your brand’s identity?",
"How did you prioritize your tasks today, and what would you change?",
"What unexpected customer insight did you gain this week, and how will you use it?",
"What’s one habit you’re developing to improve your leadership skills?",
"How did you ensure transparent communication with your team today?",
"What was the most valuable advice you received this week, and how will you apply it?",
"What steps did you take today to improve your product’s accessibility?",
"How did you balance short-term gains with long-term growth this week?",
"What’s one challenge you overcame today that made you a better leader?",
"How did you align your product roadmap with customer feedback this week?",
"What experiment did you run today to improve customer engagement?",
"How did you contribute to your company culture today?",
"What did you learn from a recent failure, and how will you use it moving forward?",
"What steps did you take today to scale your business sustainably?",
"How did you measure your team’s productivity this week, and what did you learn?",
"What’s one small change you made today to improve customer satisfaction?",
"How did you align your team’s efforts with the company’s vision this week?",
"What feature did you enhance today to simplify the user experience?",
"What challenges did you face in scaling your operations, and how did you tackle them?",
"How did you adapt your strategy based on user behavior data?",
"What did you learn from a recent customer churn, and how can you prevent it?",
"How did you address a recurring issue in your product today?",
"What new partnership opportunities did you explore this week?",
"How did you ensure your team maintained work-life balance during a busy period?",
"What steps did you take today to increase your product’s market reach?",
"How did you stay ahead of industry trends this week?",
"What did you learn from a competitor’s success this week?",
"What aspect of your business model did you refine today?",
"How did you use storytelling to convey your brand’s value today?",
"What’s one skill you focused on developing this week?",
"How did you handle a conflict within your team today?",
"What was your most productive meeting this week, and why?",
"How did you challenge your assumptions about your target market today?",
"What’s one way you experimented with your pricing model this week?",
"How did you measure customer loyalty today?",
"What was the most significant milestone your team achieved this week?",
"How did you leverage customer testimonials in your marketing strategy today?",
"What’s one new customer segment you targeted this week?",
"How did you promote transparency in your business operations today?",
"What are three ways you can enhance your product’s value proposition?"
];

// Function to display a random quote
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  //document.getElementById('quote').innerText = `"${randomQuote.text}"`;
  //document.getElementById('author').innerText = `— ${randomQuote.author}`;
}


// Function to display a random journaling prompt and save it for the day
function displayRandomJournalPrompt() {
  const today = new Date().toDateString();

  chrome.storage.local.get(['journalPrompt', 'promptDate'], function(result) {
    if (result.promptDate === today) {
      // Display the saved prompt if it's for today
      document.getElementById('journal-prompt').innerText = `"${result.journalPrompt}"`;
    } else {
      // Generate and display a new prompt
      const randomIndex = Math.floor(Math.random() * journalingPrompts.length);
      const randomPrompt = journalingPrompts[randomIndex];
      document.getElementById('journal-prompt').innerText = `"${randomPrompt}"`;

      // Save the new prompt and date in chrome storage
      chrome.storage.local.set({ 
        journalPrompt: randomPrompt, 
        promptDate: today 
      });
    }
  });
}


// Function to load and display Product Hunt launches
function loadProductHuntLaunches() {
  chrome.storage.local.get(['productHuntData', 'productHuntCacheTime'], function(result) {
    const cacheTime = result.productHuntCacheTime || 0;
    const currentTime = Date.now();

    if (result.productHuntData && (currentTime - cacheTime < 2 * 60 * 60 * 1000)) {
      displayProductHuntLaunches(result.productHuntData);
    } else {
      fetchProductHuntLaunches();
    }
  });
}


// Fetch Product Hunt launches from the API
function fetchProductHuntLaunches() {
  const apiKey = '-XJKPhHe0yzeKZhMCPfUBwfo6Mzlrjv6_vtNgxeMPFw'; // Replace with your Product Hunt API key
  const url = 'https://api.producthunt.com/v2/api/graphql';
  const query = `
  {
    posts(first: 5, postedAfter: "${new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()}", order: VOTES) {
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

  fetch(url, {
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
        chrome.storage.local.set({
          productHuntData: data.data.posts.edges,
          productHuntCacheTime: Date.now()
        });
        displayProductHuntLaunches(data.data.posts.edges);
      } else {
        document.getElementById('product-hunt').innerText = 'No launches found.';
      }
    })
    .catch(error => {
      document.getElementById('product-hunt').innerText = 'Failed to load Product Hunt launches.';
      console.error('Error fetching launches:', error);
    });
}

// Function to display Product Hunt launches
function displayProductHuntLaunches(posts) {
  const productHuntContainer = document.getElementById('product-hunt');
  productHuntContainer.innerHTML = '';

  posts.forEach(post => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
      <img src="${post.node.thumbnail.url}" alt="${post.node.name}" class="product-image">
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


function saveNickname() {
  const nickname = document.getElementById('nicknameInput').value.trim();
  if (nickname) {
    chrome.storage.local.set({ nickname: nickname }, function() {
      displayWelcomeMessage(nickname); // Display welcome message right after saving
      toggleNicknameInput(false); // Hide the input field and button
    });
  }
}

function toggleNicknameInput(show) {
  const nicknameInput = document.getElementById('nicknameInput');
  const saveButton = document.getElementById('saveNickname');
  const welcomeSection = document.querySelector('.welcome-section');
  
  if (show) {
    nicknameInput.style.display = 'inline-block';
    saveButton.style.display = 'inline-block';
    welcomeSection.style.display = 'none';
  } else {
    nicknameInput.style.display = 'none';
    saveButton.style.display = 'none';
    welcomeSection.style.display = 'block';
  }
}


// Display welcome message with nickname
function displayWelcomeMessage(nickname) {

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  const welcomeMessage = `Welcome, ${nickname}! ${randomQuote.text} — ${randomQuote.author}`;
  document.getElementById('welcomeMessage').innerText = welcomeMessage;
}

// Load saved nickname on page load
function loadNickname() {
  chrome.storage.local.get(['nickname'], function(result) {
    const nicknameInput = document.getElementById('nicknameInput');
    const saveButton = document.getElementById('saveNickname');
    const welcomeSection = document.querySelector('.welcome-section');

    if (result.nickname) {
      displayWelcomeMessage(result.nickname);
      nicknameInput.style.display = 'none';
      saveButton.style.display = 'none';
      welcomeSection.style.display = 'block';
    } else {
      nicknameInput.style.display = 'inline-block';
      saveButton.style.display = 'inline-block';
      welcomeSection.style.display = 'none';
    }
  });
}


// Function to load SaaS news and use caching
function loadSaaSNews() {
  chrome.storage.local.get(['saasNewsData', 'saasNewsCacheTime'], function(result) {
    const cacheTime = result.saasNewsCacheTime || 0;
    const currentTime = Date.now();

    if (result.saasNewsData && (currentTime - cacheTime < 4 * 60 * 60 * 1000)) {
      displayNews(result.saasNewsData);
    } else {
      fetchSaaSNews();
    }
  });
}

// Fetch SaaS news from API
function fetchSaaSNews() {
  const apiKey = 'ad4f0ec2b8ba51751b6a3353b346b939'; // Replace with your Mediastack API key
  const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=business&keywords=saas&languages=en&limit=5`;

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
        document.getElementById('news').innerText = 'No news found.';
      }
    })
    .catch(error => {
      document.getElementById('news').innerText = 'Failed to load news.';
      console.error('Error fetching news:', error);
    });
}

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

// Event listener for the save button
document.getElementById('saveNickname').addEventListener('click', saveNickname);


// Function to save journal entry and update history
function saveJournalEntry(entry) {
  const today = new Date().toDateString();

  chrome.storage.local.get(['journalPrompt', 'journalHistory'], function(result) {
    const currentPrompt = result.journalPrompt || '';
    const history = result.journalHistory || {};

    // Save both the prompt and the entry text
    history[today] = {
      prompt: currentPrompt,
      entry: entry
    };

    chrome.storage.local.set({ journalHistory: history }, function() {
      updateJournalHistory(history);
    });
  });
}


// Function to update journal history with edit icon at the beginning and sorted by latest date
function updateJournalHistory(history) {
  const historyContainer = document.getElementById('journal-history-container');
  historyContainer.innerHTML = '';

  // Convert date keys to an array and sort in descending order
  const sortedDates = Object.keys(history).sort((a, b) => new Date(b) - new Date(a));

  // Iterate through sorted dates to display the history entries
  sortedDates.forEach(date => {
    // Create a div for the entry wrapper
    const entryWrapper = document.createElement('div');
    entryWrapper.classList.add('journal-entry-wrapper'); // Add a class for styling if needed
    entryWrapper.style.marginBottom = '10px'; // Adds a gap between entries

    // Add edit icon at the beginning
    const editIcon = document.createElement('span');
    editIcon.innerHTML = '✏️';
    editIcon.classList.add('edit-icon');
    editIcon.addEventListener('click', () => editJournalEntry(date, entryWrapper));

    // Extract the prompt and entry from the history object
    const { prompt, entry } = history[date];

    // Create a text node with the prompt and entry text, and append without line breaks
    const entryText = document.createTextNode(`${date} - Prompt: "${prompt}" - Response: ${entry}`);

    // Append edit icon and entry text in one line
    entryWrapper.appendChild(editIcon); // Append the edit icon first
    entryWrapper.appendChild(document.createTextNode(' ')); // Add a space between the icon and text
    entryWrapper.appendChild(entryText); // Append the entry text

    historyContainer.appendChild(entryWrapper);
  });
}












// Function to handle journal entry
function handleJournalEntry() {
  const journalEntryInput = document.getElementById('journal-entry-input');
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.id = 'saveJournalEntry';
  saveButton.style.display = 'none'; // Initially hidden
  journalEntryInput.parentElement.appendChild(saveButton);

  // Show save button when editing
  journalEntryInput.addEventListener('focus', function () {
    saveButton.style.display = 'inline-block';
  });

  // Save entry and hide the button on save
  saveButton.addEventListener('click', function () {
    const entryText = journalEntryInput.innerText.trim();

    if (entryText) {
      // Save the entry
      saveJournalEntry(entryText);

      // Hide save button and disable editing
      saveButton.style.display = 'none';
      journalEntryInput.contentEditable = 'false';

      // Display the entry as non-editable
      journalEntryInput.classList.add('saved');
    }
  });

  // Make the entry editable on click
  journalEntryInput.addEventListener('click', function () {
    if (!journalEntryInput.isContentEditable) {
      journalEntryInput.contentEditable = 'true';
      journalEntryInput.focus();
    }
  });
}


// Function to load journal entry and history on page load
function loadJournalEntry() {
  const today = new Date().toDateString();

  chrome.storage.local.get(['journalHistory'], function (result) {
    const history = result.journalHistory || {};

    if (history[today]) {
      const { prompt, entry } = history[today]; // Destructure to get prompt and entry
      document.getElementById('journal-prompt').innerText = `"${prompt}"`; // Display the prompt
      document.getElementById('journal-entry-input').innerText = entry; // Display the entry text
      document.getElementById('journal-entry-input').classList.add('saved');
    }

    updateJournalHistory(history); // Update the history section
  });
}



// Function to save the edited journal entry
function saveJournalEntryEdit(date, updatedPrompt, updatedText) {
  chrome.storage.local.get(['journalHistory'], function (result) {
    const history = result.journalHistory || {};
    history[date] = {
      prompt: updatedPrompt,
      entry: updatedText
    };

    chrome.storage.local.set({ journalHistory: history }, function () {
      updateJournalHistory(history); // Update the history view
    });
  });
}



// Function to handle editing of a journal entry
function editJournalEntry(date, entryDiv) {
  // Extract prompt and entry text from the entryDiv text content
  const entryParts = entryDiv.textContent.split(' - Prompt: "')[1].split('" - Response: ');
  const promptText = entryParts[0] || '';
  const entryText = entryParts[1] || '';

  // Create input fields for editing the prompt and entry
  const promptInputField = document.createElement('textarea');
  promptInputField.value = promptText;
  promptInputField.classList.add('journal-edit-input');
  promptInputField.placeholder = 'Edit your prompt here...';

  const entryInputField = document.createElement('textarea');
  entryInputField.value = entryText;
  entryInputField.classList.add('journal-edit-input');
  entryInputField.placeholder = 'Edit your response here...';

  // Create a save button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-edit-button');

  // Replace entryDiv content with the input fields and save button
  entryDiv.innerHTML = ''; // Clear current content
  entryDiv.appendChild(promptInputField);
  entryDiv.appendChild(entryInputField);
  entryDiv.appendChild(saveButton);

  // Handle save button click
  saveButton.addEventListener('click', function () {
    const updatedPrompt = promptInputField.value.trim();
    const updatedEntry = entryInputField.value.trim();

    if (updatedPrompt && updatedEntry) {
      // Save the updated prompt and entry
      saveJournalEntryEdit(date, updatedPrompt, updatedEntry);

      // Restore original view
      entryDiv.innerHTML = '';
      entryDiv.textContent = `${date} - Prompt: "${updatedPrompt}" - Response: ${updatedEntry}`;
    }
  });

  // Auto-focus and select the text in the entry input field
  entryInputField.focus();
  entryInputField.select();
}





// Initialize the page with random quote, SaaS news, Product Hunt launches, and nickname
document.addEventListener('DOMContentLoaded', function () {
  //displayRandomQuote();
  loadSaaSNews();
  loadProductHuntLaunches();
  loadNickname();
  displayRandomJournalPrompt();
  
  handleJournalEntry(); // Call this to handle the journal entry functionality
  loadJournalEntry(); // Call this to load journal entry and history on page load
  //displayJournalHistory(); // Load and display past journal entries on page load
});


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
