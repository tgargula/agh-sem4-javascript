const check = (req, res, permissions) => {
  if (!req.session.loggedin) {
    res.render('error', {
      error: { stack: 'You need to be signed in to see this page!' },
    });
    return false;
  }

  if (!req.session.permissions === permissions) {
    res.render('error', {
      error: { stack: 'You need to be signed as student to see this page!' },
    });
    return false;
  }

  return true;
}

module.exports = check;