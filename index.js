`use strict`
import {Builder, Capabilities, By} from 'selenium-webdriver';
import {sleep} from './helpers.js'

let arr = [];
let badarr = [];
const JOB = 'Product Manager';
const LOCATION = {
    'Portugal': '&loc=Portugal&latlng=40.19788004933705%2C-8.972960422448347',
    'Germany': '&loc=Germany&latlng=50.686802796928%2C9.546094288265737',
    'Remote': '&remote=true'
}

const BANWORDS = ['junior', 'principal', 'head'];

const webdriver = new Builder()
    .withCapabilities(Capabilities.firefox())
    .build()

async function pageRun(page = 1, loc) {
    await webdriver.get(`https://startup.jobs/?q=${JOB}&page=${page}${loc}`)
    await sleep(2000);

    for (let i = 1; i < 26; i++) {
        let xpath = `/html/body/section[2]/div/div/div[2]/div[${i}]/div[1]/div/`
        let element = await webdriver.findElement(By.xpath(`${xpath}a[1]`))

        let append = true;
        await element.getText().then(
            text => BANWORDS.some(el => {
                if(append){
                    append = !text.toLowerCase().includes(el);
                } else {
                    badarr.push(text) //for test
                }
            }))

        await element.getAttribute('href').then(link =>{
            if(append){
                arr.push(link)
            }
        })
    }
}

(async function () {
    //количество страниц
    const pages = 20
    const location = LOCATION.Portugal
    for (let i = 1; i <= pages; i++) {
        try {
            await pageRun(i, location);
        } catch (e) {
            throw new Error('Указано много страниц')
        }
    }
    console.log('Исключили вакансии с таким названием:')
    console.log(badarr)
    console.log(arr)
    console.log(`Собрано ${arr.length} ссылок по запросу ${JOB} на ${pages} страницах`)
    console.log(`Исключили по названию ${badarr.length}`)
    await webdriver.quit()
})();


