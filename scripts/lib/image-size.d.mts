export interface ImageSize {
  width: number;
  height: number;
}
export function readImageSize(buf: Buffer): ImageSize | null;
export function readImageSizeFile(path: string): ImageSize | null;
