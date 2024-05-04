import express, { Express } from "express";
import cors from "cors";
import { User } from "./types";
import { Post } from "./types";
import { addUser, addPost } from "./controller";


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
app.post("/api/user", async (req, res) => {
    console.log("[POST] entering '/user endpoint");
    const { username, password, name, email, phone, profileUrl} = req.body;
    const user: User = {
      username,
      password,
      name,
      email,
      phone,
      profileUrl
    };
    try {
      const userId = await addUser(user);
      res.status(200).send({
        message: `SUCCESS added person with ID: ${userId} to the users collection in Firestore`,
        userid: userId
      });
    } catch (err) {
      res.status(500).json({
        error: `ERROR: an error occurred in the /api/user endpoint: ${err}`,
      });
    }
  });

  app.post("/api/post/:userid", async (req, res) => {
    console.log("[POST] entering '/user/:userid' endpoint");
    const userid: string = req.params.userid;
    const { course, availabilities, description} = req.body;
    const post: Post = {
      userid,
      course,
      availabilities,
      description
    };
    try {
      const postId = await addPost(post);
      res.status(200).send({
        message: `SUCCESS added post with ID: ${postId} to the posts collection in Firestore`,
        postId: postId
      });
    } catch (err) {
      res.status(500).json({
        error: `ERROR: an error occurred in the /api/post/userid endpoint: ${err}`,
      });
    }
  });

app.listen(port, hostname, () => {
    console.log("Listening");
});
