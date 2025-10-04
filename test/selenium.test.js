// Selenium test for BookNGo hotel booking page
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function bookingTest() {
  // Set up Chrome driver
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    // Open the booking page (update path if needed)
    await driver.get('file://' + __dirname + '/../html/booking.html');

    // Wait for the form to be present
    await driver.wait(until.elementLocated(By.css('form')), 5000);

    // Fill the form fields
    await driver.findElement(By.css('input[ng-model="vm.form.name"]')).sendKeys('Test User');
    await driver.findElement(By.css('input[ng-model="vm.form.email"]')).sendKeys('test@example.com');
    await driver.findElement(By.css('input[ng-model="vm.form.phone"]')).sendKeys('1234567890');
    await driver.findElement(By.css('input[ng-model="vm.form.city"]')).sendKeys('Test City');
    await driver.findElement(By.css('input[ng-model="vm.form.date"]')).sendKeys('2025-09-30');
    await driver.findElement(By.css('input[ng-model="vm.form.hotel"]')).sendKeys('Test Hotel');

    // Submit the form
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for success message
    await driver.wait(until.elementLocated(By.css('.alert-success')), 5000);
    let successMsg = await driver.findElement(By.css('.alert-success')).getText();
    console.log('Success message:', successMsg);
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    await driver.quit();
  }
})();

// Selenium test for BookNGo transport booking page
(async function transportTest() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
  try {
    console.log('Opening transport booking page...');
    await driver.get('file://' + __dirname + '/../html/transport.html');

    console.log('Waiting for form to be present...');
    await driver.wait(until.elementLocated(By.css('form')), 5000);

    // Test 1: Valid input
    console.log('Test 1: Filling valid transport booking form...');
    await driver.findElement(By.css('input[ng-model="vm.form.name"]')).sendKeys('Test Transport');
    await driver.findElement(By.css('select[ng-model="vm.form.type"]')).sendKeys('Bus');
    await driver.findElement(By.css('input[ng-model="vm.form.from"]')).sendKeys('City A');
    await driver.findElement(By.css('input[ng-model="vm.form.to"]')).sendKeys('City B');
    await driver.findElement(By.css('input[ng-model="vm.form.time"]')).sendKeys('10:00 AM');
    console.log('Submitting valid form...');
    await driver.findElement(By.css('button[type="submit"]')).click();
    console.log('Waiting for success message...');
    await driver.wait(until.elementLocated(By.css('.alert-success')), 5000);
    let successMsg = await driver.findElement(By.css('.alert-success')).getText();
    console.log('Transport Success message:', successMsg);

    // Test 2: Invalid input (missing fields)
    console.log('Test 2: Submitting form with missing fields...');
    await driver.navigate().refresh();
    await driver.wait(until.elementLocated(By.css('form')), 5000);
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    let errorMsg1 = await driver.findElement(By.css('.alert-danger')).getText();
    console.log('Error message (missing fields):', errorMsg1);

    // Test 3: Invalid input (bad time format)
    console.log('Test 3: Submitting form with invalid time format...');
    await driver.findElement(By.css('input[ng-model="vm.form.name"]')).sendKeys('Test Transport');
    await driver.findElement(By.css('select[ng-model="vm.form.type"]')).sendKeys('Bus');
    await driver.findElement(By.css('input[ng-model="vm.form.from"]')).sendKeys('City A');
    await driver.findElement(By.css('input[ng-model="vm.form.to"]')).sendKeys('City B');
    await driver.findElement(By.css('input[ng-model="vm.form.time"]')).sendKeys('invalidtime');
    await driver.findElement(By.css('button[type="submit"]')).click();
    await driver.wait(until.elementLocated(By.css('.alert-danger')), 5000);
    let errorMsg2 = await driver.findElement(By.css('.alert-danger')).getText();
    console.log('Error message (invalid time):', errorMsg2);

  } catch (err) {
    console.error('Transport Test failed:', err);
  } finally {
    console.log('Closing browser...');
    await driver.quit();
  }
})();