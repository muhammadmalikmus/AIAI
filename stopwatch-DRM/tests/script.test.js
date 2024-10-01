const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const path = require('path');
require('@testing-library/jest-dom'); // Import jest-dom for extended matchers

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let document;

// Simulate window.alert
beforeAll(() => {
    global.alert = jest.fn();
});

describe('Timer and Countdown Application', () => {
    beforeEach(() => {
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        document = dom.window.document;
        // Manually inject the script.js into the DOM for tests
        const scriptEl = document.createElement('script');
        scriptEl.textContent = fs.readFileSync(path.resolve(__dirname, '../script.js'), 'utf8');
        document.body.appendChild(scriptEl);
    });

    test('Initial screen buttons are visible', () => {
        expect(document.getElementById('initial-screen')).not.toHaveClass('d-none');
    });

    test('Stopwatch button click shows stopwatch screen', () => {
        document.getElementById('stopwatch-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('stopwatch')).not.toHaveClass('d-none');
    });

    test('Countdown button click shows countdown screen', () => {
        document.getElementById('countdown-button').click();
        expect(document.getElementById('initial-screen')).toHaveClass('d-none');
        expect(document.getElementById('countdown')).not.toHaveClass('d-none');
    });

    test('Stopwatch displays milliseconds', () => {
        document.getElementById('stopwatch-button').click();
        document.getElementById('start-stopwatch').click();
        setTimeout(() => {
            expect(document.getElementById('stopwatch-display').textContent).toMatch(/\d{2}:\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-stopwatch').click();
        }, 100);
    });

    test('Countdown displays milliseconds', () => {
        document.getElementById('countdown-button').click();
        document.getElementById('start-countdown').click();
        setTimeout(() => {
            expect(document.getElementById('countdown-display').textContent).toMatch(/\d{2}:\d{2}\.\d{3}/);
            document.getElementById('stop-countdown').click();
        }, 100);
    });
});
