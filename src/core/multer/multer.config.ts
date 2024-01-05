import { diskStorage, memoryStorage } from 'multer';
import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';

export const MULTER_CONFIG = {
  storage: memoryStorage(),
};
