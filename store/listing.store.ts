import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListingItemType } from '@/components/listing-item';
import { SortValueType } from '@/services/sort-listing.service';
import { CartItemType } from '@/app/partials/cart-modal';

type ListingStoreStateFilter = {
  search: string;
  sort: SortValueType;
};

type ListingStoreState = {
  listings: ListingItemType[];
  categories: string[];
  activeCategory: string;
  filters: ListingStoreStateFilter;
  cart: CartItemType[];
  selectedListing: CartItemType | undefined;
  showCartModal: boolean;
};

const initialState: ListingStoreState = {
  listings: [],
  categories: [],
  activeCategory: 'All',
  filters: {
    search: '',
    sort: ''
  },
  cart: [],
  selectedListing: undefined,
  showCartModal: false
};

const listingSlice = createSlice({
  name: 'listing',
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<ListingItemType[]>) => {
      state.listings = action.payload;
    },
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setFilters: (state, action: PayloadAction<ListingStoreStateFilter>) => {
      state.filters = action.payload;
    },
    setSelectedListing: (state, action: PayloadAction<CartItemType | undefined>) => {
      state.selectedListing = action.payload;
    },
    setShowCartModal: (state, action: PayloadAction<boolean>) => {
      state.showCartModal = action.payload;
    },
    updateListingCount: (
      state,
      action: PayloadAction<{ listing: ListingItemType; cartCount: number }>
    ) => {
      const { cartCount, listing } = action.payload;

      if (cartCount === 0) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== listing.id);
        return;
      }

      const cartItemIndex = state.cart.findIndex((c) => c.id === listing.id);

      state.cart =
        cartItemIndex <= -1
          ? [...state.cart, { ...listing, cartCount }]
          : state.cart.map((cartItem) => {
              if (cartItem.id === listing.id) return { ...cartItem, cartCount };
              return cartItem;
            });
    }
  }
});

export const {
  setListings,
  setCategories,
  setActiveCategory,
  setFilters,
  setSelectedListing,
  setShowCartModal,
  updateListingCount
} = listingSlice.actions;

export default listingSlice.reducer;
