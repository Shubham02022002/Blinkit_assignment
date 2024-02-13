const router = require("express").Router();
const { User } = require("../models/user");
const joi = require("joi");
const bcrypt = require("bcrypt");



router.post("/", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(400).send("Invalid email or password");
        if (user) return res.status(400).send("user already registered");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "logged in successfully"});


        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "user created successfully" });
    } catch (error) {
        res
          .status(500)
          .send({ message: "something went wrong", error: error.message });
    }
});

const validateUser = (data) => {
    const schema = joi.object({
      email: joi.string().email().required().label("Email"),
      password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
