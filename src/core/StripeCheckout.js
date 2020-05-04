import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';


const StripeCheckout = ({
    products,
    setReload = f =>f, 
    reload = undefined
}) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated()  && isAuthenticated().user._id

    const getFinalPrice = () => {
        let amount = 0
        products.map((product, index) => {
            amount = amount + product.price   
        })
        return amount
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with stripe</button>
        ) : (
            <Link to = "/signin">
            <h3 className="text-muted">You need to Sign in to Checkout</h3>
                <button className="btn btn-danger">Sign In</button>
            </Link>
        )
    }

    

    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;