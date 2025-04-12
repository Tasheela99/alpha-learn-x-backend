const UserSchema = require('../schema/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const initializeAdmin = async () => {
    try {
        const adminName = process.env.ADMIN_USER_NAME;
        const adminEmail = process.env.ADMIN_USER_EMAIL;
        const adminPassword = process.env.ADMIN_USER_PASSWORD;

        const existingAdmin = await UserSchema.findOne({email: adminEmail});
        if (existingAdmin) {
            return;
        }
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = new UserSchema({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            isVerified: true,
            role: "ADMIN",
        });
        await adminUser.save();
    } catch (error) {
        console.error('Error initializing admin:', error);
        throw error;
    }
}

const login = async (req, res) => {
    try {
        const selectedUser = await UserSchema.findOne({ email: req.body.email });
        if (!selectedUser) {
            return res.status(404).json({
                label: "USER_NOT_FOUND",
                status: false,
                message: 'USERNAME NOT FOUND'
            });
        }

        if (!selectedUser.isVerified) {
            return res.status(401).json({
                label: "NOT_VERIFIED",
                status: false,
                message: 'PLEASE VERIFY YOUR EMAIL AND PHONE NUMBER'
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, selectedUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                label: "INCORRECT_PASSWORD",
                status: false,
                message: "INCORRECT PASSWORD"
            });
        }

        const user = {
            id: selectedUser._id,
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role,
        };

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(200).json({
            status: true,
            message: "USER LOGIN SUCCESSFULLY",
            token,
            user
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error',
        });
    }
};

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUserByEmail = await UserSchema.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                code: 400,
                status: false,
                message: "USER_EMAIL_EXISTS"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserSchema({
            name: name,
            email: email,
            password: hashedPassword,
            isVerified: true,
            role: "STUDENT",
        });

        await newUser.save();

        return res.status(201).json({
            code: 201,
            status: true,
            message: 'USER SAVED SUCCESSFULLY'
        });

    } catch (error) {
        console.error("Error during user registration:", error);  // Log the full error here
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'Server error, please try again later.',
        });
    }
};

const updateUserRole = (req, res) => {

    const userId = req.params.id;
    const {role} = req.body;

    const validRoles = ['STUDENT', 'ADMIN', 'TEACHER'];

    if (!validRoles.includes(role)) {
        return res.status(400).json({status: false, message: 'INVALID ROLE PROVIDED'});
    }

    UserSchema.findOne({_id: userId})
        .then(user => {
            if (!user) {
                return res.status(404).json({status: false, message: 'USER NOT FOUND'});
            }
            UserSchema.updateOne({_id: userId}, {$set: {role: role}})
                .then(result => {
                    if (result.modifiedCount > 0) {
                        return res.status(200).json({
                            status: true,
                            message: 'USER ROLE UPDATED SUCCESSFULLY',
                        });
                    } else {
                        return res.status(200).json({status: false, message: 'NO CHANGES MADE'});
                    }
                })
                .catch(error => {
                    res.status(500).json({status: false, message: 'SERVER ERROR', error: error.message});
                });
        })
        .catch(error => {
            res.status(500).json({status: false, message: 'SERVER ERROR', error: error.message});
        });
};

const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find({role: USER_ENUMS.ROLES.USER})
            .select('_id name email role');

        if (!users || users.length === 0) {
            return res.status(404).json({
                code:404,
                status: false,
                message: 'NO USERS FOUND',
            });
        }
        return res.status(200).json({
            code:200,
            status: true,
            message: 'USERS RETRIEVED SUCCESSFULLY.',
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            code:500,
            status: false,
            message: 'SERVER ERROR.PLEASE TRY AGAIN LATER.',
        });
    }
};

module.exports = {
    initializeAdmin,
    signUp,
    login,
    updateUserRole,
    getAllUsers,
};