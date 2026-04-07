import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import CheckoutForm from '../../components/Stripe/CheckoutForm';
import stripePromise from '../../config/stripeConfig';

// Importe apenas os estilos, sem duplicar Header e Footer aqui
import { Container, MainContent } from './styles';

export function Checkout() {
  const { state } = useLocation();
  const clientSecret = state?.clientSecret;

  if (!clientSecret) {
    return <div>Erro, volte e tente novamente</div>;
  }

  return (
    /* Usamos o Container e MainContent apenas para envolver o Elements */
    <Container>
      <MainContent>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      </MainContent>
    </Container>
  );
}
