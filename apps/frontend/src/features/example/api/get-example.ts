import { httpClient } from '../../../services/http-client';

export type ExampleDto = string[];

export async function getExample() {
  return httpClient.get<ExampleDto>('https://baconipsum.com/api/?type=example').then((res) => res.data);
}
