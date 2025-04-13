const UserSchema = require("../schema/UserSchema");

const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find();

        if (!users || users.length === 0) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: 'NO USERS FOUND',
            });
        }
        return res.status(200).json({
            code: 200,
            status: true,
            message: 'USERS RETRIEVED SUCCESSFULLY.',
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'SERVER ERROR.PLEASE TRY AGAIN LATER.',
        });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;  // Get the userId from the request parameters

    try {
        // Attempt to find and delete the user by their ID
        const user = await UserSchema.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                code: 404,
                status: false,
                message: 'USER NOT FOUND.',
            });
        }

        return res.status(200).json({
            code: 200,
            status: true,
            message: 'USER DELETED SUCCESSFULLY.',
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: false,
            message: 'SERVER ERROR. PLEASE TRY AGAIN LATER.',
        });
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
};
