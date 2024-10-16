import { UserDAO } from "../daos/UserDAO";
import { User } from "../models/User";
import { sendEmail } from "./EmailService";
const bcrypt = require("bcryptjs");

class UserAdmin {
  private userDAO: UserDAO = new UserDAO();

  constructor() {}

  // Funciones auxiliares -------------------------------------------------------------------
  private generateNumericPasswordRecoveryCode(length: number) {
    const charset = "0123456789";
    let code = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }

    return code;
  }

  // ----------------------------------------------------------------------------------------

  // Registra un usuario
  public async registerUser(user: User) {
    // Verificamos si ya existe un usuario con el email
    try {
      const result = await this.userDAO.getUserByEmail(user.getEmail());
      if (result) {
        return {
          error: true,
          message: "El correo electrónico ya se encuentra en uso",
        };
      } else {
        await this.userDAO.registerUser(user);
        return {
          error: false,
          message: "Usuario registrado exitosamente",
        };
      }
    } catch (err) {
      console.error(err);
      return {
        error: true,
        message: "Ocurrió un error inesperado, intente de nuevo",
      };
    }
  }

  // Actualiza los datos de un usuario
  public async updateUser(user: User) {
    await this.userDAO.updateUser(user);
  }

  // Actualiza la contraseña de un usuario
  public async updatePassword(email: string, password: string) {
    await this.userDAO.updatePassword(email, password);
  }

  // Actualiza el código de recuperación de contraseña de un usuario
  public async updateRecoverCode(email: string) {
    const code = this.generateNumericPasswordRecoveryCode(8);
    const content = "El código de recuperación es: " + code;
    sendEmail(
      email,
      "Sistema Duende - Código de recuperación de contraseña",
      content
    );
    await this.userDAO.updateRecoverCode(email, code);
  }

  // Verifica si el código de recuperación ingresado por un usuario es igual al de la BD
  public async compareRecoverCode(email: string, code: string) {
    return await this.userDAO.compareRecoverCode(email, code);
  }

  // Verifica si existe el usuario con el email del parámetro
  public async userExists(email: string) {
    const user = await this.userDAO.getUserByEmail(email);
    const result = user ? true : false;
    if (result) {
      await this.updateRecoverCode(email);
    }
    return result;
  }
}

export { UserAdmin };
