const {Builder, Browser} = require('selenium-webdriver');
const HomePage = require("../pages/HomePage");
const Chrome = require('selenium-webdriver/chrome');
const logging = require('selenium-webdriver/lib/logging');
logger = logging.getLogger('webdriver');


describe ("Find Welcome Henry test", () =>  {
  // Initiate browser
  let driver;
  let homePage;
  // Set headless mode
  let options = new Chrome.Options()
  options.addArguments("--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage", "--remote-debugging-port=9222");
  options.excludeSwitches(["enable-logging"]);
  options.addArguments("--window-size=1920,1080");
  options.addArguments("--incognito");
  options.addArguments("--user-data-dir=/tmp/chrome-test-profile");
  
  
  it ("checks the Welcome Henry text is present", async function() {
    // Disable annoying chrome logs
    logger.setLevel(logging.Level.OFF);

    driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();

    // Set 3 second grace period for load times
    await driver.manage().setTimeouts({implicit: 10000});

    // Go to log in page
    homePage = new HomePage(driver);
    await homePage.goto();

    // check text
    await homePage.checkPage();
  });

  // Quit the browser
  after (async() => (driver.quit()));
});
