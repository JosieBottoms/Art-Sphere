import express, { response } from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/explore", async(req, res) => {
    try {
        const result1 = await axios.get(API_URL + "/search?q=painting&hasImages=true");
        const object = result1.data.objectIDs[Math.floor(Math.random()*1452)];
        const result2 = await axios.get(API_URL + "/objects/" + object);
        console.log(result2.data.title);
        console.log(object);
        res.render("explore.ejs", {
            id: result2.data.objectID,
            name: result2.data.title,
            objectDate: result2.data.objectDate,
            image: result2.data.primaryImageSmall,
            artist: result2.data.artistDisplayName,
            artistNationality: result2.data.artistNationality,
            objectMedium: result2.data.medium,
            department: result2.data.department,
            objectURL: result2.data.objectURL,
        });
    } catch (error) {
        res.status(500).send(error.response.data);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})