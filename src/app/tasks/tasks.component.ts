import { Component, OnInit } from '@angular/core';
import { TasksService } from '../core/services/tasks.service';
import { Task } from '../core/models/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit{
  toDoTasks:Task[]=[];
  inProgressTasks:Task[]=[];
  doneTasks:Task[]=[];
  constructor(private taskService:TasksService){
    this.getTasks();
  }
  ngOnInit(): void {
    
  }
  getTasks(){
    this.taskService.getAllTasks().snapshotChanges().subscribe({
      next: (data) => {
        data.forEach((item) => {
          const task = item.payload.val();
    
          if (task && task.title && task.description && task.dueDate && task.status) {
            if(task.status =='toDo'){
              this.toDoTasks.push({
                key:item.key ?item.key:"",
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status:task.status
              });
            }
            else if(task.status =='inProgress'){
              this.inProgressTasks.push({
                key:item.key ?item.key:"",
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status:task.status
              });
            }
            else{
              this.doneTasks.push({
                key:item.key ?item.key:"",
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                status:task.status
              });
            }
          } else {
            console.warn('Task data structure is incorrect');
          }
        });
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
  }
  drop(event: CdkDragDrop<any[]>, targetList: string) {
    if (event.previousContainer !== event.container) {
      const previousIndex = event.previousIndex;
      const sourceData = event.previousContainer.data;
      const draggedItem = sourceData[previousIndex];

      let newStatus = event.container.id ==="first-column-list"?
      "toDo":event.container.id ==="second-column-list"? "inProgress":"done";
      let task:Task = {
        "key":draggedItem.key,
        "title":draggedItem.title,
        "description":draggedItem.description,
        "dueDate":draggedItem.dueDate,
        "status":newStatus,
      };
      this.toDoTasks=[];
      this.inProgressTasks=[];
      this.doneTasks=[];
      this.taskService.updateTask(event.previousContainer.data[0].key,task);
    }
  }
}
