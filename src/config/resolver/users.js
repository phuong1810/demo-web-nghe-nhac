const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLogin } = require('../../validate/validate');

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        'secret',
        {
            expiresIn: '1h'
        }
    )
}

module.exports = {
    Query: {
        async getUsers() {
            try{
                const users = await User.find().sort({ createdAt: -1 });
                return users;
            } catch (err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {

        async login(_, { username, password }) {
            const { errors, valid } = validateLogin(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "User not found.";
                throw new UserInputError('Username or password is invalid', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Wrong crendetials";
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user.id,
                token,
            }
        },

        async register (_, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // TODO: Validate user data
            // TODO: Make sure user doesn't already exist
            // TODO: hash password and create an auth token
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) {
                // throw new UserInputError(errors[0].message);
                throw new UserInputError('Errors', { errors });
            }
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res.id,
                token,
            }

        }
    }
}