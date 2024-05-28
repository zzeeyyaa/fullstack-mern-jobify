export const authenticateUser = async (req, res, next) => {
  console.log(req.cookies);
  next();
};

///if we invoke next, then essentiali to next middleware
///if not so stuck
