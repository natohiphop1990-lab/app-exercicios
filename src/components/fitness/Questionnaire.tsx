'use client';

import { useState } from 'react';
import { UserProfile, Goal, Location, Level } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dumbbell, Home, Target, TrendingUp, Zap, Heart, Activity } from 'lucide-react';

interface QuestionnaireProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: '' as Goal,
    location: '' as Location,
    daysPerWeek: 3,
    level: '' as Level,
    age: '',
    weight: '',
    limitations: '',
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete({
        ...formData,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        isPremium: false,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.goal !== '';
      case 2: return formData.location !== '';
      case 3: return formData.daysPerWeek > 0;
      case 4: return formData.level !== '';
      case 5: return formData.age !== '' && formData.weight !== '';
      case 6: return true;
      default: return false;
    }
  };

  const goalOptions = [
    { value: 'muscle', label: 'Ganhar Massa Muscular', icon: Dumbbell, color: 'from-blue-500 to-blue-600' },
    { value: 'fat_loss', label: 'Perder Gordura', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { value: 'health', label: 'Melhorar Saúde', icon: Heart, color: 'from-green-500 to-emerald-600' },
    { value: 'conditioning', label: 'Condicionamento', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { value: 'definition', label: 'Definição Muscular', icon: Activity, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-3 rounded-2xl">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Bem-vindo ao FitPro
          </CardTitle>
          <CardDescription className="text-base">
            Vamos criar seu plano de treino personalizado
          </CardDescription>
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i + 1 === step ? 'w-8 bg-gradient-to-r from-blue-600 to-orange-500' : 
                  i + 1 < step ? 'w-2 bg-blue-600' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Objetivo */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Qual é o seu objetivo principal?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goalOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFormData({ ...formData, goal: option.value as Goal })}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      formData.goal === option.value
                        ? 'border-blue-600 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${option.color}`}>
                        <option.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-left">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Local */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Onde você pretende treinar?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, location: 'gym' })}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    formData.location === 'gym'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Dumbbell className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                  <p className="font-semibold text-lg">Academia</p>
                  <p className="text-sm text-gray-600 mt-1">Acesso a equipamentos</p>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, location: 'home' })}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                    formData.location === 'home'
                      ? 'border-blue-600 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Home className="w-12 h-12 mx-auto mb-3 text-orange-600" />
                  <p className="font-semibold text-lg">Casa</p>
                  <p className="text-sm text-gray-600 mt-1">Treino sem equipamentos</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Frequência */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Quantos dias por semana você pode treinar?</Label>
              <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                  <button
                    key={day}
                    onClick={() => setFormData({ ...formData, daysPerWeek: day })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all duration-200 hover:scale-110 ${
                      formData.daysPerWeek === day
                        ? 'border-blue-600 bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">
                Recomendamos pelo menos 3 dias por semana para melhores resultados
              </p>
            </div>
          )}

          {/* Step 4: Nível */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Qual é o seu nível de experiência?</Label>
              <RadioGroup
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value as Level })}
                className="space-y-3"
              >
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.level === 'beginner' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="flex-1 cursor-pointer">
                    <p className="font-semibold">Iniciante</p>
                    <p className="text-sm text-gray-600">Pouca ou nenhuma experiência com exercícios</p>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.level === 'intermediate' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="flex-1 cursor-pointer">
                    <p className="font-semibold">Intermediário</p>
                    <p className="text-sm text-gray-600">Treino regular há alguns meses</p>
                  </Label>
                </div>
                <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  formData.level === 'advanced' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="flex-1 cursor-pointer">
                    <p className="font-semibold">Avançado</p>
                    <p className="text-sm text-gray-600">Experiência consistente há mais de 1 ano</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 5: Dados pessoais */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Informações pessoais</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Ex: 25"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Ex: 70.5"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="text-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Limitações */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <Label className="text-lg font-semibold">Possui alguma limitação física?</Label>
              <Textarea
                placeholder="Ex: Dor no joelho, problema na coluna, etc. (opcional)"
                value={formData.limitations}
                onChange={(e) => setFormData({ ...formData, limitations: e.target.value })}
                className="min-h-32 text-base"
              />
              <p className="text-sm text-gray-600">
                Essas informações nos ajudam a adaptar os exercícios para você
              </p>
            </div>
          )}

          {/* Botões de navegação */}
          <div className="flex gap-3 pt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white"
            >
              {step === totalSteps ? 'Começar' : 'Próximo'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
