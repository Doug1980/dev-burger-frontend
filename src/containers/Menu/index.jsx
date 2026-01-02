
import { useEffect, useState } from "react";

import { SlActionUndo } from "react-icons/sl";

import { CardProduct } from "../../components/CardProduct";
import { api } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import { Container, Banner, CategoryMenu, ProductsContainer, CategoryButton, Button } from "./styles";

export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const navigate = useNavigate();

    const { search } = useLocation();

    const queryParams = new URLSearchParams(search);


    const [activeCategory, setActiveCategory] = useState(() => {
        const categoryId = +queryParams.get('categoria');

        if (categoryId) {
            return categoryId
        }
        return 0;
    });


    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories');

            const newCategories = [{ id: 0, name: 'Todas' }, ...data];

            setCategories(newCategories);
        }

        async function loadProducts() {
            const { data } = await api.get('/products');

            console.log(data);

            const newProducts = data
                .map(product => ({
                    currencyValue: formatPrice(product.price),
                    ...product,
                }));

            setProducts(newProducts);
        }

        loadCategories();
        loadProducts();
    }, []);


    useEffect(() => {
        if (activeCategory === 0) {
            setFilteredProducts(products);
        } else {
            const newFilteredProducts = products.filter(
                (product) => product.category_id === activeCategory,
            );

            setFilteredProducts(newFilteredProducts);
        }

    }, [products, activeCategory]);


    return (
        <Container>
            <Banner>
                <h1>
                    O MELHOR
                    <br />
                    HAMBURGUER
                    <br />
                    ESTÁ AQUI!
                    <span>Esse cardápio está irresistivél!</span>
                </h1>
            </Banner>
            <Button onClick={() => navigate("/")}>
                <SlActionUndo size={25} style={{ marginRight: "15px" }} />
                Voltar
            </Button>
            <CategoryMenu>

                {categories.map(category => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}
                        onClick={() => {
                            navigate(
                                {
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`
                                },
                                {
                                    replace: true,
                                },

                            );
                            setActiveCategory(category.id);
                        }}

                    >{category.name}</CategoryButton>
                ))}
            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map(product => (
                    <CardProduct product={product} key={product.id} />
                ))}
            </ProductsContainer>
        </Container>

    );
}