import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImagesModule } from './images/images.module';
import { PrismaService } from './prisma/prisma.service';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ImagesModule],
  providers: [PrismaService, SupabaseService],
})
export class AppModule {}
