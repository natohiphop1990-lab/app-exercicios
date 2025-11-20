// Tipos do aplicativo de exercícios

export type Goal = 'muscle' | 'fat_loss' | 'health' | 'conditioning' | 'definition';
export type Location = 'gym' | 'home';
export type Level = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  goal: Goal;
  location: Location;
  daysPerWeek: number;
  level: Level;
  age: number;
  weight: number;
  limitations: string;
  isPremium: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  sets: number;
  reps: string;
  duration?: number;
  calories: number;
  equipment: string[];
  muscleGroup: string;
  difficulty: Level;
  homeAlternative?: string;
}

export interface WorkoutDay {
  id: string;
  day: number;
  title: string;
  duration: number;
  calories: number;
  exercises: Exercise[];
  isPremium: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: string;
  level: Level;
  goal: Goal;
  location: Location;
  days: WorkoutDay[];
  isPremium: boolean;
}

export interface ProgressEntry {
  id: string;
  date: Date;
  weight: number;
  photos?: string[];
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  notes?: string;
}
