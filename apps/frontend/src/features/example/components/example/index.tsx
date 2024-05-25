import { ExampleDto } from '../../api';

interface Props {
  example: ExampleDto;
}

export function Example({ example }: Props) {
  return (
    <div>
      {example.map((value, i) => (
        <p key={i}>{value}</p>
      ))}
    </div>
  );
}
