import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { useTasks } from "@/contexts/tasksContext";
import { TaskType } from "@/types";
import { TaskStatus } from "@/types";
import { deleteTask, standardUrl } from "@/functions";
import DeleteModal from "./deleteModal";
const Table = styled.table`
  background-color: #f5f5f5;
  color: #000000;
  width: 100%;
  display: table;
  white-space: nowrap;
  table-layout: fixed;
  min-width: 1000px;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 0.375rem;

  th {
    padding: 0.75rem 1.25rem;
    font-weight: 500;
    white-space: nowrap;
  }

  tr:nth-child(odd) {
    background-color: #f5f5f5;
  }

  tr:nth-child(even) {
    background-color: #e0e0e0;
  }

  td:first-child {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
  }

  td:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
  }

  tr:first-child th:first-child {
    border-top-right-radius: 0.375rem;
  }

  tr:first-child th:last-child {
    border-top-left-radius: 0.375rem;
  }

  tr:last-child td:first-child {
    border-bottom-right-radius: 0.375rem;
  }

  tr:last-child td:last-child {
    border-bottom-left-radius: 0.375rem;
  }

  td,
  th {
    padding: 0.75rem 1.25rem;
    text-align: center;
    white-space: nowrap;
  }

  td:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .status-td.doing {
    color: #003366;
  }
  .status.done {
    color: #006600;
  }
  thead tr {
    background-color: #cccccc !important;
  }
  .trash-can-container {
    color: #d32929;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 5px;
`;

const CustomTable = () => {
  //connect to context api
  const { tasks, setTasks } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  //selected task is to know which task should be deleted
  const [selectedTask, setSelectedTask] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const openModal = (id: number, title: string) => {
    setSelectedTask({ id, title });
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedTask(null);
    }, 300);
  };
  const handleDelete = (id: number) => {
    if (tasks != null) {
      const tasksAfterDelete = deleteTask(tasks, id);
      if(tasksAfterDelete!=undefined){
        setTasks(tasksAfterDelete);
      }
    
      if (typeof window != "undefined") {
        localStorage.setItem("tasks", JSON.stringify(tasksAfterDelete));
      }
    }
  };
  return (
    <div className="flex items-center h-full justify-center">
   
      <TableContainer>
      {tasks != null && tasks.length > 0 &&  (
        <Table>
        <thead>
          <tr>
            <th>عنوان</th>
            <th colSpan={3}>توضیحات</th>
            <th>وضعیت</th>
            <th colSpan={2}>عملیات</th>
          </tr>
        </thead>
        <tbody>
          
            {tasks.map((el: TaskType) => {
              return (
                <>
                  <tr key={el.id}>
                    <td>{el.title}</td>
                    <td colSpan={3}>{el.description}</td>
                    <td
                      className={`status-td ${
                        el.status == TaskStatus.Doing ? "doing" : " "
                      } 
            ${el.status == TaskStatus.Done ? "done" : " "}
            `}
                    >
                      {el.status} {el.status == TaskStatus.Doing && <>...</>}
                    </td>
                    <td colSpan={2}>
                      <div className="flex justify-center items-center gap-3">
                        <Link href={`/task-details/${standardUrl(el.title)}`}>
                          {" "}
                          <button className="flex gap-1 items-center">
                            <img src="/imgs/checked.svg" alt="edit" />
                            جزییات
                          </button>
                        </Link>
                        <button
                          onClick={() => openModal(el.id, el.title)}
                          className="flex trash-can-container"
                        >
                          <img src="/imgs/trashCan.svg" alt="trash" />
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
         
        </tbody>
      </Table>
      )}
      {(tasks!=null && tasks.length==0) && <>
      در حال حاضر کاری برای انجام وجود ندارد
      </>}
      </TableContainer>
      {selectedTask && (
        <DeleteModal
          handleDelete={handleDelete}
          id={selectedTask.id}
          title={selectedTask.title}
          isVisible={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default CustomTable;
