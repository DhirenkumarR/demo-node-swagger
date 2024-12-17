const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Staff = require('../models/admin.model'); // Adjust the path as necessary
const User = require('../models/user.model')

// Middleware to check admin token validity
function adminTokenCheck() {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    data: {},
                    message: "Please Enter Token",
                    status: StatusCodes.NOT_FOUND,
                });
            }

            let token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const { user_type, id } = decoded;

            if (![Staff.USER_TYPE.SUPERADMIN, Staff.USER_TYPE.SUBADMIN].includes(user_type)) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    data: {},
                    message: "Please login as Admin",
                    status: StatusCodes.UNAUTHORIZED,
                });
            }

            const user = await Staff.findById(id);
            if (!user) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    data: {},
                    message: "Token is not valid",
                    status: StatusCodes.UNAUTHORIZED,
                });
            }

            if (user_type === Staff.USER_TYPE.SUBADMIN) {
                if (user.last_updated && user.updated_at && user.last_logged && new Date(user.updated_at) > new Date(user.last_logged)) {
                    user.last_updated = undefined;
                    await user.save();
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        success: false,
                        data: {},
                        message: "Token is not valid",
                        status: StatusCodes.UNAUTHORIZED,
                    });
                }
            } else if (user_type === Staff.USER_TYPE.SUPERADMIN) {
                const lastLoggedTimeStamp = new Date(user.last_logged);
                const updatedAtTimestamp = new Date(user.last_updated);

                if (lastLoggedTimeStamp < updatedAtTimestamp) {
                    return res.status(StatusCodes.UNAUTHORIZED).json({
                        success: false,
                        data: {},
                        message: "Your session has expired. Please log in again.",
                        status: StatusCodes.UNAUTHORIZED,
                    });
                }
            }

            req.user = decoded;
            next();
        } catch (error) {
            console.error("Token Invalid Error:", error);
            res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                data: {},
                message: "Token is not valid",
                status: StatusCodes.UNAUTHORIZED,
            });
        }
    };
}

function userTokenCheck() {
    return async function (req, res, next) {
        try {
            if (
                req.headers.authorization == undefined ||
                req.headers.authorization == "undefined"
            )
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({
                        success: false,
                        data: {},
                        message: "Please Enter Token",
                        status: StatusCodes.NOT_FOUND,
                    });

            let token = req.headers.authorization;
            if (token.startsWith("Bearer ")) {
                token = token.slice(7, token.length); // Remove "Bearer " prefix
            }

            let decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded;

            const user = await User.findById(req.user.id);

            if (user && (user.status === User.STATUS.DEACTIVE || user.status === User.STATUS.PENDING || user.is_deleted == true)) {
                return res
                    .status(StatusCodes.FORBIDDEN)
                    .json({ statusCode: StatusCodes.FORBIDDEN, data: {}, message: "Your account is deactivated or Inactive. Please contact support for further assistance." });
            }
            next()
        } catch (error) {
            console.log("<<<<<Token Invalid Error<<<<<", error);
            res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ succeess: false, data: [], message: "Token is not valid" });
        }
    }
}

module.exports = { adminTokenCheck, userTokenCheck };
