import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Expose()
  photo_url?: string;
}
