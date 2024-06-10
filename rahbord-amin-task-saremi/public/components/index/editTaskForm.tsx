import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import FormButton from "../reusable-components/formButton";
import { TaskStatus, TaskType } from "@/types";
import { addTask, editTask, generateRandomId, getTaskByTitle } from "@/functions";
import { useTasks } from "@/contexts/tasksContext";
interface IFormInput {
  title: string;
  description: string;
  status: TaskStatus.Doing|TaskStatus.Done;
  id:number;
}

const FormBox = styled.div`
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.0431372549);
  position: relative;
  border-radius: 0.375rem;
  border-color: transparent;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  padding: 2rem;
  background-color: #e0e0e0;
  width: 100%;
  .form-control {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.375rem;
    border-width: 1px;
    padding: 0.5rem 0.75rem;
  }
  .title {
    font-size: 1.2rem;
    line-height: 1.5rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  p {
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    color: rgba(211, 41, 41);
  }
 textarea{
    height:300px;
      }
`;

interface props{
  currentTask:TaskType
}
const EditTaskForm = ({currentTask}:props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>(
    {  defaultValues:currentTask}
  );


  const{tasks,setTasks}=useTasks()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
   
    if(tasks){
     const tasksAfterEdit= editTask(tasks,data)
     setTasks(tasksAfterEdit)
    }

    
     

   
    alert("کار با موفقیت ویرایش شد. ");
  };

  return (
    <FormBox>
      <form
      
      onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="title">جزییات کار</div>
        <div className="mb-4 relative">
          <label htmlFor="title">عنوان</label>
          <input
            id="title"
            {...register("title", { required: "عنوان الزامی است" })}
            className="form-control"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        {/* Status Input */}
        <div className="mb-4 relative">
          <label htmlFor="status">وضعیت</label>
          <select
            className="form-control"
            id="status"
            {...register("status", {
              required: "Status is required",
            })}
          >
            <option value={TaskStatus.Doing}>در حال انجام</option>
            <option value={TaskStatus.Done}>انجام شده</option>
          </select>
          {errors.status && <p>{errors.status.message}</p>}
        </div>
        {/* Description Input */}
        <div className="mb-4 relative">
          <label htmlFor="description">توضیحات</label>
          <textarea
            className="form-control"
            id="description"
            {...register("description", { required: "توضیحات الزامی است" })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="mt-8">
          <FormButton type="submit">ویرایش</FormButton>
        </div>
      </form>
    </FormBox>
  );
};

export default EditTaskForm;
