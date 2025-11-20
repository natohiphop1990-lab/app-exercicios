'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import Questionnaire from '@/components/fitness/Questionnaire';
import Dashboard from '@/components/fitness/Dashboard';

export default function Home() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar perfil do localStorage
    const savedProfile = localStorage.getItem('fitpro_profile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setIsLoading(false);
  }, []);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('fitpro_profile', JSON.stringify(profile));
  };

  const handleResetProfile = () => {
    setUserProfile(null);
    localStorage.removeItem('fitpro_profile');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!userProfile) {
    return <Questionnaire onComplete={handleProfileComplete} />;
  }

  return <Dashboard profile={userProfile} onResetProfile={handleResetProfile} />;
}
