import axios from "axios";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper";
import { getToken, setToken, setUserDetails } from "../Helper/SessionHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/stateSlice/settingSlice";
import { SetCanceledTask, setCompletedTask, setNewTask, SetProgressTask } from "../redux/stateSlice/taskSlice";
import {SetSummary} from "../redux/stateSlice/summarySlice";
import { SetProfile } from "../redux/stateSlice/profileSlice";

const baseUrl = "http://localhost:5000/api/v1";

const AxiosHeader = { headers: { "token": getToken() } }

export function registrationRequest(email, firstName, lastName, mobile, password, photo) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/registration";
    const postBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        password: password,
        photo: photo
    }
    return axios.post(url, postBody)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                if (res.data['status'] === "fail") {
                    if (res.data['data']['keyPattern']['email'] === 1) {
                        ErrorToast("Email Already Exist")
                        return false;
                    }
                    else {
                        ErrorToast("Something Went Wrong")
                        return false;
                    }
                }
                else {
                    SuccessToast("Registration Success")
                    return true;
                }
            }
            else {
                ErrorToast("Something Went Wrong")
                return false;
            }
        }).catch((err) => {
            store.dispatch(HideLoader())
            ErrorToast("Something Went Wrong")
            return false;
        })
}


export function profileUpdateRequest(email, firstName, lastName, mobile, password, photo){
    store.dispatch(ShowLoader())
    const url = baseUrl + "/profileUpdate";
    const postBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        password: password,
        photo: photo
    }
    let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}
    return axios.post(url, postBody, AxiosHeader)
    .then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Profile Update Success")
            setUserDetails(UserDetails)
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return  false;
        }
    })
    .catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })

}


export function LoginRequest(email, password) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/login";

    const postBody = {
        email: email,
        password: password
    }
    return axios.post(url, postBody)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                setToken(res.data["token"])
                setUserDetails(res.data["data"])
                SuccessToast("Login Success")
                return true;
            }
            else {
                ErrorToast("Invalid email or password")
                return false;
            }
        }).catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
        })

}

export function createNewTask(title, description) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/createTask";
    const postBody = {
        title: title,
        description: description,
        status: "New"
    }
    return axios.post(url, postBody, AxiosHeader)
        .then((result) => {
            store.dispatch(HideLoader())
            if (result.status === 200) {
                SuccessToast("New Task created")
                return true;
            } else {
                ErrorToast("Something Went Wrong")
                return false;
            }
        })
        .catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false
        })
}

export function ListTaskByStatus(Status) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/listsTaskByStatus/" + Status;
    return axios.get(url, AxiosHeader)
        .then((result) => {
            store.dispatch(HideLoader());
            if (result.status === 200) {
                if (Status === "New") {
                    store.dispatch(setNewTask(result.data["data"]))
                }
                else if (Status === "Completed") {
                    store.dispatch(setCompletedTask(result.data["data"]))
                }
                else if(Status === "Canceled"){
                    store.dispatch(SetCanceledTask(result.data["data"]))
                }
                else if(Status === "Progress"){
                    store.dispatch(SetProgressTask(result.data["data"]))
                }
            } else {
                ErrorToast("Something Went Wrong")
                return false
            }
        })
        .catch((err) => {
            store.dispatch(HideLoader())
            ErrorToast("Something Went Wrong")
            return false
        })
}

export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let url=baseUrl+"/taskStatusCount";
    axios.get( url,AxiosHeader)
    .then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let url=baseUrl+"/deleteTask/"+id;
    return axios.get(url,AxiosHeader)
    .then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Delete Successful")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    })
    .catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}

export function UpdateStatusRequest(id,status){
    store.dispatch(ShowLoader())
    let url=baseUrl+"/updateTaskStatus/"+id+"/"+status;
    return axios.get(url,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let url=baseUrl+"/profileDetails";
     axios.get(url,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}


//recover passworad steap 1
export function RecoverVerifyEmailRequest(email){
    debugger;
    store.dispatch(ShowLoader())
    let url=baseUrl+"/RecoverVerifyEmail/"+email;
    return axios.get(url).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
          return true;
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        debugger;
        store.dispatch(HideLoader())
    });
}

//recover verify OTP 2
export function RecoverVerifyOTPRequest(email, OTP){
    store.dispatch(ShowLoader())
    let url=baseUrl+"/RecoverVerifyEmail/"+email+"/"+OTP;
    return axios.get(url).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
          return true;
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}

//recover password steap 3, reset password
export function RecoverRestePassRequest(email,OTP, password){
    store.dispatch(ShowLoader());
    let url=baseUrl+"/RecoverRestePass/"+email+"/"+OTP;
    const postBody={
        email:email,
        OTP:OTP,
        password:password
    }
    return axios.post(url, postBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            return true;
        } else{
            return false;
        }
    })
    .catch((err)=>{
        store.dispatch(HideLoader())
        return false;
    })
}