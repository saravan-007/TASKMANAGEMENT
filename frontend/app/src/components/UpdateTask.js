import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {  updateTaskInServer } from '../slices/tasksSlice';
import { useDispatch } from 'react-redux';
const MyVerticallyCenteredModal = (props) => {
    const {selectedTask} = useSelector((state) => state.tasks);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [id,setId]= useState(0);
    const dispatch = useDispatch();

    const updateTask = ()=>{
        props.onHide();
        dispatch(updateTaskInServer({_id:id,title,description}))
        
    };
    useEffect(()=>{
      if(Object.keys(selectedTask).length !==0){
        setTitle(selectedTask.title)
        setDescription(selectedTask.description)
        setId(selectedTask._id)

    }
  },[selectedTask])
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task title</Form.Label>
            <Form.Control type="text" placeholder="Enter the Task" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Task Description</Form.Label>
            <Form.Control type="text" placeholder="Enter the Task Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className='text-end'>
            <Button variant="primary" type="submit" onClick= {(e)=> updateTask(e)}>
                Update Task
            </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;