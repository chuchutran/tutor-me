import express, { Express } from "express";
import cors from "cors";
import { User } from "./types";
import { Post } from "./types";
import { addUser, addPost } from "./controller";
import { updateProfile } from "./controller";
import { deletePost } from "./controller";
import { filterPostsByCourse } from "./controller";


const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// **** didnt add in signup/ login requests yet
// GET Requests
// Searchbar
// Filter

// POST REQUESTS
// Create User
app.post("/api/user", async (req, res) => {
  console.log("[POST] entering '/user endpoint");
  const { username, password, name, email, phone, profileUrl } = req.body;
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
  const { course, availabilities, description } = req.body;
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

// PUT Requests
// Edit Profile info
app.put("/api/user/profileurl/:userid", async (req, res) => {
  console.log("[PUT] entering '/api/user/profileUrl/:userid' endpoint");
  const userid: string = req.params.userid;
  const profileurl: string = req.body.profileurl

  try {
    await updateProfile(userid, profileurl);
    res.status(200).send({
      message: `SUCESS updated user with userid: ${userid} from user collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occured in the /api/user/:userid endpoint ${err}`,
    });
  }
});

// DELETE Requests
// Delete Post
app.delete("/api/post/delete/:postid", async (req, res) => {
  console.log("[DELETE] entering '/api/post/delete/:postid' endpoint");
  const postid: string = req.params.postid;

  try {
    await deletePost(postid);
    res.status(200).send({
      message: `SUCCESS deleted post with postid: ${postid} from the post collection in Firestore`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/post/delete/:postid endpoint: ${err}`,
    });
  }
});

// //GET Requests
// Search bar filter
app.get("/api/post/filter/:course", async (req, res) => {
  console.log("[GET] entering '/api/post/filter/:courses' endpoint");
  const course = req.params.course;
  try {
    const filteredPosts = await filterPostsByCourse(course);
    res.status(200).json(filteredPosts);
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/posts/filter/:course endpoint: ${err}`,
    });
  }
});
