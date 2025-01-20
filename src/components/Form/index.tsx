import { ReactNode } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 370px;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
`;

interface FormProps {
  // title?: string;
  // description?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export function Form({  children, onSubmit }: FormProps) {
  return (
    <FormContainer onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}>
      
      {children}
    </FormContainer>
  );
}

// Exemplo de uso:
/*
<Form 
  title="Criar conta" 
  description="Preencha os dados para se cadastrar"
  onSubmit={handleSubmit}
>
  <Input label="Nome" />
  <Input label="Email" type="email" />
  <Input label="Senha" type="password" />
  <Button type="submit">Cadastrar</Button>
</Form>
*/