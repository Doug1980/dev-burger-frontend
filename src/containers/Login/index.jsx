import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react'; // Adicione o useEffect aqui
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/Logo.svg';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
  Link,
  Header,
} from './styles';

export function Login() {
  const navigate = useNavigate();
  const { putUserData, userInfo } = useUser(); // Pegue o userInfo aqui

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('E-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve conter pelo menos 06 caracteres')
        .required('Digite uma senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
        },
      );

      const userData = response.data;

      // Primeiro salvamos os dados no contexto
      await putUserData(userData);

      // Depois redirecionamos dependendo de quem é o usuário
      setTimeout(() => {
        if (userData?.admin) {
          navigate('/admin/pedidos');
        } else {
          navigate('/');
        }
      }, 1000);
    } catch (error) {
      // O toast já trata o erro visualmente
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (userInfo.admin) {
        navigate('/admin/pedidos', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Header>
          <img src={Logo} alt="Dev Burguer" />
          <Title>
            Olá, seja bem vindo ao <span>Dev Burguer</span>
            <br />
            Acesse com seu <span>Login</span> e senha.
          </Title>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit">Entrar</Button>
        </Form>
        <p>
          Não possui conta? <Link to="/cadastro">Clique aqui.</Link>
        </p>
      </RightContainer>
    </Container>
  );
}
