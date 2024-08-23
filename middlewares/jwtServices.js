

const { verifyUser } = require('../utils/jwt');
const { AuthenticationService, RoleRepository, UserService, UserRepository } = require('../services/index');

const roleRepository = new RoleRepository();
const userRepository = new UserRepository(roleRepository);
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(roleRepository);



const authenticateToken = async (accessToken) => {
    try {
        const userObject = await verifyUser(accessToken);
        const { correo, id } = userObject;
        const verifyId = await userService.getUserById(id);
        if (!verifyId) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        if (!correo) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Get the user from the database using the email
        const results = await userService.getUserByEmail(correo);
        // If the user is not found, return an invalid credentials error
        if (results.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // If the id is not provided, return an invalid credentials error
        if (!id) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        return {userObject};

    } catch (error) {
        console.log(error);
        throw new Error(`Error while authenticating token: ${error.message}`);
    }
}

const authAdmin = async (req, res, next) => {
    // Get the access token from the request headers
    const accessToken = req.headers['authorization'];

    // If the access token is not provided, return an authentication error
    if (!accessToken) {
        return res.status(401).json({ error: "Authorization token not provided" });
    }

    try {
        const { userObject } = await authenticateToken(accessToken);
        const { id } = userObject;
        // Get the admin role from the database using the id
        const adminResults = await authenticationService.getAdminRoleById(id);

        // If the admin role is not found, return an access denied error
        if (adminResults.length === 0) {
            return res.status(403).json({ error: "Access denied." });
        }
        // Call the next middleware
        next();

    } catch (err) {
        // If there is an error verifying the token, return an invalid token error
        return res.status(403).json({ error: "Invalid token" });
    }
}

const authUser = async (req, res, next) => {
    const accessToken = req.headers['authorization'];
    if (!accessToken) {
        return res.status(401).json({ error: "Authorization token not provided" });
    }

    try {
        const { userObject } = await authenticateToken(accessToken);
        const { id } = userObject;

        const role = await authenticationService.getUserRole(id);
        if (role === 0) {
            return res.status(403).json({ error: "Access denied." });
        }

        req.user = userObject;
        req.params.id = userObject.id;

        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
}


// Export the authentication middleware function
module.exports = { authAdmin, authUser };


