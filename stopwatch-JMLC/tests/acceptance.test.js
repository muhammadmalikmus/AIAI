// tests/acceptance.test.js
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Timer and Countdown Acceptance Tests', function() {
  this.timeout(30000); // Adjust timeout for slower environments
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should start and stop the timer', async () => {
    await driver.get('file://' + __dirname + '/../index.html');

    const startButton = await driver.findElement(By.id('start-button'));
    await startButton.click();
    await driver.sleep(1000);
    const stopButton = await driver.findElement(By.id('start-button'));
    await stopButton.click();
    const timerDisplay = await driver.findElement(By.id('timer-display'));
    const time = await timerDisplay.getText();
    expect(time).to.match(/^00:00:01.\d{3}$/);
  });

  it('should reset the timer', async () => {
    const clearButton = await driver.findElement(By.id('clear-button'));
    await clearButton.click();
    const timerDisplay = await driver.findElement(By.id('timer-display'));
    const time = await timerDisplay.getText();
    expect(time).to.equal('00:00:00.000');
  });

  it('should start, stop and continue the countdown', async () => {
    const countdownRadio = await driver.findElement(By.css('input[value="countdown"]'));
    await countdownRadio.click();

    const startButton = await driver.findElement(By.id('start-button'));
    await startButton.click();
    await driver.sleep(500); // wait for half a second
    await startButton.click(); // stop the countdown
    const timerDisplay = await driver.findElement(By.id('timer-display'));
    let time = await timerDisplay.getText();
    expect(time).to.match(/^00:00:09.\d{3}$/); // assuming countdown was set to 10 seconds initially

    const continueButton = await driver.findElement(By.id('start-button'));
    await continueButton.click();
    await driver.sleep(500); // wait for half a second
    time = await timerDisplay.getText();
    expect(time).to.match(/^00:00:08.\d{3}$/);
  });

  it('should show "Time\'s up!" message at the end of countdown', async () => {
    const countdownRadio = await driver.findElement(By.css('input[value="countdown"]'));
    await countdownRadio.click();

    const startButton = await driver.findElement(By.id('start-button'));
    await startButton.click();

    // Assuming countdown was set to 2 seconds for testing
    await driver.sleep(2000);

    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    expect(alertText).to.equal("Time's up!");
    await alert.accept();

    const timerDisplay = await driver.findElement(By.id('timer-display'));
    const time = await timerDisplay.getText();
    expect(time).to.equal('00:00:00.000');
  });
});
