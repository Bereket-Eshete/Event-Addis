import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from '../../src/events/events.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from '../../src/schemas/event.schema';

describe('EventsService', () => {
  let service: EventsService;
  let mockEventModel: any;

  beforeEach(async () => {
    mockEventModel = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      countDocuments: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: mockEventModel,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  describe('findAll', () => {
    it('should return paginated events', async () => {
      const mockEvents = [
        { _id: '1', title: 'Event 1', organizer: 'org1' },
        { _id: '2', title: 'Event 2', organizer: 'org1' },
      ];

      mockEventModel.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            skip: jest.fn().mockReturnValue({
              limit: jest.fn().mockResolvedValue(mockEvents),
            }),
          }),
        }),
      });
      mockEventModel.countDocuments.mockResolvedValue(2);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result.events).toEqual(mockEvents);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
    });
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const createEventDto = {
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: 100,
        category: 'conference',
        organizer: 'org-id',
      };

      const mockCreatedEvent = {
        _id: 'event-id',
        ...createEventDto,
      };

      mockEventModel.create.mockResolvedValue(mockCreatedEvent);

      const result = await service.create(createEventDto);

      expect(result.title).toBe(createEventDto.title);
      expect(mockEventModel.create).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findOne', () => {
    it('should return event by id', async () => {
      const mockEvent = {
        _id: 'event-id',
        title: 'Test Event',
        organizer: { _id: 'org-id', fullName: 'Organizer' },
      };

      mockEventModel.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockEvent),
      });

      const result = await service.findOne('event-id');

      expect(result).toEqual(mockEvent);
      expect(mockEventModel.findById).toHaveBeenCalledWith('event-id');
    });

    it('should throw error if event not found', async () => {
      mockEventModel.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('nonexistent-id')).rejects.toThrow('Event not found');
    });
  });
});