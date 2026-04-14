import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../services/api';
import Logo from '../../assets/Devburguer-v2.png';
import { Button } from '../../components/Button';
import {
  Container,
  LeftContainer,
  RightContainer,
  Header,
  Title,
  Subtitle,
  Form,
  InputContainer,
  LinkBack,
} from './styles';

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const schema = yup.object({
    password: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Digite uma senha'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As senhas devem ser iguais')
      .required('Confirme sua senha'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    await toast.promise(
      api.post('/reset-password', { token, password: data.password }),
      {
        pending: 'Redefinindo senha...',
        success: {
          render() {
            setTimeout(() => navigate('/login'), 2000);
            return 'Senha redefinida com sucesso! Redirecionando... ✅';
          },
        },
        error: 'Link inválido ou expirado. Solicite um novo.',
      },
    );
  };

  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo-devburguer" />
      </LeftContainer>
      <RightContainer>
        <Header>
          <img src={Logo} alt="Dev Burguer" />
        </Header>
        <Title>Criar nova senha</Title>
        <Subtitle>Digite sua nova senha abaixo.</Subtitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor="password">Nova senha</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <InputContainer>
            <label htmlFor="confirmPassword">Confirme a nova senha</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
            />
            <p>{errors?.confirmPassword?.message}</p>
          </InputContainer>
          <Button type="submit" disabled={isSubmitting}>
            Salvar nova senha
          </Button>
          <LinkBack onClick={() => navigate('/login')}>
            Voltar ao login
          </LinkBack>
        </Form>
      </RightContainer>
    </Container>
  );
}
