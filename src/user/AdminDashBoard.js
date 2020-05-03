import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';


const AdminDashBoard = () => {

    const {
        user: {name, email, role}
    } =isAuthenticated();

    const adminLeftSide = () => {
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to="/admin/create/category" className="nav-link text-primary" >
                        Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-primary" >
                        Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-primary" >
                        Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-primary" >
                        Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-primary" >
                        Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminRightSide = () => {
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-primary mr-3">
                            Name 
                        </span>{name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-primary mr-3">
                            Email 
                        </span>{email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-3">
                            Admin Privelege 
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    return(
        <Base 
            title="Welcome to the Admin Page" 
            description="Manage products here"
            className="container bg-primary p-4"
            >
            <div className="row">
                <div className="col-3">
                    {adminLeftSide()}
                </div>
                <div className="col-9">
                    {adminRightSide()}
                </div>
            </div>
        </Base>        
    )
}

export default AdminDashBoard;