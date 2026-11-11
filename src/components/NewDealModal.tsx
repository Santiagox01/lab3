import React, { useState } from 'react';
import { Deal, User, Customer, PipelineStage, DealStatus } from '../types';
import { X, Plus, DollarSign, Briefcase } from 'lucide-react';

interface NewDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
  customers: Customer[];
  stages: PipelineStage[];
  onAddDeal: (newDeal: Deal) => void;
}

export const NewDealModal: React.FC<NewDealModalProps> = ({
  isOpen,
  onClose,
  users,
  customers,
  stages,
  onAddDeal
}) => {
  const [title, setTitle] = useState('');
  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [ownerId, setOwnerId] = useState(users[0]?.id || '');
  const [stageId, setStageId] = useState('s3'); // Negotiation default
  const [amount, setAmount] = useState<number>(35000);
  const [serviceType, setServiceType] = useState('Convenio Corporativo');
  const [flightRoute, setFlightRoute] = useState('BOG-MDE');
  const [passengersCount, setPassengersCount] = useState<number>(120);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || amount <= 0) return;

    let status: DealStatus = 'open';
    if (stageId === 's5') status = 'won';
    if (stageId === 's6') status = 'lost';

    const newDeal: Deal = {
      id: `d-${Date.now()}`,
      title: title.trim(),
      customer_id: customerId,
      owner_id: ownerId,
      stage_id: stageId,
      amount: Number(amount),
      currency: 'USD',
      status: status,
      created_at: new Date().toISOString(),
      expected_close_date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      service_type: serviceType,
      flight_route: flightRoute,
      passengers_count: Number(passengersCount)
    };

    onAddDeal(newDeal);
    onClose();
    setTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-[#E8E1D3] animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FF5C35]/10 flex items-center justify-center text-[#FF5C35]">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-[#141E28]">Registrar Nuevo Trato Comercial</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nombre del Trato / Negociación:</label>
            <input
              type="text"
              required
              placeholder="Ej: Convenio Transporte Petrolero - 50 Pax"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:ring-2 focus:ring-[#FF5C35]/30 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Empresa Cliente:</label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:outline-none"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ejecutivo Comercial:</label>
              <select
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:outline-none"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Etapa de Inicio:</label>
              <select
                value={stageId}
                onChange={(e) => setStageId(e.target.value)}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:outline-none"
              >
                {stages.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.win_probability}%)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monto en USD ($):</label>
              <input
                type="number"
                min="1000"
                step="500"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl font-bold text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ruta del Vuelo:</label>
              <input
                type="text"
                placeholder="Ej: BOG-MDE-CTG"
                value={flightRoute}
                onChange={(e) => setFlightRoute(e.target.value)}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimado de Pasajeros:</label>
              <input
                type="number"
                min="1"
                value={passengersCount}
                onChange={(e) => setPassengersCount(Number(e.target.value))}
                className="w-full p-2.5 bg-[#F9F6F0] border border-[#E8E1D3] rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#FF5C35] hover:bg-[#E04A26] text-white font-semibold rounded-xl shadow-soft transition active:scale-95"
            >
              Crear Oportunidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
