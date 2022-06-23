import React, {useState} from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import {clearCart} from '../slices/cartSlice'

export default function Checkout() {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        completeAddress: '',
        pincode: '',
        number: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [success, setSuccess] = useState(false);

    async function postData() {
        const postData = {
            address: values.completeAddress,
            pincode: values.pincode,
            number: values.number
        };
        console.log(postData)
        try {
            const res = await fetch("http://localhost:5000/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const data = await res.json();
            console.log(data)
            setSuccess(true)
            dispatch(clearCart());
        } catch (err) {
            console.log(err);
        }
    }

    if(success){
        return <div style={{margin:'auto'}}> 
            <h3>Order Placed</h3>
            <Link to="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                </svg>
                <span>Continue Shopping</span>
            </Link>
        </div>
    }
    const handleAddressInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            completeAddress: event.target.value,
        }));
    };

    const handlePincodeInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            pincode: event.target.value,
        }));
    };

    const handleNumberInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            number: event.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.completeAddress && values.pincode && values.number) {
            postData();
            setValid(true);
        }
        setSubmitted(true);
    };
    return (
        <div class="form-container">
            <form class='register-form' onSubmit={handleSubmit}>
                {valid && <div class='success-message'>Order placed successfully</div>}
                <input
                    id="address"
                    class="form-field"
                    type="text"
                    disabled={valid}
                    placeholder="Complete Address"
                    name="address"
                    value={values.completeAddress}
                    onChange={handleAddressInputChange}
                />
                {submitted && !values.completeAddress && <span-2 id='first-name-error'>Please enter your Address</span-2>}

                <input
                    id="pincode"
                    class="form-field"
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    value={values.pincode}
                    onChange={handlePincodeInputChange}
                />
                {submitted && !values.pincode && <span-2 id='first-name-error'>Please enter your Pincode</span-2>}
                <input
                    id="number"
                    class="form-field"
                    type="text"
                    placeholder="Mobile Number"
                    name="number"
                    value={values.number}
                    onChange={handleNumberInputChange}
                />
                {submitted && !values.number && <span-2 id='first-name-error'>Please enter your Mobile Number</span-2>}
                <button class="form-field" type="submit">
                    Order
                </button>
            </form>
            <Link to="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                </svg>
                <span>Continue Shopping</span>
            </Link>
        </div>
    );
}