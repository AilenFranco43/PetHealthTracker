import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinary) {}

  // Método único para subir cualquier tipo de archivo
  async uploadFile(file: Express.Multer.File, folder: string = 'documents'): Promise<string> {
    return new Promise((resolve, reject) => {
      const resourceType = this.getResourceType(file.mimetype);
      
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `petcare/${folder}`,
          resource_type: resourceType,
          allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            reject(new Error(`Error uploading to Cloudinary: ${error.message}`));
          } else {
            resolve(result.secure_url);
          }
        },
      );

      uploadStream.end(file.buffer);
    });
  }

  // Subir múltiples archivos
  async uploadMultipleFiles(files: Express.Multer.File[], folder: string = 'documents'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  // Métodos de conveniencia para mantener compatibilidad
  async uploadImage(file: Express.Multer.File, folder: string = 'pets'): Promise<string> {
    return this.uploadFile(file, folder);
  }

  async uploadMultipleImages(files: Express.Multer.File[], folder: string = 'pets'): Promise<string[]> {
    return this.uploadMultipleFiles(files, folder);
  }

  async uploadDocument(file: Express.Multer.File, folder: string = 'documents'): Promise<string> {
    return this.uploadFile(file, folder);
  }

  // Eliminar múltiples archivos
  async deleteFiles(urls: string[]): Promise<void> {
    try {
      const deletePromises = urls.map(url => this.deleteFile(url));
      await Promise.all(deletePromises);
    } catch (error) {
      throw new Error(`Error deleting files: ${error.message}`);
    }
  }

  // Eliminar archivo por URL
  async deleteFile(url: string): Promise<void> {
    try {
      const publicId = this.extractPublicIdFromUrl(url);
      if (!publicId) {
        throw new Error('Could not extract public ID from URL');
      }
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Error deleting file: ${error.message}`);
    }
  }

  // Determinar el tipo de recurso basado en el mimetype
  private getResourceType(mimetype: string): 'image' | 'raw' | 'auto' | 'video' {
    if (mimetype.startsWith('image/')) {
      return 'image';
    } else if (mimetype.includes('pdf') || mimetype.includes('document') || mimetype.includes('msword')) {
      return 'raw';
    }
    return 'auto';
  }

  // Extraer public_id de la URL de Cloudinary
  private extractPublicIdFromUrl(url: string): string {
    const matches = url.match(/\/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : '';
  }
}