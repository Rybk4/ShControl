const puppeteer = require('puppeteer');

async function comparePrices(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.technodom.kz/p/smartfon-gsm-apple-iphone-13-128gb-thx-61-12-5-midnight-252945')

    const technodomPrice = await page.evaluate(()=>{
        const price = document.querySelector('.--accented').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    await page.goto('https://www.sulpak.kz/g/smartfon_apple_iphone_13_128gb_midnight_mlnw3rka')

    const sulpacPrice = await page.evaluate(()=>{
        const price = document.querySelector('.product__price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    await page.goto('https://shop.kz/offer/smartfon-apple-iphone-13-128gb-midnight-mlnw3/')
     
    const shopPrice = await page.evaluate(()=>{
        const price = document.querySelector('.item_current_price').innerText;
        return parseFloat(price.replace(/[^0-9.-]+/g,''));
    });

    if(technodomPrice == sulpacPrice && sulpacPrice == shopPrice){
        console.log('Цены одинаковы '+ technodomPrice)
    }else if (technodomPrice > sulpacPrice && technodomPrice > shopPrice){
        console.log('В техножоме дешевле '+technodomPrice)

    }else if(sulpacPrice>technodomPrice && sulpacPrice>shopPrice){
        console.log('В сулпаке лучше '+sulpacPrice)
    }else if(technodomPrice == sulpacPrice){
        console.log('Технодом и сулпак одинаково '+ technodomPrice)
    }else{
        console.log('В белом ветре лучше ' + shopPrice)
    }

    await browser.close();
}
comparePrices();