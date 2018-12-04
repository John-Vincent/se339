var jwt = require("jsonwebtoken");

var authguard = function(req,res,next)
{
    if(req && req.header && req.header.Authorization)
    {
        try
        {
            var decode = jwt.verify(req.header.Authentication, jwt_secret);
            req.token = decode;
            next();
        }
        catch(err)
        {
            res.status(401).send();
        }
    } else
    {
        res.status(401).send();
    }
}

module.exports = authguard;