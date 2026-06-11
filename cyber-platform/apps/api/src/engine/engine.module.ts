import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ScannerEngine } from './ScannerEngine';
import { ScanProcessor } from './scan.processor';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'scan-pipeline',
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: 'exponential', delay: 10000 },
        removeOnComplete: true,
      }
    }),
  ],
  providers: [ScannerEngine, ScanProcessor, PrismaService],
  exports: [ScannerEngine],
})
export class EngineModule {}
