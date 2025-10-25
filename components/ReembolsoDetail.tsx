import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Plane, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  TrendingUp
} from 'lucide-react';
import { Reembolso } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReembolsoDetailProps {
  reembolso: Reembolso;
  onBack: () => void;
}

export function ReembolsoDetail({ reembolso, onBack }: ReembolsoDetailProps) {
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [comentario, setComentario] = useState('');
  const [processando, setProcessando] = useState(false);

  const handleApprove = () => {
    setProcessando(true);
    setTimeout(() => {
      setProcessando(false);
      setShowApproveDialog(false);
      alert('Reembolso aprovado com sucesso! Notificação enviada ao solicitante.');
    }, 1500);
  };

  const handleReject = () => {
    setProcessando(true);
    setTimeout(() => {
      setProcessando(false);
      setShowRejectDialog(false);
      alert('Reembolso reprovado. Notificação enviada ao solicitante.');
    }, 1500);
  };

  const isEligible = reembolso.atraso >= 4;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Lista
        </Button>
        {reembolso.status === 'pendente' && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="text-red-600 border-red-600 hover:bg-red-50"
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reprovar
            </Button>
            <Button 
              className="bg-[#E6007E] hover:bg-[#C5006B] text-white"
              onClick={() => setShowApproveDialog(true)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aprovar
            </Button>
          </div>
        )}
      </div>

      {/* Análise Automática */}
      <Alert className={isEligible ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}>
        <TrendingUp className={`h-4 w-4 ${isEligible ? 'text-green-600' : 'text-red-600'}`} />
        <AlertTitle className={isEligible ? 'text-green-900' : 'text-red-900'}>
          {isEligible ? 'Recomendação: APROVAR' : 'Recomendação: REPROVAR'}
        </AlertTitle>
        <AlertDescription className={isEligible ? 'text-green-800' : 'text-red-800'}>
          {isEligible 
            ? `Atraso de ${reembolso.atraso}h atende o critério mínimo de 4 horas. Validação externa confirmada.`
            : `Atraso de ${reembolso.atraso}h não atende o critério mínimo de 4 horas para elegibilidade.`
          }
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Documento Original */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documento Original
            </CardTitle>
            <CardDescription>Bilhete aéreo submetido pelo solicitante</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden bg-gray-50">
              <ImageWithFallback
                src={reembolso.documentoUrl}
                alt="Documento de reembolso"
                className="w-full h-auto"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-gray-600">Confiança do OCR</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
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
                <span className="font-medium">{reembolso.confiancaOCR}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dados Extraídos */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Extraídos (OCR)</CardTitle>
            <CardDescription>Informações estruturadas via Azure AI Vision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Passageiro</p>
                  <p className="text-gray-900">{reembolso.dadosExtraidos.passageiro}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Plane className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Voo</p>
                  <p className="text-gray-900">{reembolso.dadosExtraidos.voo}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Rota</p>
                  <p className="text-gray-900">
                    {reembolso.dadosExtraidos.origem} → {reembolso.dadosExtraidos.destino}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Data e Hora</p>
                  <p className="text-gray-900">
                    {reembolso.dadosExtraidos.dataEmbarque} às {reembolso.dadosExtraidos.horaEmbarque}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Valor do Bilhete</p>
                  <p className="text-gray-900">{reembolso.dadosExtraidos.valor}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>JSON Estruturado:</strong> Os dados acima foram extraídos e validados automaticamente pelo Azure AI Vision e armazenados no Azure SQL Database.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Validação Externa */}
      <Card>
        <CardHeader>
          <CardTitle>Validação Externa</CardTitle>
          <CardDescription>Dados obtidos via API FlightAware e sistemas internos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Plane className="w-4 h-4" />
                <span className="text-sm">Status do Voo</span>
              </div>
              <p className="text-gray-900">{reembolso.validacaoExterna?.statusVoo}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Atraso Confirmado</span>
              </div>
              <p className="text-2xl text-gray-900">{reembolso.validacaoExterna?.atrasoReal}h</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Motivo</span>
              </div>
              <p className="text-gray-900">{reembolso.validacaoExterna?.motivo}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações do Processo */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID do Reembolso</p>
              <p className="text-gray-900">{reembolso.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Solicitante</p>
              <p className="text-gray-900">{reembolso.solicitante}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Data de Submissão</p>
              <p className="text-gray-900">{formatDateTime(reembolso.dataSubmissao)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor Solicitado</p>
              <p className="text-gray-900">{formatCurrency(reembolso.valor)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Aprovação */}
      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              Aprovar Reembolso
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a aprovar o reembolso {reembolso.id} no valor de {formatCurrency(reembolso.valor)}.
              Uma notificação será enviada automaticamente ao solicitante.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="comentario-aprovacao">Comentário (opcional)</Label>
            <Textarea
              id="comentario-aprovacao"
              placeholder="Adicione observações sobre esta aprovação..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleApprove}
              disabled={processando}
              className="bg-green-600 hover:bg-green-700"
            >
              {processando ? 'Processando...' : 'Confirmar Aprovação'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Reprovação */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              Reprovar Reembolso
            </AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a reprovar o reembolso {reembolso.id}.
              Uma notificação será enviada automaticamente ao solicitante com a justificativa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="comentario-reprovacao">Justificativa (obrigatória)</Label>
            <Textarea
              id="comentario-reprovacao"
              placeholder="Explique o motivo da reprovação..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="mt-2"
              required
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleReject}
              disabled={processando || !comentario.trim()}
              className="bg-red-600 hover:bg-red-700"
            >
              {processando ? 'Processando...' : 'Confirmar Reprovação'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
