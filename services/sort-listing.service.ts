import { CartItemType } from '@/app/partials/cart-modal';
import { ListingItemType } from '@/components/listing-item';
import { RootState } from '@/store';

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

// util functions
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

export const getListingCount = (cart: CartItemType[], listingId: number) => {
  const cartItem = cart.find((c) => c.id === listingId);

  return !!cartItem ? cartItem.cartCount : 0;
};

// State getter functions
export const getFilteredListings = (state: RootState) => {
  const {
    listing: { filters, listings }
  } = state;

  let filtered = [...listings];

  if (filters.search) {
    const search = filters.search.toLowerCase();

    filtered = listings.filter(
      (l) => l.title.toLowerCase().includes(search) || l.category.toLowerCase().includes(search)
    );
  }

  return sortListing(filters.sort, filtered);
};

export const getTotalCartAmount = (state: RootState) => {
  const {
    listing: { cart }
  } = state;

  return cart.reduce((acc, item) => {
    const itemTotal = item.price * item.cartCount;
    return acc + itemTotal;
  }, 0);
};
