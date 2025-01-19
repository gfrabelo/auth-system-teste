import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 50vw;
  height: 50vh;
`;

const Title = styled.h1`
  font-size: 24px;`;

const TestButton = styled.button`
  padding: 10px 20px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1557b0;
  }
`;

export function SignIn() {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  return (
    <Container>
      <Box>
        <Title>Página de Login</Title>
        <TestButton onClick={handleClick}>
          Teste de Estilo
        </TestButton>
        <Link to="/signup">Ir para Cadastro</Link>
        <Link to="/home">Ir para Home</Link>
      </Box>
    </Container>
  );
}