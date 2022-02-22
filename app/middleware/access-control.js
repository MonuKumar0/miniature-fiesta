import authenticate from './authenticate.js';
import Constants from '../config/constants.js';

export default function accessControl(role) {
  if (!role) {
    throw new Error('Provide a role.');
  }

  const requiredRoleIndex = Constants.userRoles.indexOf(role);

  if (requiredRoleIndex < 0) {
    throw new Error('Not a valid role.');
  }

  return (req, res, next) => authenticate(req, res, (err) => {
    if (
      err ||
      !req.currentUser ||
      req.currentUser.role != role
    ) {
      res.sendStatus(403);
      return;
    }

    next();
  });
}
