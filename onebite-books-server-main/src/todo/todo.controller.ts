import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, TodoState } from './dto/create-todo.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TodoEntity } from './entitiy/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todo (할일 관련 API)')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /*
   * GET
   */
  @Get()
  @ApiOperation({
    summary: '모든 할일 불러오기',
    description: '데이터베이스에 저장되어있는 모든 할일를 불러옵니다.',
  })
  @ApiOkResponse({
    type: TodoEntity,
    isArray: true,
  })
  findAll(@Param('state') state: TodoState) {
    return this.todoService.findAllTodos(state);
  }

  @Get('/search')
  @ApiOperation({
    summary: '도서 검색하기',
    description: '제목, 저자, 출판사를 기준으로 검색합니다',
  })
  @ApiQuery({
    name: 'q',
    type: String,
    description: '책 제목 검색',
    required: true,
  })
  @ApiOkResponse({
    type: TodoEntity,
    isArray: true,
  })
  findSearchResult(@Query('q') q?: string) {
    return this.todoService.searchTodos(q);
  }

  @Get('random')
  @ApiOperation({
    summary: '랜덤 도서 불러오기',
    description: '랜덤 3개의 도서를 불러옵니다 (추천도서에 사용하세요)',
  })
  @ApiOkResponse({
    type: TodoEntity,
    isArray: true,
  })
  findRandom() {
    return this.todoService.findRandomTodos();
  }

  @Get(':bookId')
  @ApiOperation({
    summary: '특정 도서 불러오기',
    description: 'id를 기준으로 특정 도서의 정보를 불러옵니다',
  })
  @ApiParam({
    name: 'bookId',
    description: '정보를 불러오려는 도서의 아이디',
    type: Number,
  })
  @ApiOkResponse({
    type: TodoEntity,
  })
  @ApiNotFoundResponse({
    description: '{id}번 도서는 존재하지 않습니다',
  })
  findOne(@Param('bookId') bookId: number) {
    return this.todoService.findOneTodo(bookId);
  }

  /*
   * POST
   */
  @Post()
  @ApiOperation({
    summary: '새로운 도서 생성하기',
    description:
      "새로운 도서를 생성합니다. category는 'FE' 이거나 'BE'여야 합니다.",
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: '도서 아이디',
        },
        title: {
          type: 'string',
          description: '도서 제목',
          nullable: true,
        },
        subTitle: {
          type: 'string',
          description: '도서 부제',
        },
        author: {
          type: 'string',
          description: '저자',
          nullable: true,
        },
        description: {
          type: 'string',
          description: '도서 소개',
          nullable: true,
        },
        publisher: {
          type: 'string',
          description: '출판사',
          nullable: true,
        },
        coverImgUrl: {
          type: 'string',
          description: '도서 표지 이미지 링크(URL)',
          nullable: true,
        },
      },
    },
  })
  @ApiCreatedResponse({
    type: TodoEntity,
  })
  create(@Body() createBookDto: CreateTodoDto) {
    return this.todoService.createTodo(createBookDto);
  }

  /*
   * PATCH
   */
  @Patch(':todoId')
  @ApiOperation({
    summary: 'todo완료',
    description: '해야할일을 완료 합니다..',
  })
  @ApiParam({
    name: 'todoId',
    description: '정보를 수정하려는 할일의 아이디',
    type: Number,
  })
  @ApiOkResponse({
    type: TodoEntity,
  })
  @ApiNotFoundResponse()
  update(
    @Param('todoId') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.updateTodo(todoId, updateTodoDto);
  }

  /*
   * DELETE
   */
  @Delete(':todoId')
  @ApiOperation({
    summary: '할일 삭제하기',
    description: '특정 할일을 삭제합니다.',
  })
  @ApiParam({
    name: 'todoId',
    description: '삭제하려는 할일의 아이디',
    type: Number,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  delete(@Param('todoId') todoId: number) {
    return this.todoService.removeTodo(todoId);
  }
}
