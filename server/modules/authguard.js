var jwt = require("jsonwebtoken");

var authguard = function(req,res,next)
{
    console.log("authorizing request to " + req.path);
    if(req && req.headers && req.headers.authorization)
    {
        try
        {
            var decode = jwt.verify(req.headers.authorization, jwt_secret);
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