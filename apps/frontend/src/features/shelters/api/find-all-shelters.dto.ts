import { Page } from '../../../dtos/page';
import { ShelterDto } from '../dtos';
import { FindAllSheltersDto } from '../dtos/find-all-shelters.dto';

export async function findAllShelters(body: FindAllSheltersDto) {
  const shelterDtos: Page<ShelterDto> = {
    items: [
      {
        shelterId: '1',
        name: 'Projeto Surfar',
        address: 'R. Borborema, 687 E 691, Vila João Pessoa, Porto Alegre',
        city: 'Gravatai',
        street: 'Rua Domingo Dorivaldo Thiesen',
        streetNumber: 744,
        zipCode: '94950590',
        capacity: 200,
        shelteredPeople: 200,
        contact: '(51) 99543-3412',
        petFriendly: true,
        actived: true,
        prioritySum: 200,
        verified: true,
        neighbourhood: 'São José',
        category: 'Shelter',
        createdAt: '2024-05-25T17:30:00.175Z',
        updatedAt: '2024-05-25T17:30:00.175Z',
      },
      {
        shelterId: '2',
        name: 'Projeto Surfar',
        address: 'R. Borborema, 687 E 691, Vila João Pessoa, Porto Alegre',
        city: 'Gravatai',
        street: 'Rua Domingo Dorivaldo Thiesen',
        streetNumber: 744,
        zipCode: '94950590',
        capacity: 200,
        shelteredPeople: 80,
        contact: '(51) 99543-3412',
        petFriendly: false,
        actived: true,
        prioritySum: 200,
        verified: true,
        neighbourhood: 'São José',
        category: 'Shelter',
        createdAt: '2024-05-25T17:30:00.175Z',
        updatedAt: '2024-05-25T17:30:00.175Z',
      },
    ],
    total: 2,
  };
  return shelterDtos;
  //return httpClient.get<Page<ShelterDto>>('/v1/shelters', { params: body }).then(res => res.data);
}
