import { useLocation } from "react-router-dom";

export default function OrderSummary(props) {
    const { state } = useLocation();

    return (
        <>
            {
                state !== null ?
                    <div class="row justify-content-center">
                        <div class="col-4">
                            <h1>Order Summary</h1>
                            <h5>Order have been successfully placed!</h5>
                            <div>Email: {state.email}</div>
                            <div>
                                Order would be delivered to  -
                                <div>{state.card.name}</div>
                                <div>{state.card.address_line1}</div>
                                <div>{state.card.address_city}</div>
                                <div>{state.card.address_zip}</div>
                                <div>{state.card.address_country}</div>
                            </div>
                        </div>
                    </div>
                    :
                    <h4>Your cart is empty</h4>
            }
        </>
    );
}