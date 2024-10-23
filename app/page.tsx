'use client';

import CartModal, { CartItemType } from '@/components/cart-modal';
import CategoryList from '@/components/category-list';
import ListingItem, { ListingItemType } from '@/components/listing-item';
import ListingItemModal from '@/components/listing-item-modal';
import {
  fetchCategories,
  fetchCategoryListing,
  fetchListing
} from '@/services/product-listing.service';
import { SORT_VALUES, sortListing, SortValueType } from '@/services/sort-listing.service';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useEffect, useMemo, useState } from 'react';

export default function Home() {
  const [listings, setListings] = useState<ListingItemType[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSort, setActiveSort] = useState<SortValueType>('');
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedListing, setSelectedListing] = useState<CartItemType>();
  const [showCartModal, setShowCartModal] = useState(false);
  const [searchVal, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getCategories();
    getListing();
  }, []);

  const filteredListings = useMemo(() => {
    let filtered = [...listings];

    if (searchVal) {
      const search = searchVal.toLowerCase();

      filtered = listings.filter(
        (l) => l.title.toLowerCase().includes(search) || l.category.toLowerCase().includes(search)
      );
    }

    return sortListing(activeSort, filtered);
  }, [listings, searchVal, activeSort]);

  const getListing = async () => {
    const listingRes = await fetchListing();
    setListings(listingRes);
  };

  const getCategories = async () => {
    const categoryRes = await fetchCategories();
    setCategories(['All', ...categoryRes]);
  };

  const handleCategorySelect = async (category: string) => {
    if (category === activeCategory) return;

    setActiveCategory(category);
    if (category === 'All') {
      getListing();
    } else {
      const listingRes = await fetchCategoryListing(category);
      const sortedListings = sortListing(activeSort, listingRes);

      setListings(sortedListings);
    }
  };

  const handleListingClick = (listing: ListingItemType) => {
    const cartCount = getListingCount(listing.id);
    setSelectedListing({ ...listing, cartCount });
  };

  const getListingCount = (listingId: number) => {
    const cartItem = cart.find((c) => c.id === listingId);

    return !!cartItem ? cartItem.cartCount : 0;
  };

  const updateListingCount = (listing: ListingItemType, cartCount: number) => {
    if (cartCount === 0) {
      setCart((c) => c.filter((cartItem) => cartItem.id !== listing.id));
      return;
    }

    const cartItemIndex = cart.findIndex((c) => c.id === listing.id);

    const newCart =
      cartItemIndex <= -1
        ? [...cart, { ...listing, cartCount }]
        : cart.map((cartItem) => {
            if (cartItem.id === listing.id) return { ...cartItem, cartCount };
            return cartItem;
          });

    setCart(newCart);
  };

  return (
    <Fragment>
      <Head>
        <title>Product Listing</title>
        <meta name='description' content='Product listing with NextJS 13' />
      </Head>
      <header className='p-8 max-w-[1280px] mx-auto sticky top-0 bg-white'>
        <div className='flex gap-4 justify-between mb-6'>
          <Image src='/farmily.svg' alt='Home' width={100} height={24} priority />
          <div className='flex gap-4'>
            {!showFilters && (
              <button className='text-xs underline' onClick={() => setShowFilters(true)}>
                Show filters
              </button>
            )}
            <button className='flex items-center gap-1' onClick={() => setShowCartModal(true)}>
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
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as SortValueType)}>
                {SORT_VALUES.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.title}
                  </option>
                ))}
              </select>
              <input
                placeholder='Search for products'
                type='search'
                value={searchVal}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <button onClick={() => setShowFilters(false)} className='text-xs underline'>
              Hide
            </button>
          </div>
        )}
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
        />
      </header>

      <main className='px-8 pt-4 mb-12 max-w-[1280px] mx-auto'>
        {filteredListings.length === 0 && searchVal ? (
          <div className='flex flex-col items-center justify-center text-center mt-[10vh] gap-6'>
            <p>
              No products match your search <i>{searchVal}</i>.<br /> Try using a different word
              {activeCategory !== 'All' ? ' or category' : ''}
            </p>
            <button
              onClick={() => setSearchValue('')}
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
                cartCount={getListingCount(listing.id)}
                onClick={() => handleListingClick(listing)}
                onCountChange={(count) => updateListingCount(listing, count)}
              />
            ))}
          </ul>
        )}
      </main>

      {!!selectedListing && (
        <ListingItemModal
          {...selectedListing}
          cartCount={getListingCount(selectedListing.id)}
          onCountChange={(count) => updateListingCount(selectedListing, count)}
          onClose={() => setSelectedListing(undefined)}
        />
      )}

      {showCartModal && (
        <CartModal
          cartItems={cart}
          onUpdate={updateListingCount}
          onClose={() => setShowCartModal(false)}
        />
      )}
    </Fragment>
  );
}
