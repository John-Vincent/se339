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
            if(Date.now()/1000 < decode.exp)
                next();
            else
                throw 'expired';
        }
        catch(err)
        {
            res.status(401).send(err);
        }
    } else
    {
        res.status(401).send();
    }
}

module.exports = authguard;