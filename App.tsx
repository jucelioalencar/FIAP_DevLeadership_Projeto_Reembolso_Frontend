import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ReembolsosList } from './components/ReembolsosList';
import { ReembolsoDetail } from './components/ReembolsoDetail';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Toaster } from './components/ui/sonner';
import { FileText, LayoutDashboard, ListChecks } from 'lucide-react';

export type ReembolsoStatus = 'pendente' | 'em_analise' | 'aprovado' | 'reprovado';

export interface Reembolso {
  id: string;
  solicitante: string;
  numeroVoo: string;
  companhia: string;
  dataVoo: string;
  atraso: number;
  valor: number;
  status: ReembolsoStatus;
  confiancaOCR: number;
  documentoUrl: string;
  dadosExtraidos: {
    passageiro: string;
    voo: string;
    origem: string;
    destino: string;
    dataEmbarque: string;
    horaEmbarque: string;
    valor: string;
  };
  validacaoExterna?: {
    statusVoo: string;
    atrasoReal: number;
    motivo: string;
  };
  dataSubmissao: string;
}

function App() {
  const [selectedReembolso, setSelectedReembolso] = useState<Reembolso | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleSelectReembolso = (reembolso: Reembolso) => {
    setSelectedReembolso(reembolso);
    setActiveTab('detalhes');
  };

  const handleBackToList = () => {
    setSelectedReembolso(null);
    setActiveTab('reembolsos');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#E6007E] text-white p-2 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-gray-900 font-semibold">Sistema de Reembolso</h1>
                <p className="text-sm text-gray-600">FIAP DevLeadership - Análise Automática</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="reembolsos" className="flex items-center gap-2">
              <ListChecks className="w-4 h-4" />
              Reembolsos
            </TabsTrigger>
            {selectedReembolso && (
              <TabsTrigger value="detalhes" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Detalhes
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="reembolsos">
            <ReembolsosList onSelectReembolso={handleSelectReembolso} />
          </TabsContent>

          {selectedReembolso && (
            <TabsContent value="detalhes">
              <ReembolsoDetail 
                reembolso={selectedReembolso} 
                onBack={handleBackToList}
              />
            </TabsContent>
          )}
        </Tabs>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
