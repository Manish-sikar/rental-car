const router = require("express").Router();
 
// router.get("/dashboard", (req, res) => {
//    return res.render("dashboard/dashboard", { message: "" });
// });

router.get('/a', (req, res) => {
    console.log('Rendering dashboard view');
    res.render('dashboard/dashboard' , {message : " "});
});


router.get("/", (req, res) => {
    return res.json({
        message: "hello Empty Routes"
    });
});
router.get("/ab", (req, res) => {
    res.render('index');
});

module.exports = router;
