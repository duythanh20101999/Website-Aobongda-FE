import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Club() {

    const [brand, setBrand] = useState([]);
    const [league, setLeague] = useState([]);
    const [clubInput, setClub] = useState({
        name: '',
        brandId: '',
        leagueId: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setClub({ ...clubInput, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/brands`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setBrand(res.data.datas);
                }
            }
        });

        axios.get(`/api/leagues`).then(res => {
            if (isMounted) {
                if (res.data.success === true) {
                    setLeague(res.data.datas);
                }
            }
        });

        return () => {
            isMounted = false
        };

    }, []);

    const submitClub = (e) => {
        e.preventDefault();

        const data = clubInput;

        axios.post(`/api/admin/create_club`, data).then(res => {
            if (res.data.success === true) {
                e.target.reset();
                swal("Success", res.data.message, "success");
            }
            else {
                swal("Warning", res.data.message, "warning");
            }
        })
            .catch(err => {
                swal("Warning", err.message, "warning");
            });

    }

    // var display_errors = [];
    // if (categoryInput.error_list) {
    //     display_errors = [
    //         categoryInput.error_list.name,
    //     ]
    // }

    return (
        <div className="container-fluid px-4">

            {/* {
                display_errors.map((item) => {
                    return (<p className="mb-1" key={item}>{item}</p>)
                })
            } */}

            <div className="card mt-4">
                <div className="card-header">
                    <h4>Add club
                        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">List Club</Link>
                    </h4>
                </div>
                <div className="card-body">

                    <form onSubmit={submitClub} id="CATEGORY_FORM">
                        {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul> */}
                        <div className="tab-content" id="myTabContent">
                            <div className="form-group mb-3">
                                <label>Choose brand</label>
                                <select name="brandId" onChange={handleInput} value={clubInput.brandId} className="form-control">
                                    {
                                        brand.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>Choose league</label>
                                <select name="leagueId" onChange={handleInput} value={clubInput.leagueId} className="form-control">
                                    {
                                        league.map((item) => {
                                            return (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>Name</label>
                                <input type="text" name="name" onChange={handleInput} value={clubInput.name} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Club;

