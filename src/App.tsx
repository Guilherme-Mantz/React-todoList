import { useState } from "react";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FormTask from "./components/FormTak/FormTask";
import TaskList from "./components/TaskList/TaskList";
import Modal from "./components/Modal/Modal";

import styles from './app.module.css';

import { ITask } from './interfaces/ITask';

function App() {

  const [ taskList, setTaskList ] = useState<ITask[]>([]);
  const [ taskToUpdate, setTaskToUpdate ] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => {
      return task.id !== id;
    }));
  };

  const hideOrShowModal = (display: boolean) => {
    const modal = document.getElementById('modal');

    if(display){
      modal!.classList.remove('hide')
    } else {
      modal!.classList.add('hide')
    }
  };

  const editTask = (task: ITask):void => {
    hideOrShowModal(true);
    setTaskToUpdate(task)
  };

  const updateTask = (id: number, title:string, difficulty: number) => {

    const updated: ITask = { id, title, difficulty };

    const updatedItens = taskList.map((task) => {
      return task.id === updated.id ? updated : task;
    })

    setTaskList(updatedItens);

    hideOrShowModal(false);
  };

  return (
    <div>
      <Modal         
        title="Editar tarefa"
        children={
          <FormTask
            btnText="Editar"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }/>
      <Header />
        <main className={styles.main}>
          <div>
            <h2>O que você vai fazer?</h2>
            <FormTask btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList}/>
          </div>
          <div>
            <h2>Suas tarefas:</h2>
            <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
          </div>
        </main>
      <Footer />
    </div>
  );
}

export default App;
