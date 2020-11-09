import React from 'react';
import { Link } from 'react-router-dom';



export default function CartSummary(props) {

    const cartItems = props.cartItems.map((ci, i) => {

        const name = ci.product.name;
        const itemTotalPrice = parseFloat(ci.product.price) * parseInt(ci.quantity);
        const quantity = parseInt(ci.quantity);
        let quantityLabel = "";
        if (quantity === 1) { quantityLabel = "(1 pc)"; }
        else { quantityLabel = "(" + quantity + " pcs)"; }

        return (
            <li className="list-group-item d-flex justify-content-between text-dark align-items-center" key={i}>
                <label>{name} {quantityLabel}</label>
                <span>${itemTotalPrice}</span>
            </li>
        );
    });

    return (
        <div className="col-12">
            <div className="card card-data bg-light">
                <div className="card-header py-2 px-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <h3 className="fs-18 mb-0">Your Cart</h3>
                        </div>
                        <div className="col text-right">
                            <Link className="underline eyebrow" to="/cart">Edit</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-line">
                        {cartItems}
                    </ul>
                </div>
            </div>
        </div>
    );
}