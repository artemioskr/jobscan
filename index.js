import {Builder, Capabilities, By, until, http} from 'selenium-webdriver';
import {sendRequest} from "selenium-webdriver/http.js";
// import { Browser, by } from 'selenidejs';

const webdriver = new Builder()
                      .withCapabilities(Capabilities.firefox())
                      .build()
// const browser = Browser.configuredWith()
//     .driver(webdriver)
//     .baseUrl('https://startup.jobs')
//     .timeout(4000)
//     .build();
//
// await browser.open('/');
//
// const query = browser.element(by.id('query'))
// await query.type('qa')
// await query.pressEnter()
// const result = browser.all('a .leading-tight')
//
// console.log(result)
await webdriver.get('https://startup.jobs/')
const query = webdriver.findElement(By.id('query'))
await query.sendKeys('qa');
const req = new sendRequest()