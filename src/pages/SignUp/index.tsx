import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

export function SignUp() {
  return (
    <Container>
      <h1>Página de Cadastro</h1>
    </Container>
  );
}