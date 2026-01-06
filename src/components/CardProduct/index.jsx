import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { useCart } from '../../hooks/CartContext';
import { CardImage, Container } from './styles';
import { CartButton } from '../CartButton';

export function CardProduct({ product }) {
  const { putProductInCart } = useCart();

  const handleAddToCart = () => {
    putProductInCart(product); // adiciona ao carrinho no contexto

    // Pop-up de confirmação
    Swal.fire({
      title: 'Sucesso!',
      text: 'Produto adicionado ao carrinho!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButton onClick={handleAddToCart} />
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.object,
};
