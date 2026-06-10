import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, RotateCcw, AlertTriangle, Landmark, HelpCircle, Check, MapPin, Users, HelpCircle as HelpIcon } from 'lucide-react';
import { EligibilityState } from '../types';

export default function EligibilitySimulator() {
  const [formData, setFormData] = useState<EligibilityState>({
    organizationType: 'osc',
    state: 'BA',
    communityTypes: ['quilombola'],
    hasCnpj: true,
    climateImpacts: ['seca', 'calor'],
    climateImpactDetail: ''
  });

  const [simulated, setSimulated] = useState(false);

  const states = [
    { code: 'AL', name: 'Alagoas', eligible: true },
    { code: 'BA', name: 'Bahia', eligible: true },
    { code: 'CE', name: 'Ceará', eligible: true },
    { code: 'MG', name: 'Minas Gerais', eligible: true },
    { code: 'PA', name: 'Pará', eligible: true },
    { code: 'PB', name: 'Paraíba', eligible: true },
    { code: 'PE', name: 'Pernambuco', eligible: true },
    { code: 'SP', name: 'São Paulo', eligible: false },
    { code: 'RJ', name: 'Rio de Janeiro', eligible: false },
    { code: 'MA', name: 'Maranhão', eligible: false },
    { code: 'RN', name: 'Rio Grande do Norte', eligible: false },
    { code: 'PI', name: 'Piauí', eligible: false },
    { code: 'AM', name: 'Amazonas', eligible: false },
    { code: 'GO', name: 'Goiás', eligible: false }
  ];

  const orgTypes = [
    { id: 'osc', label: 'ONG / Organização da Sociedade Civil (OSC)', status: 'eligible' },
    { id: 'assoc', label: 'Associação Comunitária local organizada', status: 'eligible' },
    { id: 'univ', label: 'Universidade / Instituição de Ensino e Pesquisa', status: 'partner' },
    { id: 'empresa', label: 'Empresa com fins lucrativos (Ltda, S/A, MEI)', status: 'forbidden' },
    { id: 'publico', label: 'Órgão Público Estadual ou Municipal', status: 'forbidden' },
    { id: 'coop', label: 'Cooperativa Produtora ou Agropecuária', status: 'forbidden' },
    { id: 'partido', label: 'Partido Político ou Fundação Partidária', status: 'forbidden' }
  ];

  const communityTypesList = [
    { id: 'indigena', label: 'Indígenas / Povos do Cerrado ou Amazônia' },
    { id: 'quilombola', label: 'Quilombolas / Comunidades de Terreiro' },
    { id: 'rural', label: 'Rurais Tradicionais / Agricultores Familiares' },
    { id: 'urbana', label: 'Urbanas Periféricas extremamente povoadas' },
    { id: 'costeira', label: 'Costeiras / Comunidades de Pescadores / Marisqueiras' }
  ];

  const climateImpactsList = [
    { id: 'calor', label: 'Ondas de calor severo e estresse térmico' },
    { id: 'seca', label: 'Secas extremas e exaustão hídrica de poços' },
    { id: 'enchente', label: 'Enchentes agudas ou inundações repentinas' },
    { id: 'deslizamento', label: 'Deslizamentos de encostas urbanas ou rurais' },
    { id: 'incendio', label: 'Incêndios florestais descontrolados no bioma' }
  ];

  const toggleCommunity = (id: string) => {
    if (formData.communityTypes.includes(id)) {
      setFormData({ ...formData, communityTypes: formData.communityTypes.filter(c => c !== id) });
    } else {
      setFormData({ ...formData, communityTypes: [...formData.communityTypes, id] });
    }
  };

  const toggleImpactValue = (id: string) => {
    if (formData.climateImpacts.includes(id)) {
      setFormData({ ...formData, climateImpacts: formData.climateImpacts.filter(i => i !== id) });
    } else {
      setFormData({ ...formData, climateImpacts: [...formData.climateImpacts, id] });
    }
  };

  const runSimulation = () => {
    setSimulated(true);
  };

  const handleReset = () => {
    setFormData({
      organizationType: 'osc',
      state: 'BA',
      communityTypes: ['quilombola'],
      hasCnpj: true,
      climateImpacts: ['seca', 'calor'],
      climateImpactDetail: ''
    });
    setSimulated(false);
  };

  // Compute status
  const selectedStateObj = states.find(s => s.code === formData.state);
  const orgTypeObj = orgTypes.find(o => o.id === formData.organizationType);

  const isStateEligible = selectedStateObj?.eligible ?? false;
  const isCnpjEligible = formData.hasCnpj;
  const isOrgEligible = orgTypeObj?.status === 'eligible';
  const isOrgPartnerOnly = orgTypeObj?.status === 'partner';
  const hasImpacts = formData.climateImpacts.length > 0;
  const hasCommunities = formData.communityTypes.length > 0;

  const isFullyEligible = isStateEligible && isCnpjEligible && isOrgEligible && hasImpacts && hasCommunities;
  const isPartnerEligible = isOrgPartnerOnly && isStateEligible && hasImpacts && hasCommunities;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Landmark className="w-5 h-5 text-emerald-600" />
        Simulador de Elegibilidade do Proponente
      </h3>
      <p className="text-xs text-gray-500 mb-6">
        Faça o teste rápido baseado nas diretrizes oficiais do Edital iCS 05/2026. Evite perder tempo com inscrições incompatíveis.
      </p>

      {!simulated ? (
        <div className="space-y-6">
          {/* Question 1: Organization Type */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              1. Qual o tipo jurídico da sua instituição?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {orgTypes.map((type) => (
                <div 
                  key={type.id}
                  onClick={() => setFormData({ ...formData, organizationType: type.id })}
                  className={`border rounded-xl p-3 cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                    formData.organizationType === type.id 
                      ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 font-medium' 
                      : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                    formData.organizationType === type.id ? 'border-emerald-600 bg-emerald-600' : 'border-gray-300'
                  }`}>
                    {formData.organizationType === type.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className="text-xs leading-relaxed">{type.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Question 2: State Selection */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                2. Em qual Estado estão localizadas as comunidades?
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full border border-gray-200 rounded-xl py-2 px-3 bg-gray-50 text-xs focus:bg-white focus:outline-none"
              >
                {states.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name} ({st.code}) {st.eligible ? '— [Elegível]' : '— [NÃO elegível]'}
                  </option>
                ))}
              </select>
            </div>

            {/* Question 3: CNPJ active status */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                3. A organização proponente possui CNPJ ativo?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="hasCnpj"
                    checked={formData.hasCnpj === true}
                    onChange={() => setFormData({ ...formData, hasCnpj: true })}
                    className="accent-emerald-600"
                  />
                  Sim, ativo e regularizado
                </label>
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="hasCnpj"
                    checked={formData.hasCnpj === false}
                    onChange={() => setFormData({ ...formData, hasCnpj: false })}
                    className="accent-emerald-600"
                  />
                  Não possui ou está suspenso
                </label>
              </div>
            </div>
          </div>

          {/* Question 4: Comunnities served */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" />
              4. Quais comunidades serão beneficiadas diretamente pelas benfeitorias? (Selecione todas que se aplicam)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {communityTypesList.map((comm) => {
                const selected = formData.communityTypes.includes(comm.id);
                return (
                  <div
                    key={comm.id}
                    onClick={() => toggleCommunity(comm.id)}
                    className={`border rounded-xl p-2.5 text-center cursor-pointer select-none transition-colors ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50/30 text-emerald-950 font-bold'
                        : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="text-[11px] leading-relaxed block">{comm.label.split(' / ')[0]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question 5: Climate risk and adaptation */}
          <div className="space-y-2.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              5. Quais ameaças ou impactos climáticos estão ocorrendo nesse território?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {climateImpactsList.map((imp) => {
                const selected = formData.climateImpacts.includes(imp.id);
                return (
                  <div
                    key={imp.id}
                    onClick={() => toggleImpactValue(imp.id)}
                    className={`border rounded-xl p-2.5 cursor-pointer select-none transition-colors flex items-center gap-2 ${
                      selected
                        ? 'border-emerald-500 bg-emerald-50/35 text-emerald-950 font-semibold'
                        : 'border-gray-100 bg-white hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 text-white font-bold ${
                      selected ? 'bg-emerald-600 border-emerald-600' : 'border-gray-300'
                    }`}>
                      {selected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="text-[11px] leading-normal">{imp.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action validation */}
          <div className="pt-2 border-t border-gray-100 flex justify-end">
            <button
              onClick={runSimulation}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-xs transition-colors"
            >
              Rodar Diagnóstico de Elegibilidade
            </button>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6 animate-fade-in">
          {/* Main big badge results */}
          {isFullyEligible ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-emerald-950">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-md">
                  Apta para Inscrição
                </span>
                <h4 className="text-base font-extrabold text-emerald-900">Sua organização preenche todos os requisitos prévios!</h4>
                <p className="text-xs text-emerald-800/90 leading-relaxed">
                  O tipo institucional é válido, a localidade ({formData.state}) está homologada, e você indicou vulnerabilidades climáticas e comunidades consideradas tradicionais ou prioritárias.
                </p>
              </div>
            </div>
          ) : isPartnerEligible ? (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-sky-950">
              <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="bg-sky-100 text-sky-800 text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-md">
                  Apenas Parceira Técnica
                </span>
                <h4 className="text-base font-extrabold text-sky-900">Universidades não podem se inscrever diretamente</h4>
                <p className="text-xs text-sky-800/90 leading-relaxed">
                  Seu escopo local em {formData.state} é elegível, mas o edital proíbe universidades e institutos de pesquisa como proponentes principais. Vocês devem encontrar uma associação comunitária ou coordenar com uma OSC já registrada para representá-los juridicamente!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4 text-rose-950">
              <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="flex-1 space-y-1">
                <span className="bg-rose-100 text-rose-800 text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-md">
                  Incompatível / Não Apta
                </span>
                <h4 className="text-base font-extrabold text-rose-900">Detectamos impedimentos graves para sua participação</h4>
                <p className="text-xs text-rose-800/90 leading-relaxed">
                  Identificamos fatores que violam as regras estritas de triagem do Edital iCS 05/2026. Revise os alertas de impedimento logo abaixo antes de submeter sua intenção de proposta.
                </p>
              </div>
            </div>
          )}

          {/* Breakdown criteria list checks */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase font-mono block">Detalhamento dos Bloqueios &amp; Requisitos</span>
            
            {/* Check: Org type */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/55">
              <span className="text-gray-600">Representação Jurídica Permitida</span>
              {isOrgEligible ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✔ Elegível (OSC ou Associação)</span>
              ) : isOrgPartnerOnly ? (
                <span className="text-sky-700 font-semibold flex items-center gap-1">⚠ Parceira Técnica Técnica (Universidade)</span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">❌ Proibido ({orgTypeObj?.label.split(' (')[0]})</span>
              )}
            </div>

            {/* Check: Location state */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/55">
              <span className="text-gray-600">Localização em Estado Autorizado ({formData.state})</span>
              {isStateEligible ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✔ UF Credenciada</span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">❌ UF Inelegível (Edital restrito)</span>
              )}
            </div>

            {/* Check: CNPJ */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/55">
              <span className="text-gray-600">CNPJ Ativo da Organização</span>
              {isCnpjEligible ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✔ Regularizado</span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">❌ CNPJ Ausente ouIrregular</span>
              )}
            </div>

            {/* Check: Communities */}
            <div className="flex items-center justify-between text-xs py-1 border-b border-gray-200/55">
              <span className="text-gray-600">Identificação de Comunidades Foco</span>
              {hasCommunities ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✔ Indicada ({formData.communityTypes.length})</span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">❌ Nenhuma comunidade foca assinalada</span>
              )}
            </div>

            {/* Check: Impacts */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-gray-600">Vulnerabilidade a Eventos Climáticos Extremos</span>
              {hasImpacts ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">✔ Mapeado ({formData.climateImpacts.length} impactos)</span>
              ) : (
                <span className="text-red-700 font-bold flex items-center gap-1">❌ Indicação de seca, calor ou inundação em falta</span>
              )}
            </div>
          </div>

          {/* Advice/Action cards */}
          {!isFullyEligible && (
            <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-xs text-amber-900 leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold font-sans">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                Dicas Importantes para Regularização:
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {!isStateEligible && (
                  <li>
                    O iCS limita esse fomento para apoiar comunidades no semiárido ou regiões vulneráveis do Nordeste e Pará. Se sua organização física é em SP ou RJ, você ainda pode inscrever o projeto <strong className="font-bold">desde que a intervenção e as comunidades beneficiadas morem fisicamente em estados aceitos</strong> (ex. interior da Bahia ou Pará).
                  </li>
                )}
                {!isCnpjEligible && (
                  <li>
                    Você não poderá assinar contratos sem CNPJ corporativo regular. Faça parcerias ou consórcios com organizações maiores e consolidadas (chamadas de Organização Mandatária) que assinem juridicamente pelo recebimento e prestação dos relatórios.
                  </li>
                )}
                {!isOrgEligible && !isOrgPartnerOnly && (
                  <li>
                    A sua categoria jurídica é vedada. Empresas (inclusive MEI) e Órgãos governamentais não podem receber essas doações. Sugerimos fazer parceria técnica fornecendo serviços sem ser o proponente, deixando que a associação das famílias receba o dinheiro do iCS.
                  </li>
                )}
                {!hasCommunities && (
                  <li>
                    Marque e identifique nominalmente quem são as famílias. O comitê iCS não aceita propostas abstratas para "população geral" sem delimitar o território indígena, quilombola, de assentamento rural ou periferia que ganhará a intervenção.
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Final Actions buttons to restart */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 bg-white font-semibold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Simulador
            </button>

            {isFullyEligible && (
              <span className="text-emerald-700 font-mono text-[11px] font-semibold animate-pulse block">
                ⭐ Prossiga para o Simulador de Orçamento para validar os custos!
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
