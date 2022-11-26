import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function EditProduct(props) {
    const history = useHistory();

    const [clubList, setClublist] = useState([]);
    const [productInput, setProduct] = useState({
        // name: '',
        // status: '',
        // description: '',
        // price: '',
        // id_club: '',
    });
    const [pricture, setPicture] = useState({
        img: null,
    });
    const [errorlist, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    // const [allcheckbox, setCheckboxes] = useState([]);
    // const handleCheckbox = (e) => {
    //     e.persist();
    //     setCheckboxes({...allcheckbox, [e.target.name]:e.target.checked });
    // }

    useEffect(() => {

        axios.get(`/api/clubs`).then(res => {
            if (res.data.success === true)
                    setClublist(res.data.datas);
        });

        const product_id = props.match.params.id
        axios.get(`/api/product/${product_id}`).then(res => {
            if (res.data.success === true) {
                setProduct({
                    id_club: res.data.data.club.id,
                    name: res.data.data.name,
                    description: res.data.data.description,
                    price: res.data.data.price,
                    status: res.data.data.status,
                });
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                history.push('/admin/view-product');
            }
            setLoading(false);
        });

    }, [props.match.params.id, history]);

    const updateProduct = (e) => {
        e.preventDefault();

        const product_id = props.match.params.id
        const formData = new FormData();
        formData.append('img', pricture.img);
        formData.append('id_club', productInput.id_club);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);
        formData.append('price', productInput.price);
        formData.append('status', productInput.status);

        console.log(pricture.img)
        console.log(Object.fromEntries(formData))

        axios.put(`/api/admin/update_product/${product_id}`, formData).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                // console.log(allcheckbox);
                setError([]);  
                history.push('/admin/view-product');
            }
            // else if (res.data.status === 422) {
            //     swal("All Fields are mandetory", "", "error");
            //     setError(res.data.errors);
            // }
            // else if (res.data.status === 404) {
            //     swal("Error", res.data.message, "error");
            //     history.push('/admin/view-product');
            // }
        }).catch(err=>{
            console.log(err)
        });

    }

    if (loading) {
        return <h4>Edit Product Data Loading...</h4>
    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Edit Product
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={updateProduct} encType="multipart/form-data">

                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                            </li>
                        </ul> */}
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Select Club</label>
                                    <select name="id_club" onChange={handleInput} value={productInput.id_club} className="form-control">
                                        {/* <option>Select Club</option> */}
                                        {
                                            clubList.map((item) => {
                                                return (
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <small className="text-danger">{errorlist.id_club}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tên sản phẩm</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                    <small className="text-danger">{errorlist.name}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Mô tả</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Trạng thái</label>
                                    <input name="status" type="number" onChange={handleInput} value={productInput.status} className="form-control"></input>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Giá</label>
                                    <input name="price" type="number" onChange={handleInput} value={productInput.price} className="form-control"></input>
                                </div>
                                <div className="col-md-8 form-group mb-3">
                                    <label>Image</label>
                                    <input type="file" name="img" onChange={handleImage} className="form-control" />
                                    <small className="text-danger">{errorlist.image}</small>
                                </div>

                            </div>
                            {/* <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                            
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className="form-control" />
                                    <small className="text-danger">{errorlist.meta_title}</small>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword}  className="form-control"></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip}  className="form-control"></textarea>
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                
                                <div className="row">

                                    <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className="form-control" />
                                        <small className="text-danger">{errorlist.selling_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price}  className="form-control" />
                                        <small className="text-danger">{errorlist.original_price}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty}  className="form-control" />
                                        <small className="text-danger">{errorlist.qty}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand}  className="form-control" />
                                        <small className="text-danger">{errorlist.brand}</small>
                                    </div>
                                    <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage}  className="form-control" />
                                        <img src={`http://localhost:8000/${productInput.image}`} width="50px" alt={productInput.name} />
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleCheckbox} defaultChecked={allcheckbox.featured === 1 ? true:false}  className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allcheckbox.popular === 1 ? true:false}  className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked=Hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleCheckbox} defaultChecked={allcheckbox.status === 1 ? true:false}  className="w-50 h-50" />
                                    </div>

                                </div>

                            </div> */}
                        </div>
                        <button type="submit" className="btn btn-primary px-4 mt-2">Submit</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;
