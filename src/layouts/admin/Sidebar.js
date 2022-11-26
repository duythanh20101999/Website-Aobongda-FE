import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    {/* <div className="sb-sidenav-menu-heading">Core</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link> */}
                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Thể loại
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseCategory" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/admin/add-club">Thêm thể loại</Link>
                        <Link className="nav-link" to="/admin/view-club">Quản lý thể loại</Link>
                        </nav>
                    </div>
                    {/* <Link className="nav-link" to="/admin/add-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Thêm thể loại
                    </Link>
                    <Link className="nav-link" to="/admin/view-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Thể loại
                    </Link> */}


                    <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseProduct" aria-expanded="false" aria-controls="collapseProduct">
                        <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                        Sản phẩm
                        <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                    </Link>
                    <div className="collapse" id="collapseProduct" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                        <nav className="sb-sidenav-menu-nested nav">
                            <Link className="nav-link" to="/admin/add-product">Thêm Sản phẩm</Link>
                            <Link className="nav-link" to="/admin/view-product">Quản lý sản phẩm</Link>
                        </nav>
                    </div>


                    <Link className="nav-link" to="/admin/profile">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Quản lý tài khoản
                    </Link>

                    <Link className="nav-link" to="/admin/orders">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Quản lý đơn hàng
                    </Link>

                    
                </div>
            </div>
        
        </nav>
    );
}

export default Sidebar;
