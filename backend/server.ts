import express, { Express } from "express";
import cors from "cors";
import { User } from "./types";
import { Post } from "./types";
import { addPost } from "./controller";
import { getUser, updateUser } from "./controller";
import { deletePost } from "./controller";
import { filterPostsByCourse } from "./controller";
import { updatePost } from "./controller";


const app: Express = express();

const hostname = "0.0.0.0";
const port = 8080;

app.use(cors());
app.use(express.json());

// POST REQUEST
// Create post
app.post("/api/post/:userid", async (req, res) => {
  console.log("[POST] entering '/user/:userid' endpoint");
  const userid: string = req.params.userid;
  const { course, availabilities, description } = req.body;
  const upperCaseCourse = course.toUpperCase();
  const post: Post = {
    userid,
    course: upperCaseCourse,
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

// PUT REQUEST
// Edit Profile Info
app.put("/api/user/:userid", async (req, res) => {
  console.log(`[PUT] entering '/api/user/${req.params.userid}' endpoint`);
  const userid: string = req.params.userid;
  const { name, email, phone, imageUrl } = req.body;
  try {
    await updateUser(userid, { name, email, phone, imageUrl });
    res.status(200).send({
      message: `SUCCESS: Updated user with ID ${userid}`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:userid endpoint: ${err}`,
    });
  }
});

// DELETE REQUEST
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

// GET REQUEST
// Get user by ID
app.get("/api/user/:userid", async (req, res) => {
  console.log("[GET] entering '/api/user/:userid' endpoint");
  const userid = req.params.userid;
  try {
    const user = await getUser(userid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: `User with ID ${userid} not found` });
    }
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/user/:userid endpoint: ${err}`,
    });
  }
});

// GET REQUEST
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


// PUT REQUEST
// Edit Post info
app.put("/api/post/:postid", async (req, res) => {
  console.log(`[PUT] entering '/api/post/${req.params.postid}' endpoint`);
  const postid: string = req.params.postid;
  const { course, availabilities, description } = req.body;
  try {
    await updatePost(postid, { course, availabilities, description });
    res.status(200).send({
      message: `SUCCESS: Updated post with ID ${postid}`,
    });
  } catch (err) {
    res.status(500).json({
      error: `ERROR: an error occurred in the /api/post/:postid endpoint: ${err}`,
    });
  }
});