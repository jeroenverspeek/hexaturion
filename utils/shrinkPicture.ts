/**
 A photo made small enough to upload to the device: at most `longest`
 pixels on its longest side, as a JPEG. A phone's photo is easily 12
 megapixels and several MB, of which the cube shows 64x64 per face. The
 browser turns it the right way up as it reads it (its EXIF), and reads
 what a phone takes that the device may not (HEIC). A picture the browser
 cannot read is sent as it is, for the device to try.
*/
export async function shrinkPicture(file: File, longest = 2048): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }
  const scale = Math.min(1, longest / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const jpeg = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
  return jpeg ?? file;
}
