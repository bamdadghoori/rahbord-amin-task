import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TaskType } from "@/types";
import { getTaskByTitle } from "@/functions";
import EditTaskForm from "@/public/components/index/editTaskForm";
import { useTasks } from "@/contexts/tasksContext";
const TaskDetails = () => {
  const router = useRouter();

  const title = router.query.title;

  //connect to redux
  const { tasks, setTasks } = useTasks();
  const [currentTask, setCurrentTask] = useState<TaskType | null>(null);
  useEffect(() => {
    if (title) {
      if (tasks) {
        const currentData = getTaskByTitle(tasks, title as string);
        console.log("currentjoon", currentData);
        if (currentData != undefined) {
          setCurrentTask(currentData);
        }
      }
    }
  }, [title]);
  return (
    <>
     <div className='flex w-full mt-16 justify-center'>
 <div className='flex  w-full lg:w-1/2 p-5'>
      {currentTask != null ? (
        <EditTaskForm currentTask={currentTask} />
      ) : (
        <>کاری با این عنوان یافت نشد</>
      )}
      </div>
      </div>
    </>
  );
};
export default TaskDetails;
