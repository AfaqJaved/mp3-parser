import { CONSTANTS } from "../contants";
import { MP3Frames } from "../models/MP3Frames";

export function getID3TagSize(fileBuffer: Buffer): number {
    const buffer = Buffer.alloc(10, fileBuffer);
    if (buffer.toString('utf8', 0, 3) === 'ID3') {
        const tagSize =
            ((buffer[6] & 0x7F) << 21) |
            ((buffer[7] & 0x7F) << 14) |
            ((buffer[8] & 0x7F) << 7) |
            (buffer[9] & 0x7F);
        return tagSize;
    } else {
        return 0;
    }
}



export function parseMP3Header(fileBuffer: Buffer, tagOffset: number, fileSize: number) : MP3Frames[] {
    // const buffer = fileBuffer;
    const buffer = Buffer.from(fileBuffer.subarray(tagOffset));
    // let frameCount = 0;
    let postion = 0;
    let frames : MP3Frames[] = [];

    while (postion < buffer.length) {

        if (buffer[postion] === 0xFF && (buffer[postion + 1] & 0xE0) === 0xE0 ) {
            const layerBits = (buffer[postion + 1] & 0x06) >> 1;
            const bitRateIndex = (buffer[postion + 2] & 0xf0) >> 4;
            const sampleRateIndex = (buffer[postion + 2] & 0x0c) >> 2;
            const paddingBit = (buffer[postion + 2] & 0x02) >> 1;

            const layer = layerBits === 1 ? 'Layer III' : 'Not specified';
            const bitRateTable = [CONSTANTS.LAYER_III_BITRATE];
            const bitRate = bitRateTable[0][bitRateIndex];
            const sampleRateTable = [44100, 48000, 32000];
            const sampleRate = sampleRateTable[sampleRateIndex];
            const frameLength = Math.floor(((144 * bitRate * 1000) / sampleRate) + paddingBit);

            frames.push({
                bitRate,
                frameLength,
                layer,
                mpeg_version : 1,
                sampleRate
            })

            if (frameLength > 0) {
                // frameCount++;
                postion += frameLength;
              } else {
                postion++;
              }
        }
        else {
            postion++;
        }

    }


    return frames;
}