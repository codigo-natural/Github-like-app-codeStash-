export async function ensureAutenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(proces.env.CLIENT_BASE_URL + "/login");
}
