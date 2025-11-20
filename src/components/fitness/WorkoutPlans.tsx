'use client';

import { UserProfile, WorkoutPlan } from '@/lib/types';
import { freePlans, premiumPlans, goalLabels, locationLabels, levelLabels } from '@/lib/workout-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, Lock, Play, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import WorkoutDetail from './WorkoutDetail';

interface WorkoutPlansProps {
  profile: UserProfile;
}

export default function WorkoutPlans({ profile }: WorkoutPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  // Filtrar planos baseado no perfil
  const availableFreePlans = freePlans.filter(
    plan => plan.location === profile.location || plan.location === 'home'
  );

  const availablePremiumPlans = premiumPlans.filter(
    plan => plan.goal === profile.goal || plan.location === profile.location
  );

  if (selectedPlan) {
    return <WorkoutDetail plan={selectedPlan} onBack={() => setSelectedPlan(null)} />;
  }

  return (
    <div className="space-y-8">
      {/* Perfil do Usuário */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-blue-600" />
            Seu Perfil de Treino
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Objetivo</p>
              <p className="font-semibold">{goalLabels[profile.goal]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Local</p>
              <p className="font-semibold">{locationLabels[profile.location]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Frequência</p>
              <p className="font-semibold">{profile.daysPerWeek}x por semana</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nível</p>
              <p className="font-semibold">{levelLabels[profile.level]}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Planos Gratuitos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Planos Gratuitos</h2>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Acesso Liberado
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableFreePlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    {levelLabels[plan.level]}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {plan.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{plan.days[0]?.duration || 15} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{plan.days[0]?.calories || 120} kcal</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white"
                  onClick={() => setSelectedPlan(plan)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar Treino
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Planos Premium */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Planos Premium</h2>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            Premium
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availablePremiumPlans.map((plan) => (
            <Card key={plan.id} className="relative hover:shadow-lg transition-all duration-200 border-2 border-orange-200">
              {!profile.isPremium && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                  <div className="text-center p-6">
                    <Lock className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                    <p className="font-semibold text-gray-900 mb-2">Conteúdo Premium</p>
                    <p className="text-sm text-gray-600 mb-4">Assine para desbloquear</p>
                    <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      Ver Planos
                    </Button>
                  </div>
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <CardDescription className="mt-1">{plan.description}</CardDescription>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                    {levelLabels[plan.level]}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                    {plan.duration}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{plan.days[0]?.duration || 45} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    <span>{plan.days[0]?.calories || 350} kcal</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                  onClick={() => profile.isPremium && setSelectedPlan(plan)}
                  disabled={!profile.isPremium}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Começar Treino
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
