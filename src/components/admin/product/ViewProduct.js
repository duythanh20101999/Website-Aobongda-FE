import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { APP_BASE_URL } from '../../../configs/constants';

function ViewProduct()
{

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Products";

        axios.get(`/api/products`).then(res=>{
            if(isMounted)
            {
                if(res.data.success === true)
                {
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
    if(loading)
    {
        return <h4>View Products Loading...</h4>
    }
    else
    {
        display_Productdata = viewProduct.map( (item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.club.name}</td>
                    <td>{item.name}</td>
                    <td>
                        {item.status === 1 ? 'Stocking' : 'Out of stock'}
                    </td>
                    <td><img src={`${APP_BASE_URL}/${item.image}`} width="50px"/></td>
                    {/* <td>
                        <Link to={`edit-product/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td> */}
                    {/* <td>{item.status === 0 ? 'Visible':'Hidden'}</td> */}
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    
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
                                <th>ID</th>
                                <th>Club</th>
                                <th>Product name</th>
                                <th>Status</th>
                                <th>Image</th>
                                {/* <th>Edit</th> */}
                                <th>Price</th>
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
