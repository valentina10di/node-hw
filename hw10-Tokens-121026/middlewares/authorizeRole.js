 function authorizeRole(requiredRole) {
    return (req, res, next) => {
        // req.user заполняется предыдущим middleware authenticateJWT
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({
                message: 'Доступ запрещен: недостаточно прав'
            });
        }
        next();
    };
}
export default authorizeRole;