const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const homeStartingContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione";
const contactContent="Pellentesque blandit ante at ullamcorper mollis. Nunc congue sem lorem, ut consectetur felis sollicitudin et. Vestibulum mattis dapibus nulla non cursus. Aenean feugiat nunc auctor, mollis libero quis, ullamcorper libero. Nullam vitae sem in purus egestas ultricies. Integer auctor diam non ultrices euismod. ";

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

const posts=[];

app.get("/",function(req,res){
    res.render("home",{startingContent:homeStartingContent,posts:posts});
});
app.get("/about",function(req,res){
    res.render("about",{startingContent:aboutContent});
});
app.get("/contact",function(req,res){
    res.render("contact",{startingContent:contactContent});
});
app.get("/compose",function(req,res){
    res.render("compose");
});
app.post("/compose",function(req,res){
    const post={
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(post);
    res.redirect("/");
});
app.get("/:postName",function(req,res){
    const requestedpostName=_.lowerCase(req.params.postName);
    posts.forEach(function(post){
        const storedpostName=_.lowerCase(post.title);
        if(requestedpostName===storedpostName)
        {
            res.render("post",{postTitle:post.title,postContent:post.content});
        }
    });
})
app.listen(3000);