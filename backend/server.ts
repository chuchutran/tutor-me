import express, { Express } from "express";
import cors from "cors";
import { User } from "./types";
import { Post } from "./types";
import { db } from "./firebase";
import { addUser } from "./controller";


const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// **** didnt add in signup/ login requests yet
// GET Requests
// Searbar
// Filter

// POST Requests
// Create Post
// Create User

// PUT Requests
// Edit Profile info


// DELETE Requests
// Delete Post

// POST REQUESTS
// Create User
app.post("/api/user/:userid", async (req, res) => {
    console.log("[POST] entering '/user/:userid' endpoint");
    const userid: string = req.params.userid;
    const { username, password, name, email, availabilities, phone, profileUrl} = req.body;
    const user: User = {
      username,
      password,
      name,
      email,
      availabilities,
      phone,
      profileUrl
    };
    try {
      await addUser(userid, user);
      res.status(200).send({
        message: `SUCCESS added person with netid: ${userid} to the people collection in Firestore`,
      });
    } catch (err) {
      res.status(500).json({
        error: `ERROR: an error occurred in the /api/people/:userid endpoint: ${err}`,
      });
    }
  });

app.listen(port, hostname, () => {
    console.log("Listening");
});
