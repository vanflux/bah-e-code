import { Modal } from '../../../../components/modal';
import { useLastWaterLevels } from '../../hooks';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  TimeScale,
  ChartData,
  TimeSeriesScale,
  DatasetChartOptions,
} from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { SelectInput } from '../../../../components/select-input';
import { Typography } from '../../../../components/Typography';
import { Icon } from '../../../../components/icons';
import { useRivers } from '../../hooks/use-rivers';
import { formatDDMMYYYY, formatHHMM } from '../../../../utils/date';

ChartJS.register(TimeScale, TimeSeriesScale, LinearScale, PointElement, LineElement, Tooltip);

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function WaterLevelModal({ open, onOpenChange }: Props) {
  const [days, setDays] = useState(7);
  const [riverId, setRiverId] = useState<string>();
  const { data: rivers } = useRivers();
  const { data: waterLevels } = useLastWaterLevels(riverId, days);

  const river = useMemo(() => rivers?.find((item) => item.riverId === riverId), [rivers, riverId]);
  const lastWaterLevel = waterLevels?.[waterLevels.length - 1];

  useEffect(() => {
    setRiverId((riverId) => riverId ?? rivers?.[0]?.riverId);
  }, [rivers]);

  const options = useMemo<ChartOptions<'line'>>(
    () => ({
      responsive: true,
      elements: {},
      scales: {
        x: {
          type: 'timeseries',
        },
      },
    }),
    [],
  );

  const data = useMemo(() => {
    const data: ChartData<'line', { x: Date; y: number }[]> = { datasets: [] };
    if (!waterLevels?.length) return data;
    data.datasets.push({
      data:
        waterLevels.map((item) => ({
          x: new Date(item.date),
          y: item.value / 100,
        })) ?? [],
      borderColor: '#2196F3',
      borderWidth: 1.5,
      pointRadius: 0,
    });
    if (river?.alertValue) {
      data.datasets.push({
        data: [
          { x: new Date(waterLevels[0].date), y: river.alertValue / 100 },
          { x: new Date(waterLevels[waterLevels.length - 1].date), y: river.alertValue / 100 },
        ],
        borderColor: '#f2bc0a',
        borderWidth: 1.5,
        pointRadius: 0,
      });
    }
    if (river?.floodValue) {
      data.datasets.push({
        data: [
          { x: new Date(waterLevels[0].date), y: river.floodValue / 100 },
          { x: new Date(waterLevels[waterLevels.length - 1].date), y: river.floodValue / 100 },
        ],
        borderColor: '#e31e05',
        borderWidth: 1.5,
        pointRadius: 0,
      });
    }
    return data;
  }, [waterLevels, river]);

  return (
    <Modal open={open} onOpenChange={onOpenChange} className="gap-3">
      <div className="flex justify-center items-center gap-3">
        <Typography semibold size="h3">
          Nível do rios
        </Typography>
        <Icon type="chart" size={6} />
      </div>
      <div className="flex flex-col gap-1">
        <Typography semibold size="h4">
          Rio
        </Typography>
        <SelectInput
          value={riverId}
          onChange={setRiverId}
          options={rivers?.map((item) => ({ label: item.name, value: item.riverId })) ?? []}
          placeholder="Selecione o rio"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Typography semibold size="h4">
          Período do gráfico
        </Typography>
        <SelectInput
          value={String(days)}
          onChange={(value) => setDays(Number(value))}
          options={[
            { label: 'Último dia', value: '1' },
            { label: 'Última semana', value: '7' },
            { label: 'Últimas 2 semanas', value: '14' },
          ]}
          placeholder="Selecione o período"
        />
      </div>
      <Line options={options} data={data} />
      <div className="flex justify-center">
        <img src="/assets/images/sgb-logo.png" className="h-6" />
      </div>
      <div className="flex flex-col gap-1">
        {lastWaterLevel?.value != null && (
          <div className="flex items-center gap-2">
            <Typography>
              <b>Cota atual:</b> {lastWaterLevel.value / 100}m
            </Typography>
          </div>
        )}
        {river?.alertValue != null && (
          <div className="flex items-center gap-2">
            <Typography>
              <b>Cota de Alerta:</b> {river.alertValue / 100}m
            </Typography>
            <div className="w-4 h-4 border border-gray-600 bg-[#f2bc0a]" />
          </div>
        )}
        {river?.floodValue != null && (
          <div className="flex items-center gap-2">
            <Typography>
              <b>Cota de Inundação:</b> {river.floodValue / 100}m
            </Typography>
            <div className="w-4 h-4 border border-gray-600 bg-[#e31e05]" />
          </div>
        )}
        {!!lastWaterLevel?.date && (
          <Typography>
            Informação obtida em {formatDDMMYYYY(lastWaterLevel.date)} {formatHHMM(lastWaterLevel.date)}
          </Typography>
        )}
      </div>
    </Modal>
  );
}
