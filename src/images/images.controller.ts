import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.imagesService.uploadImage(file, title, description);
  }

  @Get()
  async getImages() {
    return this.imagesService.getImages();
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    return this.imagesService.getImage(parseInt(id));
  }

  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return this.imagesService.deleteImage(parseInt(id));
  }
}
