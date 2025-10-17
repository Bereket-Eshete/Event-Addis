import { IsString, IsEnum, IsDateString, IsNumber, IsOptional, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { EventCategory, EventType, EventStatus } from '../../schemas/event.schema';

class LocationDto {
  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsString()
  address: string;
}

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(EventCategory)
  category: EventCategory;

  @IsEnum(EventType)
  type: EventType;

  @IsString()
  venue: string;

  @IsOptional()
  @IsString()
  venueDetails?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsDateString()
  registrationDeadline: string;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}