import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or Key is not defined in environment variables',
      );
    }
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
