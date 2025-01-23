import styled from 'styled-components';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/auth';

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
  text-align: center;
`;

export function Home() {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Title>Bem-vindo, {user?.name}! 🎉</Title>
      <Button 
        $variant="outline" 
        onClick={signOut}
      >
        Sair
      </Button>
    </Container>
  );
}