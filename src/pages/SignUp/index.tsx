import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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

// Schema de validação usando Zod
const signUpSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .refine(value => /^[a-zA-Z\s]*$/.test(value), {
      message: 'Nome não pode conter caracteres especiais'
    }),
  email: z
    .string()
    .email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/(?=.*[0-9])/, 'Senha deve conter ao menos um número')
    .regex(/(?=.*[!@#$%^&*])/, 'Senha deve conter ao menos um caractere especial'),
  confirmPassword: z
    .string(),
  birthDate: z
    .string()
    .refine(value => /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/.test(value), {
      message: 'Data deve estar no formato dd/mm/yyyy'
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

type SignUpData = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = async (data: SignUpData) => {
    try {
      console.log('Dados do formulário:', data);
      // Aqui vamos adicionar a chamada à API depois
      
      // Redireciona para login após sucesso
      navigate('/');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  // Função para formatar a data enquanto digita
  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove não-números
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length >= 4) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    e.target.value = value;
  };

  return (
    <Container>
      <Title>Cadastro de Usuário</Title>
      <Form 
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Nome"
          placeholder="Digite seu nome"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Data de Nascimento"
          placeholder="dd/mm/yyyy"
          {...register('birthDate')}
          onChange={handleDateInput}
          maxLength={10}
          error={errors.birthDate?.message}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button 
          type="submit"
          isLoading={isSubmitting}
          fullWidth
        >
          Cadastrar
        </Button>

        <Button 
          type="button"
          variant="secondary"
          onClick={() => navigate('/')}
          fullWidth
        >
          Já tenho uma conta
        </Button>
      </Form>
    </Container>
  );
}