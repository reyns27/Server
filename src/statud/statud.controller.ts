import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { StatudService } from './statud.service';
import { CreateStatudDto } from './dto/create-statud.dto';
import { UpdateStatudDto } from './dto/update-statud.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Statud')
@Controller('statud')
export class StatudController {
  constructor(private readonly statudService: StatudService) { }

  @Post()
  create(@Body() createStatudDto: CreateStatudDto) {
    return this.statudService.create(createStatudDto);
  }

  @Get()
  findAll() {
    return this.statudService.findAll();
  }

  @Get('/getuserid/:id')
  getStatudForUser(@Param('id') id: number) {
    console.log(id)
    return this.statudService.getStatudForUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatudDto: UpdateStatudDto) {
    return this.statudService.update(+id, updateStatudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statudService.remove(+id);
  }
}
