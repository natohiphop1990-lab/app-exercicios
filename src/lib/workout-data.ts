// Dados de exercícios e planos de treino

import { Exercise, WorkoutDay, WorkoutPlan } from './types';

export const sampleExercises: Exercise[] = [
  {
    id: 'ex1',
    name: 'Flexão de Braço',
    description: 'Exercício clássico para peito, ombros e tríceps. Mantenha o corpo reto e desça até o peito quase tocar o chão.',
    videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4',
    sets: 3,
    reps: '12-15',
    duration: 5,
    calories: 35,
    equipment: [],
    muscleGroup: 'Peito',
    difficulty: 'beginner',
    homeAlternative: 'Flexão de joelhos para iniciantes'
  },
  {
    id: 'ex2',
    name: 'Agachamento Livre',
    description: 'Exercício fundamental para pernas e glúteos. Mantenha os pés na largura dos ombros e desça como se fosse sentar.',
    videoUrl: 'https://www.youtube.com/embed/aclHkVaku9U',
    sets: 4,
    reps: '15-20',
    duration: 6,
    calories: 45,
    equipment: [],
    muscleGroup: 'Pernas',
    difficulty: 'beginner',
  },
  {
    id: 'ex3',
    name: 'Prancha',
    description: 'Exercício isométrico para core. Mantenha o corpo reto apoiado nos antebraços e pontas dos pés.',
    videoUrl: 'https://www.youtube.com/embed/pSHjTRCQxIw',
    sets: 3,
    reps: '30-60s',
    duration: 4,
    calories: 25,
    equipment: [],
    muscleGroup: 'Abdômen',
    difficulty: 'beginner',
  },
  {
    id: 'ex4',
    name: 'Burpee',
    description: 'Exercício completo de alta intensidade. Combina agachamento, prancha e salto.',
    videoUrl: 'https://www.youtube.com/embed/JZQA08SlJnM',
    sets: 3,
    reps: '10-12',
    duration: 5,
    calories: 60,
    equipment: [],
    muscleGroup: 'Corpo todo',
    difficulty: 'intermediate',
  },
  {
    id: 'ex5',
    name: 'Supino Reto',
    description: 'Exercício principal para desenvolvimento do peitoral. Use barra ou halteres.',
    videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg',
    sets: 4,
    reps: '8-12',
    duration: 8,
    calories: 50,
    equipment: ['Barra', 'Banco'],
    muscleGroup: 'Peito',
    difficulty: 'intermediate',
    homeAlternative: 'Flexão com elevação dos pés'
  },
  {
    id: 'ex6',
    name: 'Levantamento Terra',
    description: 'Exercício composto para posterior de pernas e costas. Mantenha as costas retas.',
    videoUrl: 'https://www.youtube.com/embed/ytGaGIn3SjE',
    sets: 4,
    reps: '6-10',
    duration: 10,
    calories: 70,
    equipment: ['Barra', 'Anilhas'],
    muscleGroup: 'Costas/Pernas',
    difficulty: 'advanced',
    homeAlternative: 'Stiff com garrafas de água'
  },
  {
    id: 'ex7',
    name: 'Rosca Direta',
    description: 'Exercício isolado para bíceps. Mantenha os cotovelos fixos e controle o movimento.',
    videoUrl: 'https://www.youtube.com/embed/ykJmrZ5v0Oo',
    sets: 3,
    reps: '10-12',
    duration: 5,
    calories: 30,
    equipment: ['Halteres'],
    muscleGroup: 'Bíceps',
    difficulty: 'beginner',
    homeAlternative: 'Rosca com garrafas de água'
  },
  {
    id: 'ex8',
    name: 'Tríceps Testa',
    description: 'Exercício para tríceps. Deite no banco e desça a barra até próximo da testa.',
    videoUrl: 'https://www.youtube.com/embed/d_KZxkY_0cM',
    sets: 3,
    reps: '10-12',
    duration: 5,
    calories: 35,
    equipment: ['Barra', 'Banco'],
    muscleGroup: 'Tríceps',
    difficulty: 'intermediate',
    homeAlternative: 'Tríceps no banco'
  },
  {
    id: 'ex9',
    name: 'Abdominal Crunch',
    description: 'Exercício básico para abdômen. Contraia o abdômen e eleve o tronco.',
    videoUrl: 'https://www.youtube.com/embed/Xyd_fa5zoEU',
    sets: 3,
    reps: '15-20',
    duration: 4,
    calories: 25,
    equipment: [],
    muscleGroup: 'Abdômen',
    difficulty: 'beginner',
  },
  {
    id: 'ex10',
    name: 'Remada Curvada',
    description: 'Exercício composto para costas. Mantenha as costas retas e puxe a barra até o abdômen.',
    videoUrl: 'https://www.youtube.com/embed/kBWAon7ItDw',
    sets: 4,
    reps: '8-12',
    duration: 7,
    calories: 55,
    equipment: ['Barra', 'Anilhas'],
    muscleGroup: 'Costas',
    difficulty: 'intermediate',
    homeAlternative: 'Remada com elástico'
  },
];

export const freePlans: WorkoutPlan[] = [
  {
    id: 'free1',
    name: 'Iniciante em Casa',
    description: 'Treino básico de 15 minutos para começar sua jornada fitness',
    duration: '4 semanas',
    level: 'beginner',
    goal: 'health',
    location: 'home',
    isPremium: false,
    days: [
      {
        id: 'day1',
        day: 1,
        title: 'Corpo Todo - Iniciante',
        duration: 15,
        calories: 120,
        isPremium: false,
        exercises: [sampleExercises[0], sampleExercises[1], sampleExercises[2]]
      }
    ]
  },
  {
    id: 'free2',
    name: 'Alongamento Diário',
    description: 'Rotina de alongamento para melhorar flexibilidade',
    duration: '2 semanas',
    level: 'beginner',
    goal: 'health',
    location: 'home',
    isPremium: false,
    days: [
      {
        id: 'stretch1',
        day: 1,
        title: 'Alongamento Completo',
        duration: 10,
        calories: 40,
        isPremium: false,
        exercises: [sampleExercises[2]]
      }
    ]
  }
];

export const premiumPlans: WorkoutPlan[] = [
  {
    id: 'premium1',
    name: 'Hipertrofia Avançada',
    description: 'Programa completo de 12 semanas para ganho de massa muscular',
    duration: '12 semanas',
    level: 'advanced',
    goal: 'muscle',
    location: 'gym',
    isPremium: true,
    days: [
      {
        id: 'pday1',
        day: 1,
        title: 'Peito e Tríceps',
        duration: 60,
        calories: 450,
        isPremium: true,
        exercises: [sampleExercises[4], sampleExercises[0], sampleExercises[7]]
      },
      {
        id: 'pday2',
        day: 2,
        title: 'Costas e Bíceps',
        duration: 60,
        calories: 480,
        isPremium: true,
        exercises: [sampleExercises[5], sampleExercises[9], sampleExercises[6]]
      },
      {
        id: 'pday3',
        day: 3,
        title: 'Pernas Completo',
        duration: 70,
        calories: 520,
        isPremium: true,
        exercises: [sampleExercises[1], sampleExercises[5]]
      }
    ]
  },
  {
    id: 'premium2',
    name: 'HIIT Queima Gordura',
    description: 'Treinos intensos de 30 minutos para máxima queima calórica',
    duration: '8 semanas',
    level: 'intermediate',
    goal: 'fat_loss',
    location: 'home',
    isPremium: true,
    days: [
      {
        id: 'hiit1',
        day: 1,
        title: 'HIIT Cardio',
        duration: 30,
        calories: 350,
        isPremium: true,
        exercises: [sampleExercises[3], sampleExercises[1], sampleExercises[0]]
      },
      {
        id: 'hiit2',
        day: 2,
        title: 'HIIT Core',
        duration: 25,
        calories: 300,
        isPremium: true,
        exercises: [sampleExercises[2], sampleExercises[8], sampleExercises[3]]
      }
    ]
  },
  {
    id: 'premium3',
    name: 'Definição Muscular',
    description: 'Programa focado em definição e perda de gordura mantendo massa muscular',
    duration: '10 semanas',
    level: 'intermediate',
    goal: 'definition',
    location: 'gym',
    isPremium: true,
    days: [
      {
        id: 'def1',
        day: 1,
        title: 'Superior A',
        duration: 50,
        calories: 400,
        isPremium: true,
        exercises: [sampleExercises[4], sampleExercises[9], sampleExercises[6]]
      },
      {
        id: 'def2',
        day: 2,
        title: 'Inferior A',
        duration: 55,
        calories: 450,
        isPremium: true,
        exercises: [sampleExercises[1], sampleExercises[5]]
      }
    ]
  }
];

export const goalLabels = {
  muscle: 'Ganhar Massa Muscular',
  fat_loss: 'Perder Gordura',
  health: 'Melhorar Saúde',
  conditioning: 'Condicionamento',
  definition: 'Definição Muscular'
};

export const locationLabels = {
  gym: 'Academia',
  home: 'Casa'
};

export const levelLabels = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado'
};
