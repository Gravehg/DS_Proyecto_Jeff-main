import User, { UserT } from "../schemas/userS";
import Cart from "../schemas/cartS";
import { User as UserModel } from "../models/User";
const { EmailInUse } = require("../exceptions/exceptions");
const bcrypt = require("bcryptjs");

class UserDAO {
  constructor() {}

  // Registra un usuario
  // Por defecto lo registra como cliente, NO COMO ADMINISTRADOR
  // Se encarga de encriptar la contraseña
  // Crea un carrito vacío para el usuario
  public async registerUser(userToRegister: UserModel) {
    const hashedPassword = await bcrypt.hash(userToRegister.getPassword(), 10);
    const user = new User({
      name: userToRegister.getName(),
      email: userToRegister.getEmail(),
      phone: userToRegister.getPhone(),
      password: hashedPassword,
      role: 1,
    });
    const userRegistered = await user.save();
    const cart = new Cart({ client: userRegistered._id, products: [] });
    await cart.save();
    return userRegistered;
  }

  // Actualiza un usuario
  // Se encarga de encriptar la contraseña del usuario
  public async updateUser(userToUpdate: UserModel) {
    const checkUser = await this.getUserByEmail(userToUpdate.getEmail());

    // Verificamos que otro usuario no tenga el mismo correo
    if (checkUser && checkUser._id != userToUpdate.getID()) {
      throw new EmailInUse();
    }

    // Si hay una contraseña nueva, la actualizamos
    if (userToUpdate.getPassword() != "") {
      this.updatePassword(userToUpdate.getEmail(), userToUpdate.getPassword());
    }

    return await User.updateOne(
      { _id: userToUpdate.getID() },
      {
        name: userToUpdate.getName(),
        email: userToUpdate.getEmail(),
        phone: userToUpdate.getPhone(),
      }
    );
  }

  // Actualiza la contraseña de un usuario
  // Se encarga de encriptar la contraseña
  public async updatePassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.updateOne({ email: email }, { password: hashedPassword });
  }

  // Actualiza el código de recuperación de contraseña de un usuario
  public async updateRecoverCode(email: string, code: string) {
    return await User.updateOne({ email: email }, { recoverCode: code });
  }

  // Verifica si el código de recuperación ingresado por un usuario es igual al de la BD
  public async compareRecoverCode(email: string, code: string) {
    const user = await this.getUserByEmail(email);
    if (!user) {
      return false;
    }
    return user.recoverCode == code;
  }

  // Retorna un usuario por id
  public async getUserByID(id: string) {}

  // Retorna un usuario por email
  public async getUserByEmail(email: string) {
    return await User.findOne({ email: email });
  }

  // Retorna un usuario por id pero no retorna la contraseña del usuario
  public async getUserNoPwd(userId: string) {
    const user: UserT | null = await User.findOne({ _id: userId });
    if (user == null) {
      return null;
    }
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    };
  }
}

export { UserDAO };
