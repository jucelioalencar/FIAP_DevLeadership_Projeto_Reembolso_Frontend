import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2,
  Mail,
  User,
  Phone,
  Plane,
  AlertCircle
} from 'lucide-react';

interface NovoReembolsoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type UploadStage = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export function NovoReembolso({ open, onOpenChange, onSuccess }: NovoReembolsoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStage, setUploadStage] = useState<UploadStage>('idle');
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    numeroVoo: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tipo de arquivo
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Por favor, selecione um arquivo PDF ou imagem (JPG, PNG)');
        return;
      }

      // Validar tamanho (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 10MB');
        return;
      }

      setFile(selectedFile);

      // Criar preview para imagens
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Por favor, selecione um documento');
      return;
    }

    // Simular processo de upload e processamento
    setUploadStage('uploading');
    setProgress(0);

    // Upload para Blob Storage
    const uploadInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadStage('processing');
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simular processamento OCR
    setTimeout(() => {
      setProgress(0);
      const processInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(processInterval);
            setUploadStage('success');
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    }, 2500);

    // Finalizar
    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 8500);
  };

  const handleClose = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadStage('idle');
    setProgress(0);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      numeroVoo: '',
    });
    onOpenChange(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Pedido de Reembolso</DialogTitle>
          <DialogDescription>
            Faça upload do bilhete aéreo e preencha as informações do solicitante
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload de Documento */}
          <div className="space-y-4">
            <Label>Documento do Bilhete Aéreo</Label>
            
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-900 mb-2">
                  Clique para fazer upload ou arraste o arquivo aqui
                </p>
                <p className="text-sm text-gray-500">
                  PDF, JPG ou PNG (máx. 10MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {previewUrl ? (
                      <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border">
                        <img 
                          src={previewUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 flex-shrink-0 rounded-lg bg-red-50 flex items-center justify-center border">
                        <FileText className="w-12 h-12 text-red-600" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 truncate">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveFile}
                          disabled={uploadStage !== 'idle'}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {uploadStage !== 'idle' && (
                        <div className="mt-4 space-y-2">
                          {uploadStage === 'uploading' && (
                            <>
                              <div className="flex items-center gap-2 text-sm text-blue-600">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Enviando para Azure Blob Storage...</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </>
                          )}
                          
                          {uploadStage === 'processing' && (
                            <>
                              <div className="flex items-center gap-2 text-sm text-blue-600">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Processando com Azure AI Vision (OCR)...</span>
                              </div>
                              <Progress value={progress} className="h-2" />
                            </>
                          )}
                          
                          {uploadStage === 'success' && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Documento processado com sucesso!</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Informações do Solicitante */}
          <div className="space-y-4">
            <Label>Informações do Solicitante</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="nome"
                    placeholder="Nome do passageiro"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="pl-10"
                    required
                    disabled={uploadStage !== 'idle'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    required
                    disabled={uploadStage !== 'idle'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="pl-10"
                    disabled={uploadStage !== 'idle'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroVoo">Número do Voo (opcional)</Label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="numeroVoo"
                    placeholder="Ex: LA-3491"
                    value={formData.numeroVoo}
                    onChange={(e) => setFormData({ ...formData, numeroVoo: e.target.value })}
                    className="pl-10"
                    disabled={uploadStage !== 'idle'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informações do Processo */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Como funciona:</strong> Após o envio, o documento será processado automaticamente pelo sistema de OCR (Azure AI Vision). 
              Os dados serão validados com APIs externas e o sistema gerará uma recomendação de análise. 
              Você receberá uma notificação por e-mail assim que o processo for concluído.
            </AlertDescription>
          </Alert>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={uploadStage !== 'idle'}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!file || uploadStage !== 'idle'}
              className="bg-[#E6007E] hover:bg-[#C5006B] text-white"
            >
              {uploadStage === 'idle' ? (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Reembolso
                </>
              ) : uploadStage === 'success' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Concluído
                </>
              ) : (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processando...
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
