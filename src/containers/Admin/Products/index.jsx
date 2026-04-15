import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { Container, ProductImage, EditButton } from './styles';
import Swal from 'sweetalert2';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { CheckCircle, Pencil, XCircle, Trash } from 'phosphor-react';
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

formatPrice;

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      setProducts(data);
    }

    loadProducts();
  }, []);

  function isOffer(offer) {
    if (offer) {
      return <CheckCircle color="#61A120" size={33} />;
    } else {
      return <XCircle color="#FF3205" size={33} />;
    }
  }

  function editProduct(product) {
    navigate('/admin/editar-produto', { state: { product } });
  }

  async function deleteProduct(id) {
    const { isConfirmed } = await Swal.fire({
      title: 'Deletar produto?',
      text: 'Esta ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#b71c1c',
      cancelButtonColor: '#888',
    });

    if (!isConfirmed) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      Swal.fire({
        title: 'Deletado!',
        text: 'Produto removido com sucesso.',
        icon: 'success',
        confirmButtonColor: '#FF8F00',
      });
    } catch (err) {
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível deletar o produto.',
        icon: 'error',
        confirmButtonColor: '#FF8F00',
      });
    }
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Produto em oferta</TableCell>
              <TableCell align="center">Imagem do Produto</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Deletar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>

                <TableCell align="center">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">{isOffer(product.offer)}</TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <Pencil />
                  </EditButton>
                </TableCell>
                <TableCell align="center">
                  <EditButton
                    onClick={() => deleteProduct(product.id)}
                    style={{ background: '#ffebee' }}
                  >
                    <Trash color="#b71c1c" />
                  </EditButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
