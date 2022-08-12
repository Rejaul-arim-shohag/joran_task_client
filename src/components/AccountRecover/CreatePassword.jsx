import React, {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import { RecoverRestePassRequest } from '../../ApiRequest/APIRequest';
import { ErrorToast, IsEmpty } from '../../Helper/FormHelper';
const CreatePassword = () => {
    let PasswordRef,ConfirmPasswordRef=useRef();
    let navigate=useNavigate();
    const Password = PasswordRef.value;
    const ConfirmPassword = ConfirmPasswordRef.value;
    
    const resetPassword=()=>{
        if(IsEmpty(Password)){
            ErrorToast("Password Required")
        } else if(IsEmpty(ConfirmPassword)){
            ErrorToast("Confirm Password Required")
        } else if(Password!==ConfirmPassword){
            ErrorToast("Password & Confirm Password should be same")
        } else{
            RecoverRestePassRequest().then((result)=>{
                
            })
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 ">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                {/* value={getEmail()} */}
                                <input readOnly={true}  placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input  ref={(input)=>PasswordRef=input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input  ref={(input)=>ConfirmPasswordRef=input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={resetPassword} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;