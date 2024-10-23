'use client';

import CartModal from '@/app/partials/cart-modal';
import CategoryList from '@/components/category-list';
import ListingItem, { ListingItemType } from '@/components/listing-item';
import ListingItemModal from '@/app/partials/listing-item-modal';
import {
  fetchCategories,
  fetchCategoryListing,
  fetchListing
} from '@/services/product-listing.service';
import {
  getFilteredListings,
  getListingCount,
  SORT_VALUES,
  SortValueType
} from '@/services/sort-listing.service';
import { RootState } from '@/store';
import {
  setActiveCategory,
  setCategories,
  setFilters,
  setListings,
  setSelectedListing,
  setShowCartModal,
  updateListingCount
} from '@/store/listing.store';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.listing.categories);
  const cart = useSelector((state: RootState) => state.listing.cart);
  const selectedListing = useSelector((state: RootState) => state.listing.selectedListing);
  const filters = useSelector((state: RootState) => state.listing.filters);
  const activeCategory = useSelector((state: RootState) => state.listing.activeCategory);
  const showCartModal = useSelector((state: RootState) => state.listing.showCartModal);
  const filteredListings = useSelector(getFilteredListings);

  const [showFilters, setShowFilters] = useState(false);
  const [showPageError, setShowPageError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    getCategories();
    getListing();
  }, []);

  const getListing = async () => {
    try {
      setShowPageError(false);
      const listingRes = await fetchListing();
      dispatch(setListings(listingRes));
    } catch (error) {
      setShowPageError(true);
    }
  };

  const getCategories = async () => {
    try {
      setCategoryError(false);
      const categoryRes = await fetchCategories();
      dispatch(setCategories(['All', ...categoryRes]));
    } catch (error) {
      setCategoryError(true);
    }
  };

  const handleCategorySelect = async (category: string) => {
    if (category === activeCategory) return;

    dispatch(setActiveCategory(category));
    if (category === 'All') {
      getListing();
    } else {
      try {
        setShowPageError(false);
        const listingRes = await fetchCategoryListing(category);
        dispatch(setListings(listingRes));
      } catch (error) {
        setShowPageError(true);
      }
    }
  };

  const handleListingClick = (listing: ListingItemType) => {
    const cartCount = getListingCount(cart, listing.id);
    dispatch(setSelectedListing({ ...listing, cartCount }));
  };

  return (
    <Fragment>
      <header className='p-8 max-w-[1280px] mx-auto sticky top-0 bg-white'>
        <div className='flex gap-4 justify-between mb-6'>
          <Image src='/farmily.svg' alt='Home' width={100} height={24} priority />
          <div className='flex gap-4'>
            {!showFilters && (
              <button className='text-xs underline' onClick={() => setShowFilters(true)}>
                Show filters
              </button>
            )}
            <button
              className='flex items-center gap-1'
              onClick={() => dispatch(setShowCartModal(true))}>
              🛒 Cart
              {cart.length > 0 && (
                <span className='inline-flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full'>
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
        {showFilters && (
          <div className='bg-gray-50 flex gap-3 justify-between p-3 mb-2 text-sm rounded-lg'>
            <div className='flex gap-3'>
              <select
                className='bg-transparent'
                value={filters.sort}
                onChange={(e) =>
                  dispatch(setFilters({ ...filters, sort: e.target.value as SortValueType }))
                }>
                {SORT_VALUES.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
              <input
                placeholder='Search for products'
                type='search'
                value={filters.search}
                onChange={(e) => dispatch(setFilters({ ...filters, search: e.target.value }))}
              />
            </div>
            <button onClick={() => setShowFilters(false)} className='text-xs underline'>
              Hide
            </button>
          </div>
        )}
        {categoryError ? (
          <p className='bg-red-50 rounded-lg px-2 py-1 border border-red-300 inline-block text-xs'>
            We encountered an error fetching categories. Contact support
          </p>
        ) : (
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
          />
        )}
      </header>

      <main className='px-8 pt-4 mb-12 max-w-[1280px] mx-auto'>
        {showPageError ? (
          <div className='flex flex-col items-center justify-center text-center mt-[10vh] gap-6'>
            <p>
              We encountered an error fetching the product listings. If issue persists, contact
              support
            </p>
            <button
              onClick={() => location.reload()}
              className='w-[200px] bg-orange-50 border border-orange-400 rounded-2xl py-3'>
              Reload page
            </button>
          </div>
        ) : filteredListings.length === 0 && filters.search ? (
          <div className='flex flex-col items-center justify-center text-center mt-[10vh] gap-6'>
            <p>
              No products match your search <i>{filters.search}</i>.<br /> Try using a different
              word
              {activeCategory !== 'All' ? ' or category' : ''}
            </p>
            <button
              onClick={() => dispatch(setFilters({ ...filters, search: '' }))}
              className='w-[200px] bg-orange-50 border border-orange-400 rounded-2xl py-3'>
              Clear search
            </button>
          </div>
        ) : (
          <ul className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6'>
            {filteredListings.map((listing) => (
              <ListingItem
                key={listing.id}
                {...listing}
                cartCount={getListingCount(cart, listing.id)}
                onClick={() => handleListingClick(listing)}
                onCountChange={(cartCount) => dispatch(updateListingCount({ listing, cartCount }))}
              />
            ))}
          </ul>
        )}
      </main>

      {!!selectedListing && <ListingItemModal />}

      {showCartModal && <CartModal />}
    </Fragment>
  );
}
