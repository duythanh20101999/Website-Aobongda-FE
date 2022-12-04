import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_BASE_URL, numberFormat } from '../../../configs/constants';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Products";

        axios.get(`/api/products`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setProduct(res.data.datas);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

    var display_Productdata = "";
    if (loading) {
        return <h4>View Products Loading...</h4>
    }
    else {
        display_Productdata = viewProduct.map((item) => {

            return (
                <tr key={item.id}>
                    <td className='center-format'>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">{item.id}</Link>
                    </td>
                    <td className='text-format'>{item.club.name}</td>
                    <td className='text-format'>{item.name}</td>
                    <td className='text-format'>{item.status === 1 ? 'Stocking' : 'Out sold'}</td>
                    <td className='center-format'><img src={`${APP_BASE_URL}/images/${item.image}`} width="50px" alt={item.name} /></td>
                    <td className='center-format'>{numberFormat(item.price)}</td>
                    <td className='text-format'>{item.description}</td>

                </tr>

            )
        });
    }

    return (
        <div className="container px-4 mt-3">
            <div className="card">
                <div className="card-header">
                    <h4>View Product
                        <Link to="/admin/add-product" className="btn btn-primary btn-sm float-end">Add Product</Link>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th className='center-format' style={{ width: "5%" }}>ID</th>
                                    <th style={{ width: "14%" }}>Club</th>
                                    <th style={{ width: "20%" }}>Product name</th>
                                    <th style={{ width: "8%" }}>Status</th>
                                    <th className='center-format' style={{ width: "7%" }}>Image</th>
                                    <th className='center-format' style={{ width: "8%" }}>Price</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {display_Productdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProduct;
