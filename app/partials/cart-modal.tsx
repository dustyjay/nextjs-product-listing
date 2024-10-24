import Image from 'next/image';
import CartControl from '../../components/cart-control';
import SideModal from '../../components/side-modal';
import { ListingItemType } from '../../components/listing-item';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getTotalCartAmount } from '@/services/sort-listing.service';
import { setShowCartModal, updateListingCount } from '@/store/listing.store';

export type CartItemType = ListingItemType & {
  cartCount: number;
};

const currencyFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number);

const CartModal = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.listing.cart);
  const total = useSelector(getTotalCartAmount);

  const onCountChange = (count: number, item: CartItemType) => {
    const { cartCount, ...listing } = item;
    dispatch(updateListingCount({ listing, cartCount: count }));
  };

  const showCheckoutAlert = () => {
    const totalItems = cart.reduce((acc, item) => {
      return acc + item.cartCount;
    }, 0);
    const content = `Total amount to be paid is ${currencyFormatter(
      total
    )} for a total of ${totalItems} items`;
    alert(content);
  };

  return (
    <SideModal
      title={`Your Cart (${cart.length})`}
      onClose={() => dispatch(setShowCartModal(false))}>
      {cart.length === 0 ? (
        <div className='flex flex-col items-center justify-center text-center h-full gap-6'>
          <p>Oops! Your cart is empty. Head over to check out our awesome products 😍</p>
          <button
            onClick={() => dispatch(setShowCartModal(false))}
            className='w-1/2 bg-orange-50 border border-orange-400 rounded-2xl py-3'>
            Go to products
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-between h-full'>
          <ul className='flex flex-col pb-4'>
            {cart.map((item) => (
              <li
                key={item.id}
                className='flex gap-3 border-b py-4 border-gray-100 last:border-transparent'>
                <div className='w-16 h-16'>
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={0}
                      height={0}
                      className='h-full w-full object-contain'
                    />
                  )}
                </div>
                <div className='flex max-md:flex-col gap-5 justify-between md:items-center grow'>
                  <div>
                    <h4 className='text-sm grow'>{item.title}</h4>
                    <span className='text-xs'>${item.price}</span>
                  </div>
                  <CartControl
                    cartCount={item.cartCount}
                    onCountChange={(count) => onCountChange(count, item)}
                  />
                </div>
              </li>
            ))}
          </ul>
          <footer className='pt-4 border-t sticky bottom-0 bg-white'>
            <div className='flex justify-between gap-6 mb-3'>
              <span>Total</span>
              <span className='text-green-800'>{currencyFormatter(total)}</span>
            </div>
            <button
              onClick={showCheckoutAlert}
              className='w-full bg-orange-50 border border-orange-400 rounded-2xl py-3'>
              Proceed to Checkout
            </button>
          </footer>
        </div>
      )}
    </SideModal>
  );
};

export default CartModal;
