import Image from 'next/image';
import CartControl from '../cart-control';
import { ListingItemType } from '../listing-item';
import SideModal from '../side-modal';

type Props = ListingItemType & {
  cartCount: number;
  onCountChange: (cartCount: number) => void;
  onClose: () => void;
};

const ListingItemModal = ({
  title,
  price,
  description,
  image,
  rating,
  cartCount,
  onClose,
  onCountChange
}: Props) => {
  return (
    <SideModal title={title} onClose={onClose}>
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
        <CartControl cartCount={cartCount} onCountChange={onCountChange} size='large' />
      </div>
    </SideModal>
  );
};

export default ListingItemModal;
