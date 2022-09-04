const userModel = require("../../../DB/model/User");


const  {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} = require('http-status-codes');
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new userModel({ name, email, password });
        const savedUser = await newUser.save()
        res.status(StatusCodes.CREATED).json({ message: "Done", savedUser })
    } catch (error) {
        if (error.keyValue) {
            if(error.keyValue.email){
                res.json({ message: "email exist" , status:getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
            }
        } else {
            res.json({ message: "catch err ", error })
        }

    }

}
module.exports = { signup }