'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Mail, Lock, User, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  onAuthSuccess: (user: { email: string; name: string }) => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações básicas
    if (!email || !password) {
      setError('Preencha todos os campos obrigatórios');
      setIsLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setError('Nome é obrigatório para cadastro');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      setIsLoading(false);
      return;
    }

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      if (isLogin) {
        // Login
        const savedUsers = JSON.parse(localStorage.getItem('fitpro_users') || '[]');
        const user = savedUsers.find((u: any) => u.email === email && u.password === password);
        
        if (!user) {
          setError('E-mail ou senha incorretos');
          setIsLoading(false);
          return;
        }

        // Salvar sessão
        localStorage.setItem('fitpro_session', JSON.stringify({ email: user.email, name: user.name }));
        onAuthSuccess({ email: user.email, name: user.name });
      } else {
        // Cadastro
        const savedUsers = JSON.parse(localStorage.getItem('fitpro_users') || '[]');
        
        // Verificar se e-mail já existe
        if (savedUsers.some((u: any) => u.email === email)) {
          setError('Este e-mail já está cadastrado');
          setIsLoading(false);
          return;
        }

        // Criar novo usuário
        const newUser = { email, password, name };
        savedUsers.push(newUser);
        localStorage.setItem('fitpro_users', JSON.stringify(savedUsers));
        
        // Salvar sessão
        localStorage.setItem('fitpro_session', JSON.stringify({ email, name }));
        onAuthSuccess({ email, name });
      }
    } catch (err) {
      setError('Erro ao processar. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Card className="w-full max-w-md shadow-2xl border-2">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-gradient-to-r from-blue-600 to-orange-500 p-4 rounded-2xl w-fit">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              FitPro
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {isLogin ? 'Entre na sua conta' : 'Crie sua conta gratuita'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processando...
                </div>
              ) : (
                isLogin ? 'Entrar' : 'Criar Conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              disabled={isLoading}
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>

          {!isLogin && (
            <p className="mt-4 text-xs text-gray-500 text-center">
              Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
