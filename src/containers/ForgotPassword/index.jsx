import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

export function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await toast.promise(api.post('/forgot-password', { email: data.email }), {
      pending: 'Enviando e-mail...',
      success: 'E-mail enviado! Verifique sua caixa de entrada. 📧',
      error: 'E-mail não encontrado. Verifique e tente novamente.',
    });
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
        <Title>Esqueceu sua senha?</Title>
        <Subtitle>Digite e-mail cadastrado para redefinição de senha.</Subtitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email', { required: 'E-mail obrigatório' })}
            />
            <p>{errors?.email?.message}</p>
          </InputContainer>
          <Button type="submit" disabled={isSubmitting}>
            Enviar link de redefinição
          </Button>
          <LinkBack onClick={() => navigate('/login')}>
            Voltar ao login
          </LinkBack>
        </Form>
      </RightContainer>
    </Container>
  );
}
