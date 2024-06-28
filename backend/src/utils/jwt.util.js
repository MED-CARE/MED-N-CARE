import jwt from "jsonwebtoken";

const genToken = (id, time) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: time,
  });
  return token;
};

const verifyToken = (token) => {
  const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if(verifiedUser){
    return true
  }else{
    return false
  }
};

export { genToken, verifyToken };
