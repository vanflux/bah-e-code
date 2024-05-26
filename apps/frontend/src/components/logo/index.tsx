import { Typography } from '../Typography';

interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <Typography size="h1" semibold className={className}>
      TechRS
    </Typography>
  );
}
