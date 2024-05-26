import { httpClient } from '../../../services/http-client';
import { LoginDto, AuthResultDto } from '../dtos';

export async function login(body: LoginDto) {
  return httpClient.post<AuthResultDto>('/v1/auth/login', body).then((res) => res.data);
}
