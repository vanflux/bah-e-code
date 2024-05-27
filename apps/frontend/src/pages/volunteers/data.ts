import { ModalContentProps } from '.';
import { routes } from '../../router/routes';

export const volunteerCards = [
  {
    title: 'Voluntário em abrigos',
    description:
      'Voluntários com disponibilidade para atuar nos turnos, manhã, tarde ou noite (de acordo com a necesidade do abrigo). Entrar em contato diretamente com os abrigos.',
    iconType: 'shelter',
    link: routes.SHELTERS_NEED_VOLUNTEERS(),
  },
  {
    title: 'Voluntário para pets',
    description:
      'Voluntários com disponibilidade para atuar nos turnos, manhã, tarde ou noite (de acordo com a necesidade do abrigo).  Entrar em contato diretamente com os abrigos.',
    iconType: 'catDog',
    link: routes.SHELTERS_NEED_VOLUNTEERS_FOR_PET(),
  },
  {
    title: 'Voluntário na área de psicologia',
    description:
      'Voluntários com disponibilidade para prestar acolhimento e atendimento às necessidades relacionadas à saúde mental presencial ou on-line. Entrar em contato diretamente com os abrigos.',
    iconType: 'doctor',
    link: routes.SHELTERS_NEED_VOLUNTEERS_FOR_PSICO(),
  },
  {
    title: 'Voluntário pela secretária da saúde',
    description:
      'Profissionais (farmacêuticos, fisioterapeutas, terapeutas ocupacionais, equipes de fora do RS, demais prosissões) com disponibilidade de carga horária e interesse em atuar no auxílio aos municípios do Estado do Rio Grande do Sul.',
    iconType: 'doctor',
  },
  {
    title: 'Voluntário pela Defesa Civil',
    description:
      'Voluntários (pessoas, Instituições, empresas e ou grupos)que desejam atuar em tarefas de organização, seleção e triagem das doações de ajuda humanitária.',
    iconType: 'shield',
  },
] as const;

export const healthModalInfo: ModalContentProps = {
  title: 'SECRETARIA DA SAÚDE',
  description: 'Horários de atendimento: 8h30min às 12h e 13h30min às 18h Atendimento ao cidadão: https://saude.rs.gov.br/ouvidoria',
  phone: '(51) 3288-5800',
  actionUrl: 'https://saude.rs.gov.br/cadastro-de-profissionais',
  links: [
    {
      icon: 'instagram',
      url: 'https://www.instagram.com/defesacivilrs/',
    },
    {
      icon: 'facebook',
      url: 'https://www.facebook.com/defesacivildors',
    },
    {
      icon: 'youtube',
      url: 'https://www.youtube.com/defesacivildoriograndedosul',
    },
    {
      icon: 'twitter',
      url: 'https://x.com/DefesaCivilRS',
    },
  ],
};

export const civilDefenseInfo: ModalContentProps = {
  title: 'DEFESA CIVIL',
  description: 'Site: https://defesacivil.rs.gov.br/inicial',
  phone: '(51) 3221-7098',
  actionUrl: 'https://casamilitar-rs.com.br/voluntariado/',
  links: [
    {
      icon: 'youtube',
      url: 'https://www.youtube.com/SaudeGovRS',
    },
    {
      icon: 'instagram',
      url: 'https://www.instagram.com/saudegovrs',
    },
    {
      icon: 'facebook',
      url: 'https://www.facebook.com/SaudeGovRS',
    },
    {
      icon: 'twitter',
      url: 'https://x.com/SaudeGovRS',
    },
    {
      icon: 'flic',
      url: 'https://www.flickr.com/photos/saudegovrs/',
    },
  ],
};
