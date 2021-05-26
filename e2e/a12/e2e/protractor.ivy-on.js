// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const {SpecReporter, StacktraceOption} = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
    allScriptsTimeout: 11000,
    specs: ['./src/**/*.e2e-spec.ts'],
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=800,600', '--no-sandbox', '--disable-dev-shm-usage'],
            binary: require('puppeteer').executablePath(),
        },
    },
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    baseUrl: 'http://localhost:4200/',
    framework: 'jasmine',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function () {},
    },
    onPrepare() {
        require('ts-node').register({
            project: require('path').join(__dirname, 'tsconfig.ivy-on.json'),
        });
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: StacktraceOption.PRETTY,
                },
            }),
        );
    },
};
