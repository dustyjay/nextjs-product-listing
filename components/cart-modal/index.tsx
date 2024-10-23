import Image from 'next/image';
import CartControl from '../cart-control';
import SideModal from '../side-modal';
import { ListingItemType } from '../listing-item';

export type CartItemType = ListingItemType & {
  cartCount: number;
};

const currencyFormatter = (number: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(number);

type Props = {
  cartItems: CartItemType[];
  onClose: () => void;
  onUpdate: (listing: ListingItemType, count: number) => void;
};

const CartModal = ({ cartItems, onClose, onUpdate }: Props) => {
  const total = cartItems.reduce((acc, item) => {
    const itemTotal = item.price * item.cartCount;
    return acc + itemTotal;
  }, 0);

  const onCountChange = (count: number, item: CartItemType) => {
    const { cartCount, ...listing } = item;
    onUpdate(listing, count);
  };

  const showCheckoutAlert = () => {
    const totalItems = cartItems.reduce((acc, item) => {
      return acc + item.cartCount;
    }, 0);
    const content = `Total amount to be paid is ${currencyFormatter(
      total
    )} for a total of ${totalItems} items`;
    alert(content);
  };

  return (
    <SideModal title={`Your Cart (${cartItems.length})`} onClose={onClose}>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center text-center h-full gap-6'>
          <p>Oops! Your cart is empty. Head over to check out our awesome products 😍</p>
          <button
            onClick={onClose}
            className='w-1/2 bg-orange-50 border border-orange-400 rounded-2xl py-3'>
            Go to products
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-between h-full'>
          <ul className='flex flex-col pb-4'>
            {cartItems.map((item) => (
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
