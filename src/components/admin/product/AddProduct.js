import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function AddProduct() {
    const [categorylist, setCategorylist] = useState([]);
    const [productInput, setProduct] = useState({
        id_club: '',
        name: '',
        status: '',
        description: '',
        price: '',
    });
    const [picture, setPicture] = useState([]);
    const [errorlist, setError] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({ ...productInput, [e.target.name]: e.target.value });
    }

    const handleImage = (e) => {
        setPicture({ img: e.target.files[0] });
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/clubs`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setCategorylist(res.data.datas);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('img', picture.img);
        formData.append('id_club', productInput.id_club);
        formData.append('name', productInput.name);
        formData.append('status', productInput.status);
        formData.append('price', productInput.price);
        formData.append('description', productInput.description);
        // formData.append('image', productInput.image);

        axios.post(`/api/admin/create_product`, formData).then(res => {
            if (res.data.success === true) {
                swal("Success", res.data.message, "success");
                setProduct({
                    ...productInput,
                    id_club: '',
                    name: '',
                    status: '',
                    description: '',
                    price: '',
                });
                setPicture({img: ''});
                setError([]);
            }
            // else if(res.data.status === 422)
            // {
            //     swal("All Fields are mandetory","","error");
            //     setError(res.data.errors);
            // }
        }).catch((err) => console.log(err));

    }

    return (
        <div className="container-fluid px-4">
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Thêm sách
                        <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">Xem sản phẩm</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <form onSubmit={submitProduct} encType="multipart/form-data">

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
                            <div className="form-group mb-3">
                                <label>Chọn Câu lạc bộ</label>
                                <select name="id_club" onChange={handleInput} value={productInput.id_club} className="form-control">
                                    <option>Câu lạc bộ</option>
                                    {
                                        categorylist.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <small className="text-danger">{errorlist.id_category}</small>
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
                            {/* <div className="form-group mb-3">
                                <label>Hình ảnh</label>
                                <input name="image" onChange={handleInput} value={productInput.image} className="form-control"></input>
                            </div> */}
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

                            </div> */}
                            {/* <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                
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
                                        <small className="text-danger">{errorlist.image}</small>
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured}  className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular}  className="w-50 h-50" />
                                    </div>
                                    <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked=Hidden)</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status}  className="w-50 h-50" />
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

export default AddProduct;
