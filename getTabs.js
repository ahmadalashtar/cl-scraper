const JSDOM = require("jsdom").JSDOM;
const fetch = require('node-fetch');

const getTabs = async () => {
    const tabsArray = [];

    const baseURL = `https://www.example.com/`
    const response = await fetch(baseURL);
    const data = await response.text();
    const dom = new JSDOM(data);
    const window = dom.window;
    const document = window.document;
    let items = document.getElementsByClassName('deleted_selector')
    items = items[0]
    items = items.children
    for (let i = 0 ; i < items.length; i++){
        tabsArray.push("https://www.example.com" + items[i].href)
    }
    

    return tabsArray;
}

module.exports = { getTabs }
