import conf from "../../conf/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount(email, password, name) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        this.login(email, password);
      } else {
        return userAccount();
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      throw new Error(
        `Appwrite service :: getCurrentUser :: error :: ${error}`
      );
    }
    return null;
  }

  async logout() {
    try {
      const result = await this.account.deleteSession("current");
      return result;
    } catch (error) {
      throw new Error("Appwrite service :: logout :: error :: ${error}");
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
