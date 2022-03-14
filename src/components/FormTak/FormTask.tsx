import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ITask } from '../../interfaces/ITask';
import styles from './formTask.module.css';

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title:string, difficulty: number): void;
}

function FormTask({btnText, taskList, setTaskList, task, handleUpdate}: Props) {

  const [ id, setId ] = useState<number>(0);
  const [ title, setTitle ] = useState<string>("");
  const [ difficulty, setDifficulty ] = useState<number>(0);

  useEffect(() => {
    if(task){
      setId(task.id)
      setTitle(task.title)
      setDifficulty(task.difficulty)
    }
  }, [task])

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(handleUpdate){
      handleUpdate(id, title, difficulty)
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = { id, title, difficulty };
  
      setTaskList!([...taskList, newTask]);
  
      setTitle("");
      setDifficulty(0)
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === "title"){
      setTitle(e.target.value)
    } else {
      setDifficulty(parseInt(e.target.value))
    }
  };

  return (
    <form className={styles.form} onSubmit={addTaskHandler}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="difficulty">Dificuldade:</label>
        <input           
          type="number"
          name="difficulty"
          placeholder="Dificuldade da tarefa (1 a 5)"
          value={difficulty}
          onChange={handleChange}
          />
      </div>
      <input type="submit" value={btnText} />
    </form>
  )
}

export default FormTask