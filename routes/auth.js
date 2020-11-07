const express = require("express");
const { check, validationResult } = require("express-validator");

const { login, register, me } = require("../controllers/AuthController");

const router = express.Router();

// Sign Up
router.post(
    "/register",
    [
        check("name")
            .isLength({min: 3})
            .withMessage("Username must have a minimum of three characters")
            .trim(),

        check("email")
            .isEmail()
            .withMessage("Invalid email address")
            .normalizeEmail(),
        
        check("password")
            .isLength({ min: 8, max: 15})
            .withMessage("Password should be between 8 and 15 characters")
            .matches(/\d/)
            .withMessage("Please include at least one number in your password")
            .matches(/[!@#$%^&*(),.?":{}|<>]/)
            .withMessage("Please include at least one special character in your password"),
        
        check("confirmPassword")
            .custom(( value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Confirmed Password doesn't match Password");
                }

                return true;
            }),
    ],

    (req, res, next) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() });
        }

        next();
    },

    register
);

// Login
router.post(
    "/login",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email")
            .normalizeEmail(),

        check("password")
            .isLength({ min: 8, max: 15})
            .withMessage("Invalid Password")
    ],

    (req, res, next) => {
        const error = validationResult(req).formatWith(({ msg }) => msg);

        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() });
        }
        
        next();
    },

    login
);

// get me
router.get("/me", me);

module.exports = router;