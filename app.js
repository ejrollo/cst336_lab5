const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.set("view engine", "ejs");

//routes
app.get("/", async function(req, res){
    
    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=-3BOO4vv-FqVD_CUht9-NXtA5Pb0NMM0RkPJE6yZjb4&featured=true&orientation=landscape`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    res.render("index", {"imageUrl": data.urls.small});
});

app.get("/search", async function(req, res){
    
    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
    }
    
    let apiUrl = `https://api.unsplash.com/photos/random/?count=9&client_id=-3BOO4vv-FqVD_CUht9-NXtA5Pb0NMM0RkPJE6yZjb4&featured=true&orientation=landscape&query=${keyword}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    
    let imageUrlArray = [];
    for (let i = 0; i < data.length; i++){
        imageUrlArray.push(data[i].urls.small);
    }
    res.render("results", {"imageUrl": data[0].urls.small, "imageUrlArray":imageUrlArray});
});

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});

