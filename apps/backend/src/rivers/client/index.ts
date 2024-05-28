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
    const options = JSON.parse(crop(html, html.indexOf('"container","series":') + '"container","series":'.length, '[', ']'));
    const items = options.map((item: any): GraphicItem => {
      return { name: item.name, data: item.data };
    });
    const plotLines = JSON.parse(crop(html, html.indexOf('"plotLines":') + '"plotLines":'.length, '[', ']'));
    const alertValueAux = parseInt(plotLines?.find((item: any) => item?.label?.text?.includes('Cota de Alerta'))?.value);
    const alertValue = isNaN(alertValueAux) ? undefined : alertValueAux;
    const floodValueAux = parseInt(plotLines?.find((item: any) => item?.label?.text?.includes('Cota de Inunda'))?.value);
    const floodValue = isNaN(floodValueAux) ? undefined : floodValueAux;
    return { items, alertValue, floodValue };
  }
}
