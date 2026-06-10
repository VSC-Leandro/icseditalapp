import React from 'react';
import { Calendar, CircleCheck, Info, X, MapPin, TreePine, Home, Sprout, Landmark, Waves, AlertTriangle, CreditCard, Award, ArrowUpRight } from 'lucide-react';
import { TimelineEvent } from '../types';

interface SubmissionGuideProps {
  onPromptClick: (prompt: string) => void;
}

export default function SubmissionGuide({ onPromptClick }: SubmissionGuideProps) {
  const timelineEvents: TimelineEvent[] = [
    {
      id: '1',
      label: 'Abertura do Edital',
      date: '01 de Junho de 2026',
      status: 'past',
      details: 'Lançamento oficial e abertura do período de envio das intenções em formato simplificado.',
    },
    {
      id: '2',
      label: 'Prazo para Dúvidas (1ª Etapa)',
      date: 'até 25 de Junho de 2026',
      status: 'current',
      details: 'Envio de dúvidas via edital@climaesociedade.org com o assunto "Edital 05".',
      highlight: true,
    },
    {
      id: '3',
      label: 'Prazo de Inscrição (1ª Etapa)',
      date: '01 de Julho de 2026, até 16h',
      status: 'future',
      details: 'Envio obrigatório através do link ics.fluxx.io/apply/ed05. Apenas via formulário web.',
    },
    {
      id: '4',
      label: 'Divulgação dos Pré-Selecionados',
      date: '11 de Agosto de 2026',
      status: 'future',
      details: 'Até 20 organizações serão convidadas para detalhar a proposta na próxima etapa.',
    },
    {
      id: '5',
      label: 'Prazo para Dúvidas (2ª Etapa)',
      date: 'até 07 de Setembro de 2026',
      status: 'future',
      details: 'Tire dúvidas sobre os formulários financeiros e documentação detalhada.',
    },
    {
      id: '6',
      label: 'Envio das Propostas Completas',
      date: '11 de Setembro de 2026',
      status: 'future',
      details: 'Para as pré-selecionadas. Exige planos detalhados de orçamento, cronograma e cartas da comunidade.',
    },
    {
      id: '7',
      label: 'Publicação dos Aprovados Finais',
      date: '14 de Outubro de 2026',
      status: 'future',
      details: 'Divulgação do portfólio definitivo de projetos que receberão os recursos.',
    }
  ];

  const states = [
    { name: 'Alagoas', code: 'AL' },
    { name: 'Bahia', code: 'BA' },
    { name: 'Ceará', code: 'CE' },
    { name: 'Minas Gerais', code: 'MG' },
    { name: 'Pará', code: 'PA' },
    { name: 'Paraíba', code: 'PB' },
    { name: 'Pernambuco', code: 'PE' }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards (Recursos) */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          Recursos &amp; Condições Gerais
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs transition-hover hover:border-emerald-200">
            <span className="text-xs text-gray-400 font-mono block uppercase">Recurso Total</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-1">R$ 4.000.000</span>
            <span className="text-xs text-gray-500 mt-1 block">Fundo total para este certame</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs transition-hover hover:border-emerald-200">
            <span className="text-xs text-gray-400 font-mono block uppercase">Faixa por Projeto</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-1">R$ 200 mil – R$ 700 mil</span>
            <span className="text-xs text-gray-500 mt-1 block">Adeque o escopo ao valor</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs transition-hover hover:border-emerald-200">
            <span className="text-xs text-gray-400 font-mono block uppercase">Prazo de Execução</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-1">Até 18 meses</span>
            <span className="text-xs text-gray-500 mt-1 block">Cronograma + 1 relatório final</span>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs transition-hover hover:border-emerald-200">
            <span className="text-xs text-gray-400 font-mono block uppercase">Modalidade</span>
            <span className="text-xl font-extrabold text-emerald-700 block mt-1">Doação Livre</span>
            <span className="text-xs text-gray-500 mt-1 block">Não reembolsável de fomento direto</span>
          </div>
        </div>
      </div>

      {/* Grid: Cronograma + Seleção */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cronograma Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Cronograma do Edital
            </h3>
            
            <div className="relative pl-6 border-l border-emerald-100 space-y-8">
              {timelineEvents.map((event) => (
                <div key={event.id} className="relative group">
                  {/* Dot */}
                  <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-transform group-hover:scale-125 ${
                    event.status === 'past' 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : event.status === 'current'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200'
                  }`} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        {event.label}
                        {event.highlight && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-medium">
                            Atenção
                          </span>
                        )}
                        {event.status === 'current' && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-medium animate-pulse">
                            Fase atual
                          </span>
                        )}
                      </h4 >
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{event.details}</p>
                    </div>
                    <span className={`text-xs font-mono font-bold whitespace-nowrap sm:text-right mt-1 sm:mt-0 ${
                      event.status === 'past' ? 'text-gray-400 line-through' : 'text-emerald-700'
                    }`}>
                      {event.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Co-eligibility Column */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-600" />
              Quem Pode se Inscrever?
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <CircleCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="inline-block bg-emerald-50 text-emerald-700 text-[11px] px-2 py-0.5 rounded font-bold mb-1">
                    Elegível
                  </span>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed">
                    Organizações da Sociedade Civil (OSCs) e Associações Comunitárias com CNPJ ativo.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="inline-block bg-sky-50 text-sky-700 text-[11px] px-2 py-0.5 rounded font-bold mb-1">
                    Apenas Parceiras
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Universidades, faculdades e institutos de pesquisa podem participar como parceiros técnicos, nunca diretamente como proponentes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="inline-block bg-red-50 text-red-700 text-[11px] px-2 py-0.5 rounded font-bold mb-1">
                    Vedado / Não elegíveis
                  </span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Empresas com fins lucrativos, órgãos públicos, fundações públicas ou governamentais, igrejas e templos, cooperativas e partidos políticos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200/70 rounded-2xl p-6">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Estados Elegíveis
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {states.map((state) => (
                <span key={state.code} className="bg-white border border-stone-200 text-stone-800 text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  {state.name} ({state.code})
                </span>
              ))}
            </div>
            <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
              As comunidades tradicionais ou periféricas a serem beneficiadas devem estar localizadas estritamente nestes estados do Brasil.
            </p>
          </div>
        </div>
      </div>

      {/* Communities & Adaptation Impacts */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-emerald-600" />
          Comunidades Foco &amp; Impactos Climáticos
        </h3>
        
        <p className="text-sm text-gray-600 mb-6 max-w-4xl">
          Os territórios participantes devem apresentar alta vulnerabilidade socioeconômica e climática severa. O edital aceita focos comprovados de prevenção e adaptação frente aos seguintes cenários climáticos de perdas e danos:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center transition-hover hover:bg-emerald-50">
            <TreePine className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <span className="font-semibold text-xs text-emerald-900 block">Indígenas</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center transition-hover hover:bg-emerald-50">
            <Home className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <span className="font-semibold text-xs text-emerald-900 block">Quilombolas</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center transition-hover hover:bg-emerald-50">
            <Sprout className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <span className="font-semibold text-xs text-emerald-900 block">Rurais Tradicionais</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center transition-hover hover:bg-emerald-50">
            <Landmark className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <span className="font-semibold text-xs text-emerald-900 block">Periferias Urbanas</span>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 text-center transition-hover hover:bg-emerald-50">
            <Waves className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
            <span className="font-semibold text-xs text-emerald-900 block">Costeiras / Marisqueiras</span>
          </div>
        </div>

        <div className="bg-amber-50/45 border border-amber-200/60 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold">Ameaças Climáticas Consideradas: </strong> Ondas de calor extremo, secas prolongadas, enchentes/inundações, deslizamento de encostas e incêndios florestais agravados pelo estresse hídrico. A proposta deve apresentar provas históricas ou cenários de risco iminente para a sobrevivência e conservação local na área.
          </div>
        </div>
      </div>

      {/* Regras Financeiras */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          Regras Financeiras Cruciais
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="space-y-4">
            <div className="flex gap-3 text-xs leading-relaxed">
              <span className="w-5 h-5 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center font-bold font-mono">1</span>
              <div>
                <strong className="font-semibold text-gray-900 block mb-0.5">Conta com CNPJ PJ</strong>
                Os depósitos devem ser recebidos em conta bancária corporativa aberta exclusiva/principal da própria OSC proponente ou de sua organização interveniente financeira autorizada.
              </div>
            </div>
            
            <div className="flex gap-3 text-xs leading-relaxed">
              <span className="w-5 h-5 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center font-bold font-mono">2</span>
              <div>
                <strong className="font-semibold text-gray-900 block mb-0.5">Sem Necessidade de Conta Específica</strong>
                Não há obrigatoriedade legal de abrir uma conta nova no banco apenas para o projeto, desde que o controle contábil identifique as movimentações de forma segregada.
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 text-xs leading-relaxed">
              <span className="w-5 h-5 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center font-bold font-mono">3</span>
              <div>
                <strong className="font-semibold text-gray-900 block mb-0.5">Limites das Despesas Administrativas (Taxa Administrativa)</strong>
                As taxas de administração internas da OSC executora estão limitadas a <strong className="text-emerald-700 font-bold">15%</strong> do repasse total do edital. Se houver gestora interveniente financeira, a comissão dela está fixada em no máximo <strong className="text-emerald-700 font-bold">10%</strong>.
              </div>
            </div>

            <div className="flex gap-3 text-xs leading-relaxed">
              <span className="w-5 h-5 bg-stone-100 text-stone-700 rounded-full flex items-center justify-center font-bold font-mono">4</span>
              <div>
                <strong className="font-semibold text-gray-900 block mb-0.5">Condição de Liberação da 2ª Parcela</strong>
                A liberação do segundo aporte financeiro depende da aprovação formal de um relatório contábil/financeiro intermediário, comprovando o gasto de no mínimo <strong className="text-emerald-700 font-bold">70%</strong> da primeira parcela.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200/50 rounded-xl p-4 flex gap-3.5 items-start text-xs text-red-950">
          <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Probição expressa:</strong> É estritamente vedado o saque integral de recursos em espécie, assim como transferências e depósitos diretos para contas físicas pessoais de diretores, coordenadores e membros das OSCs. Tudo deve ser lastreado em notas fiscais, recibos e guias PJ.
          </div>
        </div>
      </div>

      {/* Botões de Ação para o Chat de Suporte */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-gray-950 text-base mb-2">Ficou com alguma dúvida sobre as regras de submissão?</h3>
        <p className="text-xs text-emerald-800 mb-4 max-w-lg mx-auto">Use nossas buscas e análises automatizadas do edital. Clique abaixo para enviar uma pergunta rápida para o nosso Assistente de Projeto:</p>
        
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => onPromptClick('Como fortalecer o critério de protagonismo comunitário na proposta do Edital iCS 05/2026?')}
            className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 hover:border-emerald-300 text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors duration-150 shadow-xs font-medium"
          >
            Fortalecer protagonismo comunitário
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>

          <button
            onClick={() => onPromptClick('O que são Soluções baseadas na Natureza no contexto do Edital iCS 05/2026?')}
            className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 hover:border-emerald-300 text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors duration-150 shadow-xs font-medium"
          >
            O que são SbN no Edital?
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>

          <button
            onClick={() => onPromptClick('Quais documentos preciso preparar para a segunda etapa do Edital iCS 05/2026?')}
            className="bg-white hover:bg-emerald-100 text-emerald-950 border border-emerald-200/80 hover:border-emerald-300 text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 transition-colors duration-150 shadow-xs font-medium"
          >
            Checklist de documentos (etapa 2)
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
