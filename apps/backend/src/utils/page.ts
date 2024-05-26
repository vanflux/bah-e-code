import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface Page<T> {
  items: T[];
  total: number;
}

export function PageType<T, Y extends Type<T>>(clazz: Y) {
  class Class implements Page<T> {
    @ApiProperty({ type: clazz })
    items!: T[];

    @ApiProperty()
    total!: number;
  }
  return Class;
}
