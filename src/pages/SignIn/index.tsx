import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const Box = styled.div`
  width: auto;
  height: 50vh;
  
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
      <Box>
        <Title>Sistema de Login</Title>
        <Form 
          title="Login de Teste" 
          description="Testando nossos componentes"
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
      </Box>
    </Container>
  );
}