import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { prismaExclude } from 'src/util/prisma-exclude';
import { removeWhitespace } from 'src/util/remove-whitepsace';
import { CreateTodoDto, TodoState } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async createTodo(createTodoDto: CreateTodoDto) {
    return await this.prisma.todo.create({
      data: { ...createTodoDto },
      // select: prismaExclude('Todo'),
    });
  }

  async findAllTodos(state: TodoState) {
    return await this.prisma.todo.findMany({
      where: {
        state,
      },
    });
  }

  async searchTodos(q?: string) {
    const searchText = q.replace(/\s+/g, '');
    return await this.prisma.todo.findMany({
      where: {
        OR: [
          {
            todo: { contains: searchText },
          },
        ],
      },
    });
  }

  async findRandomTodos() {
    const query = `
        SELECT id, todo, author,
        FROM "Todo"
        ORDER BY RANDOM() LIMIT 3
    `;
    return await this.prisma.$queryRawUnsafe(query);
  }

  async findOneTodo(id: number) {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      throw new NotFoundException(`${id}번 할일은 존재하지 않습니다`);
    }
    return todo;
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    console.log(updateTodoDto);
    await this.prisma.todo.update({
      where: {
        id: id,
      },
      data: { state: 'COMPLETED' }, // state를 COMPLETED로 업데이트
    });
  }

  async removeTodo(id: number) {
    await this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
