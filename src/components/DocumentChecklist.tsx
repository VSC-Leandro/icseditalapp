import React, { useState, useEffect } from 'react';
import { ClipboardList, CheckSquare, Square, Info, ShieldAlert, Sparkles, FolderDown, RotateCcw, Cloud, BookmarkCheck } from 'lucide-react';
import { ChecklistItem } from '../types';

export default function DocumentChecklist() {
  const defaultItems: ChecklistItem[] = [
    // ETAPA 1
    {
      id: 'doc-form1',
      text: 'Preenchimento do Formulário Online da Intenção',
      completed: false,
      stage: 1,
      required: true,
      tip: 'Submeter exclusivamente via ics.fluxx.io/apply/ed05 antes de 01 de julho de 2026 às 16h.'
    },
    {
      id: 'doc-noattach',
      text: 'Validação da ausência de anexos (Fase 1)',
      completed: true,
      stage: 1,
      required: false,
      tip: 'Nenhum documento físico ou anexo em PDF é permitido na 1ª etapa de triagem. Apenas o preenchimento de campos texto.'
    },

    // ETAPA 2
    {
      id: 'doc-estatuto',
      text: 'Estatuto da Organização registrado em cartório',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Deve conter vigência de tempo indeterminada e objetivos sociais coerentes com defesa ambiental ou direitos comunitários.'
    },
    {
      id: 'doc-cnpj',
      text: 'Cartão de inscrição do CNPJ ativo',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Comprovante emitido pela Receita Federal, sem pendências ou suspensões operacionais de idoneidade.'
    },
    {
      id: 'doc-ata-diretoria',
      text: 'Ata de posse da atual diretoria da OSC registrada',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Comprova quem são os legítimos representantes legais da OSC assinando o fomento.'
    },
    {
      id: 'doc-contas',
      text: 'Demonstrativos e Balanço Contábil do ano anterior',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Ou demonstrativo financeiro simplificado assinado por contador habilitado comprovando gerência prévia.'
    },
    {
      id: 'doc-orc-iCS',
      text: 'Planilha orçamentária detalhada em formato iCS',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Deve ser preenchida seguindo as regras de alocação de equipe do iCS. Use nosso Simulador de Orçamento para validar os percentuais.'
    },
    {
      id: 'doc-cronograma',
      text: 'Planilha detalhada de Entregas e Atividades',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Contendo marcos trimestrais e plano de compras para o período de 18 meses máximos.'
    },
    {
      id: 'doc-cartas',
      text: 'Cartas com anuência / consentimento da comunidade',
      completed: false,
      stage: 2,
      required: true,
      tip: 'Documento assinado pelas famílias locais do território formalizando a anuência para as benfeitorias físicas do projeto.'
    },
    {
      id: 'doc-regularidade',
      text: 'Certidão de regularidade tributária (Federal/FGTS)',
      completed: false,
      stage: 2,
      required: false,
      tip: 'Opcional sob consulta do iCS, contudo agiliza expressivamente a auditoria interna dos pré-selecionados.'
    }
  ];

  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('ics_checklist');
      return saved ? JSON.parse(saved) : defaultItems;
    } catch {
      return defaultItems;
    }
  });

  useEffect(() => {
    localStorage.setItem('ics_checklist', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleResetChecklist = () => {
    if (window.confirm('Tem certeza que deseja resetar os dados do checklist de documentos?')) {
      setItems(defaultItems);
    }
  };

  const handleCheckAllInStage = (stage: 1 | 2) => {
    setItems(items.map(item => item.stage === stage ? { ...item, completed: true } : item));
  };

  const currentStageItems = (stage: 1 | 2) => items.filter(item => item.stage === stage);
  const completedCount = (stage: 1 | 2) => currentStageItems(stage).filter(item => item.completed).length;
  const totalCount = (stage: 1 | 2) => currentStageItems(stage).length;

  return (
    <div className="space-y-6">
      
      {/* 1ª Etapa Card Check */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-normal">
                Checklist da 1ª Etapa — Inscrição da Intenção
              </h3>
              <p className="text-[11px] text-gray-400">Totalmente online, simplificado e sem anexos.</p>
            </div>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-mono font-bold py-1 px-3 rounded-full shrink-0">
            {completedCount(1)} / {totalCount(1)} concluídos
          </span>
        </div>

        <div className="space-y-3">
          {currentStageItems(1).map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                item.completed 
                  ? 'border-emerald-200 bg-emerald-50/20 text-gray-800' 
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
              )}
              
              <div className="flex-1 space-y-1">
                <span className="font-bold text-xs text-gray-900 block flex items-center gap-1.5 leading-relaxed">
                  {item.text}
                  {item.required && (
                    <span className="bg-red-100 text-red-800 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md">
                      Obrigatório
                    </span>
                  )}
                </span>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2ª Etapa Documental Check */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4 gap-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <h3 className="text-base font-bold text-gray-900 leading-normal">
                Checklist de Documentação da 2ª Etapa (Aprofundada)
              </h3>
              <p className="text-[11px] text-gray-400">Somente para proponentes convidados após pré-seleção.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleCheckAllInStage(2)}
              className="text-[11px] hover:text-emerald-700 text-emerald-600 font-bold hover:underline py-1 px-1 transition-colors"
            >
              Marcar todos
            </button>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-mono font-bold py-1 px-3 rounded-full">
              {completedCount(2)} / {totalCount(2)} concluídos
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {currentStageItems(2).map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                item.completed 
                  ? 'border-emerald-200 bg-emerald-50/20 text-gray-800' 
                  : 'border-gray-100 hover:bg-gray-50'
              }`}
            >
              {item.completed ? (
                <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <Square className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
              )}
              
              <div className="flex-1 space-y-1">
                <span className="font-bold text-xs text-gray-900 block flex items-center gap-1.5 leading-relaxed">
                  {item.text}
                  {item.required && (
                    <span className="bg-red-50 text-red-700 border border-red-100 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                      Exigido
                    </span>
                  )}
                </span>
                <p className="text-[11px] text-gray-500 leading-relaxed font-light">{item.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regularization alerts */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 text-rose-950 items-start">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong className="font-bold">Atenção com Documentação Pendente:</strong> Caso sua organização possua alguma pendência de estatuto ou relatórios com chamadas anteriores do iCS, você poderá sim classificar e avançar para a 1ª etapa, mas o repasse na 2ª etapa fica <strong className="font-semibold text-rose-700">estritamente condicionado</strong> à total regularização antes da assinatura de fomento. Use esse tempo prévio para tirar segundas vias.
          </div>
        </div>
      </div>

      {/* Checklist toolactions buttons */}
      <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
        <button
          onClick={handleResetChecklist}
          className="border border-gray-200 hover:border-gray-300 hover:text-gray-900 bg-white text-gray-500 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Resetar Lista
        </button>

        <span className="text-[11px] text-gray-400 font-mono flex items-center gap-1">
          <Cloud className="w-3.5 h-3.5 text-gray-300" />
          Dados salvos localmente na sessão do navegador.
        </span>
      </div>
    </div>
  );
}
