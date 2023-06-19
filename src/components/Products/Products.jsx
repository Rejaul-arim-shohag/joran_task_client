import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { ProductDelete } from '../../ApiRequest/APIRequest';
const Products = () => {
    const [checkedIDs, setCheckedIDs] = useState([]);
    let ALLProduct = useSelector((state) => (state.product.ALLProduct));
    const handleChangeIDs=(e)=>{
        const checkedID = e.target.value;
        setCheckedIDs((prevCheckedIDs) => {
            if (prevCheckedIDs.includes(checkedID)) {
              return prevCheckedIDs.filter((id) => id !== checkedID);
            }
            return [...prevCheckedIDs, checkedID];
          });
    }
    const handleClickDelete=()=>{
        ProductDelete(checkedIDs)
    }


    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    {/* <div className="row">
                                        <div className="col-6">
                                            <h5>My Product List</h5>
                                        </div>
                                        <div className="col-2">
                                            <select className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="5">5 Per Page</option>
                                                <option value="10">10 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                <button className="btn  btn-outline-primary btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive data-table">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                        <tr>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{checkedIDs.length>0?<Button variant="danger" size="sm" onClick={handleClickDelete}>Delete</Button>:"Action"}</th>

                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Price</th>
                                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Product Id</th>
                                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            ALLProduct.map((item, i) =>
                                                                <tr index={i}>
                                                                    <td>
                                                                        <input type="checkbox" onChange={handleChangeIDs} id="vehicle1" name="vehicle1" value={item._id} />
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex px-2 py-1">
                                                                            <div>
                                                                                <img src={item.image} alt="ProductImage" className="avatar me-3" />
                                                                            </div>
                                                                            <div className="d-flex flex-column justify-content-center">
                                                                                <h6 className="mb-0  text-xs">{item.product_name}</h6>
                                                                                <p className="text-xs  text-secondary mb-0">{item.category_name}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs  text-secondary mb-0">{item.price} Taka </p>
                                                                    </td >

                                                                    <td>
                                                                        <span className="text-secondary text-xs font-weight-bold">{item.product_id}</span>
                                                                    </td>
                                                                    <td>
                                                                        <Button>Delete</Button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;