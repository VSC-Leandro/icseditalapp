import React, { useState } from 'react';
import { Award, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Search, Sparkles, SlidersHorizontal, Info } from 'lucide-react';

interface Criterion {
  id: string;
  title: string;
  type: 'eliminatory' | 'classificatory' | 'stage2';
  stage: 1 | 2;
  description: string;
  evaluatorLook: string;
  writingAdvice: string;
}

interface CriteriaTabsProps {
  onPromptClick: (prompt: string) => void;
}

export default function CriteriaTabs({ onPromptClick }: CriteriaTabsProps) {
  const [activeStage, setActiveStage] = useState<1 | 2>(1);
  const [expandedId, setExpandedId] = useState<string | null>('crit-protagonismo');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const criteria: Criterion[] = [
    // 1ª ETAPA
    {
      id: 'crit-estados',
      title: 'Localização nos estados elegíveis',
      type: 'eliminatory',
      stage: 1,
      description: 'As comunidades a serem atendidas pelo projeto proposto devem estar localizadas em AL, BA, CE, MG, PA, PB ou PE.',
      evaluatorLook: 'Se o CNPJ ou a comunidade está localizada fisicamente em municípios destes sete estados credenciados.',
      writingAdvice: 'Cite nominalmente o município, o estado e anexe (caso convidado na 2ª etapa) um comprovante de localização geográfica (coordenadas GPS) e histórico da comunidade.'
    },
    {
      id: 'crit-vuln',
      title: 'Identificação e vulnerabilidade das comunidades',
      type: 'eliminatory',
      stage: 1,
      description: 'Necessita identificar nominalmente as comunidades atendidas e demonstrar sua inequívoca vulnerabilidade socioeconômica e climática.',
      evaluatorLook: 'A caracterização precisa de quem são as pessoas, sua renda média estimada, acesso a saneamento, dependência de recursos naturais e histórico de desigualdades.',
      writingAdvice: 'Use dados oficiais do IBGE, secretarias municipais ou relatórios socioambientais locais para fundamentar os índices de extrema vulnerabilidade e fragilidade do grupo.'
    },
    {
      id: 'crit-protagonismo',
      title: 'Protagonismo comunitário nos processos decisórios',
      type: 'eliminatory',
      stage: 1,
      description: 'A proposta deve evidenciar que a comunidade lidera as tomadas de decisões, através de arranjos democráticos e conselhos locais, não figurando unicamente como beneficiários passivos.',
      evaluatorLook: 'Evidência de assembleias, atas assinaladas, lideranças femininas e jovens ativas e orçamentos gerenciados diretamente pelas cooperativas ou associações nativas.',
      writingAdvice: 'Descreva em um parágrafo as reuniões de escuta prévia, a comissão de fiscalização que as famílias criaram e como elas participarão da administração cotidiana dos recursos físicos.'
    },
    {
      id: 'crit-climatico',
      title: 'Caracterização dos impactos climáticos presentes e futuros',
      type: 'eliminatory',
      stage: 1,
      description: 'Descrever e avaliar as perdas, os danos climáticos já observados no território das comunidades e os cenários climáticos futuros previstos.',
      evaluatorLook: 'Coerência técnica: a associação precisa delimitar se o problema é enchente ou seca, a frequência com que ocorrem e a estimativa de impactos na agricultura ou moradia para as próximas décadas.',
      writingAdvice: 'Evite generalidades como "mudança global". Prefira: "Nos últimos 5 anos, o índice pluviométrico caiu 40%, secando 3 poços artesianos e inviabilizando a plantação de mandioca de 50 famílias de agricultores tradicionais."'
    },
    {
      id: 'crit-qualidade',
      title: 'Qualidade da solução proposta',
      type: 'classificatory',
      stage: 1,
      description: 'Consistência técnica e potencial das ações previstas para prevenir ou diminuir o impacto da ameaça climática assinalada no território.',
      evaluatorLook: 'Se a solução é apropriada (ex: cisterna de placas para seca, reflorestamento de encostas para deslizamentos).',
      writingAdvice: 'Alinhe a solução com tecnologias sociais já testadas e homologadas. Mostre que o desenho do projeto soluciona de forma definitiva ou resiliente o gargalo focado.'
    },
    {
      id: 'crit-viabilidade',
      title: 'Viabilidade de implementação',
      type: 'classificatory',
      stage: 1,
      description: 'Grau de factibilidade técnica, operacional e financeira do projeto dentro do prazo e custos previstos.',
      evaluatorLook: 'Relação custo-benefício e se a OSC possui capacidade instalada prática ou recursos de apoio para cumprir o planejado.',
      writingAdvice: 'Mostre que o cronograma é realista perante as chuvas da região ou dificuldades logísticas em áreas isoladas. Diminua a dependência de autorizações burocráticas lentas do poder público no caminho das obras.'
    },
    {
      id: 'crit-sbn',
      title: 'Solução baseada na Natureza (SbN)',
      type: 'classificatory',
      stage: 1,
      description: 'Ações inspiradas ou apoiadas pela natureza que oferecem benefícios ambientais, sociais e econômicos adicionais para aumentar a resiliência.',
      evaluatorLook: 'Adoção de quintais produtivos, agrofloresta comunitária, recuperação de nascentes, bacias de infiltração, captação de água pluvial e telhados verdes.',
      writingAdvice: 'Destaque se o projeto foca em regeneração biológica. Mostre que em vez de barragens de concreto (infraestrutura cinza), você está usando manejo biológico integrado de solo e águas (SbN).'
    },
    {
      id: 'crit-ganhos',
      title: 'Resultados e ganhos multidimensionais',
      type: 'classificatory',
      stage: 1,
      description: 'Clareza na especificação dos ganhos sociais, econômicos e ambientais conexos gerados após a finalização.',
      evaluatorLook: 'Geração de renda paralela para mulheres, preservação da biodiversidade e segurança alimentar para crianças da comunidade tradicional.',
      writingAdvice: 'Não liste unicamente a resiliência física (infraestrutura). Detalhe os benefícios marginais, tais como conservação do solo, autonomia financeira feminina e promoção da saúde nutricional.'
    },
    {
      id: 'crit-replicabilidade',
      title: 'Potencial de replicabilidade',
      type: 'classificatory',
      stage: 1,
      description: 'Possibilidade das soluções propostas serem aproveitadas ou reaplicadas em outros territórios semelhantes do bioma.',
      evaluatorLook: 'A facilidade de copiar o modelo sem exigir equipamentos importados milionários ou suporte ultraespecializado permanente.',
      writingAdvice: 'Prepare um miniguia ou metodologia de código aberto. Enfatize que os materiais são locais e as capacitações serão gravadas e documentadas para que vizinhos copiem a tecnologia social.'
    },

    // 2ª ETAPA
    {
      id: 'crit-etapa2-trabalho',
      title: 'Adequação do plano de trabalho',
      type: 'stage2',
      stage: 2,
      description: 'Completude, clareza e qualidade técnica do plano geral com atribuições e mitigação de riscos operacionais e cambiais mapeados.',
      evaluatorLook: 'Detalhamento do plano se quem faz o que está expressamente documentado, sem margem a dúvidas organizacionais ou duplicidades.',
      writingAdvice: 'Identifique previamente pelo menos 3 riscos inerentes do projeto (por ex: inflação de insumos de construção ou rotatividade de voluntários) e apresente as respostas planejadas para cada um.'
    },
    {
      id: 'crit-etapa2-cronograma',
      title: 'Viabilidade do cronograma',
      type: 'stage2',
      stage: 2,
      description: 'Descrição lógica das entregas físicas, prazos limites, monitoramentos regulares e faxes de prestação de contas.',
      evaluatorLook: 'Se as macroetapas respeitam o prazo de 18 meses máximos de doação.',
      writingAdvice: 'Evite colocar todas as entregas pesadas para os últimos 2 meses. Seccione os empenhos e testes desde o início e preveja pelo menos 3 meses de buffers para atrasos fortuitos.'
    },
    {
      id: 'crit-etapa2-factibilidade',
      title: 'Factibilidade técnica e econômica e custo-benefício',
      type: 'stage2',
      stage: 2,
      description: 'Equilíbrio e coerência financeira. Os custos são realistas e adequados ao porte dos problemas climáticos locais?',
      evaluatorLook: 'Cotações de mercado consistentes, planilhas orçamentárias balanceadas sem sobrepreços e alocação máxima de taxas de administração.',
      writingAdvice: 'Realize pesquisas de preços locais autênticas de materiais e profissionais. Justifique custos anômalos pela distância geográfica ou estradas de terra precárias.'
    },
    {
      id: 'crit-etapa2-desenvolvimento',
      title: 'Contribuição para o desenvolvimento comunitário sustentável',
      type: 'stage2',
      stage: 2,
      description: 'Legado positivo do projeto: empoderamento socioeconômico comunitário e fortalecimento da governança própria a longo prazo.',
      evaluatorLook: 'Qual a capacidade do território de operar as benfeitorias após o término do dinheiro do iCS.',
      writingAdvice: 'Anexe termo preliminar de compromisso assinado pela Associação firmando que assumirão as manutenções das estruturas. Indique como as lideranças cobrarão pequenas taxas mensais para manutenção.'
    },
    {
      id: 'crit-etapa2-capacitacao',
      title: 'Métodos participativos e capacitação comunitária',
      type: 'classificatory',
      stage: 2,
      description: 'Inclusão de metodologias locais de auto-capacitação para empoderamento dos cooperados sobre adaptação climática sustentável.',
      evaluatorLook: 'Oficinas práticas ministradas por técnicos respeitando os saberes ancestrais das comunidades de terreiro rurais e costeiras.',
      writingAdvice: 'Descreva as dinâmicas de "Roda de Conversa" no planejamento, permitindo que anciãos ensinem padrões históricos de clima do Nordeste, fundindo-os à ciência meteorológica moderna.'
    },
    {
      id: 'crit-etapa2-sinergia',
      title: 'Sinergia com a urgência climática atual',
      type: 'stage2',
      stage: 2,
      description: 'Pertinência e conexão imediata das ações ante as situações meteorológicas extremas nacionais contemporâneas e globais.',
      evaluatorLook: 'Se o projeto responde a problemas já crônicos ou mitiga tragédias agudas de extrema relevância no momento.',
      writingAdvice: 'Relacione as ameaças locais identificadas com relatórios científicos do Painel Intergovernamental sobre Mudanças Climáticas (IPCC).'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredCriteria = criteria.filter((item) => {
    const matchesStage = item.stage === activeStage;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesType = true;
    if (typeFilter === 'eliminatory') matchesType = item.type === 'eliminatory';
    if (typeFilter === 'classificatory') matchesType = item.type === 'classificatory';
    if (typeFilter === 'stage2') matchesType = item.type === 'stage2';

    return matchesStage && matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Toggle Stage buttons */}
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto self-start">
          <button
            onClick={() => { setActiveStage(1); setExpandedId(null); }}
            className={`flex-1 md:flex-initial text-xs font-bold py-2 px-5 rounded-lg transition-all ${
              activeStage === 1
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            1ª Etapa (Formulário Inicial)
          </button>
          <button
            onClick={() => { setActiveStage(2); setExpandedId(null); }}
            className={`flex-1 md:flex-initial text-xs font-bold py-2 px-5 rounded-lg transition-all ${
              activeStage === 2
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            2ª Etapa (Proposta &amp; Documentos)
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
          {/* Searching input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Pesquisar critérios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Filtering types */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0 select-none ml-1.5" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="py-2 pr-3 pl-1 text-[11px] font-medium text-gray-600 bg-transparent border-0 focus:outline-none"
            >
              <option value="all">Todos os tipos</option>
              <option value="eliminatory">Apenas Eliminatórios</option>
              <option value="classificatory">Apenas Classificatórios</option>
              {activeStage === 2 && <option value="stage2">Apenas Requisitos da 2ª Etapa</option>}
            </select>
          </div>
        </div>
      </div>

      {/* Warnings & Context info */}
      {activeStage === 1 && (
        <div className="bg-red-50 border border-red-200/50 rounded-xl p-4 flex gap-3 text-red-950 items-start">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Alerta Crucial de Triagem:</strong> Os quatro primeiros critérios da 1ª etapa (<span className="font-semibold">Localização, Vulnerabilidade, Protagonismo Comunitário, e Impactos Climáticos</span>) são <strong className="font-semibold text-red-700">estritamente eliminatórios</strong>. Caso a banca não encontre descrição expressa e consistente para qualquer um destes pilares, a proposta será sumariamente desqualificada com nota zero, sem chance de reavaliação.
          </div>
        </div>
      )}

      {activeStage === 2 && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 text-emerald-950 items-start">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">
            <strong className="font-bold">Avaliação Multidimensional iCS:</strong> Na segunda etapa, o comitê busca compor portfólios diversificados e complementares. O iCS prioriza manter a equidade territorial de projetos e o equilíbrio de biomas e comunidades atendidas, além da pura conformidade orçamentária de mercado.
          </div>
        </div>
      )}

      {/* Criteria Accordion List */}
      <div className="space-y-3.5">
        {filteredCriteria.length > 0 ? (
          filteredCriteria.map((criterion) => {
            const isExpanded = expandedId === criterion.id;
            return (
              <div 
                key={criterion.id} 
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
                  isExpanded ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'border-gray-100 hover:border-gray-200 shadow-xs'
                }`}
              >
                {/* Header */}
                <div 
                  onClick={() => toggleExpand(criterion.id)}
                  className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md self-start ${
                      criterion.type === 'eliminatory'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : criterion.type === 'classificatory'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      {criterion.type === 'eliminatory' ? 'Eliminatório' : criterion.type === 'classificatory' ? 'Classificatório' : 'Etapa 2 Completa'}
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 mt-1 sm:mt-0">{criterion.title}</h4>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>

                {/* Body Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-gray-50 bg-stone-50/45 text-xs text-gray-700 space-y-4">
                    <div>
                      <h5 className="font-bold text-purple-950 uppercase tracking-wide text-[10px] mb-1">O que descrever no formulário:</h5>
                      <p className="leading-relaxed text-gray-600">{criterion.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5">
                      <div className="bg-white border border-gray-100 p-3.5 rounded-lg space-y-1 shadow-2xs">
                        <h6 className="font-semibold text-emerald-700 flex items-center gap-1.5 mb-1 text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                          O que o Avaliador Busca?
                        </h6>
                        <p className="text-[11px] leading-relaxed text-gray-500">{criterion.evaluatorLook}</p>
                      </div>

                      <div className="bg-white border border-gray-100 p-3.5 rounded-lg space-y-1 shadow-2xs">
                        <h6 className="font-semibold text-amber-700 flex items-center gap-1.5 mb-1 text-[11px]">
                          <Info className="w-3.5 h-3.5 text-amber-500" />
                          Ideia de como redigir:
                        </h6>
                        <p className="text-[11px] leading-relaxed text-gray-500">{criterion.writingAdvice}</p>
                      </div>
                    </div>

                    {/* Quick action specific drafts */}
                    {criterion.id === 'crit-protagonismo' && (
                      <div className="pt-2">
                        <button
                          onClick={() => onPromptClick('Como fortalecer o critério de protagonismo comunitário na proposta do Edital iCS 05/2026?')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          Analisar meu texto sobre Protagonismo Comunitário no Chat ↗
                        </button>
                      </div>
                    )}

                    {criterion.id === 'crit-sbn' && (
                      <div className="pt-2">
                        <button
                          onClick={() => onPromptClick('O que são Soluções baseadas na Natureza no contexto do Edital iCS 05/2026?')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-colors"
                        >
                          Ver exemplos de Soluções baseadas na Natureza aplicáveis ↗
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-400">
            <p className="text-sm">Nenhum critério encontrado com os filtros atuais.</p>
            <button 
              onClick={() => { setSearchQuery(''); setTypeFilter('all'); }} 
              className="text-xs text-emerald-600 font-bold hover:underline mt-2"
            >
              Excluir todos os filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
