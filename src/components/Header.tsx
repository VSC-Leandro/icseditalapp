import React from 'react';
import { Calendar, HelpCircle, Shield, Award, Sparkles, TrendingUp } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'guia', label: 'Guia de Submissão', icon: Calendar },
    { id: 'criterios', label: 'Critérios de Avaliação', icon: Award },
    { id: 'elegibilidade', label: 'Simulador de Elegibilidade', icon: Shield },
    { id: 'orcamento', label: 'Simulador de Orçamento', icon: TrendingUp },
    { id: 'checklist', label: 'Documentos & Checklist', icon: HelpCircle },
  ];

  return (
    <header className="bg-emerald-950 text-white shadow-xl relative overflow-hidden">
      {/* Background organic gradients */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-emerald-500 rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 bg-teal-500 rounded-full opacity-15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-mono border border-emerald-500/30 flex items-center gap-1.5 dynamic-badge">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Edital iCS nº 05/2026
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full font-mono border border-amber-500/30">
                Inscrições abertas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans text-emerald-50">
              Guia do Proponente iCS
            </h1>
            <p className="text-emerald-200/85 text-sm sm:text-base mt-1 max-w-2xl font-light">
              Prepare sua candidatura para resiliência climática comunitária. Simule elegibilidade, organize orçamentos e valide critérios de seleção.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="bg-emerald-900/50 border border-emerald-800 rounded-lg py-1.5 px-3.5 text-right font-mono text-xs sm:text-sm">
              <span className="block text-emerald-400 font-medium">Prazo 1ª Etapa</span>
              <span className="text-white font-semibold">01 de Julho de 2026, às 16h</span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex overflow-x-auto scrollbar-none mt-8 -mb-6 pb-2 sm:pb-0 sm:mb-0 gap-1.5 border-b border-emerald-800/45">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-all duration-200 whitespace-nowrap border-b-2 tracking-wide ${
                  isActive
                    ? 'border-emerald-400 text-emerald-300 bg-emerald-900/35'
                    : 'border-transparent text-emerald-200/70 hover:text-white hover:bg-emerald-900/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-emerald-200/60'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
