import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private tasksService: TasksService){}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.tasksService.getTasks(filterDto);
  }


  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id:number): Promise<Task>{
    this.logger.verbose(`Looking for task which is id "${id}"`);
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id:number, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> 
  {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
    return this.tasksService.createTask(createTaskDto);
  }

  // @Delete('/:id')
  // deleteTaskById(@Param('id') id:string){
  //   return this.tasksService.deleteTaskById(id);
  // }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id:number): Promise<void>{
    return this.tasksService.deleteTaskById(id);
  }

}

