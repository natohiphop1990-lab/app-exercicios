'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import Questionnaire from '@/components/fitness/Questionnaire';
import Dashboard from '@/components/fitness/Dashboard';
import AuthForm from '@/components/auth/AuthForm';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão
    const session = localStorage.getItem('fitpro_session');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Carregar perfil do usuário
      const savedProfile = localStorage.getItem(`fitpro_profile_${userData.email}`);
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
    }
    setIsLoading(false);
  }, []);

  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    // Carregar perfil se existir
    const savedProfile = localStorage.getItem(`fitpro_profile_${userData.email}`);
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  };

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    if (user) {
      localStorage.setItem(`fitpro_profile_${user.email}`, JSON.stringify(profile));
    }
  };

  const handleResetProfile = () => {
    setUserProfile(null);
    if (user) {
      localStorage.removeItem(`fitpro_profile_${user.email}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('fitpro_session');
    setIsAuthenticated(false);
    setUser(null);
    setUserProfile(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Tela de autenticação
  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  // Questionário inicial
  if (!userProfile) {
    return <Questionnaire onComplete={handleProfileComplete} userName={user?.name} />;
  }

  // Dashboard principal
  return (
    <Dashboard 
      profile={userProfile} 
      onResetProfile={handleResetProfile}
      onLogout={handleLogout}
      userName={user?.name || ''}
    />
  );
}
