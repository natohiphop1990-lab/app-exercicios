'use client';

import { WorkoutPlan } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Flame, Play, CheckCircle2, Dumbbell } from 'lucide-react';
import { useState } from 'react';
import { levelLabels } from '@/lib/workout-data';

interface WorkoutDetailProps {
  plan: WorkoutPlan;
  onBack: () => void;
}

export default function WorkoutDetail({ plan, onBack }: WorkoutDetailProps) {
  const [activeDay, setActiveDay] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const currentDay = plan.days[activeDay];

  const toggleExercise = (exerciseId: string) => {
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId);
    } else {
      newCompleted.add(exerciseId);
    }
    setCompletedExercises(newCompleted);
  };

  const completionPercentage = currentDay 
    ? (completedExercises.size / currentDay.exercises.length) * 100 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{plan.name}</h1>
          <p className="text-gray-600">{plan.description}</p>
        </div>
      </div>

      {/* Plan Info */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Duração</p>
              <p className="font-semibold">{plan.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Nível</p>
              <p className="font-semibold">{levelLabels[plan.level]}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Dias de Treino</p>
              <p className="font-semibold">{plan.days.length} dias</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <Badge className={plan.isPremium ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-green-600'}>
                {plan.isPremium ? 'Premium' : 'Gratuito'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Selector */}
      {plan.days.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {plan.days.map((day, index) => (
            <Button
              key={day.id}
              variant={activeDay === index ? 'default' : 'outline'}
              onClick={() => setActiveDay(index)}
              className={activeDay === index ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white' : ''}
            >
              Dia {day.day}
            </Button>
          ))}
        </div>
      )}

      {/* Current Day Info */}
      {currentDay && (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentDay.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {currentDay.exercises.length} exercícios
                  </CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span>{currentDay.duration} minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span>~{currentDay.calories} kcal</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progresso</span>
                  <span className="font-semibold">{Math.round(completionPercentage)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-orange-500 transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exercises List */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Exercícios</h3>
            {currentDay.exercises.map((exercise, index) => (
              <Card 
                key={exercise.id}
                className={`transition-all duration-200 cursor-pointer hover:shadow-md ${
                  completedExercises.has(exercise.id) ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => toggleExercise(exercise.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        completedExercises.has(exercise.id) 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {completedExercises.has(exercise.id) ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{exercise.name}</h4>
                        <Badge variant="outline" className="flex-shrink-0">
                          {exercise.muscleGroup}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Dumbbell className="w-4 h-4 text-blue-600" />
                          <span className="font-medium">{exercise.sets} séries</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{exercise.reps} reps</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-600" />
                          <span>{exercise.calories} kcal</span>
                        </div>
                      </div>

                      {exercise.equipment.length > 0 && (
                        <div className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">Equipamento:</span> {exercise.equipment.join(', ')}
                        </div>
                      )}

                      {exercise.homeAlternative && (
                        <div className="mt-2 text-sm text-blue-600">
                          <span className="font-medium">💡 Alternativa em casa:</span> {exercise.homeAlternative}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Complete Workout Button */}
          {completionPercentage === 100 && (
            <Card className="border-2 border-green-500 bg-green-50">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Treino Completo! 🎉
                </h3>
                <p className="text-green-700 mb-4">
                  Parabéns! Você completou todos os exercícios de hoje.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={onBack}
                >
                  Voltar aos Treinos
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
