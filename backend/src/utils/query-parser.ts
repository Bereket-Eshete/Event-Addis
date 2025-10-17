import { QueryEventsDto, SortOption } from '../events/dto/query-events.dto';
import { EventCategory, EventType } from '../schemas/event.schema';

export function parseEventQuery(query: any): QueryEventsDto {
  const parsed: QueryEventsDto = {};

  // Search query
  if (query.q && typeof query.q === 'string') {
    parsed.q = query.q.trim();
  }

  // Category filter
  if (query.category && Object.values(EventCategory).includes(query.category)) {
    parsed.category = query.category as EventCategory;
  }

  // Type filter
  if (query.type && Object.values(EventType).includes(query.type)) {
    parsed.type = query.type as EventType;
  }

  // Price filters
  if (query.minPrice) {
    const minPrice = parseFloat(query.minPrice);
    if (!isNaN(minPrice) && minPrice >= 0) {
      parsed.minPrice = minPrice;
    }
  }

  if (query.maxPrice) {
    const maxPrice = parseFloat(query.maxPrice);
    if (!isNaN(maxPrice) && maxPrice >= 0) {
      parsed.maxPrice = maxPrice;
    }
  }

  // Date filters
  if (query.startFrom && isValidDate(query.startFrom)) {
    parsed.startFrom = query.startFrom;
  }

  if (query.startTo && isValidDate(query.startTo)) {
    parsed.startTo = query.startTo;
  }

  // Location filter
  if (query.location && typeof query.location === 'string') {
    parsed.location = query.location.trim();
  }

  // Sort option.
  if (query.sort && Object.values(SortOption).includes(query.sort)) {
    parsed.sort = query.sort as SortOption;
  }

  // Pagination.
  if (query.page) {
    const page = parseInt(query.page);
    if (!isNaN(page) && page > 0) {
      parsed.page = page;
    }
  }

  if (query.limit) {
    const limit = parseInt(query.limit);
    if (!isNaN(limit) && limit > 0 && limit <= 100) {
      parsed.limit = limit;
    }
  }

  return parsed;
}
// a function which checks if a date is valid or not
function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

export function buildEventFilters(queryDto: QueryEventsDto) {
  const filters: any = { status: 'published' };

  if (queryDto.q) {
    filters.$or = [
      { title: { $regex: queryDto.q, $options: 'i' } },
      { description: { $regex: queryDto.q, $options: 'i' } },
      { tags: { $in: [new RegExp(queryDto.q, 'i')] } },
    ];
  }

  if (queryDto.category) filters.category = queryDto.category;
  if (queryDto.type) filters.type = queryDto.type;

  if (queryDto.minPrice !== undefined || queryDto.maxPrice !== undefined) {
    filters.price = {};
    if (queryDto.minPrice !== undefined) filters.price.$gte = queryDto.minPrice;
    if (queryDto.maxPrice !== undefined) filters.price.$lte = queryDto.maxPrice;
  }

  if (queryDto.startFrom || queryDto.startTo) {
    filters.startAt = {};
    if (queryDto.startFrom) filters.startAt.$gte = new Date(queryDto.startFrom);
    if (queryDto.startTo) filters.startAt.$lte = new Date(queryDto.startTo);
  }

  if (queryDto.location) {
    filters.$or = [
      { venue: { $regex: queryDto.location, $options: 'i' } },
      { 'location.address': { $regex: queryDto.location, $options: 'i' } },
    ];
  }

  return filters;
}

export function buildEventSort(sort?: SortOption) {
  switch (sort) {
    case SortOption.LATEST:
      return { createdAt: -1 };
    case SortOption.POPULAR:
      return { registeredCount: -1 };
    case SortOption.PRICE_ASC:
      return { price: 1 };
    case SortOption.PRICE_DESC:
      return { price: -1 };
    case SortOption.START_DATE:
      return { startAt: 1 };
    default:
      return { createdAt: -1 };
  }
}
