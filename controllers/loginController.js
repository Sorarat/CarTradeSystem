const User = require('../entities/User');

const loginController = {
    login: async(req, res) => {
        const { email, password, role } = req.body;

        // validate input 
        if (!email) {
            return res.status(400).json({ message: 'Email is required' })
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required' })
        }

        if (!role) {
            return res.status(400).json({ message: 'Role is required' })
        }

        console.log(role);
        try {
            // find user by email
            const user = await User.findByEmail(email);
            console.log('User:', user);
            // check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            
            // verify password 
            const isPasswordValid = await User.verifyPassword(password, user.password_hash);
            console.log('Password Valid:', isPasswordValid);
            if (!isPasswordValid) {
                return res.status(403).json({ message: 'Invalid password' });
            }

            // check suspend status
            if (user.suspendStatus) {
                return res.status(403).json({ message: 'User is suspended' });
            }

            // check if role matches
            const userRole = await user.getRole();
            if (userRole != role) {
                return res.status(403).json({ message: 'Role does not match' });
            }

            // if all checks pass, return success response
            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.user_id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    role: userRole
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred during login' });
        }
    }
};

module.exports = loginController;