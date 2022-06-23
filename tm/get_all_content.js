// ==UserScript==
// @name         New Userscript
// @namespace    https://www..com/Profile/*
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www..com/Profile/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==






(function() {
    'use strict';
    var contents = []
    var n_pages = 0
    function subElementById(element, tag, id) {
        var spans = element.getElementsByTagName(tag)
        for(var i = 0; i < spans.length; i++) {
            var span = spans[i];
            if (span.id = id) {
                return span;
            }
        }
    }


    function requestPage(page_number) {
        var token = document.getElementsByTagName("html")[0].getAttribute('data-mvtoken');
        var url = window.location.href.split('/')
        var base_url = url[0] + '//' + url[2]
        var p_id = url[4]
        var base = document.getElementsByTagName("div")[0];

        var limit = 30
        var offset = page_number*limit
        url = base_url + "/api/model/" + p_id + "/videos?category=all&offset=" + offset + "&sort=0&limit=" + limit + "&mvtoken=" + token
        loadPage(url, base, getContets)
    }

    function gotHut(element) {
        console.log(element)
        var title = subElementById(element, "span", "productTitle")
        console.log(title)
        var prices = element.getElementsByClassName('a-price-whole')
        for(var i = 0; i < prices.length; i++) {
            var price = prices[i];
            console.log(price.textContent)
        }
    }

    function findASINS(element) {
        var asins = []
        var divs = element.getElementsByTagName('div')
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i]
            if (div.hasAttribute('data-asin')) {
                asins.push(div);
            }
        }
        return asins;
    }

    function parseASIN(element) {
        return element
    }

    function getContets(element) {
        console.log(element)
        console.log(element.result.content.items.length)
        n_pages += 1;
        if (n_pages < 25) {
            requestPage(n_pages)
        }
        return
        var asins = findASINS(element)
        for(var i = 0; i < asins.length; i++) {
            var asin = asins[i]
            prods.push(parseASIN(asin))
            /*if (title == 'Tangkula 2-Person Outdoor Camping Tent Cot, Foldable Camping Tent with Air Mattress & Sleeping Bag, Waterproof Elevated Camping Tent with Carry Bag, Portable Camping Tent Cot') {
                loadPage(link, element, gotHut)
            }*/
        }
        console.log(prods.length)
        if (n_pages < 5) {
            var next = element.getElementsByClassName("s-pagination-item s-pagination-next s-pagination-button s-pagination-separator")[0].href
            console.log(next)
            loadPage(next, element, findHut)
        } else {
            console.log("done")
        }
    }
    function loadPage(pageUrl, base, parse) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                parse(JSON.parse(xmlHttp.responseText))
            }
        }
        xmlHttp.open("GET", pageUrl, true)
        xmlHttp.setRequestHeader("accept", "application/json, text/plain, */*")
        xmlHttp.setRequestHeader("accept-language", "en-GB,en;q=0.9")
        xmlHttp.setRequestHeader("x-requested-with", "XMLHttpRequest")
        xmlHttp.setRequestHeader("Referrer-Policy", "strict-origin-when-cross-origin")
        xmlHttp.send(null);
    }
    console.log("test");

    setTimeout(
    function() {
        requestPage(n_pages)
    }, 1000);


    //loadPage("https://www.amazon.ca/s?k=shirt&crid=2IK34UE2ICUM4&sprefix=shir%2Caps%2C118&ref=nb_sb_noss_2", base, findHut)
})();
