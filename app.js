const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('./models/user');
const postModel = require('./models/post');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render("index");
});
app.get('/login', (req, res) => {
    res.render("login");
});
app.get('/profile', isLoggedIn, async (req, res) => {
    const user = await userModel.findById(req.user.userid).populate("posts");
    res.render("profile", {user});
});
app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user");
    if(post.likes.indexOf(req.user.userid)===-1){
        post.likes.push(req.user.userid);
    }
    else{
        post.likes.splice(post.likes.indexOf(req.user.userid), 1);
    }
    await post.save();
    res.redirect("/profile");
});
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({_id: req.params.id}).populate("user").populate("user");
    
    res.render("edit", {post});
});
app.post('/post/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content});
    res.redirect("/profile");
});
app.post('/register', async (req, res) => {
    let { username, email, password, age } = req.body;
    let user = await userModel.findOne({ email })
    if (user) return res.status(500).send("User already exists");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age
    });
    let token = jwt.sign({ userid: createdUser._id, email: createdUser.email }, "shhhh")
    res.cookie("token", token);
    res.send("registerd");

})
app.post('/login', async (req, res) => {
    let { email, password, } = req.body;
    let user = await userModel.findOne({ email })
    if (!user) return res.status(500).send("Something Went wrong");
    bcrypt.compare(password, user.password, (err, result) => {

        if (result) {
            let token = jwt.sign({ userid: user._id, email: user.email }, "shhhh")
            res.cookie("token", token);
            res.status(200).redirect("/profile");
        }
        else res.redirect("/login");

    });
});
app.post("/post", isLoggedIn, async (req, res) => {

    const user = await userModel.findById(req.user.userid);

    const post = await postModel.create({
        content: req.body.content,
        user: user._id
    });

    user.posts.push(post._id);
    await user.save();

    res.redirect("/profile");

});
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.set("Cache-Control", "no-store");
    res.redirect("/login");
});
function isLoggedIn(req, res, next) {
    // 1. Check if the token exists
    if (!req.cookies.token) {
        return res.redirect("/login");
    }

    try {
        // 2. This will throw an error if the token is "malformed"
        let data = jwt.verify(req.cookies.token, "shhhh");
        req.user = data;
        next();
    } catch (err) {
        // 3. If token is malformed or expired, clear it and send error
        res.clearCookie("token");
        return res.status(401).send("Invalid token. Please login again.");
    }
}

app.listen(3000);