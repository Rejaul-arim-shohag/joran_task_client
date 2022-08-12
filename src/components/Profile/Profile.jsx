import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GetProfileDetails, profileUpdateRequest } from '../../ApiRequest/APIRequest';
import { ErrorToast, getBase64, IsEmail, IsEmpty, IsMobile } from '../../Helper/FormHelper';

const Profile = () => {
    let navigate = useNavigate()
    let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgRef, userImgView = useRef();
    useEffect(() => {
        GetProfileDetails()
    }, [])

    const profileData = useSelector((state) => state.profile.value)


    const previewImage = () => {
        let imageFile = userImgRef.files[0]
        getBase64(imageFile).then((base64Image) => {
            userImgView.src = base64Image
        })
    }

    const handleUpdateProfile = () => {
        let email = emailRef.value;
        let fastName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src;
        if (IsEmail(email)) {
            ErrorToast("Valid Email Address Required !")
        }
        else if (IsEmpty(fastName)) {
            ErrorToast("First Name Required !")
        }
        else if (IsEmpty(lastName)) {
            ErrorToast("Last Name Required !")
        }
        else if (IsMobile(mobile)) {
            ErrorToast("Valid Mobile  Required !")
        }
        else if (IsEmpty(password)) {
            ErrorToast("Password Required !")
        }
        else {
            profileUpdateRequest(email, fastName, lastName, mobile, password, photo).then((result) => {
                if (result === true) {
                    navigate("/")
                }
            })
        }
    }
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <img ref={(input) => userImgView = input} src={profileData["photo"]} className="user-profile-img" alt="" />
                                <hr />
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <label>Profile Picture</label>
                                        <input onChange={previewImage} ref={(input) => userImgRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="file" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Email Address</label>
                                        <input key={Date.now()} defaultValue={profileData['email']} readOnly={true} ref={(input) => emailRef = input} placeholder="User Email" className="form-control animated fadeInUp" type="email" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>First Name</label>
                                        <input defaultValue={profileData['firstName']} ref={(input) => firstNameRef = input} placeholder="First Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Last Name</label>
                                        <input defaultValue={profileData['lastName']} ref={(input) => lastNameRef = input} placeholder="Last Name" className="form-control animated fadeInUp" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Mobile</label>
                                        <input defaultValue={profileData['mobile']} ref={(input) => mobileRef = input} placeholder="Mobile" className="form-control animated fadeInUp" type="mobile" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label>Password</label>
                                        <input defaultValue={profileData['password']} ref={(input) => passwordRef = input} placeholder="User Password" className="form-control animated fadeInUp" type="password" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <button onClick={handleUpdateProfile} className="btn w-100 float-end btn-primary animated fadeInUp">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;