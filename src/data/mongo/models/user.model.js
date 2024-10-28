import crypto from "crypto";
export class User {
  constructor(
    email,
    password,
    photo = "https://random.imagecdn.app/50/50",
    role = "registeredUser"
  ) {
    this.id = crypto.randomBytes(12).toString("hex");
    this.photo = photo;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isOnline = false;
  }
}

export default User;