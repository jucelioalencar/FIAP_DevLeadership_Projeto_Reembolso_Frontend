import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Eye, Clock, CheckCircle2, XCircle, AlertCircle, Upload } from 'lucide-react';
import { Reembolso, ReembolsoStatus } from '../App';
import { NovoReembolso } from './NovoReembolso';
import { toast } from 'sonner';

const mockReembolsos: Reembolso[] = [
  {
    id: 'RMB-001',
    solicitante: 'Maria Silva',
    numeroVoo: 'LA-3491',
    companhia: 'LATAM',
    dataVoo: '2025-10-20',
    atraso: 5.5,
    valor: 1200,
    status: 'pendente',
    confiancaOCR: 96,
    documentoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    dadosExtraidos: {
      passageiro: 'SILVA/MARIA',
      voo: 'LA 3491',
      origem: 'GRU',
      destino: 'GIG',
      dataEmbarque: '20/10/2025',
      horaEmbarque: '14:30',
      valor: 'R$ 1.200,00',
    },
    validacaoExterna: {
      statusVoo: 'Atrasado',
      atrasoReal: 5.5,
      motivo: 'Condições meteorológicas adversas',
    },
    dataSubmissao: '2025-10-21T10:30:00',
  },
  {
    id: 'RMB-002',
    solicitante: 'João Santos',
    numeroVoo: 'G3-1234',
    companhia: 'GOL',
    dataVoo: '2025-10-19',
    atraso: 2.0,
    valor: 850,
    status: 'em_analise',
    confiancaOCR: 89,
    documentoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    dadosExtraidos: {
      passageiro: 'SANTOS/JOAO',
      voo: 'G3 1234',
      origem: 'CGH',
      destino: 'BSB',
      dataEmbarque: '19/10/2025',
      horaEmbarque: '08:15',
      valor: 'R$ 850,00',
    },
    validacaoExterna: {
      statusVoo: 'Atrasado',
      atrasoReal: 2.0,
      motivo: 'Manutenção não programada',
    },
    dataSubmissao: '2025-10-20T14:15:00',
  },
  {
    id: 'RMB-003',
    solicitante: 'Ana Costa',
    numeroVoo: 'AD-4521',
    companhia: 'AZUL',
    dataVoo: '2025-10-18',
    atraso: 6.2,
    valor: 1500,
    status: 'aprovado',
    confiancaOCR: 98,
    documentoUrl: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800',
    dadosExtraidos: {
      passageiro: 'COSTA/ANA',
      voo: 'AD 4521',
      origem: 'VCP',
      destino: 'POA',
      dataEmbarque: '18/10/2025',
      horaEmbarque: '16:45',
      valor: 'R$ 1.500,00',
    },
    validacaoExterna: {
      statusVoo: 'Atrasado',
      atrasoReal: 6.2,
      motivo: 'Problema técnico',
    },
    dataSubmissao: '2025-10-19T09:20:00',
  },
  {
    id: 'RMB-004',
    solicitante: 'Carlos Pereira',
    numeroVoo: 'LA-8765',
    companhia: 'LATAM',
    dataVoo: '2025-10-17',
    atraso: 1.5,
    valor: 950,
    status: 'reprovado',
    confiancaOCR: 94,
    documentoUrl: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800',
    dadosExtraidos: {
      passageiro: 'PEREIRA/CARLOS',
      voo: 'LA 8765',
      origem: 'GIG',
      destino: 'REC',
      dataEmbarque: '17/10/2025',
      horaEmbarque: '11:00',
      valor: 'R$ 950,00',
    },
    validacaoExterna: {
      statusVoo: 'Atrasado',
      atrasoReal: 1.5,
      motivo: 'Atraso operacional',
    },
    dataSubmissao: '2025-10-18T16:45:00',
  },
  {
    id: 'RMB-005',
    solicitante: 'Fernanda Lima',
    numeroVoo: 'G3-5678',
    companhia: 'GOL',
    dataVoo: '2025-10-22',
    atraso: 7.8,
    valor: 2100,
    status: 'pendente',
    confiancaOCR: 92,
    documentoUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800',
    dadosExtraidos: {
      passageiro: 'LIMA/FERNANDA',
      voo: 'G3 5678',
      origem: 'GRU',
      destino: 'FOR',
      dataEmbarque: '22/10/2025',
      horaEmbarque: '19:30',
      valor: 'R$ 2.100,00',
    },
    validacaoExterna: {
      statusVoo: 'Atrasado',
      atrasoReal: 7.8,
      motivo: 'Congestionamento aéreo',
    },
    dataSubmissao: '2025-10-23T08:10:00',
  },
];

interface ReembolsosListProps {
  onSelectReembolso: (reembolso: Reembolso) => void;
}

const statusConfig = {
  pendente: { label: 'Pendente', icon: Clock, color: 'bg-gray-100 text-gray-800' },
  em_analise: { label: 'Em Análise', icon: AlertCircle, color: 'bg-yellow-100 text-yellow-800' },
  aprovado: { label: 'Aprovado', icon: CheckCircle2, color: 'bg-green-100 text-green-800' },
  reprovado: { label: 'Reprovado', icon: XCircle, color: 'bg-red-100 text-red-800' },
};

export function ReembolsosList({ onSelectReembolso }: ReembolsosListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('todos');
  const [showNovoReembolso, setShowNovoReembolso] = useState(false);

  const handleNovoReembolsoSuccess = () => {
    toast.success('Reembolso enviado com sucesso!', {
      description: 'O documento está sendo processado. Você receberá uma notificação em breve.',
    });
  };

  const filteredReembolsos = mockReembolsos.filter((reembolso) => {
    const matchesSearch = 
      reembolso.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reembolso.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reembolso.numeroVoo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || reembolso.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ReembolsoStatus) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Reembolsos</CardTitle>
              <CardDescription>Gerencie e analise solicitações de reembolso</CardDescription>
            </div>
            <Button 
              className="flex items-center gap-2 bg-[#E6007E] hover:bg-[#C5006B] text-white"
              onClick={() => setShowNovoReembolso(true)}
            >
              <Upload className="w-4 h-4" />
              Novo Reembolso
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar por ID, solicitante ou voo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="em_analise">Em Análise</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="reprovado">Reprovado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Voo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Atraso</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Confiança OCR</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReembolsos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-gray-500">
                      Nenhum reembolso encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReembolsos.map((reembolso) => (
                    <TableRow key={reembolso.id}>
                      <TableCell>{reembolso.id}</TableCell>
                      <TableCell>{reembolso.solicitante}</TableCell>
                      <TableCell>
                        <div>
                          <div>{reembolso.numeroVoo}</div>
                          <div className="text-xs text-gray-500">{reembolso.companhia}</div>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(reembolso.dataVoo)}</TableCell>
                      <TableCell>
                        <span className={reembolso.atraso >= 4 ? 'text-green-600' : 'text-red-600'}>
                          {reembolso.atraso}h
                        </span>
                      </TableCell>
                      <TableCell>{formatCurrency(reembolso.valor)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                reembolso.confiancaOCR >= 95
                                  ? 'bg-green-600'
                                  : reembolso.confiancaOCR >= 85
                                  ? 'bg-yellow-600'
                                  : 'bg-red-600'
                              }`}
                              style={{ width: `${reembolso.confiancaOCR}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{reembolso.confiancaOCR}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(reembolso.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSelectReembolso(reembolso)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Mostrando {filteredReembolsos.length} de {mockReembolsos.length} reembolsos
            </div>
          </div>
        </CardContent>
      </Card>

      <NovoReembolso
        open={showNovoReembolso}
        onOpenChange={setShowNovoReembolso}
        onSuccess={handleNovoReembolsoSuccess}
      />
    </div>
  );
}
