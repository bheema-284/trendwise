const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
        next(); // User is authenticated and has 'admin' role
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};
export default isAdmin;