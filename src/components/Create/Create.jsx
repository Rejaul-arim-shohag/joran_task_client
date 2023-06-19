import React from 'react';
import { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createNewProduct } from '../../ApiRequest/APIRequest';
import { ErrorToast, IsEmpty } from '../../Helper/FormHelper';

const Create = () => {
    let nameRef, priceRef, codeRef, categoryRef, imgUrlRef=useRef();
    let navigate=useNavigate()
    const createNew =()=>{
        const productName = nameRef.value;
        const price = priceRef.value;
        const productCode = codeRef.value;
        const category = categoryRef.value;
        const imageUrl = imgUrlRef.value;
        if(IsEmpty(productName)){
            ErrorToast("Product Name is required")
        } else{
            createNewProduct(productName,price, productCode, category, imageUrl)
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
                        <input ref={(input)=>nameRef=input}  placeholder="Product Name" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <input ref={(input)=>priceRef=input}  placeholder="Price" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <input ref={(input)=>codeRef=input}  placeholder="code" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <input ref={(input)=>categoryRef=input}  placeholder="Category Name" className="form-control animated fadeInUp" type="text"/>
                        <br/>
                        <input ref={(input)=>imgUrlRef=input}  placeholder="Image Url" className="form-control animated fadeInUp" type="text"/>
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