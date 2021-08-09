const axios = require('axios');
const cheerio = require('cheerio');
const json2csv = require('json2csv').Parser;
const fs = require('fs');
const url = 'https://www.imdb.com/'

axios.get('https://www.imdb.com/chart/top/?ref_=nv_mv_250')
    .then((imdb) =>{
        const $ = cheerio.load(imdb.data);
        const movies = [];
        const arrRating = [];
        $('.titleColumn').each((index, element)=>{
            /* console.log($(element).children().text()); */
            const title = $(element).children().text();
            const str1 = $(element).children('a').attr('href');
            const link = url.concat(str1);
/*             console.log(url.concat(str1)); */
            movies[index] = {
                Title: title,
                Link: link,
            };
        })

        $('.imdbRating').each((index, element)=>{
            /* console.log($(element).children().text()); */
            const rating = $(element).children().text();
            movies[index].Rating = rating;
        })
        console.log(movies);
        /* console.log(rating); */
        /*  const All = movies.concat(arrRating);
        console.log(All); */



        /* console.log($('.imdbRating').children().text()) */

        const str1 = $('.titleColumn').children('a').attr('href');
        /* console.log($('.lister-list').children().html());
        console.log(url.concat(str1)); */

        const jsonparser = new json2csv()
        const csv = jsonparser.parse(movies)

        fs.writeFileSync("./imdbmovies.csv", csv, "utf-8");
    })