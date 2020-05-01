import React, {useState} from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';

const Signup = () => {

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" type="text" placeholder="Enter your name" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className="form-control" type="email" placeholder="Enter your email address" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" placeholder="Enter a password" />
                        </div>
                        <button className="btn btn-success btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }

    return(
        <Base title="Sign up page" description="A page for user to sign up!">
        {signUpForm()}
        </Base>
    )
}

export default Signup;