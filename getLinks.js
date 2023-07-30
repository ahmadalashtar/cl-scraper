const JSDOM = require("jsdom").JSDOM;
const fetch = require('node-fetch');
const { getTabs }  = require('./getTabs')
const getLinks = async () => {
    const links = [];
    const tabsArray = await getTabs();
    for (const tabLink of tabsArray){
        const baseURL = tabLink
        const response = await fetch(baseURL);
        const data = await response.text();
        const dom = new JSDOM(data);
        const window = dom.window;
        const document = window.document;
        let items = document.getElementsByClassName('deleted');
        for (let i = 0 ; i < items.length; i++){
            links.push("https://www.example.com" + items[i].href)
        }
    }
    return links;
}
module.exports = {getLinks}