const jwt = require("jsonwebtoken");

const User = require("../models/user");

const register = async (req, res) => {
    const { name, email, password } = req.body;

    console.log(req.body);

    try {
        let user = await User.findOne({ email });

        if (!user) {
            let newUser = new User({ name, email, password });

            await newUser.save();

            return res.status(200).json({ msg: "user successfully created" });
        }

        return res
                .status(422)
                .json({ errors: ["This email is already registered"]});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ errors: ["Some error occurred"]});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(422).json({errors: ["No such user exists"]});
        }

        if (await user.comparePassword(password)) {
            const token = jwt.sign({ id: user._id}, process.env.SECRET, {
                expiresIn: "24h"
            });

            return res.status(200).json({msg: "User successfully logged in", token});
        }

        return res.status(403).json({errors: ["Invalid Password"]});
    } catch (e) {
        return res.status(500).json({errors: ["Some error occurred"]});
    }
};

const me = async (req, res) => {
    let token = req.header("X-Auth");

    try {
        if (!token) {
            return res.status(403).json({errors: ["Unauthorized access"]});
        }

        let decoded = jwt.verify(token, process.env.SECRET);

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({errors: ["Unauthorized"]});
        }

        return res.status(200).json({ user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({errors: ["Some error occurred"]});
    }
}

module.exports = {
    login,
    register,
    me
}