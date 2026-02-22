const aj = require("../lib/arcjet");
const {isSpoofedBot} = require("@arcjet/inspect");

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {

      if(decision.reason.isRateLimit()){
        return res.status(429).send("rate limit exceeded");
      }
      else if(decision.reason.isBot()){
        return res.status(403).send("bot access denied");
      }
    
    else {
      return res.status(200).send("Access granted");
    }
    }
    //check for spoofed bot
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).send("spoofed bot access denied");
    }
    next();
  }
  catch (error) {
    console.log("Error in arcjetMiddleware ",error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = arcjetMiddleware;