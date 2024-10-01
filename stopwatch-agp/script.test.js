const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><div id="stopwatch"></div>');
global.document = dom.window.document;

const Stopwatch = require('./script'); // Adjust the path as necessary

describe('Stopwatch', () => {
    let displayElement;
    let stopwatch;

    beforeEach(() => {
        displayElement = document.getElementById('stopwatch');
        stopwatch = new Stopwatch(displayElement);
    });

    test('should initialize with zero time', () => {
        expect(stopwatch.elapsedTime).toBe(0);
        expect(stopwatch.startTime).toBe(0);
    });

    test('should start the stopwatch', () => {
        stopwatch.start();
        expect(stopwatch.running).toBe(true);
    });

    test('should pause the stopwatch', () => {
        stopwatch.start();
        stopwatch.pause();
        expect(stopwatch.running).toBe(false);
    });

    test('should reset the stopwatch', () => {
        stopwatch.start();
        stopwatch.reset();
        expect(stopwatch.elapsedTime).toBe(0);
        expect(stopwatch.startTime).toBe(0);
        expect(displayElement.textContent).toBe('00:00:00.000');
    });

    test('should update display correctly', () => {
        stopwatch.updateDisplay(3661000); // 1 hour, 1 minute, 1 second, 0 milliseconds
        expect(displayElement.textContent).toBe('01:01:01.000');
    });
});
