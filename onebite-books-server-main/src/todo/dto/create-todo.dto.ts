import { IsNonEmptyString } from 'src/validate-decorators';
import { IsEnum } from 'class-validator';

export enum TodoState {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export class CreateTodoDto {
  @IsNonEmptyString()
  author: string;

  @IsNonEmptyString()
  todo: string;

  @IsEnum(TodoState)
  state: TodoState;
}
