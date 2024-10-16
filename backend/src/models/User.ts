class User {
  private userId: string | null;
  private name: string;
  private email: string;
  private phone: string;
  private password: string;
  private recoverCode: string | null;
  private role: number | null;

  constructor(
    name: string,
    email: string,
    phone: string,
    password: string,
    recoverCode?: string,
    role?: number,
    userId?: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.recoverCode = recoverCode;
    this.role = role;
    this.userId = userId;
  }

  getID(): string {
    return this.userId;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  getPassword(): string {
    return this.password;
  }

  getRecoverCode(): string {
    return this.recoverCode;
  }

  getRole(): number {
    return this.role;
  }

  setID(newId: string) {
    this.userId = newId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setEmail(newEmail: string) {
    this.email = newEmail;
  }

  setPhone(newPhone: string) {
    this.phone = newPhone;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }

  setRecoverCode(newRecoverCode: string) {
    this.recoverCode = newRecoverCode;
  }

  setRole(new_role: number) {
    this.role = new_role;
  }
}

export { User };
