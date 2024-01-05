import { Controller, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MULTER_CONFIG } from '../../core/multer/multer.config';
import { CONSTANTS } from '../../core/contants';
import { InvalidFileUploadException } from '../../core/exceptions/invalid.file.exception';
import { getID3TagSize, parseMP3Header } from '../../core/utils/mp3.utils';
import { MP3Frames } from '../../core/models/MP3Frames';
import { BaseResponse } from '../../core/models/BaseResponse';
import { ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('file-upload')
export class Mp3ParserController {

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 200 })
    @UseInterceptors(FileInterceptor('file', MULTER_CONFIG))
    uploadFile(@UploadedFile() file: any) {
        if (!file.mimetype.startsWith(CONSTANTS.FILE_TYPES_ALLOWED)) throw new InvalidFileUploadException();
        const Id3offset = getID3TagSize(file.buffer);
        const tagSize = Id3offset + 10;
        const frames: MP3Frames[] = parseMP3Header(file.buffer, tagSize, file.size);
        return new BaseResponse<number>(0, "success", frames.length - 1);
    }
}
