
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import { useCart } from "../../../hooks/CartContext";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export default function CheckoutForm() {
    const { cartProducts, clearCart } = useCart();
    const navigate = useNavigate();


    const stripe = useStripe();
    const elements = useElements();
    const { state: { clientSecret }, } = useLocation();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe ou Elements com falha, tente novemante.");
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:5173/completepayment",
            },
        });


        if (error) {
            setMessage(error.message);
            toast.error(error.message);

        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            try {


                // 🔹 ALTERAÇÃO 2:
                // Aqui montamos o array products a partir do carrinho.
                const products = cartProducts.map((product) => {
                    return { id: product.id, quantity: product.quantity };
                });

                // 🔹 ALTERAÇÃO 3:
                // Agora o await está DENTRO de uma função async (permitido).
                const { status } = await api.post(
                    '/orders',
                    { products },
                    {
                        validateStatus: () => true,
                    }
                );

                // 🔹 ALTERAÇÃO 4:
                // Tratamento dos possíveis status da API.
                if (status === 200 || status === 201) {
                    setTimeout(() => {
                        navigate(
                            `/completepayment?payment_intent_client_secret=${paymentIntent.client_secret}`,
                        );
                    }, 2000);

                    clearCart();
                    toast.success('Pedido Realizado com Sucesso!');
                } else if (status === 409) {
                    toast.error('Falha ao realizar o seu pedido');
                } else {
                    throw new Error();
                }
            } catch (error) {
                toast.error('Falha no Sistema.');
            }
        } else {
            toast.error('Falha no Sistema.');
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "accordion"
    }

    return (
        <div className="container">
            <form id="payment-form" onSubmit={handleSubmit}>

                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button disabled={isLoading || !stripe || !elements} id="submit" className="button" >
                    <span id="button-text">
                        {isLoading ? <div className="spinner" id="spinner"></div> : "Pagar Agora"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <p>Os métodos de pagamento sao disponibilizados de acordo com a sua região.</p>
        </div>
    );
}