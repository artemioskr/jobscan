`use strict`
import {Builder, Capabilities, By} from 'selenium-webdriver';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let arr = [];

const webdriver = new Builder()
    .withCapabilities(Capabilities.firefox())
    .build()

async function pageRun(page = 1) {
    const JOB = 'qa';
    await webdriver.get(`https://startup.jobs/?q=${JOB}&page=${page}`)
    await sleep(2000);

    for (let i = 1; i < 25; i++) {
        await webdriver.findElement(By.xpath(`/html/body/section[2]/div/div/div[2]/div[${i}]/div[1]/div/a[1]`)).getAttribute('href').then(
            (link) => arr.push(link)
        )
    }
}

(async function example() {
    for (let i = 1; i <= 4; i++) {
        await pageRun(i);
    }
    console.log(arr)
    console.log(arr.length)
    webdriver.quit()
})();


