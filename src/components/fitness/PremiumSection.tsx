'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Zap, TrendingUp, Users, Video, Apple, Calendar } from 'lucide-react';

export default function PremiumSection() {
  const plans = [
    {
      name: 'Mensal',
      price: 'R$ 29,90',
      period: '/mês',
      savings: null,
      popular: false,
    },
    {
      name: 'Trimestral',
      price: 'R$ 24,90',
      period: '/mês',
      savings: 'Economize 17%',
      popular: true,
    },
    {
      name: 'Anual',
      price: 'R$ 19,90',
      period: '/mês',
      savings: 'Economize 33%',
      popular: false,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Planos Avançados',
      description: 'Acesso a mais de 50 programas de treino especializados',
    },
    {
      icon: Video,
      title: 'Vídeos Exclusivos',
      description: 'Biblioteca completa com demonstrações em HD',
    },
    {
      icon: Apple,
      title: 'Dietas Personalizadas',
      description: 'Planos nutricionais adaptados ao seu objetivo',
    },
    {
      icon: TrendingUp,
      title: 'Análise Avançada',
      description: 'Gráficos e relatórios detalhados de progresso',
    },
    {
      icon: Calendar,
      title: 'Ajuste Automático',
      description: 'Treinos que evoluem com você semanalmente',
    },
    {
      icon: Users,
      title: 'Comunidade Premium',
      description: 'Grupo exclusivo com suporte e motivação',
    },
  ];

  const premiumPrograms = [
    'HIIT Avançado',
    'Hipertrofia Completa',
    'Definição Muscular',
    'Treino de Glúteos',
    'Core & Abdômen',
    'Mobilidade & Flexibilidade',
    'Força Funcional',
    'Cardio Intenso',
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white text-center">
        <Crown className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Desbloqueie Todo o Seu Potencial
        </h1>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          Transforme seu corpo com acesso ilimitado a treinos profissionais, 
          dietas personalizadas e acompanhamento completo
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.title} className="border-2 hover:border-orange-300 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-lg">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Escolha Seu Plano</h2>
          <p className="text-gray-600">Cancele quando quiser, sem compromisso</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative ${
                plan.popular 
                  ? 'border-4 border-orange-500 shadow-xl scale-105' 
                  : 'border-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                    Mais Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                {plan.savings && (
                  <Badge variant="outline" className="mt-2 border-green-500 text-green-700">
                    {plan.savings}
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                      : 'bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600'
                  } text-white`}
                >
                  Assinar Agora
                </Button>
                <p className="text-xs text-center text-gray-600">
                  Cobrado {plan.name === 'Mensal' ? 'mensalmente' : plan.name === 'Trimestral' ? 'trimestralmente' : 'anualmente'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Premium Programs */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Programas Premium Inclusos
          </CardTitle>
          <CardDescription>
            Acesso completo a todos estes programas especializados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {premiumPrograms.map((program) => (
              <div 
                key={program}
                className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200"
              >
                <Check className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-sm font-medium">{program}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparação de Planos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { feature: 'Treinos básicos', free: true, premium: true },
              { feature: 'Vídeos demonstrativos', free: 'Limitado', premium: 'Ilimitado' },
              { feature: 'Planos avançados', free: false, premium: true },
              { feature: 'Dietas personalizadas', free: false, premium: true },
              { feature: 'Ajuste automático semanal', free: false, premium: true },
              { feature: 'Análise de progresso', free: 'Básica', premium: 'Avançada' },
              { feature: 'Suporte prioritário', free: false, premium: true },
              { feature: 'Comunidade exclusiva', free: false, premium: true },
            ].map((item) => (
              <div key={item.feature} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="text-gray-700">{item.feature}</span>
                <div className="flex gap-8">
                  <div className="w-20 text-center">
                    {typeof item.free === 'boolean' ? (
                      item.free ? (
                        <Check className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )
                    ) : (
                      <span className="text-sm text-gray-600">{item.free}</span>
                    )}
                  </div>
                  <div className="w-20 text-center">
                    {typeof item.premium === 'boolean' ? (
                      item.premium ? (
                        <Check className="w-5 h-5 text-orange-600 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )
                    ) : (
                      <span className="text-sm font-medium text-orange-600">{item.premium}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-orange-50">
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-1">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-gray-700">
              Sim! Você pode cancelar sua assinatura quando quiser, sem taxas ou multas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Como funciona o período de teste?</h4>
            <p className="text-sm text-gray-700">
              Oferecemos 7 dias de teste gratuito para você experimentar todos os recursos premium.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Os treinos funcionam para iniciantes?</h4>
            <p className="text-sm text-gray-700">
              Sim! Temos programas específicos para todos os níveis, de iniciante a avançado.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Preciso de equipamentos?</h4>
            <p className="text-sm text-gray-700">
              Não necessariamente. Oferecemos alternativas para treinar em casa sem equipamentos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">
          Comece Sua Transformação Hoje
        </h2>
        <p className="text-lg mb-6 text-white/90">
          Junte-se a milhares de pessoas que já transformaram seus corpos
        </p>
        <Button 
          size="lg"
          className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
        >
          Experimentar 7 Dias Grátis
        </Button>
        <p className="text-sm mt-4 text-white/80">
          Sem compromisso • Cancele quando quiser
        </p>
      </div>
    </div>
  );
}
