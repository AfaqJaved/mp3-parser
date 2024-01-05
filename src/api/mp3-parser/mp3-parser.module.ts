import { Module } from '@nestjs/common';
import { Mp3ParserController } from './mp3-parser.controller';
import { Mp3ParserService } from './mp3-parser.service';

@Module({
  controllers: [Mp3ParserController],
  providers: [Mp3ParserService]
})
export class Mp3ParserModule {}
