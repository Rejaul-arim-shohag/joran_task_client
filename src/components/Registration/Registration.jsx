import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrationRequest } from '../../ApiRequest/APIRequest';
import { ErrorToast, IsEmail, IsEmpty } from '../../Helper/FormHelper';

const Registration = () => {
    let navigate = useNavigate();
    let emailRef,firstNameRef,lastNameRef,userNameRef,passwordRef=useRef();
    const onRegistration=()=>{
        let email= emailRef.value;
        let firstName= firstNameRef.value;
        let lastName= lastNameRef.value;
        let userName= userNameRef.value;
        let password= passwordRef.value;
        if(IsEmail(email)){
            ErrorToast("valid email address required")
        }
        else if(IsEmpty(firstName)){
            ErrorToast("FirstName is required")
        }
        else if(IsEmpty(lastName)){
            ErrorToast("LastName is required")
        }
        
        else if(IsEmpty(password)){
            ErrorToast("password required")
        }
        else{
            registrationRequest(email,firstName,lastName,userName,password,).then((result)=>{
                if(result===true){
                    navigate("/login")
                }
            })
        }
    }
    return (
        <div className="container">
            <div className="row  justify-content-center">
                <div className="col-md-7 col-lg-6">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4 className="text-center">Sign Up</h4>
                            <hr />
                            <div className="container-fluid m-0 p-0">
                                <div className="m-0 p-0">
                                <div className="p-2">
                                        <label>User Name</label>
                                        <input ref={(input)=>userNameRef=input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                                    </div>
                                    <div className="p-2">
                                        <label>Email Address</label>
                                        <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                    </div>
                                    <div className=" p-2">
                                        <label>First Name</label>
                                        <input ref={(input)=>firstNameRef=input} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="p-2">
                                        <label>Last Name</label>
                                        <input ref={(input)=>lastNameRef=input} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                   
                                    <div className="p-2">
                                        <label>Password</label>
                                        <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    </div>
                                </div>
                                <div className="row mt-2 p-0">
                                    <div className="p-2">
                                        <button onClick={onRegistration} className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Next</button>
                                    </div>
                                </div>
                                <div className="row mt-2 p-0">
                                    <p className="text-center">Already have an account? <Link to="/login">Signin</Link></p>
                                </div>              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;