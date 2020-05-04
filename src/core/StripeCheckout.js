import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


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
            amount = amount + product.price;  
        })
        return amount
    }

    const getCount = () => {
        let counter = 0;
        products.map((product,index) => {
            counter = counter+1
        })
        return counter;
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripePayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            const {status} = response;
            console.log(`Status is: ${status}`);
            

        })
        .catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_knI5yHyMUqFDCRM7m18BSzN9001zZUo5qt"
                token={makePayment}
                amount={getFinalPrice() *100}
                name={`Buy ${getCount()} Products`}
                shippingAddress
                billingAddress
            >
            <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
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