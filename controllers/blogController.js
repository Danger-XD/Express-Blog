export const homePage = async (req,res) =>{
        try {
            res.render("index.ejs",{data:database});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}
export const submitOperation = async (req,res) =>{
    try {
        let title = req.body["title"];
        let content = req.body["content"];
        let tags = req.body["tags"];
        let date = new Date().toDateString();
        let data = {
            title: title,
            content: content,
            tags:tags,
            date:date
        }
        database.push(data);
        res.render("index.ejs",{data:database});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const aboutPage = async (req,res) =>{
    try {
        res.render("about.ejs");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateOperation = async (req,res) =>{
    try {
        const { title, newTitle, newContent, newTags } = req.body;

        // Find the post by title
        let post = database.find(post => post.title === title);

        if (post) {
            // Update the post content if found
            post.title = newTitle || post.title;  // Update title if provided
            post.content = newContent || post.content;  // Update content if provided
            post.tags = newTags ? newTags.split(",") : post.tags;  // Update tags if provided
            post.date = new Date().toDateString();  // Update the date

            res.render("index.ejs", { data: database });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const deleteOperation = async (req,res) =>{
    try {
        const { title } = req.body;

        // Find the index of the post by title
        let postIndex = database.findIndex(post => post.title === title);

        if (postIndex !== -1) {
            // Remove the post from the array
            database.splice(postIndex, 1);
            res.render("index.ejs", { data: database });
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const database = [];