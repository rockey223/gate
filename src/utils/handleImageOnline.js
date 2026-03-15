import cloudinary from "@/utils/cloudinary";

export async function uploadImage(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "gate" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });
  return result.secure_url;
}

export async function deleteImage(imageUrl) {
  const match = imageUrl.match(/\/(gate\/[^.]+)\.[^.]+$/);

  return await cloudinary.uploader.destroy(match[1]);
}
