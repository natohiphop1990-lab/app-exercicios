'use client';

import { useState } from 'react';
import { UserProfile } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Home, Dumbbell, TrendingUp, Crown, Settings, Menu, X } from 'lucide-react';
import WorkoutPlans from './WorkoutPlans';
import ProgressTracker from './ProgressTracker';
import PremiumSection from './PremiumSection';

interface DashboardProps {
  profile: UserProfile;
  onResetProfile: () => void;
}

export default function Dashboard({ profile, onResetProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                FitPro
              </h1>
              <p className="text-xs text-gray-600">Seu treino personalizado</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!profile.isPremium && (
              <Button
                size="sm"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white hidden sm:flex"
                onClick={() => setActiveTab('premium')}
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
            >
              <Home className="w-4 h-4 mr-2" />
              Início
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('workouts');
                setMobileMenuOpen(false);
              }}
            >
              <Dumbbell className="w-4 h-4 mr-2" />
              Treinos
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setActiveTab('progress');
                setMobileMenuOpen(false);
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Progresso
            </Button>
            {!profile.isPremium && (
              <Button
                variant="ghost"
                className="w-full justify-start text-orange-600"
                onClick={() => {
                  setActiveTab('premium');
                  setMobileMenuOpen(false);
                }}
              >
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </Button>
            )}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={onResetProfile}
            >
              <Settings className="w-4 h-4 mr-2" />
              Refazer Questionário
            </Button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Navigation */}
          <TabsList className="hidden md:inline-flex w-full justify-start bg-white border rounded-xl p-1">
            <TabsTrigger value="home" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              Início
            </TabsTrigger>
            <TabsTrigger value="workouts" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Dumbbell className="w-4 h-4 mr-2" />
              Treinos
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Progresso
            </TabsTrigger>
            {!profile.isPremium && (
              <TabsTrigger value="premium" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
                <Crown className="w-4 h-4 mr-2" />
                Premium
              </TabsTrigger>
            )}
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Olá, Atleta! 💪</h2>
              <p className="text-blue-100">
                Seu plano está pronto. Vamos treinar hoje?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Dumbbell className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Treinos Disponíveis</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">
                  {profile.isPremium ? '50+' : '5'}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {profile.isPremium ? 'Planos premium' : 'Planos gratuitos'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Dias por Semana</h3>
                </div>
                <p className="text-3xl font-bold text-orange-600">{profile.daysPerWeek}</p>
                <p className="text-sm text-gray-600 mt-1">Frequência semanal</p>
              </div>

              <div className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Crown className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Status</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">
                  {profile.isPremium ? 'Premium' : 'Free'}
                </p>
                <p className="text-sm text-gray-600 mt-1">Plano atual</p>
              </div>
            </div>

            {!profile.isPremium && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Crown className="w-8 h-8 text-orange-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Desbloqueie Todo o Potencial
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Acesse planos avançados, dietas personalizadas e muito mais com o Premium
                    </p>
                    <Button
                      onClick={() => setActiveTab('premium')}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      Ver Planos Premium
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Workouts Tab */}
          <TabsContent value="workouts">
            <WorkoutPlans profile={profile} />
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <ProgressTracker profile={profile} />
          </TabsContent>

          {/* Premium Tab */}
          {!profile.isPremium && (
            <TabsContent value="premium">
              <PremiumSection />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'workouts' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <Dumbbell className="w-5 h-5" />
            <span className="text-xs font-medium">Treinos</span>
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              activeTab === 'progress' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs font-medium">Progresso</span>
          </button>
          {!profile.isPremium && (
            <button
              onClick={() => setActiveTab('premium')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === 'premium' ? 'bg-orange-50 text-orange-600' : 'text-gray-600'
              }`}
            >
              <Crown className="w-5 h-5" />
              <span className="text-xs font-medium">Premium</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
