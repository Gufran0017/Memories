const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
},
    {timestamps: true},
);

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) next();

    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, saltRound);
        this.password = hashPassword;
        next();
    }

    catch(error){
        console.log("Hash Password error", error)
    }
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d"
            }
        );
    } 
    catch (error) {
        console.log("jwt error", error);
    }
}

const User = new mongoose.model('User', userSchema);
module.exports = User;