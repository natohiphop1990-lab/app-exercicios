'use client';

import { useState, useEffect } from 'react';
import { UserProfile, ProgressEntry } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, TrendingUp, Calendar, Weight, Ruler, Camera } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ProgressTrackerProps {
  profile: UserProfile;
}

export default function ProgressTracker({ profile }: ProgressTrackerProps) {
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: profile.weight.toString(),
    chest: '',
    waist: '',
    hips: '',
    arms: '',
    legs: '',
    notes: '',
  });

  useEffect(() => {
    // Carregar progresso do localStorage
    const saved = localStorage.getItem('fitpro_progress');
    if (saved) {
      const parsed = JSON.parse(saved);
      setProgressEntries(parsed.map((e: any) => ({ ...e, date: new Date(e.date) })));
    }
  }, []);

  const saveProgress = (entries: ProgressEntry[]) => {
    localStorage.setItem('fitpro_progress', JSON.stringify(entries));
    setProgressEntries(entries);
  };

  const handleAddEntry = () => {
    const entry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date(),
      weight: parseFloat(newEntry.weight),
      measurements: {
        chest: newEntry.chest ? parseFloat(newEntry.chest) : undefined,
        waist: newEntry.waist ? parseFloat(newEntry.waist) : undefined,
        hips: newEntry.hips ? parseFloat(newEntry.hips) : undefined,
        arms: newEntry.arms ? parseFloat(newEntry.arms) : undefined,
        legs: newEntry.legs ? parseFloat(newEntry.legs) : undefined,
      },
      notes: newEntry.notes,
    };

    const updated = [entry, ...progressEntries];
    saveProgress(updated);
    setIsAddingEntry(false);
    setNewEntry({
      weight: profile.weight.toString(),
      chest: '',
      waist: '',
      hips: '',
      arms: '',
      legs: '',
      notes: '',
    });
  };

  const weightChange = progressEntries.length > 0 
    ? profile.weight - progressEntries[0].weight 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Acompanhamento de Progresso</h2>
          <p className="text-gray-600">Registre sua evolução ao longo do tempo</p>
        </div>
        <Dialog open={isAddingEntry} onOpenChange={setIsAddingEntry}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nova Medição
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Medição</DialogTitle>
              <DialogDescription>
                Registre seu peso e medidas corporais
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={newEntry.weight}
                  onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                  placeholder="Ex: 70.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Peitoral (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    value={newEntry.chest}
                    onChange={(e) => setNewEntry({ ...newEntry, chest: e.target.value })}
                    placeholder="Ex: 95"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Cintura (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    value={newEntry.waist}
                    onChange={(e) => setNewEntry({ ...newEntry, waist: e.target.value })}
                    placeholder="Ex: 80"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Quadril (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    step="0.1"
                    value={newEntry.hips}
                    onChange={(e) => setNewEntry({ ...newEntry, hips: e.target.value })}
                    placeholder="Ex: 95"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arms">Braços (cm)</Label>
                  <Input
                    id="arms"
                    type="number"
                    step="0.1"
                    value={newEntry.arms}
                    onChange={(e) => setNewEntry({ ...newEntry, arms: e.target.value })}
                    placeholder="Ex: 35"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="legs">Pernas (cm)</Label>
                  <Input
                    id="legs"
                    type="number"
                    step="0.1"
                    value={newEntry.legs}
                    onChange={(e) => setNewEntry({ ...newEntry, legs: e.target.value })}
                    placeholder="Ex: 55"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  placeholder="Como você está se sentindo? Alguma mudança notável?"
                  className="min-h-24"
                />
              </div>

              <Button 
                onClick={handleAddEntry}
                className="w-full bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white"
                disabled={!newEntry.weight}
              >
                Salvar Medição
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Peso Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{profile.weight}</p>
              <p className="text-gray-600">kg</p>
            </div>
            {weightChange !== 0 && (
              <p className={`text-sm mt-1 ${weightChange > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg desde o início
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Medições Registradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">{progressEntries.length}</p>
              <p className="text-gray-600">registros</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Continue registrando seu progresso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Última Medição</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold">
                {progressEntries.length > 0 
                  ? new Date(progressEntries[0].date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
                  : '--'
                }
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {progressEntries.length > 0 ? 'Última atualização' : 'Nenhuma medição ainda'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Linha do Tempo
          </CardTitle>
          <CardDescription>Histórico de suas medições</CardDescription>
        </CardHeader>
        <CardContent>
          {progressEntries.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhuma medição registrada
              </h3>
              <p className="text-gray-600 mb-4">
                Comece a acompanhar seu progresso adicionando sua primeira medição
              </p>
              <Button 
                onClick={() => setIsAddingEntry(true)}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeira Medição
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {progressEntries.map((entry, index) => (
                <div key={entry.id} className="border-l-4 border-blue-600 pl-4 py-3 hover:bg-gray-50 rounded-r-lg transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-lg">
                        {entry.weight} kg
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    {index < progressEntries.length - 1 && (
                      <div className={`text-sm font-medium ${
                        entry.weight < progressEntries[index + 1].weight 
                          ? 'text-green-600' 
                          : 'text-orange-600'
                      }`}>
                        {entry.weight < progressEntries[index + 1].weight ? '↓' : '↑'} 
                        {Math.abs(entry.weight - progressEntries[index + 1].weight).toFixed(1)} kg
                      </div>
                    )}
                  </div>

                  {entry.measurements && Object.values(entry.measurements).some(v => v !== undefined) && (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3 text-sm">
                      {entry.measurements.chest && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">Peito:</span>
                          <span className="font-medium">{entry.measurements.chest}cm</span>
                        </div>
                      )}
                      {entry.measurements.waist && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">Cintura:</span>
                          <span className="font-medium">{entry.measurements.waist}cm</span>
                        </div>
                      )}
                      {entry.measurements.hips && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">Quadril:</span>
                          <span className="font-medium">{entry.measurements.hips}cm</span>
                        </div>
                      )}
                      {entry.measurements.arms && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">Braços:</span>
                          <span className="font-medium">{entry.measurements.arms}cm</span>
                        </div>
                      )}
                      {entry.measurements.legs && (
                        <div className="flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">Pernas:</span>
                          <span className="font-medium">{entry.measurements.legs}cm</span>
                        </div>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="text-sm text-gray-700 mt-2 italic">
                      "{entry.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50">
        <CardHeader>
          <CardTitle className="text-lg">💡 Dicas para Acompanhamento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Meça-se sempre no mesmo horário (preferencialmente pela manhã)</p>
          <p>• Tire fotos de progresso a cada 2-4 semanas</p>
          <p>• Não se preocupe com variações diárias de peso</p>
          <p>• Foque na tendência geral ao longo das semanas</p>
          <p>• Medidas corporais são tão importantes quanto o peso</p>
        </CardContent>
      </Card>
    </div>
  );
}
