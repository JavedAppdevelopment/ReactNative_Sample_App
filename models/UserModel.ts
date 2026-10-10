export default class UserModel {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  gender: string;

  constructor(name: string, lastname: string, email: string, phone: string, password: string, confirmPassword: string, gender: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.gender = gender;
  }
}