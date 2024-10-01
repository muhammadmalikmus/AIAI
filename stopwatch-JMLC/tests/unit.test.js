import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

describe('Timer and Countdown Unit Tests', () => {
  let window;
  let document;

  beforeEach((done) => {
    const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    window = dom.window;
    document = window.document;
    dom.window.onload = () => {
      done();
    };
  });

  it('should correctly update display', () => {
    const updateDisplay = window.updateDisplay;
    const timerDisplay = document.getElementById('timer-display');

    window.elapsedTime = 3661000; // 1 hour, 1 minute, 1 second
    updateDisplay();
    expect(timerDisplay.textContent).to.equal('01:01:01.000');
  });

  it('should correctly start timer', (done) => {
    window.elapsedTime = 0;
    window.startTimer();

    setTimeout(() => {
      window.pauseTimer();
      expect(window.elapsedTime).to.be.closeTo(1000, 50);
      done();
    }, 1000);
  });

  it('should correctly start and stop countdown', (done) => {
    window.elapsedTime = 5000;
    window.mode = 'countdown';
    window.startTimer();

    setTimeout(() => {
      window.pauseTimer();
      expect(window.elapsedTime).to.be.closeTo(4000, 50);
      done();
    }, 1000);
  });

  it('should reset timer', () => {
    window.elapsedTime = 1000;
    window.clearTimer();
    expect(window.elapsedTime).to.equal(0);
    const timerDisplay = document.getElementById('timer-display');
    expect(timerDisplay.textContent).to.equal('00:00:00.000');
  });
});
