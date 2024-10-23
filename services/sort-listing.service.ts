import { ListingItemType } from '@/components/listing-item';

export type SortValueType = '' | 'rating' | 'alphabetically' | 'lowest-price' | 'highest-price';

export const SORT_VALUES: { title: string; value: SortValueType }[] = [
  {
    title: 'Sort',
    value: ''
  },
  {
    title: 'Best rating',
    value: 'rating'
  },
  {
    title: 'Alphabetically',
    value: 'alphabetically'
  },
  {
    title: 'Lowest Price',
    value: 'lowest-price'
  },
  {
    title: 'Highest Price',
    value: 'highest-price'
  }
];

export const sortListing = (sortKey: SortValueType, listings: ListingItemType[]) => {
  if (sortKey === 'alphabetically') {
    return listings.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  if (sortKey === 'lowest-price') {
    return listings.sort(function (a, b) {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  }

  if (sortKey === 'highest-price') {
    return listings.sort(function (a, b) {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
  }

  if (sortKey === 'rating') {
    return listings.sort(function (a, b) {
      if (a.rating.rate > b.rating.rate) {
        return -1;
      }
      if (a.rating.rate < b.rating.rate) {
        return 1;
      }
      return 0;
    });
  }

  return listings;
};

const handleSortListing = (listings: ListingItemType[], sort: SortValueType) => {
  const _listings = [...listings];
  return sortListing(sort, _listings);
};
