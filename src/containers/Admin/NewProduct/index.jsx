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
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .positive()
    .required('Digite o preço do produto')
    .typeError('Digite o preço do produto'),
  category: yup.object().required('Selecione a categoria'),
  offer: yup.bool(),
  file: yup
    .mixed()
    .test('required', 'Escolha um arquivo para continuar', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'Carregue arquivos até 3mb', (value) => {
      return value && value.length > 0 && value[0].size <= 5 * 1024 * 1024;
    })
    .test('type', 'Carregue apenas imagens em jpeg ou PNG', (value) => {
      return (
        value &&
        value.length > 0 &&
        (value[0].type === 'image/png' || value[0].type === 'image/jpeg')
      );
    }),
});

export function NewProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

  const usenavigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');

      console.log('Categorias carregadas:', data);
      setCategories(data); // 👈 ISSO ESTAVA FALTANDO
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
    productFormData.append('price', data.price);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(api.post('/products', productFormData), {
      pending: 'Adicionando produto...',
      success: 'Produto adicionado OK!',
      error: 'Falha ao adicionar o produto, tente novamente',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 1000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              {...register('file')}
              accept="image/png, image/jpeg"
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register('file').onChange(value);
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
            <input type="checkbox" {...register('offer')} />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckbox>
        </InputGroup>

        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
