import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    // Simulate processing delay for each file
    const processed = await Promise.all(
      files.map(
        (file, idx) =>
          new Promise((resolve) =>
            setTimeout(
              async () =>
                resolve(
                  await this.imagesService.uploadImage(
                    file,
                    title,
                    description,
                  ),
                ),
              1000 * (idx + 1), // 1s delay per file, staggered
            ),
          ),
      ),
    );
    return processed;
  }

  @Get()
  async getImages(
    @Query('cursor') cursor?: string,
    @Query('take') take?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('title') title?: string,
    @Query('description') description?: string,
  ) {
    return this.imagesService.getImagesPaginated({
      cursor: cursor ? Number(cursor) : undefined,
      take: take ? Number(take) : 10,
      sortBy: sortBy || 'createdAt',
      sortOrder: sortOrder || 'desc',
      title,
      description,
    });
  }
}
