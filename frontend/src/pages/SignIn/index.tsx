import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
  text-align: center;
`;

// Schema de validação usando Zod
const signInSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

type SignInData = z.infer<typeof signInSchema>;

export function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    try {
      await signIn(data.email, data.password);
      navigate('/home');
    } catch (error) {
      console.error('Erro no login:', error);
      alert('E-mail ou senha incorretos');
    }
  };

  return (
    <Container>
      <Title>Acesso ao Sistema</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="exemplo@email.com"
        />

        <Input
          label="Senha"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          $variant="primary"
          $fullWidth
          $isLoading={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>

        <Button
          type="button"
          $variant="secondary"
          $fullWidth
          onClick={() => navigate('/signup')}
        >
          Criar nova conta
        </Button>
      </Form>
    </Container>
  );
}