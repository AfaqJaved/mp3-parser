import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MULTER_CONFIG } from './multer.config';

@Global()
@Module({
    imports : [
        MulterModule.register(MULTER_CONFIG),
    ]
})
export class CustomMulterModule {}
