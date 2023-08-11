import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { StatudService } from './statud.service';
import { CreateStatudDto } from './dto/create-statud.dto';
import { UpdateStatudDto } from './dto/update-statud.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { CreateDetailsDto } from './details/dto/create-details.dto';
import { DetailsService } from './details/details.service';
import { UpdatedDetailsDto } from './details/dto/update-details.dto';



@ApiTags('Statud')
@Controller('statud')
export class StatudController {
  constructor(private readonly statudService: StatudService, private readonly detailsService: DetailsService) { }

  @Post()
  create(@Body() createStatudDto: CreateStatudDto) {
    return this.statudService.create(createStatudDto);
  }

  @Post('/details/new')
  createDetails(@Body() createDetailsDto: CreateDetailsDto) {
    return this.detailsService.createDetails(createDetailsDto);
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

  @Get('/details/all')
  findAllDetails() {
    return this.detailsService.findAll();
  }

  @Get('/details/:id')
  findOneDetails(@Param('id') id: string) {
    return this.detailsService.findOneDetails(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStatudDto: UpdateStatudDto) {
    return this.statudService.update(+id, updateStatudDto);
  }

  @Patch('/details/update/:id')
  updateDetails(@Param('id') id: string, @Body() updateDetailsDto: UpdatedDetailsDto) {
    return this.detailsService.updateDetails(+id, updateDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statudService.remove(+id);
  }
}
