import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  text-transform: uppercase;
  text-align: center;
`;

export function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
  };
  return (
    <Container>
      <Title>Sistema de Login</Title>
        <Form 
          onSubmit={handleSubmit}
        >
          <Input 
            label="Email"
            type="email"
            placeholder="Digite seu email"
            error=""
          />
          
          <Input 
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            error="Exemplo de mensagem de erro"
          />

          <Button type="submit">
            Entrar
          </Button>

          <Button 
            variant="secondary"
            type="button"
            onClick={() => navigate('/signup')}
          >
            Criar conta
          </Button>
        </Form>
    </Container>
  );
}