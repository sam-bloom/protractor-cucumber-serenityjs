const crew = require("serenity-js/lib/stage_crew");
require("dotenv").config();

const tags = process.env.CUKE_TAGS
    ? [process.env.CUKE_TAGS, process.env.CUKE_EXCLUDE_TAGS]
    : process.env.CUKE_EXCLUDE_TAGS
        ? [process.env.CUKE_EXCLUDE_TAGS] : [];
        
exports.config = {

    framework: "custom",
    directConnect: true,
    frameworkPath: require.resolve('serenity-js'),
    disableChecks: true,
    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: "https://phptravels.com/demo/'",
    
    specs: [
        "./features/**/*.feature",
    ],

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "pretty",
        require: ["./src/stepDefinitions/*.ts", "./src/support/*.ts"],
        tags: [...tags, "~@ignore"],
    },

    stackTrace: true,

    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: [
                "no-sandbox",
                "--disable-web-security",
                "--headless",
                "--disable-dev-shm-usage",
                "window-size=1200x1000"]
            ,
        },
    },

    onPrepare: async() => {
        await browser.waitForAngularEnabled(false);
        return browser.driver
            .manage()
            .window()
            .maximize()
            .catch(error => console.log(error));
    },

    serenity: {
        stageCueTimeout: 30 * 1000,
        crew: [crew.serenityBDDReporter(), crew.photographer()],
        dialect: "cucumber",
    }
};
