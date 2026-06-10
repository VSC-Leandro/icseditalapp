import React, { useState, useEffect } from 'react';
import { CreditCard, Landmark, Plus, Trash2, ShieldAlert, Sparkles, AlertTriangle, CircleDollarSign, Check, Info } from 'lucide-react';
import { BudgetItem } from '../types';

export default function BudgetCalculator() {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', category: 'sbn', description: 'Materiais para Quintais Produtivos / Sementes Crioulas', value: 120000 },
    { id: '2', category: 'rh', description: 'Engenheiro Agrônomo e Facilitadores locais', value: 95000 },
    { id: '3', category: 'saneamento', description: 'Construção de 4 Cisternas de placa', value: 65000 },
    { id: '4', category: 'admin', description: 'Taxa Administrativa da OSC Proponente', value: 40000 },
    { id: '5', category: 'interv', description: 'Comissão de assessoria financeira (gestora)', value: 15000 },
  ]);

  const [newCategory, setNewCategory] = useState('sbn');
  const [newDesc, setNewDesc] = useState('');
  const [newValue, setNewValue] = useState('');

  const [totalBudget, setTotalBudget] = useState(0);
  const [adminTotal, setAdminTotal] = useState(0);
  const [intervTotal, setIntervTotal] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.value, 0);
    const admin = items.filter(i => i.category === 'admin').reduce((acc, item) => acc + item.value, 0);
    const interv = items.filter(i => i.category === 'interv').reduce((acc, item) => acc + item.value, 0);

    setTotalBudget(total);
    setAdminTotal(admin);
    setIntervTotal(interv);
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newValue || Number(newValue) <= 0) return;

    const newItem: BudgetItem = {
      id: Date.now().toString(),
      category: newCategory,
      description: newDesc.trim(),
      value: Number(newValue)
    };

    setItems([...items, newItem]);
    setNewDesc('');
    setNewValue('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  // Limits
  const minBudget = 200000;
  const maxBudget = 700000;

  const adminPercent = totalBudget > 0 ? (adminTotal / totalBudget) * 100 : 0;
  const intervPercent = totalBudget > 0 ? (intervTotal / totalBudget) * 100 : 0;

  const isAdminExcess = adminPercent > 15;
  const isIntervExcess = intervPercent > 10;
  const isBudgetUnder = totalBudget < minBudget;
  const isBudgetOver = totalBudget > maxBudget;

  const categoriesMap: { [key: string]: string } = {
    sbn: 'Soluções Baseadas na Natureza (SbN)',
    rh: 'Equipe, Coordenação e Facilitadores (RH)',
    saneamento: 'Infraestrutura Hidráulica / Obras',
    admin: 'Taxas Administrativas Internas',
    interv: 'Taxa de Interveniente Financeira',
    outros: 'Outros insumos operacionais / campo',
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total gauge */}
        <div className={`p-5 rounded-2xl border bg-white ${
          isBudgetUnder || isBudgetOver ? 'border-amber-300' : 'border-emerald-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400 font-bold uppercase font-mono">Orçamento Total</span>
            <CircleDollarSign className={`w-4 h-4 ${isBudgetUnder || isBudgetOver ? 'text-amber-500' : 'text-emerald-700'}`} />
          </div>
          <span className="text-2xl font-extrabold text-gray-900 block">{formatCurrency(totalBudget)}</span>
          
          {/* Progress bar bounds */}
          <div className="h-2 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div 
              style={{ width: `${Math.min((totalBudget / maxBudget) * 100, 100)}%` }} 
              className={`h-full rounded-full transition-all ${
                isBudgetUnder ? 'bg-amber-400' : isBudgetOver ? 'bg-red-500' : 'bg-emerald-600'
              }`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-mono">
            <span>Mín: R$ 200k</span>
            <span>Máx: R$ 700k</span>
          </div>
          
          {/* Messages */}
          {isBudgetUnder && (
            <p className="text-[11px] text-amber-700 font-medium mt-2">
              ⚠️ Sob limite. O edital exige propostas a partir de R$ 200.000.
            </p>
          )}
          {isBudgetOver && (
            <p className="text-[11px] text-red-600 font-medium mt-2">
              🚨 Acima do teto máximo de fomento de R$ 700.000 para este certame.
            </p>
          )}
          {!isBudgetUnder && !isBudgetOver && totalBudget > 0 && (
            <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Valor perfeitamente compatível!
            </p>
          )}
        </div>

        {/* Admin fees cap tracker */}
        <div className={`p-5 rounded-2xl border bg-white ${isAdminExcess ? 'border-amber-300 ring-2 ring-amber-500/10' : 'border-emerald-100 shadow-sm'}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400 font-bold uppercase font-mono">Despesas Administrativas</span>
            <span className={`text-xs font-mono font-bold ${isAdminExcess ? 'text-amber-600' : 'text-emerald-700'}`}>
              {adminPercent.toFixed(1)}% / 15% máx
            </span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 block">{formatCurrency(adminTotal)}</span>
          
          <div className="h-2 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div 
              style={{ width: `${Math.min((adminPercent / 15) * 100, 100)}%` }} 
              className={`h-full rounded-full transition-all ${isAdminExcess ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {isAdminExcess 
              ? '🚨 Alerta: Taxa proporcional excedida! Limite é até 15% do total do edital.' 
              : '✔ Alocação compatível com as regras de repasse iCS.'}
          </p>
        </div>

        {/* Finance Interveniente tracking */}
        <div className={`p-5 rounded-2xl border bg-white ${isIntervExcess ? 'border-amber-300 ring-2 ring-amber-500/10' : 'border-emerald-100 shadow-sm'}`}>
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs text-gray-400 font-bold uppercase font-mono">Taxa de Gestora / Parceira</span>
            <span className={`text-xs font-mono font-bold ${isIntervExcess ? 'text-amber-600' : 'text-emerald-700'}`}>
              {intervPercent.toFixed(1)}% / 10% máx
            </span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 block">{formatCurrency(intervTotal)}</span>
          
          <div className="h-2 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div 
              style={{ width: `${Math.min((intervPercent / 10) * 100, 100)}%` }} 
              className={`h-full rounded-full transition-all ${isIntervExcess ? 'bg-amber-500 animate-pulse' : 'bg-emerald-600'}`}
            />
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            {isIntervExcess 
              ? '🚨 Alerta: Comissão de Interveniente excedida! Máximo de 10% permitido.'
              : '✔ Taxa de interveniente em conformidade.'}
          </p>
        </div>
      </div>

      {/* Main interactive list block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table items list */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider font-sans border-b border-gray-50 pb-2">
            Lista de Despesas Previstas
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-mono font-semibold uppercase">
                  <th className="py-2.5 px-1">Categoria</th>
                  <th className="py-2.5 px-1">Descrição</th>
                  <th className="py-2.5 px-1 text-right">Valor estimado</th>
                  <th className="py-2.5 px-1 text-center w-10">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-stone-50/50">
                    <td className="py-3 px-1">
                      <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.category === 'sbn' 
                          ? 'bg-emerald-50 text-emerald-800'
                          : item.category === 'rh'
                          ? 'bg-blue-50 text-blue-800'
                          : item.category === 'saneamento'
                          ? 'bg-sky-50 text-sky-800'
                          : item.category === 'admin'
                          ? 'bg-amber-50 text-amber-800/90 font-bold'
                          : item.category === 'interv'
                          ? 'bg-indigo-50 text-indigo-800 font-bold'
                          : 'bg-gray-50 text-gray-600'
                      }`}>
                        {categoriesMap[item.category]?.split(' (')[0]}
                      </span>
                    </td>
                    <td className="py-3 px-1 max-w-xs truncate font-medium text-gray-950" title={item.description}>
                      {item.description}
                    </td>
                    <td className="py-3 px-1 text-right font-mono font-semibold text-gray-950">
                      {formatCurrency(item.value)}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-gray-300 hover:text-red-500 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-10 text-gray-400 font-light text-xs">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              Nenhuma despesa inserida nessa simulação. Adicione itens abaixo.
            </div>
          )}
        </div>

        {/* Add item Sidebar Form */}
        <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-5 space-y-4 shadow-3xs self-start">
          <h4 className="text-xs font-bold text-stone-700 uppercase tracking-widest flex items-center gap-1">
            <Plus className="w-4 h-4 text-emerald-600 shrink-0" />
            Adicionar Nova Despesa
          </h4>
          
          <form onSubmit={handleAddItem} className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="text-gray-500 font-medium">Categoria do Gasto</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg py-2 px-2.5 focus:outline-none"
              >
                {Object.entries(categoriesMap).map(([id, label]) => (
                  <option key={id} value={id}>{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-500 font-medium">Instruções ou Descritivos</label>
              <input
                type="text"
                placeholder="Ex. Compra de 500 mudas de açaí orgânico"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-500 font-medium">Valor Estimado (R$)</label>
              <input
                type="number"
                placeholder="35000"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-full py-2.5 rounded-lg shadow-2xs transition-colors"
            >
              Adicionar ao Plano
            </button>
          </form>
        </div>
      </div>

      {/* Warnings checks info */}
      <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-5 space-y-3">
        <h4 className="text-xs font-bold text-stone-700 uppercase tracking-widest flex items-center gap-1.5">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          Prestações de Conta &amp; Cautelas Financeiras:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-600 leading-relaxed">
          <ul className="list-disc pl-5 mt-1 space-y-1.5">
            <li>
              <strong className="font-semibold text-gray-900">Aprovados pela Auditoria:</strong> Certifique de que despesas com recursos de doação de capital tenham contrapartidas identificadas. Todo o pessoal escalado (coordenadores e operários em campo) deve possuir nota de RPA ou nota de prestação de serviços válidos.
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Regra de Liberação:</strong> A liberação da segunda parcela financeira está programada apenas após o envio das notas fiscais e aceitabilidade do doador de no mínimo 70% do aporte da primeira parcela.
            </li>
          </ul>

          <ul className="list-disc pl-5 mt-1 space-y-1.5">
            <li>
              <strong className="font-semibold text-gray-900">Sem Saques em Espécie:</strong> O caixa em dinheiro físico deve ser de no máximo R$ 1.000 para emergências, sendo terminantemente proibidos saques no caixa de autoatendimento para pagar compras maiores. Dê preferência absoluta a transferências (TED/PIX PJ de destino).
            </li>
            <li>
              <strong className="font-semibold text-gray-900">Despesas para parceiros:</strong> Taxas administrativas das intervenientes financeiras estão indexadas no limite do edital de 10%. Custos de laboratórios de universidades devem vir como insumos diretos, não como administrativas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
