const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');
const Table = require('cli-table');
const pretty = require('pretty');
require('dotenv').config();
const port = process.env.PORT || 4000;
const fs = require('fs');
const writeStream = fs.createWriteStream('newsDetails.csv');
const { default: axios } = require('axios');

const app = express();
//write headers
writeStream.write(`news title, news Link \n`);




const url = 'https://punchng.com/';


async function scrapeData() {
    try {
        //fetch the markup
        const { data } = await axios.get(url);
        //load the markup
        const $ = cheerio.load(data)
        const businessNews = $('.entry-item-main');
        const result = [];
        // Loop through business news
        $('.entry-item-main').each((index, el) => {
            const newsTitle = $(el).find(".entry-title").text();
            const newsLink = $(el).find('a').attr('href').split(' ');
            result.push(`${newsTitle},\n  ${newsLink} \n`)
            console.log(result);
            writeStream.write(`News Title: ${newsTitle}, \n News Link : ${newsLink}  \n \n \n ===   ===  ===  \n \n `);

        });
    } catch (error) {
        console.log(error);
    }
}
console.log(scrapeData());

//Listen to server
app.listen(port, () => {
    console.log(`Server Established and  running on Port ⚡${port}`)
})