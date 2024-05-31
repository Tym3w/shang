// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");

  // getting top 10 articles
  const topArticles = await page.evaluate(() => {
    const articles = [];
    const articleElements = document.querySelectorAll(".itemlist .athing");

    for (let i = 0; i < Math.min(articleElements.length, 10); i++) {
      const article = articleElements[i];
      const title = article.querySelector(".title a").innerText;
      const url = article.querySelector(".title a").href;
      articles.push({ title, url });
    }

    return articles;
  });
  
  //close browser
  await browser.close();

  // saving data
  const csvData = topArticles.map(article => `${article.title},${article.url}`).join("\n");
  fs.writeFileSync("hacker_news_top_articles.csv", csvData);
}

(async () => {
  await saveHackerNewsArticles();
})();
