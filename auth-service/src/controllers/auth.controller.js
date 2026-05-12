import { registerUser, loginUser, GetUser } from "../services/user.service.js";
import { generateToken } from "../utils/jwt.js";


export const handleRegister = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const user = await registerUser({ fullname, email, password });

        const token = generateToken({ id: user._id });

        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while register",
            error: error.message
        })
    }
}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser({
            email,
            password,
        });

        const token = generateToken({
            id: user._id,
        });

        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(200).json({
            success: true,
            message: 'Login successful',

            user: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const handleLogout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Logout successful',
    });
};

export const handleGetMe = async (req, res) => {
    try {
        const user = await GetUser(req);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: 'Error while getMe',
            error: error.message,
        });
    }
};