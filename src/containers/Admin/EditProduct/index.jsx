import { yupResolver } from '@hookform/resolvers/yup';
import { ImageIcon } from '@phosphor-icons/react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { api } from '../../../services/api';
import { useState, useEffect } from 'react';

import {
  Container,
  Form,
  Label,
  InputGroup,
  LabelUpload,
  Input,
  Select,
  SubmitButton,
  ErrorMessage,
  ContainerCheckbox,
} from './styles';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .transform((value, originalValue) => {
      if (typeof originalValue === 'string') {
        return parseFloat(originalValue.replace(',', '.'));
      }
      return value;
    })
    .positive('O preço deve ser positivo')
    .required('Digite o preço do produto')
    .typeError('Digite um preço válido'),
  category: yup.object().required('Selecione a categoria'),
  offer: yup.bool(),
  file: yup.mixed().notRequired(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const {
    state: { product },
  } = useLocation();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();

    productFormData.append('name', data.name);
    // Convertemos para centavos para o Back-end
    productFormData.append('price', Math.round(data.price * 100));
    productFormData.append('category_id', data.category.id);
    productFormData.append('offer', data.offer);

    if (data.file && data.file.length > 0) {
      productFormData.append('file', data.file[0]);
    }

    await toast.promise(api.put(`/products/${product.id}`, productFormData), {
      pending: 'Editando produto...',
      success: 'Produto Editado OK!',
      error: 'Falha ao editar o produto, tente novamente',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 1000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* CAMPO NOME - Adicionado novamente */}
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        {/* CAMPO PREÇO - Único e corrigido com step="any" */}
        <InputGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            step="any" // "any" é mais seguro que "0.01" para liberar qualquer decimal
            {...register('price')}
            defaultValue={product.price / 100}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              {...register('file')}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setFileName(e.target.files[0]?.name);
                register('file').onChange(e);
              }}
            />
            {fileName || 'Upload Imagem do Produto'}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckbox>
            <input
              type="checkbox"
              defaultChecked={product.offer}
              {...register('offer')}
            />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckbox>
        </InputGroup>

        <SubmitButton>Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
