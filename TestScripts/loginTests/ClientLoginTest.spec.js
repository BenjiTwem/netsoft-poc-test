const {Builder, Browser} = require('selenium-webdriver');
const LoginPage = require("../pages/LoginPage")
const Chrome = require('selenium-webdriver/chrome');
const options = new Chrome.Options()

describe ("ClientLoginTest", () =>  {
  // Initiate browser & Disabling annoying chrome logs
  let driver;
  let loginPage;
  
  options.setHeadless(true);

  driver = new Builder().forBrowser(Browser.CHROME).Options(options).build();
  driver.CHROME.setChromeOptions();


  it ("checks that a client user can sucessfully login", async function() {
    // Set 3 second grace period for load times
    await driver.manage().setTimeouts({implicit: 3000});

    // Go to log in page
    loginPage = new LoginPage(driver);
    await loginPage.goto();

    // Send login inputs
    await loginPage.loginAs("client@gmail.com", "Password@1");

    // Check we hit the client portal page
    await loginPage.checkPageUrlPath(loginPage.clientPath);
  });

  it("checks that client user can sucessfully logout", async function() {
    // Check we can logout
    await loginPage.logout();
  });

  // Quit the browser
  after (async() => (driver.quit()));
});