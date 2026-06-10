import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, MessageSquare, Bot, ArrowRight, CornerDownLeft, RotateCcw } from 'lucide-react';
import { Message } from '../types';

interface ChatHelperProps {
  externalPrompt?: string;
  clearExternalPrompt?: () => void;
}

export default function ChatHelper({ externalPrompt, clearExternalPrompt }: ChatHelperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Olá! Sou a Assistente Virtual do Edital iCS nº 05/2026. Estou aqui para ajudar sua organização a planejar a proposta de resiliência climática comunitária.\n\nComo posso ajudar você hoje? Clique em um dos botões rápidos ou descreva sua dúvida abaixo.',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-made answers database
  const knowledgeBase: { [key: string]: string } = {
    'como fortalecer o critério de protagonismo comunitário na proposta do edital ics 05/2026?': `### Como Fortalecer o Protagonismo Comunitário ✊

Este é um dos critérios **eliminatórios mais rigorosos** da 1ª etapa. Para obter nota máxima, sua proposta deve deixar claro que a comunidade tradicional ou periférica não é apenas beneficiária passiva das obras, mas **lidera ativamente os processos decisórios**.

#### Estratégias recomendadas para redigir sua resposta:
1. **Descreva Escutas e Consultas Prévias**: Escreva como a proposta nasceu do diálogo com as famílias locais (por exemplo, "Foram realizadas três assembleias gerais em maio de 2026 para deliberar sobre as captações de água").
2. **Arranjos Co-gestão**: Explique como será composto o comitê local de acompanhamento físico do projeto (com representatividade comprovada de mulheres e jovens).
3. **Mão de Obra e Gestão Financeira Local**: Priorize a contratação de profissionais da própria comunidade para a execução e detalhe como a comunidade será treinada para operar e manter as tecnologias e infraestruturas criadas de forma soberana e autônoma.

*Dica iCS: Evite falar "nós daremos treinamento para eles". Prefira termos de aglutinação horizontal como "o projeto construirá de forma colaborativa com as lideranças o diagnóstico de resiliência territorial".*`,

    'o que são soluções baseadas na natureza no contexto do edital ics 05/2026?': `### Soluções baseadas na Natureza (SbN) 🍃

No Edital iCS 05/2026, as **Soluções baseadas na Natureza (SbN)** são extremamente valorizadas e conferem pontuação adicional classificatória significativa na 1ª Etapa de avaliação. Elas são definidas como ações voltadas a proteger, gerenciar de forma sustentável e restaurar ecossistemas, respondendo aos desafios climáticos de forma multifuncional.

#### Exemplos práticos aplicáveis ao Edital:
- **Quintais Agroflorestais Produtivos**: Implementação de cultivos consorciados de árvores nativas com hortaliças e pastos, retendo umidade no solo do semiárido e garantindo segurança alimentar frente ao calor extremo.
- **Recuperação de Microbacias e Nascentes**: Recuperação da vegetação ripária de corregos comunitários com isolamento contra gado e construção de bacias de retenção pluvial em nível.
- **Saneamento Biológico Descentralizado**: Tratamento e reutilização ecológica de esgoto doméstico de comunidades rurais (ex: fossas de bananeiras) para irrigação.
- **Infraestruturas Verdes**: Telhados e paredes vivas para resfriamento térmico de galpões comunitários de assentamentos em áreas sob calor extremo.

*Essas medidas substituem a "infraestrutura cinza convencional" (ex: barragens massivas de concreto) por soluções integradas e regenerativas com menor custo operacional local.*`,

    'quais documentos preciso preparar para a segunda etapa do edital ics 05/2026?': `### Checklist de Documentos para a 2ª Etapa 📋

Se a sua organização for pré-selecionada (até 20 propostas serão convidadas), você precisará fornecer documentos formais para a auditoria de Parcerias iCS.

#### Prepare desde já os seguintes arquivos:
1. **Estatuto Social Atualizado**: Registrado em cartório contendo finalidade não lucrativa e defesa ambiental/civil.
2. **Cartão CNPJ Ativo**: Regularizado junto à Receita Federal.
3. **Ata de Posse da Diretoria**: Atualizada e registrada em cartório de títulos de pessoas jurídicas.
4. **Demonstrativo Contábil e Balanço Patrimonial**: Do último exercício fiscal fechado (ano anterior).
5. **Planilha Orçamentária Detalhada (Padrão iCS)**: Conforme o teto financeiro definido.
6. **Planilha de Entregas e Marcos Trimestrais**: Para o cronograma de 18 meses.
7. **Cartas de Anuência Comunitária**: Assinatura das lideranças legítimas das comunidades certificando autorização e desejo para receber o projeto.`,

    'quero mais detalhes sobre os critérios de avaliação do edital ics 05/2026': `### Critérios de Avaliação Detalhados 📊

O processo de seleção do iCS se divide em duas grandes triagens:

#### 1ª Etapa — Triagem Inicial (Foco Técnico e Territorial)
- Estar em estado elegível (**AL, BA, CE, MG, PA, PB ou PE**) (Eliminatório).
- Comunidades tradicionais/vulneráveis identificadas pelo nome (Eliminatório).
- Comprovação do protagonismo de liderança das famílias locais (Eliminatório).
- Caracterização profunda do histórico climático regional de estragos (Eliminatório).
- Soluções baseadas na Natureza (SbN) aliadas à viabilidade e replicabilidade (Classificatório).

#### 2ª Etapa — Consistência Contábil, Gestão e Portfólio
- Adequação técnica e exeqüibilidade do cronograma de 18 meses.
- Factibilidade econômica dos orçamentos, observando o teto de gastos e limitações de taxas administrativas (15% para OSC e 10% para intervenientes).
- Avaliação qualitativa de diversidade do comitê com o intuito de equilibrar biomas e causas.`
  };

  const getAssistantResponse = (text: string): string => {
    const cleanText = text.toLowerCase().trim();

    // Direct Match
    for (const key in knowledgeBase) {
      if (cleanText.includes(key) || key.includes(cleanText)) {
        return knowledgeBase[key];
      }
    }

    // Keyword Checking fallback
    if (cleanText.includes('estado') || cleanText.includes('local') || cleanText.includes('onde')) {
      return `### Estados Credenciados para Intervenção 🗺️\n\nO Edital iCS 05/2026 apoia exclusivamente ações implementadas em:\n- **Alagoas (AL)**\n- **Bahia (BA)**\n- **Ceará (CE)**\n- **Minas Gerais (MG)**\n- **Pará (PA)**\n- **Paraíba (PB)**\n- **Pernambuco (PE)**\n\nOrganizações proponentes podem possuir sede administrativa física em SP, RJ ou Brasília, contudo o projeto em si e o território das famílias beneficiárias devem residir exclusivamente dentro de um destes estados.`;
    }

    if (cleanText.includes('dinheiro') || cleanText.includes('limite') || cleanText.includes('orcamento') || cleanText.includes('orçamento') || cleanText.includes('recurso') || cleanText.includes('taxa')) {
      return `### Recursos Financeiros & Limites Administrativos 💰\n\n- **Aporte Financeiro por Projeto:** De R$ 200.000,00 a R$ 700.000,00 (doações não reembolsáveis).\n- **Taxa Administrativa da OSC Executora:** Máximo de **15%** do total executado do projeto.\n- **Taxa de Gestora Interveniente Financeira:** Máximo de **10%** do repasse.\n- **Liberação da 2ª Etapa:** Requer comprovação fiscal de gastos correspondentes a pelo menos **70%** da 1ª Parcela recebida.`;
    }

    if (cleanText.includes('quem') || cleanText.includes('cnpj') || cleanText.includes('universidade') || cleanText.includes('empresa') || cleanText.includes('cooperativa')) {
      return `### Critérios de Elegibilidade Jurídica 🏛️\n\n- **Elegibilidade Plena (Proponente):** Organizações da Sociedade Civil (OSCs) sem fins econômicos, Associações Comunitárias locais legalmente registradas e com CNPJ corporativo regular.\n- **Parceiras Técnicas (Não proponentes):** Universidades acadêmicas, fundações de pesquisa de ensino superior e laboratórios. Não podem assinar propostas como solicitantes diretos, apenas como assessoria técnica.\n- **Bloqueios e Impedimentos Graves (Vedados):** Empresas privadas (incluindo MEI), órgãos governamentais (prefeituras), templos religiosos/igrejas, cooperativas capitalistas e partidos políticos.`;
    }

    if (cleanText.includes('comunidade') || cleanText.includes('quilombo') || cleanText.includes('indigena') || cleanText.includes('indígena') || cleanText.includes('costeira')) {
      return `### Comunidades Foco das Doações 🤝\n\nO fomento do iCS destina-se a apoiar populações de alta fragilidade socioambiental:\n- **Povos Indígenas**\n- **Comunidades Quilombolas**\n- **Comunidades Rurais Tradicionais** (Agricultura familiar de subsistência)\n- **Populações Urbanas Periféricas** sob vulnerabilidade hídrica ou térmica\n- **Comunidades Costeiras e Marisqueiras** do litoral Nordestino ou do estuário Paraense.\n\nÉ obrigatório apresentar cartas de consentimento livre destas populações autorizando os empenhos do projeto na segunda etapa.`;
    }

    return `### Apoio Técnico ao Proponente iCS 💡

Não entendi completamente sua resposta, mas posso esclarecer dados cruciais do Edital iCS 05/2026. Sobre qual desses temas você gostaria de falar?

1. **Protagonismo Comunitário** (Critério eliminatório da Fase 1)
2. **Soluções baseadas na Natureza - SbN** (Dá pontuação extra)
3. **Limites Orçamentários** (Limitação de taxas de 15% e conta CNPJ PJ)
4. **Estados Aceitos** (AL, BA, CE, MG, PA, PB, PE)

Escreva alguma palavra-chave (ex: "SbN", "Protagonismo", "Documentos") para eu detalhar as regras do edital para você!`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle external prompts clicked in other pages (Timeline prompts, Criteria prompts)
  useEffect(() => {
    if (externalPrompt) {
      handleSendPrompt(externalPrompt);
      if (clearExternalPrompt) {
        clearExternalPrompt();
      }
    }
  }, [externalPrompt]);

  const handleSendPrompt = (promptText: string) => {
    if (!promptText.trim() || isTyping) return;

    // Add User response
    const userMsg: Message = {
      sender: 'user',
      text: promptText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setInputText('');

    // Answer response typing stream simulation
    setTimeout(() => {
      const responseText = getAssistantResponse(promptText);
      const assistantMsg: Message = {
        sender: 'assistant',
        text: responseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1100);
  };

  const handleClearChat = () => {
    if (window.confirm('Deseja limpar as mensagens do chat?')) {
      setMessages([
        {
          sender: 'assistant',
          text: 'Olá! Recompilei o canal. Como posso ajudar você de forma concreta a planejar o projeto do Edital iCS 05/2026?',
          timestamp: new Date()
        }
      ]);
    }
  };

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl shadow-lg flex flex-col h-[580px] overflow-hidden">
      {/* Chat header */}
      <div className="bg-emerald-900 text-white py-3.5 px-4 flex items-center justify-between border-b border-emerald-950 shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
            <Bot className="w-4.5 h-4.5 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-sans tracking-wide">Assistente Climática iCS</h3>
            <span className="text-[10px] text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Especialista em Edital 05
            </span>
          </div>
        </div>
        
        <button 
          onClick={handleClearChat}
          className="p-1 px-2.5 text-[10px] text-emerald-300 bg-emerald-950 hover:bg-emerald-800 rounded-md font-mono transition-colors"
          title="Resetar conversa"
        >
          Limpar
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
        {messages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                isUser 
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-xs font-medium' 
                  : 'bg-white text-gray-800 border border-gray-150 rounded-bl-none shadow-sm'
              }`}>
                {/* Parse customized markdown lines */}
                {msg.text.split('\n').map((line, lIdx) => {
                  if (line.startsWith('### ')) {
                    return <h4 key={lIdx} className={`font-bold text-sm my-1 ${isUser ? 'text-white' : 'text-emerald-950'}`}>{line.replace('### ', '')}</h4>;
                  }
                  if (line.startsWith('#### ')) {
                    return <h5 key={lIdx} className="font-semibold text-xs mt-2 mb-1 text-gray-900 border-b border-gray-100 pb-0.5">{line.replace('#### ', '')}</h5>;
                  }
                  if (line.startsWith('- ') || line.startsWith('* ')) {
                    return <ul key={lIdx} className="list-disc pl-4 space-y-0.5"><li>{line.substring(2)}</li></ul>;
                  }
                  if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ') || line.startsWith('5. ') || line.startsWith('6. ') || line.startsWith('7. ')) {
                    return <ol key={lIdx} className="list-decimal pl-4 space-y-0.5"><li>{line.substring(3)}</li></ol>;
                  }
                  return <p key={lIdx} className={line.startsWith('*') ? 'italic font-light text-gray-500 mt-1' : ''}>{line}</p>;
                })}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-150 rounded-2xl rounded-bl-none p-3.5 flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick click suggestions buttons */}
      <div className="px-4 py-2 bg-stone-100 border-t border-gray-150 border-b shrink-0 flex gap-1.5 overflow-x-auto scrollbar-none select-none select-prompt-buttons">
        <button 
          onClick={() => handleSendPrompt('O que são Soluções baseadas na Natureza no contexto do Edital iCS 05/2026?')}
          className="bg-white border border-gray-200/90 hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 shadow-2xs transition-colors"
        >
          🍃 Soluções baseadas na Natureza (SbN)
        </button>
        <button 
          onClick={() => handleSendPrompt('Como fortalecer o critério de protagonismo comunitário na proposta do Edital iCS 05/2026?')}
          className="bg-white border border-gray-200/90 hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 shadow-2xs transition-colors"
        >
          ✊ Protagonismo Comunitário
        </button>
        <button 
          onClick={() => handleSendPrompt('Quais documentos preciso preparar para a segunda etapa do Edital iCS 05/2026?')}
          className="bg-white border border-gray-200/90 hover:bg-emerald-50 text-gray-700 hover:text-emerald-950 text-[10px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 shadow-2xs transition-colors"
        >
          📋 Lista de Documentação (Fase 2)
        </button>
      </div>

      {/* Input panel form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendPrompt(inputText); }} 
        className="p-3 bg-white border-t border-gray-200 shrink-0 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Escreva sua pergunta (Ex: qual o limite de taxa?)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isTyping}
          className="flex-1 border border-gray-200 rounded-xl py-2 px-3 text-xs bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-800 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl p-2 shrink-0 transition-colors cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
