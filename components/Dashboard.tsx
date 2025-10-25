import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, CheckCircle2 } from 'lucide-react';

const kpiData = {
  tmaAntes: 8.5,
  tmaDepois: 3.4,
  reducaoTMA: 60,
  taxaAutomacao: 52,
  taxaErros: 3.2,
  reducaoErros: 22,
};

const reembolsosPorDia = [
  { dia: 'Seg', total: 24, automaticos: 13, manuais: 11 },
  { dia: 'Ter', total: 32, automaticos: 18, manuais: 14 },
  { dia: 'Qua', total: 28, automaticos: 15, manuais: 13 },
  { dia: 'Qui', total: 35, automaticos: 19, manuais: 16 },
  { dia: 'Sex', total: 41, automaticos: 21, manuais: 20 },
];

const statusDistribuicao = [
  { name: 'Aprovados', value: 156, color: '#E6007E' },
  { name: 'Reprovados', value: 42, color: '#dc2626' },
  { name: 'Em Análise', value: 18, color: '#ff6b35' },
  { name: 'Pendentes', value: 12, color: '#6b7280' },
];

const tmaTendencia = [
  { mes: 'Jun', tma: 8.5 },
  { mes: 'Jul', tma: 7.8 },
  { mes: 'Ago', tma: 6.2 },
  { mes: 'Set', tma: 4.5 },
  { mes: 'Out', tma: 3.4 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-gray-900 mb-1">Dashboard de Performance</h2>
        <p className="text-gray-600">Acompanhamento dos OKRs e KPIs do sistema</p>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Tempo Médio de Análise (TMA)</CardDescription>
            <CardTitle className="text-3xl">3.4h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">{kpiData.reducaoTMA}% redução</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">De 8.5h para 3.4h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taxa de Automação</CardDescription>
            <CardTitle className="text-3xl">{kpiData.taxaAutomacao}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Meta: 50%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#E6007E] h-2 rounded-full" 
                style={{ width: `${kpiData.taxaAutomacao}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Taxa de Erros de Análise</CardDescription>
            <CardTitle className="text-3xl">{kpiData.taxaErros}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm">{kpiData.reducaoErros}% redução</span>
            </div>
            <Badge variant="outline" className="mt-2">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Dentro da meta
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do TMA</CardTitle>
            <CardDescription>Últimos 5 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={tmaTendencia}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tma" stroke="#E6007E" strokeWidth={2} name="TMA (horas)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Status</CardTitle>
            <CardDescription>Total: 228 reembolsos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusDistribuicao}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribuicao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reembolsos Processados por Dia</CardTitle>
          <CardDescription>Comparação entre processamento automático e manual</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reembolsosPorDia}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="automaticos" fill="#E6007E" name="Automáticos" />
              <Bar dataKey="manuais" fill="#ff6b35" name="Manuais" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Status do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Serviços</CardTitle>
          <CardDescription>Monitoramento em tempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'API Gateway', status: 'online', latency: '45ms' },
              { name: 'Serviço OCR', status: 'online', latency: '320ms' },
              { name: 'Serviço Validação', status: 'online', latency: '180ms' },
              { name: 'Serviço Análise', status: 'online', latency: '95ms' },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <p className="text-sm text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500">{service.latency}</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
