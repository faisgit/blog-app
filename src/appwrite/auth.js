import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}){
        try {
         const userAccount =    await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount) {
                // call another method
                this.login({email, password})
            }
        } catch (error) {
            throw error
            
        }
    }

    async login({email, password}){
        return await this.account.createEmailPasswordSession(
            email,
            password
        )
    }

    async getCurrentUser() {
        try {
          const result = await this.account.get();
          return result;
        } catch (error) {
          console.error(`Appwrite service :: getCurrentUser :: error ${error}`);
          throw error; // rethrow the error
        }
      }

    async logout(){
        try {
            return this.account.deleteSessions('current')
        } catch (error) {
            console.log(`Appwrite service :: logout :: error ${error}`)
        }
    }

}



const authService =  new AuthService()
export default authService;