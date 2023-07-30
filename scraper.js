const puppeteer = require('puppeteer');

const {getLinks} = require('./getLinks')

const scraper = async () => {

    const links = await getLinks();
    const browser = await puppeteer.launch({ headless:"new" , 
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" })
    const page = await browser.newPage()
    await page.setViewport({ width: 1400, height: 1200 })
    const url = "https://www.example.com/";
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.type('input[name="username"]', 'deleted');
    await page.type('input[name="password"]', 'deleted');

    await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
      ]);

    for (let i = 0; i < links.length; i++) {
        try{
        const url = links[i];
        await page.goto(url);

        let found = false;
        let elements = await page.$$('.deleted')
        while(!found){
            if (elements.length > 0) {
                found = true;
            }
            elements = await page.$$('.deleted')
        }
        const src = await page.evaluate(() => {
        
            const items = document.getElementsByTagName('deleted')
            const item = items[0]
            return item.src
        });
        console.log(src)
    } catch(error){
        console.log(`Error: ${links[i]}`)
    }


    }
    await browser.close()

}
scraper();