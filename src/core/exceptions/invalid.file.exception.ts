import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidFileUploadException extends HttpException {
    constructor(){
        super("Only Mp3/MPEG Files Allowed" , HttpStatus.BAD_REQUEST);
    }
}