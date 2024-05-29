import axios from 'axios';
import { MonitoringPoint } from './models/monitoring-point';
import { crop } from './crop';
import { unescape } from './unescape';
import { Isolate } from 'isolated-vm';
import { GraphicItem } from './models/graphic-item';
import { Graphic } from './models/graphic';

export class SaceClient {
  private httpClient = axios.create({
    baseURL: 'https://sace.sgb.gov.br',
  });

  constructor() {
    this.httpClient.interceptors.request.use(async (req) => {
      if (req.data instanceof FormData) {
        req.data.append('httpSessionId', '');
        req.data.append('scriptSessionId', '');
      }
      return req;
    });
    this.httpClient.interceptors.response.use((res) => {
      return res;
    });
  }

  private async evalScript(script: string) {
    const isolate = new Isolate({ memoryLimit: 8 });
    const context = await isolate.createContext();
    const result = await context.eval(script, { copy: true, timeout: 1000 });
    return result;
  }

  async getMonitoringPoints(): Promise<MonitoringPoint[]> {
    const form = new FormData();
    form.append('callCount', '1');
    form.append('windowName', '');
    form.append('batchId', '2');
    form.append('page', '/taquari/');
    form.append('c0-scriptName', 'PontoMonitoramentoService');
    form.append('c0-methodName', 'populateSelect');
    form.append('c0-id', '0');
    form.append('c0-e1', 'string:id');
    form.append('c0-e2', 'string:nome');
    form.append('c0-param0', 'Object_Object:{valueField:reference:c0-e1, displayField:reference:c0-e2}');
    form.append('c0-param1', 'string:GPM');
    const res = await this.httpClient.request<string>({
      url: '/taquari/dwr/call/plaincall/PontoMonitoramentoService.populateSelect.dwr',
      method: 'POST',
      data: form,
    });
    if (!res.data) {
      throw new Error('Failed to get monitoring points');
    }
    const externalScript = res.data.match(/dwr\.engine\.remote\.handleCallback(\(.+)/)?.[1];
    if (!externalScript) {
      throw new Error('No script parsed');
    }
    const script = `((...a)=>a)${externalScript}`;
    const result = await this.evalScript(script);
    if (!Array.isArray(result?.[2])) {
      throw new Error('Bad data at response');
    }
    return result[2].map<MonitoringPoint>((item: any) => {
      const id = Number(item?.value);
      const city = item?.text;
      if (isNaN(id) || typeof id !== 'number' || typeof city !== 'string') {
        throw new Error('Bad data at response');
      }
      return { id, city };
    });
  }

  async getGraphic(cityId: number): Promise<Graphic> {
    const form = new FormData();
    form.append('callCount', '1');
    form.append('windowName', '');
    form.append('c0-scriptName', 'GeradorGraficoService');
    form.append('c0-methodName', 'obtemGraficoPontoMonitoramento');
    form.append('c0-id', '0');
    form.append('c0-param0', 'string:divGraficoDados');
    form.append('c0-param1', `number:${cityId}`);
    form.append('c0-param2', 'number:765');
    form.append('c0-param3', 'number:410');
    form.append('c0-param4', 'boolean:true');
    form.append('c0-param5', 'string:GPM');
    form.append('c0-param6', 'boolean:false');
    form.append('batchId', '0');
    form.append('page', '/taquari/');
    console.log('Requesting graphic');
    const res = await this.httpClient.request({
      method: 'POST',
      url: '/taquari/dwr/call/plaincall/GeradorGraficoService.obtemGraficoPontoMonitoramento.dwr',
      data: form,
    });
    if (!res.data) {
      console.log('res:', res);
      throw new Error('Failed to get graphic');
    }
    console.log('Parsing graphic data');
    const html = unescape(crop(res.data, res.data.indexOf('handleCallback') + 'handleCallback'.length, '(', ')'));
    const chart0 = unescape(crop(html, html.indexOf('new Highcharts.Chart(') + 'new Highcharts.Chart('.length, '{', '}'));
    const titleContainer = JSON.parse(unescape(crop(chart0, chart0.indexOf('},"title":{"text":"') + '},"title":'.length, '{', '}')));
    const title = titleContainer?.text;
    const options = JSON.parse(crop(html, html.indexOf('"container","series":') + '"container","series":'.length, '[', ']'));
    const items = options.map((item: any): GraphicItem => {
      const isWaterLevel = item.name.includes('Cota PCD (cm)') || item.name.includes('Nível (cm)') || item.name.includes('Cota (cm)');
      const isRain = item.name.includes('Chuva (mm)');
      const type = isWaterLevel ? 'WATER_LEVEL' : isRain ? 'RAIN' : undefined;
      return {
        type,
        name: item.name,
        data: item.data,
      };
    });
    let severeFloodValue: number | undefined;
    let floodValue: number | undefined;
    let alertValue: number | undefined;
    let attentionValue: number | undefined;
    if (html.includes('"plotLines":')) {
      const plotLines = JSON.parse(crop(html, html.indexOf('"plotLines":') + '"plotLines":'.length, '[', ']'));
      const severeFloodValueAux = parseInt(
        plotLines?.find((item: any) => {
          return item?.label?.text?.includes('Cota de Inunda') && item?.label?.text?.includes('Severa');
        })?.value,
      );
      severeFloodValue = isNaN(severeFloodValueAux) ? undefined : severeFloodValueAux;
      const floodValueAux = parseInt(plotLines?.find((item: any) => item?.label?.text?.includes('Cota de Inunda'))?.value);
      floodValue = isNaN(floodValueAux) ? undefined : floodValueAux;
      const alertValueAux = parseInt(plotLines?.find((item: any) => item?.label?.text?.includes('Cota de Alerta'))?.value);
      alertValue = isNaN(alertValueAux) ? undefined : alertValueAux;
      const attentionValueAux = parseInt(plotLines?.find((item: any) => item?.label?.text?.includes('Cota de Aten'))?.value);
      attentionValue = isNaN(attentionValueAux) ? undefined : attentionValueAux;
    }
    return { title, items, severeFloodValue, floodValue, alertValue, attentionValue };
  }
}
