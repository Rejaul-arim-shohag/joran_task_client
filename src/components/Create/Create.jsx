import React from 'react';
import { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createNewTask } from '../../ApiRequest/APIRequest';
import { ErrorToast, IsEmpty } from '../../Helper/FormHelper';

const Create = () => {
    let titleRef, descriptionRef=useRef();
    let navigate=useNavigate()
    const createNew =()=>{
        const title = titleRef.value;
        const deccription = descriptionRef.value;
        if(IsEmpty(title)){
            ErrorToast("Title is required")
        } else if(IsEmpty(deccription)){
            ErrorToast("deccription is required")
        } else{
            createNewTask(title,deccription)
            .then((res)=>{
                if(res===true){
                    navigate("/All")
                }
            })
        }
    }
    return (
        <Container fluid={true} className="content-body">
        <Row className="d-flex justify-content-center">
            <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                <div className="card">
                    <div className="card-body">
                        <h4 >Create New</h4>
                        <br/>
                        <input ref={(input)=>titleRef=input}  placeholder="Task Name" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <textarea ref={(input)=>descriptionRef=input} rows={5} placeholder="Task Description" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <button onClick={createNew} className="btn float-end btn-primary">Create</button>
                    </div>
                </div>
            </div>
        </Row>
    </Container>
    );
};

export default Create;