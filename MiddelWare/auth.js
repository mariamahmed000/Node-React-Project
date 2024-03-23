const { request, response } = require("express");
const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  let token, encode;

  try {
    token = request.get("Authorization").split(" ")[1];
    console.log(token);
    encode = jwt.verify(token, "cmsam");
  } catch (error) {
    (error.status = 403), (error.message = "not authorized");
    next(error);
  }
  if (encode !== undefined) { 
    request.role = encode.role;
    next();
  }
};
