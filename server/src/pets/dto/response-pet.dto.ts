import { ApiProperty } from '@nestjs/swagger';

export class ResponsePetDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  owner_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  species: string;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  birth_date: Date;

  @ApiProperty({ type: () => [Object], required: false })
  health_records?: any[];

  @ApiProperty({ type: () => [Object], required: false })
  nutrition_records?: any[];

  @ApiProperty({ type: () => [Object], required: false })
  reminders?: any[];
}
