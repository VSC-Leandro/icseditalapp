import React, { useState } from 'react';
import Header from './components/Header';
import SubmissionGuide from './components/SubmissionGuide';
import CriteriaTabs from './components/CriteriaTabs';
import EligibilitySimulator from './components/EligibilitySimulator';
import BudgetCalculator from './components/BudgetCalculator';
import DocumentChecklist from './components/DocumentChecklist';
import ChatHelper from './components/ChatHelper';
import { Sparkles, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('guia');
  const [externalPrompt, setExternalPrompt] = useState<string | undefined>(undefined);

  const handlePromptTrigger = (prompt: string) => {
    setExternalPrompt(prompt);
    // Smooth scroll support on mobile to chat helper if needed
    const chatElement = document.getElementById('chat-container');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'guia':
        return <SubmissionGuide onPromptClick={handlePromptTrigger} />;
      case 'criterios':
        return <CriteriaTabs onPromptClick={handlePromptTrigger} />;
      case 'elegibilidade':
        return <EligibilitySimulator />;
      case 'orcamento':
        return <BudgetCalculator />;
      case 'checklist':
        return <DocumentChecklist />;
      default:
        return <SubmissionGuide onPromptClick={handlePromptTrigger} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800 flex flex-col antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Action tab viewport */}
          <div className="lg:col-span-2 space-y-6">
            <div className="transition-all duration-200">
              {renderActiveTab()}
            </div>
          </div>

          {/* Interactive Chat Helper Panel */}
          <div id="chat-container" className="lg:col-span-1 lg:sticky lg:top-6 space-y-4">
            <ChatHelper 
              externalPrompt={externalPrompt} 
              clearExternalPrompt={() => setExternalPrompt(undefined)} 
            />
            
            {/* Context/Credit card */}
            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed text-gray-500">
                <span className="font-semibold text-gray-800 block mb-0.5">Sobre o Guia do Proponente:</span>
                Esta plataforma interativa de assistência foi projetada para apoiar Organizações Não Governamentais (ONGs) e Associações Comunitárias a preparem candidaturas sólidas ao Edital iCS nº 05/2026. Todas as regras e percentuais contidos nos simuladores estão estritamente em conformidade com as diretivas oficiais do Instituto Clima e Sociedade.
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <footer className="bg-emerald-950 border-t border-emerald-900 py-8 mt-12 text-center text-emerald-300/60 text-xs">
        <div className="max-w-7xl mx-auto px-4">
          <p>© 2026 Guia do Proponente — Edital iCS nº 05/2026.</p>
          <p className="mt-1 font-light">Todas as marcas e conteúdos do Edital nº 05 são de exclusiva propriedade e tutela jurídica do Instituto Clima e Sociedade (iCS).</p>
        </div>
      </footer>
    </div>
  );
}
