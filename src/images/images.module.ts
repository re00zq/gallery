import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  providers: [ImagesService, PrismaService, SupabaseService],
  controllers: [ImagesController],
})
export class ImagesModule {}
