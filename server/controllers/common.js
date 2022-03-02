/**
 * checks if user is authorized based on role of user
 * @param {*} req 
 * @param {*} res 
 * @param {Array} roles
 */

exports.checkAuthorization = (req, res, roles) => { 
if(!roles.includes(req.user.role)){
    return res.redirect('/users/unauthorised')      
    }
}
