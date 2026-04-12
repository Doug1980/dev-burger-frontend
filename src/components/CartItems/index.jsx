import Swal from 'sweetalert2';
import TrashIcon from '../../assets/trash.svg';
import { useCart } from '../../hooks/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { Table } from '../index';
import {
  ButtonGroup,
  EmptyCart,
  ProductImage,
  ProductTotalPrice,
  TrashImage,
  MobileCard,
  MobileCardInfo,
  MobileCardActions,
  DesktopTable,
} from './styles';

export function CartItems() {
  const { cartProducts, increaseProduct, decreaseProduct, deleteProduct } =
    useCart();

  const handleDeleteProduct = (productId, productName) => {
    Swal.fire({
      title: 'Remover produto?',
      text: `Deseja remover "${productName}" do carrinho?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remover',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FF8F00',
      cancelButtonColor: '#888',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
      }
    });
  };

  if (!cartProducts?.length) {
    return <EmptyCart>Carrinho Vazio</EmptyCart>;
  }

  return (
    <>
      <DesktopTable>
        <Table.Root>
          <Table.Header>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Itens</Table.Th>
              <Table.Th>Preço</Table.Th>
              <Table.Th>Quantidade</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Header>
          <Table.Body>
            {cartProducts.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>
                  <ProductImage src={product.url} />
                </Table.Td>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.currencyValue}</Table.Td>
                <Table.Td>
                  <ButtonGroup>
                    <button onClick={() => decreaseProduct(product.id)}>
                      -
                    </button>
                    {product.quantity}
                    <button onClick={() => increaseProduct(product.id)}>
                      +
                    </button>
                  </ButtonGroup>
                </Table.Td>
                <Table.Td>
                  <ProductTotalPrice>
                    {formatPrice(product.quantity * product.price)}
                  </ProductTotalPrice>
                </Table.Td>
                <Table.Td>
                  <TrashImage
                    src={TrashIcon}
                    alt="lixeira"
                    onClick={() =>
                      handleDeleteProduct(product.id, product.name)
                    }
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Body>
        </Table.Root>
      </DesktopTable>

      {cartProducts.map((product) => (
        <MobileCard key={product.id}>
          <ProductImage src={product.url} />
          <MobileCardInfo>
            <p>{product.name}</p>
            <strong>{product.currencyValue}</strong>
            <ButtonGroup>
              <button onClick={() => decreaseProduct(product.id)}>-</button>
              {product.quantity}
              <button onClick={() => increaseProduct(product.id)}>+</button>
            </ButtonGroup>
          </MobileCardInfo>
          <MobileCardActions>
            <ProductTotalPrice>
              {formatPrice(product.quantity * product.price)}
            </ProductTotalPrice>
            <TrashImage
              src={TrashIcon}
              alt="lixeira"
              onClick={() => handleDeleteProduct(product.id, product.name)}
            />
          </MobileCardActions>
        </MobileCard>
      ))}
    </>
  );
}
