import { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputContainerProps {
  $isErrored?: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const StyledInput = styled.input<{ $isErrored?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.$isErrored ? '#dc3545' : '#e0e0e0'};
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s;
  outline: none;
  background: #f5f5f5;
  color: #333;
  width: 100%;

  &:focus {
    border-color: ${props => props.$isErrored ? '#dc3545' : '#1a73e8'};
    box-shadow: 0 0 0 1px ${props => props.$isErrored ? '#dc3545' : '#1a73e8'};
  }

  &::placeholder {
    color: #666;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  min-height: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #424242;
  margin-bottom: 4px;
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <InputContainer $isErrored={!!error}>
        {label && <Label>{label}</Label>}
        <StyledInput 
          ref={ref} 
          $isErrored={!!error} 
          {...props} 
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';