import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from './UpdateTask';
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedTask,removeFromList, getTasksFromServer, deleteTaskFromServer} from '../slices/tasksSlice';

const TaskList = () => {
    const {tasksList} = useSelector((state)=>state.tasks)
    const dispatch  = useDispatch()

    const updateTask = (task)=>{
        console.log('task updated');
        setModalShow(true);
        dispatch(setSelectedTask(task))
    };
    useEffect(()=>{
        dispatch(getTasksFromServer())

    },[dispatch])

    const deleteTask = (task)=>{
        console.log('task deleted');
        dispatch(deleteTaskFromServer(task))
        .unwrap()
        .then(()=>{
            dispatch(removeFromList(task))
        })
        

    };
    const [modalShow,setModalShow] = useState(false)
  return (
    <>
        <Table striped bordered hover>
        <thead>
        <tr className='text-center'>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {
                tasksList && tasksList.map((task,index)=>{
                    return(
                    <tr className='text-center' key={task._id}>
                        <td>{index+1}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td><Button variant="primary" className='mx-3' onClick={()=>updateTask(task)}><i className="bi bi-pencil-square"></i></Button>
                        <Button variant="primary" onClick={()=>deleteTask(task)}><i className="bi bi-trash"></i></Button>
                        </td>
                    </tr>

                    )
                })
            }
       
        
        </tbody>
    </Table>
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> 
  </>

  );
};

export default TaskList