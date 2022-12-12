`use strict`
import {Builder, Capabilities, By} from 'selenium-webdriver';

let arr = [];
const JOB = 'qa';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const webdriver = new Builder()
    .withCapabilities(Capabilities.firefox())
    .build()

async function pageRun(page = 1) {
    await webdriver.get(`https://startup.jobs/?q=${JOB}&page=${page}`)
    await sleep(2000);

    for (let i = 1; i < 25; i++) {
        await webdriver.findElement(By.xpath(`/html/body/section[2]/div/div/div[2]/div[${i}]/div[1]/div/a[1]`)).getAttribute('href').then(
            (link) => arr.push(link)
        )
    }
}

(async function () {
    for (let i = 1; i <= 4; i++) {
        await pageRun(i);
    }
    console.log(arr)
    console.log(`Собрано ${arr.length} ссылок по запросу ${JOB}`)
    await webdriver.quit()
})();


