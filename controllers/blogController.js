import fs from "fs";

// Function to save data to a file
const saveDataToFile = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data), "utf8", (err) => {
    if (err) console.error("Error saving data:", err);
  });
};
const saveEmailToFile = (data) => {
  fs.writeFileSync("email-data.json", JSON.stringify(data), "utf8", (err) => {
    if (err) console.error("Error saving data:", err);
  });
};

// Function to load data from a file on server start
const loadDataFromFile = () => {
  if (fs.existsSync("data.json")) {
    const data = fs.readFileSync("data.json", "utf8");
    return JSON.parse(data);
  } else {
    return []; // Return empty array if no data file exists
  }
};
const loadEmailFromFile = () => {
  if (fs.existsSync("email-data.json")) {
    const data = fs.readFileSync("email-data.json", "utf8");
    return JSON.parse(data);
  } else {
    return []; // Return empty array if no data file exists
  }
};

// Initialize database with loaded data
let database = loadDataFromFile();
let emails = loadEmailFromFile();


export const logoutOperation = (req, res) => {
  try {
    emails.pop();
    saveEmailToFile(emails);
    res.render("login.ejs");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginSubmitOperation = (req, res) => {
  try {
    let loginEmail = req.body["loginEmail"];
    let emailAd = {
      email: loginEmail
    };
    emails.push(emailAd);
    saveEmailToFile(emails);
    res.redirect("/v1/home");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const homePage = (req, res) => {
  try {
    res.render("index.ejs",{ data: database,emailAddress:emails});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const blogPage = (req,res)=>{
  try {
    res.render("blogs.ejs",{data:database});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const createPost = (req,res) =>{
  try {
    res.render("createPost.ejs");    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const submitOperation = (req, res) => {
  try {
    let title = req.body["title"];
    let content = req.body["content"];
    let tags = req.body["tags"];
    let date = new Date().toDateString();
    let data = {
      title: title,
      content: content,
      tags: tags,
      date: date,
    };
    database.push(data);
    saveDataToFile(database);
    res.redirect("/v1/home");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const aboutPage = (req, res) => {
  try {
    res.render("about.ejs");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateOperation = (req, res) => {
  try {
    const { title, newTitle, newContent, newTags } = req.body;

    // Find the post by title
    let post = database.find((post) => post.title === title);

    if (post) {
      // Update the post content if found
      post.title = newTitle || post.title; // Update title if provided
      post.content = newContent || post.content; // Update content if provided
      post.tags = newTags ? newTags.split(",") : post.tags; // Update tags if provided

      saveDataToFile(database);
      res.redirect("/v1/home");
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteOperation = (req, res) => {
  try {
    const { title } = req.body;

    // Find the index of the post by title
    let postIndex = database.findIndex((post) => post.title === title);

    if (postIndex !== -1) {
      // Remove the post from the array
      database.splice(postIndex, 1); //postIndex and 1 is for deleting only 1 value
      saveDataToFile(database);
      res.redirect("/v1/home");
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
