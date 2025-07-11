import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    title: string,
    description?: string,
  ) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    const { data, error } = await this.supabaseService
      .getClient()
      .storage.from('gallery')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    const { publicUrl } = this.supabaseService
      .getClient()
      .storage.from('gallery')
      .getPublicUrl(fileName).data;

    const image = await this.prisma.image.create({
      data: {
        title,
        description,
        url: publicUrl,
      },
    });

    return image;
  }

  async getImages() {
    return this.prisma.image.findMany();
  }

  async getImage(id: number) {
    return this.prisma.image.findUnique({ where: { id } });
  }

  async deleteImage(id: number) {
    const image = await this.prisma.image.findUnique({ where: { id } });
    if (!image) throw new Error('Image not found');

    const fileName = image.url.split('/').pop();
    if (!fileName) throw new Error('Invalid image URL');

    const { error } = await this.supabaseService
      .getClient()
      .storage.from('gallery')
      .remove([fileName]);

    if (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }

    return this.prisma.image.delete({ where: { id } });
  }

  async getImagesPaginated({
    cursor,
    take = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    title,
    description,
  }: {
    cursor?: number;
    take?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    title?: string;
    description?: string;
  }) {
    const where: any = {};
    if (title) where.title = { contains: title, mode: 'insensitive' };
    if (description)
      where.description = { contains: description, mode: 'insensitive' };

    const images = await this.prisma.image.findMany({
      where,
      take,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        title: true,
        description: true,
        url: true,
        createdAt: true,
      },
    });

    // Get the next cursor
    const nextCursor =
      images.length === take ? images[images.length - 1].id : null;

    return {
      images,
      nextCursor,
    };
  }
}
