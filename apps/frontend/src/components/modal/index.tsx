import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode, useMemo } from 'react';
import { IconButton } from '../icon-button';
import { Icon } from '../icons';
import { cn } from '../../utils/cn';

interface Props {
  open?: boolean;
  className?: string;
  overlayClassName?: string;
  hideClose?: boolean;
  children?: ReactNode | ReactNode[];
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ open, className, overlayClassName: inOverlayClassName, hideClose, children, onOpenChange }: Props) {
  const overlayClassName = useMemo(
    () => cn('bg-overlay data-[state=open]:animate-overlayShow fixed inset-0', inOverlayClassName),
    [inOverlayClassName],
  );
  const contentClassName = useMemo(
    () =>
      cn(
        'flex flex-col pt-12 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[90vh] w-[95vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-3 z-10 shadow-system focus:outline-none overflow-auto',
        className,
      ),
    [className],
  );

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={overlayClassName} />
        <Dialog.Content className={contentClassName}>
          {children}
          {!hideClose && (
            <Dialog.Close asChild>
              <IconButton className="absolute top-[10px] right-[10px]">
                <Icon type="close" size={6} className="text-gray-600" />
              </IconButton>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
