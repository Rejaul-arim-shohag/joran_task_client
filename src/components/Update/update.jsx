import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ErrorToast, IsEmpty } from '../../Helper/FormHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { productFindById, updateProduct } from '../../ApiRequest/APIRequest';
import { useEffect } from 'react';
import { useState } from 'react';

function Update() {
    const {product_id}=useParams()
   
    const [product, setProduct] = useState({})
    let nameRef, priceRef,  categoryRef, imgUrlRef = useRef();
    let navigate = useNavigate()
    const handleUpdateProduct = () => {
        const productName = nameRef.value;
        const price = priceRef.value;
        const category = categoryRef.value;
        const imageUrl = imgUrlRef.value;
        if (IsEmpty(productName)) {
            ErrorToast("Product Name is required")
        } else {
            updateProduct(product_id, productName, price, category, imageUrl)
                .then((res) => {
                    if (res === true) {
                        navigate("/All")
                    }
                })
        }
    }
    useEffect(() => {
            productFindById(product_id)
                .then(data => setProduct(data.data))
    }, [product_id])
    console.log('product',product)
    return (
        <Container fluid={true} className="content-body">
            <Row className="d-flex justify-content-center">
                <div className="col-12 col-lg-8  col-sm-12 col-md-8  p-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 >Create New</h4>
                            <br />
                            <input ref={(input) => nameRef = input} defaultValue={product?.product_name} placeholder="Product Name" className="form-control animated fadeInUp" type="text" />
                            <br />
                            <input ref={(input) => priceRef = input} defaultValue={product?.price} placeholder="Price" className="form-control animated fadeInUp" type="text" />
                           
                            <br />
                            <input ref={(input) => categoryRef = input} defaultValue={product?.category_name} placeholder="Category Name" className="form-control animated fadeInUp" type="text" />
                            <br />
                            <input ref={(input) => imgUrlRef = input} defaultValue={product?.image} placeholder="Image Url" className="form-control animated fadeInUp" type="text" />
                            <br />

                            <button onClick={handleUpdateProduct} className="btn float-end btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
}
export default Update;