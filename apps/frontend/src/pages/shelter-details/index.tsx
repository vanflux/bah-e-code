import { useParams } from 'react-router-dom';
import { Typography } from '../../components/Typography';
import { Icon } from '../../components/icons';
import { LMap } from '../../components/map';

function isAvaillable(used: number, total: number) {
  const full = used === total;

  const text = full ? 'Abrigo lotado' : 'Abrigo disponível';

  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded-full ${full ? 'bg-danger' : 'bg-success'}`} />
      <Typography size="h4" bold color={full ? 'danger' : 'success'}>
        {text}
      </Typography>
    </div>
  );
}

export function ShelterDetails() {
  const { shelterId } = useParams();

  return (
    <div>
      <LMap className="h-72" />

      <div className="p-4 flex flex-col gap-2">
        <Typography size="h1" bold>
          Paróquia Divino Espírito Santo
        </Typography>
        {isAvaillable(1, 2)}
        <Typography size="h3" bold>
          Detalhes do abrigo
        </Typography>

        <div className="p-2 border-b-2 border-[#2582f0]/50">
          <div className="flex gap-2 items-start">
            <Icon type="gps" size={3} className="mt-[7px] fill-danger" />
            <Typography size="h4">R. Borborema, 687 E 691, Vila João Pessoa, Porto Alegre</Typography>
          </div>
          {true ? (
            <div className="flex gap-2 items-center">
              <Icon type="dogFoot" size={3} className="fill-[#FF00A8]" />
              <Typography size="h4">O abrigo aceita animais</Typography>
            </div>
          ) : null}
          <div className="flex gap-2 items-center">
            <Icon type="people" size={3} className="fill-success" />
            <Typography size="h4">80/200 pessoas abrigadas</Typography>
          </div>
          <div className="flex gap-2 items-center">
            <Icon type="contact" size={3} className="fill-[#2582f0]" />
            <Typography size="h4">Contato: (51) 99543-3412</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
