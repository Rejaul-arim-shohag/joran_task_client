import axios from "axios";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper";
import { getToken, setToken, setUserDetails } from "../Helper/SessionHelper";
import store from "../redux/store/store";
import { HideLoader, ShowLoader } from "../redux/stateSlice/settingSlice";

//business table product slice
import { SetALLProduct } from "../redux/stateSlice/productSlice";

const baseUrl = "https://joran-backend.onrender.com/api/v1"; 

const AxiosHeader = { headers: { "token": getToken() } }
export function registrationRequest(email, firstName, lastName, userName, password) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/user_signup";
    const postBody = {
        email: email,
        first_name: firstName,
        last_name: lastName,
        user_name: userName,
        password: password,
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
                        ErrorToast("Something Went Wrong1")
                        return false;
                    }
                }
                else {
                    SuccessToast("Registration Success")
                    return true;
                }
            }
            else {

                ErrorToast("Something Went Wrong2")
                return false;
            }
        }).catch((err) => {
            console.log("err", err)
            store.dispatch(HideLoader())
            ErrorToast("Something Went Wrong3")
            return false;
        })
}
export function LoginRequest(email, password) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/user_login";

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

export async function GetProductList() {
    store.dispatch(ShowLoader())
    let URL = baseUrl + "/allProducts" ;
    try {
        const result = await axios.get(URL, AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            store.dispatch(SetALLProduct(result.data.data))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }

    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export function ProductDelete(productIds) {
    store.dispatch(ShowLoader())
    let url = baseUrl + "/deleteProduct";
    return axios.post(url,productIds, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                SuccessToast("Delete Successful")
                return true;
            }
            else {
                ErrorToast("Something Went Wrong")
                return false;
            }
        })
        .catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })
}

export function productFindById(id) {
    const postBody = {
        product_id: id,
    }
    store.dispatch(ShowLoader())
    let url = baseUrl + `/findProductById/`;
    return axios.post(url,postBody, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                return res.data;
            }
            else {
                ErrorToast("Something Went Wrong")
                return false;
            }
        })
        .catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })
}


export function createNewProduct(productName,price, productCode, category, imageUrl) {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/productCreate";
    const postBody = {
        product_name: productName,
        product_id: productCode,
        price: price,
        category_name:category,
        image:imageUrl
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

export function updateProduct(_id,productName,price, category, imageUrl) {
    debugger
    store.dispatch(ShowLoader())
    const url = baseUrl + "/updateProduct";
    const postBody = {
        product_id:_id,
        product_name: productName,
        price: price,
        category_name:category,
        image:imageUrl
    }
    return axios.post(url, postBody, AxiosHeader)
        .then((result) => {
            store.dispatch(HideLoader())
            if (result.status === 200) {
                SuccessToast("Update Sucecss")
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


export function profileUpdateRequest(email, firstName, lastName, mobile, password, photo) {
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
    let UserDetails = { email: email, firstName: firstName, lastName: lastName, mobile: mobile, photo: photo }
    return axios.post(url, postBody, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                SuccessToast("Profile Update Success")
                setUserDetails(UserDetails)
                return true;
            }
            else {
                ErrorToast("Something Went Wrong")
                return false;
            }
        })
        .catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })

}

export function LogoutRequest() {
    store.dispatch(ShowLoader())
    const url = baseUrl + "/user_logout";
    return axios.post(url, AxiosHeader)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                return true;
            }
            else {
                return false;
            }
        })
        .catch((err) => {
            ErrorToast("Something Went Wrong")
            store.dispatch(HideLoader())
            return false;
        })

}






