import { ApiProperty } from '@nestjs/swagger';

export class TodoEntity {
  @ApiProperty({
    description: '해야할일',
  })
  todo: string;

  @ApiProperty({
    description: '작성자',
  })
  author: string;
}
