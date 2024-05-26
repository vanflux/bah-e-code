import { TailSpin } from 'react-loader-spinner';

interface Props {
  size?: 1 | 2;
}

export function Loading({ size = 2 }: Props) {
  const value = size === 2 ? 24 : 16;
  return <TailSpin width={value} height={value} />;
}
