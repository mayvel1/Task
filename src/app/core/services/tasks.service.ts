import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
private dbPath = '/tasks';
taskRef:AngularFireList<any>;
  constructor(private db:AngularFireDatabase) { 
     this.taskRef =db.list(this.dbPath);

  }
  getAllTasks(){
    return this.taskRef;
  }
  addTask(task:Task){
  this.taskRef.push(task);

  }
  updateTask(key:string,task:Task){
    this.taskRef.update(key,task);
  }
  getTask(key:string){
    return this.db.object(`${this.dbPath}/${key}`);

  }
//   getUserByEmail(email: string): AngularFireList<User> {
//     return this.db.list(this.dbPath, ref =>
//       ref.orderByChild('email').equalTo(email) // Query by email
//     );
//   }
  
}
