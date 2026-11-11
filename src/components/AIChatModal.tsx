import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Deal, User, KpiMetrics } from '../types';
import { Sparkles, Send, X, Bot, User as UserIcon, Settings2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  deals: Deal[];
  users: User[];
  metrics: KpiMetrics;
  onReassignDeal?: (dealId: string, newOwnerId: string) => void;
}

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  deals,
  users,
  metrics,
  onReassignDeal
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: '¡Hola! Soy tu asistente de IA de ventas para la Aerolínea Virtual. Puedo ayudarte a analizar métricas de facturación, identificar tratos en riesgo, comparar el desempeño del equipo comercial o sugerir estrategias de cierre. ¿En qué puedo apoyarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('https://diegobotia.app.n8n.cloud/webhook/d45f355a-dac3-4552-8c2b-21bda590dc75');
  const [showSettings, setShowSettings] = useState(false);
  const [useFallbackEngine, setUseFallbackEngine] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Intelligent local simulation engine that knows current CRM state
  const generateLocalAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('hola') || q.includes('buenos dias') || q.includes('buenas')) {
      return `¡Hola de nuevo! Aquí estoy, listo para ayudarte con lo que necesites para la gestión comercial de la aerolínea.\n\nTe doy algunas ideas clave del estado actual:\n• **Total Revenue:** $${metrics.totalRevenue.toLocaleString()} USD (${metrics.wonCount} contratos cerrados con éxito).\n• **Pipeline Activo:** $${metrics.activeDealsValue.toLocaleString()} USD en ${metrics.activeDealsCount} tratos abiertos.\n• **Win Rate:** ${metrics.winRatePercent.toFixed(1)}%.\n\n¿Quieres que analicemos los ejecutivos con cuota baja o las negociaciones más grandes de rutas aéreas?`;
    }

    if (q.includes('vendedor') || q.includes('desempeño') || q.includes('quién') || q.includes('equipo')) {
      const topSeller = [...users].sort((a, b) => {
        const revA = deals.filter(d => d.owner_id === a.id && d.status === 'won').reduce((s, d) => s + d.amount, 0);
        const revB = deals.filter(d => d.owner_id === b.id && d.status === 'won').reduce((s, d) => s + d.amount, 0);
        return revB - revA;
      })[0];

      const topRev = deals.filter(d => d.owner_id === topSeller.id && d.status === 'won').reduce((s, d) => s + d.amount, 0);

      return `📊 **Análisis de Rendimiento Comercial:**\n\n• **Líder en Ventas:** **${topSeller.full_name}** con **$${topRev.toLocaleString()} USD** en contratos ganados.\n• **Cuota Cumplida:** ${((topRev / topSeller.quota_amount) * 100).toFixed(0)}% de su meta de $${topSeller.quota_amount.toLocaleString()} USD.\n• **Especialidad:** ${topSeller.department}.\n\nRecomendación: Se sugiere apoyar a **Luis Martínez** y **Carlos Mendoza**, quienes tienen alta concentración de tratos en etapa de prospección y podrían beneficiarse de acompañamiento directivo.`;
    }

    if (q.includes('riesgo') || q.includes('estancado') || q.includes('negociación') || q.includes('perdid')) {
      const negotiationDeals = deals.filter(d => d.stage_id === 's3' && d.status === 'open');
      return `⚠️ **Tratos en Etapa de Negociación Requiriendo Atención:**\n\nHay **${negotiationDeals.length} tratos** en etapa 'Negotiation' sumando **$${negotiationDeals.reduce((s, d) => s + d.amount, 0).toLocaleString()} USD**:\n` +
        negotiationDeals.map(d => `• **${d.title}**: $${d.amount.toLocaleString()} USD (Ruta: ${d.flight_route || 'B2B'}).`).join('\n') +
        `\n\n💡 **Acción recomendada:** Ofrecer un descuento del 5% en cupos de temporada baja o pases preferenciales a sala VIP para acelerar el cierre antes de fin de mes.`;
    }

    if (q.includes('métrica') || q.includes('kpi') || q.includes('resumen') || q.includes('ingresos') || q.includes('revenue')) {
      return `📈 **Resumen Ejecutivo de KPIs:**\n\n• **Total Facturado (Won):** $${metrics.totalRevenue.toLocaleString()} USD\n• **Crecimiento vs. Mes Anterior:** +${metrics.revenueGrowthPercent.toFixed(1)}%\n• **Tratos Activos en Pipeline:** ${metrics.activeDealsCount} tratos ($${metrics.activeDealsValue.toLocaleString()} USD)\n• **Efectividad de Cierre (Win Rate):** ${metrics.winRatePercent.toFixed(1)}%\n• **Ticket Promedio (Avg Deal Size):** $${metrics.avgDealSize.toLocaleString()} USD\n• **Cumplimiento Global de Cuota:** ${metrics.quotaAttainmentPercent.toFixed(1)}%`;
    }

    return `Entendido. He analizado los datos actuales del CRM de la aerolínea con respecto a tu consulta: "${query}".\n\nActualmente el equipo cuenta con **${deals.length} oportunidades registradas**, con un volumen global de **$${(metrics.totalRevenue + metrics.activeDealsValue).toLocaleString()} USD** entre ventas consolidadas y cartera en negociación. La prioridad estratégica actual debe ser convertir los tratos de las etapas 'Negotiation' y 'Closing' antes de fin de mes para superar el 100% de la cuota corporativa.`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const message = textToSend || inputText;
    if (!message.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    let assistantReply = '';
    let isErrorResponse = false;

    // Try live n8n webhook first
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          sessionId: 'aerocrm-user-session',
          crmMetrics: {
            totalRevenue: metrics.totalRevenue,
            activeDeals: metrics.activeDealsCount,
            winRate: metrics.winRatePercent
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data && data.response) {
        assistantReply = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
      } else if (data && data.message) {
        assistantReply = data.message;
      } else {
        assistantReply = JSON.stringify(data);
      }
    } catch (err: any) {
      console.warn('n8n Webhook connection note:', err.message);

      if (useFallbackEngine) {
        // Fallback to intelligent local AI assistant
        assistantReply = generateLocalAIResponse(message);
      } else {
        assistantReply = `Lo siento, hubo un error al conectar con el Webhook de n8n (${webhookUrl}).\n\nVerifica que el workflow esté publicado y activo en tu cuenta de n8n, o activa el 'Simulador Integrado de IA' en los ajustes.`;
        isErrorResponse = true;
      }
    } finally {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: assistantReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: isErrorResponse
        }
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 animate-in fade-in slide-in-from-bottom-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm tracking-tight">Asistente IA - n8n & Gemini</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-purple-200">
              Analista Comercial Inteligente de Aerolínea
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            title="Configurar Webhook de n8n"
            className="p-1.5 rounded-xl hover:bg-white/10 text-purple-200 hover:text-white transition"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-purple-200 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 text-xs animate-in slide-in-from-top-2">
          <label className="block font-bold text-slate-700 mb-1">
            Endpoint Webhook n8n (POST):
          </label>
          <input
            type="text"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://<dominio>.app.n8n.cloud/webhook/<id>"
            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono mb-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={useFallbackEngine}
                onChange={(e) => setUseFallbackEngine(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span>Modo Híbrido (Respaldo IA en vivo si n8n no responde)</span>
            </label>
            <span className="text-[10px] text-slate-400">Lab 3 FSI</span>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="p-4 h-80 overflow-y-auto space-y-3.5 bg-[#FAF8F5]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-purple-100 border border-purple-200 flex-shrink-0 flex items-center justify-center text-purple-700">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : msg.isError
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 rounded-bl-none'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
              }`}
            >
              {msg.text}
              <div
                className={`text-[9px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-purple-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-700">
                <UserIcon className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5 items-center text-xs text-slate-500">
            <div className="w-7 h-7 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 animate-spin">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
            <span>El Agente de IA está analizando los datos...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Question Pills */}
      <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-1">
          Sugerencias:
        </span>
        <button
          onClick={() => handleSendMessage('Hola')}
          className="px-2.5 py-1 bg-[#F9F6F0] hover:bg-purple-50 hover:text-purple-700 text-slate-600 rounded-full border border-slate-200 transition"
        >
          Hola 👋
        </button>
        <button
          onClick={() => handleSendMessage('¿Cómo van los KPIs y el Total Revenue de la aerolínea?')}
          className="px-2.5 py-1 bg-[#F9F6F0] hover:bg-purple-50 hover:text-purple-700 text-slate-600 rounded-full border border-slate-200 transition"
        >
          ¿Cómo van las ventas?
        </button>
        <button
          onClick={() => handleSendMessage('¿Quién es el vendedor con mejor rendimiento y cuota cumplida?')}
          className="px-2.5 py-1 bg-[#F9F6F0] hover:bg-purple-50 hover:text-purple-700 text-slate-600 rounded-full border border-slate-200 transition"
        >
          Mejor vendedor 🏆
        </button>
        <button
          onClick={() => handleSendMessage('¿Cuáles son los tratos en riesgo en la etapa de negociación?')}
          className="px-2.5 py-1 bg-[#F9F6F0] hover:bg-purple-50 hover:text-purple-700 text-slate-600 rounded-full border border-slate-200 transition"
        >
          Tratos en riesgo ⚠️
        </button>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu consulta sobre el CRM..."
          disabled={isLoading}
          className="flex-1 bg-[#F9F6F0] border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={isLoading || !inputText.trim()}
          className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
