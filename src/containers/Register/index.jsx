import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';
import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
} from './styles';

export function Register() {
  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required('Nome obrigatório'),

      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('E-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve conter pelo menos 06 caracteres')
        .required('Digite uma senha'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
        .required('Confirme sua senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  const onSubmit = async (data) => {
    try {
      const response = await toast.promise(
        api.post('/sessions', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando os dados',
          success: 'Seja bem-vindo(a) 👌',
          error: 'E-mail ou senha Incorretos 🤯',
        }
      );

      const userData = response.data;

      // 1) salva primeiro (isso tem que escrever no localStorage)
      putUserData(userData);

      // 2) detecta admin (robusto)
      const isAdmin =
        userData?.admin === true ||
        userData?.admin === 'true' ||
        userData?.role === 'admin';

      // 3) navega depois (sem setTimeout)
      if (isAdmin) {
        navigate('/admin/home', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      // toast.promise já mostra o erro
      console.log(err);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Title>Criar Conta</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Nome</label>
            <input type="text" {...register('name')} />
            <p>{errors?.name?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>E-mail</label>
            <input type="email" {...register('email')} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Senha</label>
            <input type="password" {...register('password')} />
            <p>{errors?.password?.message}</p>
          </InputContainer>

          <InputContainer>
            <label>Confirme senha</label>
            <input type="password" {...register('confirmPassword')} />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>

          <Button type="submit">Criar Conta</Button>
        </Form>
        <p>
          Já possui conta? <Link to="/login">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
