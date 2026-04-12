import { useEffect, useState } from 'react';
import { SlActionUndo } from 'react-icons/sl';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

import { CardProduct } from '../../components/CardProduct';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

import {
  Container,
  Banner,
  CategoryMenu,
  ProductsContainer,
  CategoryButton,
  Button,
  TopMenu,
} from './styles';

export function Menu() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const [activeCategory, setActiveCategory] = useState(() => {
    const categoryId = +queryParams.get('categoria');
    return categoryId || 0;
  });

  // Carregar categorias e produtos
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories([{ id: 0, name: 'Todas' }, ...data]);
    }

    async function loadProducts() {
      const { data } = await api.get('/products');
      const newProducts = data.map((product) => ({
        currencyValue: formatPrice(product.price),
        ...product,
      }));
      setProducts(newProducts);
    }

    loadCategories();
    loadProducts();
  }, []);

  // Filtrar produtos por categoria
  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category_id === activeCategory),
      );
    }
  }, [products, activeCategory]);

  // Função para adicionar ao carrinho com pop-up de confirmação
  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart', { product_id: productId, quantity });

      Swal.fire({
        title: 'Sucesso!',
        text: 'Produto adicionado ao carrinho!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (err) {
      Swal.fire({
        title: 'Erro!',
        text: 'Não foi possível adicionar o produto.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Container>
      {/* resto do menu */}
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI!
          <span>Esse cardápio está irresistível!</span>
        </h1>
      </Banner>
      <TopMenu>
        <Button onClick={() => navigate(-1)}>
          <SlActionUndo size={16} />
          Voltar
        </Button>
      </TopMenu>
      <CategoryMenu>
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            $isActiveCategory={category.id === activeCategory}
            onClick={() => {
              navigate(
                { pathname: '/cardapio', search: `?categoria=${category.id}` },
                { replace: true },
              );
              setActiveCategory(category.id);
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoryMenu>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        ))}
      </ProductsContainer>
    </Container>
  );
}
