const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

// Before saving validate Password has been modified & store as a hash
UserSchema.pre('save', async function(next) {
    const user = this;

    try {
        if (!user.isModified('password')) next();

        let hash = await bcrypt.hash(user.password, 13);
        user.password = hash;

        next();
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// Comparing Password with stored Password
UserSchema.methods.comparePassword = async function (password) {
    try {
        let result = await bcrypt.compare(password, this.password);

        return result;
    } catch (e) {
        console.error(e);

        return false;
    }
};

// export
module.exports = mongoose.model('User', UserSchema);