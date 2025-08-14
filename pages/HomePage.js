const {By} = require('selenium-webdriver');
const assert = require("assert");
const { until } = require("selenium-webdriver");
const { elementTextMatches } = require('selenium-webdriver/lib/until');


class HomePage {
  startingURL = 'https://netsoftdevopswebapp.netsoft.net.nz/'

  constructor(Driver) {
    this.driver = Driver;
  }

  async goto() {
    await this.driver.get(this.startingURL);
    // Check we got to the page
    let pageCheck = await this.driver.getTitle();
    assert.equal("Home page - DevOpsWebApp", pageCheck, "Error | Couldn't find correct title");
  }

  // Checks the current page URL
  async checkPage() {
    await this.driver.wait(
      until.elementTextMatches(this.driver.findElement(By.className('display-4')), (/Welcome Henry/)),
      5000, // timeout
      `Error | Page did not contain "Welcome Henry" in time`
    );
  }
}

module.exports = HomePage;