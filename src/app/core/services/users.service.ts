import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
private dbPath = '/users';
userRef:AngularFireList<any>;
  constructor(private db:AngularFireDatabase) { 
     this.userRef =db.list(this.dbPath);

  }
  getAllUsers(){
    return this.userRef;
  }
  addUsers(user:User){
  this.userRef.push(user);

  }
  updateUser(key:string,user:User){
    this.userRef.update(key,user);
  }
  getUser(key:string){
    return this.db.object(`${this.dbPath}/${key}`);

  }
  getUserByEmail(email: string): AngularFireList<User> {
    return this.db.list(this.dbPath, ref =>
      ref.orderByChild('email').equalTo(email) // Query by email
    );
  }
  
}
