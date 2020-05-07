import React, {useState, useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { createOrder } from './helper/orderHelper';


const StripeCheckout = ({
    products,
    amount,
    count,
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


    const makePayment = (token) => {
        const body = {
            token,
            products
        }

        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(`Response is : ${response}`)
            const {status} = response;
            console.log(`Status is: ${status}`);
            //TODO: call further methods
            
            const orderData = {
                products: products,
                transaction_id: status.id,
                amount: status.amount
                //TODO: read from the documentation for transaction id
                // transaction_id:

            }

            createOrder(userId, token, orderData)
            
            cartEmpty(() => {
                console.log("Did we get a crash")
            })
            setReload(!reload)

        })
        .catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_b0S748XWHdGDrIPtIvXougJK00qRXeXFp9"
                token={makePayment}
                amount={amount *100}
                name={`Buy ${count} Products`}
                shippingAddress
                billingAddress
            >
            <button className="btn btn-dark rounded-pill  btn-block">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to = "/signin">
            <h3 className="text-muted">You need to Sign in to Checkout</h3>
                <button className="btn btn-danger">Sign In</button>
            </Link>
        )
    }

    

    return (
        <div className="col-6">
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
            </div>
    )
}

export default StripeCheckout;