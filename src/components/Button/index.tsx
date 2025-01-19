import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const StyledButton = styled.button<{ fullWidth?: boolean; $variant?: 'primary' | 'secondary' | 'outline' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => {
    switch (props.$variant) {
      case 'secondary':
        return `
          background: #f1f3f4;
          color: #1a73e8;
          border: none;
          
          &:hover {
            background: #e8eaed;
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #1a73e8;
          border: 2px solid #1a73e8;
          
          &:hover {
            background: #f1f3f4;
          }
        `;
      default:
        return `
          background: #1a73e8;
          color: white;
          border: none;
          
          &:hover {
            background: #1557b0;
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <StyledButton disabled={isLoading} {...props}>
      {isLoading && <LoadingSpinner />}
      {children}
    </StyledButton>
  );
}