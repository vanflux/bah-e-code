import { ReactNode, useMemo, useState } from 'react';
import { useAuth, useLogin } from '../hooks';
import { Modal } from '../../../components/modal';
import { TextInput } from '../../../components/text-input';
import { isValidCPF } from '@brazilian-utils/brazilian-utils';

interface Props {
  children?: ReactNode;
}

export function AuthRequired({ children }: Props) {
  const { authenticated } = useAuth();

  const [cpfInput, setCpfInput] = useState<string>();
  const [cpfInputTouch, setCpfInputTouch] = useState(false);
  const { mutate: login } = useLogin();

  const handleContinue = () => {
    if (!cpfInput) return;
    const cpf = cpfInput?.replace(/[^\d]/g, '');
    login({ cpf });
  };

  const cpfError = useMemo(() => {
    if (!cpfInput?.length) return 'Campo obrigatório';
    if (cpfInput.includes('_') || !isValidCPF(cpfInput)) return 'CPF inválido';
  }, [cpfInput]);

  const canContinue = !cpfError;

  return (
    <>
      <Modal open={!authenticated} hideClose className="gap-3">
        <h1 className="text-sm font-semibold text-center">Para continuar, insira o seu CPF</h1>
        <TextInput
          className="w-full"
          mask="999.999.999-99"
          value={cpfInput ?? ''}
          onChange={(e) => setCpfInput(e.target.value)}
          placeholder="Insira o seu cpf"
          onBlur={() => setCpfInputTouch(true)}
          errorMessage={cpfInputTouch ? cpfError : undefined}
        />
        <button className="bg-primary-500 disabled:bg-gray-300 py-2 text-white rounded-xl" disabled={!canContinue} onClick={handleContinue}>
          Continuar
        </button>
      </Modal>
      {children}
    </>
  );
}
