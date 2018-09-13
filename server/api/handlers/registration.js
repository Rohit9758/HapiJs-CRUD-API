/******
 Author: Rohit Bhure
 Date: 07/09/2018
 *******/
const Joi = require("joi");
const Boom = require("boom");
const ObjectID = require('mongodb').ObjectID;

/**Function for New User Registration**/
const newUserRegistration = {
    auth: false,
    tags: ["api", "User"],
    description: "User Registration",
    validate: {
        payload: Joi.object()
            .keys({
                firstName: Joi.string(),
                lastName: Joi.string(),
                fullName: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
                type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),
                sex: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required(),
                mobileNumber: Joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required()
            })
            },
    async handler(req, h) {
        try {
            let reqData = req.payload;
            const userCollection = req.user.collection("users");
            const checkUserAvailablity = await userCollection.find({ mobileNumber: req.payload.mobileNumber}).toArray();
            if (checkUserAvailablity.length <= 0) {
                const usersData = await userCollection.insertOne(reqData);
                if (!usersData) {
                    return Boom.notFound("User not found");
                }
                return h.response({ message: "Successfully registered" });
            }
            else {
                return h.response({ message: "User Already Exists with this mobile Number" });
            }
        } catch (DBException) {
            console.log(DBException);
            return Boom.expectationFailed(DBException.message);
        }
    }
};

/**Function to get All registered User**/

const getAllUsers = {
    auth: false,
    tags: ["api", "User"],
    description: "Get All Users",
    async handler(req) {
        try {
            const userCollection = req.user.collection("users");
            const usersData = await userCollection.find({}).toArray();
            if (!usersData) {
                return Boom.notFound("No Users Registered");
            }
            return usersData;
        } catch (DBException) {
            console.log(DBException);
            return Boom.expectationFailed(DBException.message);
        }
    }
};

/**Function to Update the Existing User**/

const updateUserData = {
    auth: false,
    tags: ["api", "users"],
    description: "To update the single user",
    validate: {
        query: {
            userID: Joi.string().required()
        },
        payload: Joi.object()
            .keys({
                firstName: Joi.string(),
                lastName: Joi.string(),
                fullName: Joi.string().regex(/^[A-Z]+ [A-Z]+$/i).uppercase(),
                type: Joi.string().valid('STUDENT', 'TEACHER').uppercase().required(),
                sex: Joi.string().valid(['M', 'F', 'MALE', 'FEMALE']).uppercase().required(),
                mobileNumber: Joi.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/).required()
            })
    },
    async handler(req, h) {
        let user = {};
        user.firstName = req.payload.firstName,
        user.lastName = req.payload.lastName,
        user.fullName = req.payload.fullName,
        user.type = req.payload.type,
        user.sex = req.payload.sex,
        user.mobileNumber = req.payload.mobileNumber
        try {
        const userCollection = req.user.collection("users");
        const checkUserAvailablity = await userCollection.find({ mobileNumber: req.payload.mobileNumber}).toArray()
        if(checkUserAvailablity.length > 0) {
           const usersData = await userCollection.updateOne(
                { _id: new ObjectID(req.query.userID)},{$set: user});
            return h.response({ message: "User Updated Successfully" });
          }
        else {
            return h.response({ message: "User record not Exists" });
          }
        } catch (DBException) {
            return Boom.expectationFailed(DBException.message);
        }
    }
};

/**Function to Delete the User**/

const removeUserData = {
    auth: false,
    tags: ["api", "users"],
    description: "To Delete the single user",
    validate: {
        query: {
            userID: Joi.string().required()
        }
    },
    async handler(req, h) {
        try {
            const userCollection = req.user.collection("users");
            const usersData = await userCollection.remove(
                { _id: new ObjectID(req.query.userID)});
            return h.response({ message: "User record removed successfully" });
        } catch (DBException) {
            return Boom.expectationFailed(DBException.message);
        }
    }
};

exports.routes = [
    {
        method: "POST",
        path: "/registration/user",
        config: newUserRegistration
    },
    {
        method: "GET",
        path: "/users",
        config: getAllUsers
    },
    {
        method: "PUT",
        path: "/updateuser",
        config: updateUserData
    },
    {
        method: "DELETE",
        path: "/removeuser",
        config: removeUserData
    }
];
