import Image from 'next/image';
import CartControl from '../../components/cart-control';
import SideModal from '../../components/side-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedListing, updateListingCount } from '@/store/listing.store';
import { getListingCount } from '@/services/sort-listing.service';

const ListingItemModal = () => {
  const listing = useSelector((state: RootState) => state.listing.selectedListing);

  if (!listing) return <span />;

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.listing.cart);
  const { title, price, description, image, rating, id } = listing;
  const cartCount = getListingCount(cart, id);

  return (
    <SideModal title={title} onClose={() => dispatch(setSelectedListing(undefined))}>
      <div className='flex flex-col gap-6'>
        <div className='h-[100px]'>
          {image && (
            <Image
              src={image}
              alt={title}
              width={0}
              height={0}
              className='h-full w-full object-contain'
            />
          )}
        </div>
        <div className='flex gap-3 items-center justify-between my-1'>
          <span>${price}</span>
          <span className='text-xs text-[#6B7F73]'>
            👍 &nbsp;{rating.rate} ({rating.count})
          </span>
        </div>
        <p className='text-sm grow'>{description}</p>
        <CartControl
          cartCount={cartCount}
          onCountChange={(c) => dispatch(updateListingCount({ listing, cartCount: c }))}
          size='large'
        />
      </div>
    </SideModal>
  );
};

export default ListingItemModal;
