import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { Button } from "../Button";
import { Container } from "./styles";

export function CartResume() {
    const [finalPrice, setFinalPrice] = useState(0);
    const [deliveryTax] = useState(500);

    const navigate = useNavigate();

    const { cartProducts, clearCart } = useCart();

    useEffect(() => {
        const sumAllItems = cartProducts.reduce((acc, current) => {
            return current.price * current.quantity + acc;
        }, 0);

        setFinalPrice(sumAllItems);
    }, [cartProducts]);

    // 🔹 ALTERAÇÃO 1:
    // Toda a lógica de finalizar pedido (await, try/catch, products etc.)
    // AGORA fica DENTRO de uma função async, e NÃO solta no componente.
    const submitOrder = async () => {
        const products = cartProducts.map((product) => {
            return { id: product.id, quantity: product.quantity, price: product.price };
        });

        try {
            const { data } = await api.post('/create-payment-intent', { products });

            navigate('/checkout', {
                state: data,
            })
        } catch (err) {
            toast.error('Erro, tente novamente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });

        }

        

    };

    return (
        <div>
            <Container>
                <div className="container-top">
                    <h2 className="title">Resumo do Pedido</h2>
                    <p className="items">Itens</p>
                    <p className="items-price">{formatPrice(finalPrice)}</p>
                    <p className="delivery-tax">Taxa de entrega</p>
                    <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
                </div>

                <div className="container-bottom">
                    <p>Total</p>
                    <p>{formatPrice(finalPrice + deliveryTax)}</p>
                </div>
            </Container>

            {/* 🔹 ALTERAÇÃO 6:
          O botão agora chama a função async submitOrder no clique */}
            <Button onClick={submitOrder}>Finalizar Pedido</Button>
        </div>
    );
}
