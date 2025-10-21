import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventStatus } from '../schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { QueryEventsDto, SortOption } from './dto/query-events.dto';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto, organizerId: string) {
    const event = new this.eventModel({
      ...createEventDto,
      organizerId: new Types.ObjectId(organizerId),
      startAt: new Date(createEventDto.startAt),
      endAt: new Date(createEventDto.endAt),
      registrationDeadline: new Date(createEventDto.registrationDeadline),
    });

    return event.save();
  }

  async findAll(queryDto: QueryEventsDto) {
    const { q, category, type, minPrice, maxPrice, startFrom, startTo, location, sort, page = 1, limit = 10 } = queryDto;

    // Build filter object
    const filter: any = { status: EventStatus.PUBLISHED };

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
      ];
    }

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (minPrice !== undefined) filter.price = { ...filter.price, $gte: minPrice };
    if (maxPrice !== undefined) filter.price = { ...filter.price, $lte: maxPrice };
    
    if (startFrom || startTo) {
      filter.startAt = {};
      if (startFrom) filter.startAt.$gte = new Date(startFrom);
      if (startTo) filter.startAt.$lte = new Date(startTo);
    }

    if (location) {
      filter.$or = [
        { venue: { $regex: location, $options: 'i' } },
        { 'location.address': { $regex: location, $options: 'i' } },
      ];
    }

    // Build sort object
    let sortObj: any = {};
    switch (sort) {
      case SortOption.LATEST:
        sortObj = { createdAt: -1 };
        break;
      case SortOption.POPULAR:
        sortObj = { registeredCount: -1 };
        break;
      case SortOption.PRICE_ASC:
        sortObj = { price: 1 };
        break;
      case SortOption.PRICE_DESC:
        sortObj = { price: -1 };
        break;
      case SortOption.START_DATE:
        sortObj = { startAt: 1 };
        break;
      default:
        sortObj = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;
    
    const [events, total] = await Promise.all([
      this.eventModel
        .find(filter)
        .populate('organizerId', 'fullName organizationName')
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.eventModel.countDocuments(filter),
    ]);

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid event ID format');
    }

    const event = await this.eventModel
      .findById(id)
      .populate('organizerId', 'fullName organizationName email contactNumber')
      .exec();

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid event ID format');
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId.toString() !== userId) {
      throw new ForbiddenException('You can only update your own events');
    }

    const updateData: any = { ...updateEventDto };
    if (updateEventDto.startAt) updateData.startAt = new Date(updateEventDto.startAt);
    if (updateEventDto.endAt) updateData.endAt = new Date(updateEventDto.endAt);
    if (updateEventDto.registrationDeadline) updateData.registrationDeadline = new Date(updateEventDto.registrationDeadline);

    return this.eventModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid event ID format');
    }

    const event = await this.eventModel.findById(id);

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    if (event.organizerId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own events');
    }

    await this.eventModel.findByIdAndDelete(id);
    return { message: 'Event deleted successfully' };
  }

  async findByOrganizer(organizerId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    // Handle both string and ObjectId formats
    const organizerQuery = Types.ObjectId.isValid(organizerId) ? new Types.ObjectId(organizerId) : organizerId;
    
    const [events, total] = await Promise.all([
      this.eventModel
        .find({ organizerId: organizerQuery })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.eventModel.countDocuments({ organizerId: organizerQuery }),
    ]);

    return {
      events,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getOrganizerStats(organizerId: string) {
    // Handle both string and ObjectId formats
    const organizerQuery = Types.ObjectId.isValid(organizerId) ? new Types.ObjectId(organizerId) : organizerId;
    
    const totalEvents = await this.eventModel.countDocuments({ organizerId: organizerQuery });
    const publishedEvents = await this.eventModel.countDocuments({ organizerId: organizerQuery, status: EventStatus.PUBLISHED });
    const draftEvents = await this.eventModel.countDocuments({ organizerId: organizerQuery, status: EventStatus.DRAFT });
    
    const totalRegistrations = await this.eventModel.aggregate([
      { $match: { organizerId: organizerQuery } },
      { $group: { _id: null, total: { $sum: '$registeredCount' } } }
    ]);

    return {
      totalEvents,
      publishedEvents,
      draftEvents,
      totalRegistrations: totalRegistrations[0]?.total || 0,
    };
  }
}