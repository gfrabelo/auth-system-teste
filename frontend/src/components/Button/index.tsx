import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Interface para as props transitórias
interface StyledButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline';
  $fullWidth?: boolean;
  $isLoading?: boolean;
}

// Estendemos as props do botão HTML com as nossas props transitórias
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StyledButtonProps {
  children: React.ReactNode;
}

// Estilização do botão com props transitórias
const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: #f1f3f4;
          color: #1a73e8;
          border: none;
          
          &:hover:not(:disabled) {
            background: #e8eaed;
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #1a73e8;
          border: 2px solid #1a73e8;
          
          &:hover:not(:disabled) {
            background: #f1f3f4;
          }
        `;
      default:
        return `
          background: #1a73e8;
          color: white;
          border: none;
          
          &:hover:not(:disabled) {
            background: #1557b0;
          }
        `;
    }
  }}
`;

// Componente de loading (opcional)
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Componente Button
export function Button({ children, $isLoading, $variant, $fullWidth, ...props }: ButtonProps) {
  return (
    <StyledButton
      $variant={$variant}
      $fullWidth={$fullWidth}
      disabled={$isLoading || props.disabled}
      {...props}
    >
      {$isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
}