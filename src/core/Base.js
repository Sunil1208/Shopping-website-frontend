import React from 'react';
import Menu from './Menu';
import { isAuthenticated } from '../auth/helper';
const Base = ({
    title = "My Title",
    description="My description",
    className="text-white p-0",
    photo="",
    children
}) => {

    const {user} = isAuthenticated();

    return(
        <div>
        <Menu />
            <div className="container">
                <div className="jumbotron  text-white text-center" style={{backgroundColor:"#070739"}}>
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                    {isAuthenticated() && isAuthenticated().user.role===1 && (
                        <img src={photo} alt="admin" className="container-fluid" style={{maxHeight:"10%", maxWidth:"50%", opacity:"60%"}}/>
                    )}
                    
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer mt-4 py-3 border rounded" style={{backgroundColor:"#070739"}}>
                <div className="container-fluid  text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing place to <span className="text-white">SHOP</span> online
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;