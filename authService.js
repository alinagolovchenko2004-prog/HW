import { ROLES } from "./config.js";

const users = [
  { name: "John", role: ROLES.USER },
  { name: "Bill", role: ROLES.ADMIN },
];

export function getAuthenticatedUser(userName) {
  const normalizedName = userName.trim().toLowerCase();

  const foundUser = users.find(
    (user) => user.name.toLowerCase() === normalizedName,
  );

  if (foundUser) {
    return foundUser;
  }

  return {
    name: userName.trim(),
    role: ROLES.GUEST,
  };
}
