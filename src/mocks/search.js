const axios = require("axios");
const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const { log } = require("console");
app.use(bodyParser.json());
app.use(cors());

app.get("/api/v1/search/:item", async (req, res) => {
  console.log("Request received:", req.params.item);
  const results = {
    users: [
      {
        id: 1,
        username: "user1",
        profile_picture:
          "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login",
      },
      {
        id: 2,
        username: "user2",
        profile_picture:
          "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login",
      },
      {
        id: 3,
        username: "user3",
        profile_picture:
          "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login",
      },
    ],
    posts: [
      {
        id: 1,
        author: "user1",
        content: "This is a post",
        likes: 10,
        comments: 5,
        hashtags: ["hashtag1", "hashtag2", "hashtag3"],
      },
      {
        id: 2,
        author: "user2",
        content: "This is another post",
        likes: 20,
        comments: 10,
        hashtags: ["hashtag4", "hashtag5", "hashtag6"],
      },
      {
        id: 3,
        author: "user3",
        content: "This is yet another post",
        likes: 30,
        comments: 15,
        hashtags: ["hashtag7", "hashtag8", "hashtag9"],
      },
    ],
    comments: [
      {
        id: 1,
        author: "user1",
        content: "This is a comment",
        likes: 1,
      },
      {
        id: 2,
        author: "user2",
        content: "This is another comment",
        likes: 2,
      },
      {
        id: 3,
        author: "user3",
        content: "This is yet another comment",
        likes: 3,
      },
    ],
    hashtags: [
      {
        id: 1,
        name: "#hashtag1",
        posts: 10,
      },
      {
        id: 2,
        name: "#hashtag2",
        posts: 20,
      },
      {
        id: 3,
        name: "#hashtag3",
        posts: 30,
      },
    ],
    communities: [
      {
        id: 1,
        name: "community1",
        members: 10,
        posts: 20,
      },
      {
        id: 2,
        name: "community2",
        members: 20,
        posts: 40,
      },
      {
        id: 3,
        name: "community3",
        members: 30,
        posts: 60,
      },
    ],
  };

  //check if request parameters match any of the keys in the results object
  let result = {
    users: [],
    posts: [],
    comments: [],
    hashtags: [],
    communities: [],
  };

  results.users.forEach((element) => {
    if (element.username.includes(req.params.item)) {
      result.users.push(element);
    }
  });

  results.posts.forEach((element) => {
    if (element.content.includes(req.params.item)) {
      result.posts.push(element);
    }
  });

  results.comments.forEach((element) => {
    if (element.content.includes(req.params.item)) {
      result.comments.push(element);
    }
  });

  results.communities.forEach((element) => {
    if (element.name.includes(req.params.item)) {
      result.communities.push(element);
    }
  });

  results.hashtags.forEach((element) => {
    if (element.name.includes(req.params.item)) {
      result.hashtags.push(element);
    }
  });

  res.status(200);
  res.send(result);
});

app.get("/", (req, res) => {
  res.status(200);
  res.json({ data: "confirmed" });
});

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
