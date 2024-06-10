import { TaskType } from "./types";
import { tasksData } from "./tasksData";
export const standardUrl=(title: string):string=> {
    return title.replace(/ /g, '-');
  }
  export const deleteTask = (prevTasks: TaskType[],id:number) => {

        if (!prevTasks) return prevTasks;

        const targetIndex = prevTasks.findIndex(obj => obj.id === id);

        if (targetIndex !== -1) {
          // Create a new prevTasks excluding the target object
          let newprevTasks = prevTasks.slice(0, targetIndex).concat(prevTasks.slice(targetIndex + 1));
        
          // Clear the original prevTasks
          prevTasks.length = 0;
        
          // Push the elements from the new prevTasks into the original prevTasks
          Array.prototype.push.apply(tasksData, newprevTasks);
        return newprevTasks;
      }
    }

      export const addTask=(prevTasks:TaskType[],data:TaskType)=>{
        const newData=[data,...prevTasks]

        if(typeof window!=undefined){
        localStorage.setItem("tasks",JSON.stringify(newData))
        return [...newData]; 
        }
      }

   export  const generateRandomId=()=> {

      //random id used to add task using the this id
      const timestamp = Date.now(); // Get current timestamp
      const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number up to 999999
      return parseInt(`${timestamp}${randomNum}`, 10);
      }

      //for task-details page we need to use function below
    export  const getTaskByTitle=(tasks:TaskType[],title:string)=>{
          
           const currentTask=tasks.find((el:TaskType)=>{
            console.log("titjoon",el.title,title)
            return standardUrl(el.title)===standardUrl(title)
           })
           return currentTask
    }
   
    export const editTask=(prevTasks:TaskType[],currentTask:TaskType)=>{
      const targetIndex = prevTasks.findIndex((obj:TaskType) => obj.id === currentTask.id);
      const newTasks = [...prevTasks.slice(0, targetIndex), currentTask, ...prevTasks.slice(targetIndex + 1)];
      if(typeof window!=undefined){
        localStorage.setItem("tasks",JSON.stringify(newTasks))
      }
      return newTasks
    }
  