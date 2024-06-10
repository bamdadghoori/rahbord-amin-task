import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import FormButton from "../reusable-components/formButton";
import { TaskStatus } from "@/types";
import { addTask, generateRandomId, getTaskByTitle } from "@/functions";
import { useTasks } from "@/contexts/tasksContext";
interface IFormInput {
  title: string;
  description: string;
  status: TaskStatus.Doing|TaskStatus.Done;
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
const AddTaskForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();


  const{tasks,setTasks}=useTasks()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const values = {
      ...data,
      id: generateRandomId(),
    };
    if(tasks){
      if(getTaskByTitle(tasks,data.title)!=undefined){
        alert("عنوان تکراری است")
        return
      }
    }
   if(tasks){
    const tasksAfterAdd=addTask(tasks,values);
   
    if(tasksAfterAdd){
      setTasks(tasksAfterAdd)
    }
   }
  
    
     
    reset();
   
    alert("کار با موفقیت اضافه شد. فرم برای افزودن کار جدید خالی میشود");
  };

  return (
    <FormBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <div className="title">افزودن کار</div>
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
          <FormButton type="submit">افزودن</FormButton>
        </div>
      </form>
    </FormBox>
  );
};

export default AddTaskForm;
