import { Typography } from '../../components/Typography';
import { Icon } from '../../components/icons';

export const VolunteersPage = () => {
  const items = [
    {
      title: 'Voluntário em abrigos',
      description:
        'Voluntários com disponibilidade para atuar nos turnos, manhã, tarde ou noite (de acordo com a necesidade do abrigo). Entrar em contato diretamente com os abrigos.',
      iconType: 'shelter',
    },
    {
      title: 'Voluntário para pets',
      description:
        'Voluntários com disponibilidade para atuar nos turnos, manhã, tarde ou noite (de acordo com a necesidade do abrigo).  Entrar em contato diretamente com os abrigos.',
      iconType: 'house',
    },
    {
      title: 'Voluntário na área de psicologia',
      description:
        'Voluntários com disponibilidade para prestar acolhimento e atendimento às necessidades relacionadas à saúde mental presencial ou on-line. Entrar em contato diretamente com os abrigos.',
      iconType: 'house',
    },
    {
      title: 'Voluntário pela secretária da saúde',
      description:
        'Profissionais (farmacêuticos, fisioterapeutas, terapeutas ocupacionais, equipes de fora do RS, demais prosissões) com disponibilidade de carga horária e interesse em atuar no auxílio aos municípios do Estado do Rio Grande do Sul.',
      iconType: 'house',
    },
    {
      title: 'Voluntário pela Defesa Civil',
      description:
        'Voluntários (pessoas, Instituições, empresas e ou grupos)que desejam atuar em tarefas de organização, seleção e triagem das doações de ajuda humanitária.',
      iconType: 'house',
    },
  ] as const;
  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      <div className="flex flex-row gap-2 items-center ">
        <Typography size="h2" semibold>
          Voluntariado
        </Typography>
        <Icon type="people" size={8} className="text-primary-500"></Icon>
      </div>
      {items.map((item) => (
        <div key={item.iconType} className="flex flex-row gap-4 shadow-system p-3 rounded-xl">
          <div className="flex flex-col gap-2">
            <Typography semibold>{item.title}</Typography>
            <Typography>{item.description}</Typography>
          </div>
          <div className="flex flex-col justify-center">
            <Icon type={item.iconType} size={10} className="text-primary-500"></Icon>
          </div>
        </div>
      ))}
    </div>
  );
};
