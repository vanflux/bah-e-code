import { PropsWithChildren, useState } from 'react';
import { Typography } from '../../components/Typography';
import { Icon, IconType } from '../../components/icons';
import { Modal } from '../../components/modal';
import { Button } from '../../components/button';
import { civilDefenseInfo, healthModalInfo, volunteerCards } from './data';

interface Props {
  title: string;
  description: string;
  iconType: IconType;
  onClick?: () => void;
}

function Card({ iconType, title, description, onClick }: Props) {
  return (
    <button className="flex flex-row gap-4 shadow-system p-3 rounded-xl" onClick={() => onClick && onClick()}>
      <div className="flex flex-col gap-2">
        <Typography semibold>{title}</Typography>
        <Typography>{description}</Typography>
      </div>
      <div className="flex flex-col justify-center">
        <Icon type={iconType} size={10} className="text-primary-500 fill-primary-500"></Icon>
      </div>
    </button>
  );
}

interface ModalWrapperProps extends PropsWithChildren {
  modalContent?: JSX.Element | string;
}

function ModalWrapper({ children, modalContent }: ModalWrapperProps) {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen(true)}>
      <Modal open={open} onOpenChange={setOpen} hideClose>
        {modalContent}
      </Modal>
      {children}
    </div>
  );
}

interface ModalLinkProps {
  icon: IconType;
  url: string;
}

function IconLink({ icon, url }: ModalLinkProps) {
  return (
    <a href={url} target="_blank">
      <Icon className="w-8 h-8" type={icon} />
    </a>
  );
}

export interface ModalContentProps {
  title: string;
  links: ModalLinkProps[];
  phone: string;
  description: string;
  actionUrl?: string;
}

function modalContent({ title, links, description, phone, actionUrl }: ModalContentProps) {
  return (
    <div className="flex flex-col gap-6">
      <Typography size="h3" bold>
        {title}
      </Typography>

      <div className="flex gap-4">
        {links.map((link) => (
          <IconLink key={link.url} {...link} />
        ))}
      </div>

      <div>
        <Typography>Fone: {phone}</Typography>
        <Typography>{description}</Typography>
      </div>

      <a href={actionUrl} target="_blank">
        <Button type="button" full>
          Clique aqui para se voluntariar
        </Button>
      </a>
    </div>
  );
}

export const VolunteersPage = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 p-4">
      <div className="flex flex-row gap-2 items-center ">
        <Typography size="h2" semibold>
          Voluntariado
        </Typography>
        <Icon type="people" size={8} className="text-primary-500"></Icon>
      </div>

      <Card {...volunteerCards[0]} />
      <Card {...volunteerCards[1]} />
      <Card {...volunteerCards[2]} />

      <ModalWrapper modalContent={modalContent(healthModalInfo)}>
        <Card {...volunteerCards[3]} />
      </ModalWrapper>

      <ModalWrapper modalContent={modalContent(civilDefenseInfo)}>
        <Card {...volunteerCards[4]} />
      </ModalWrapper>
    </div>
  );
};
