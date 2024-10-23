import Image from 'next/image';
import CartControl from '../cart-control';

type ListingItemRating = {
  rate: number;
  count: number;
};

export type ListingItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ListingItemRating;
};

type Props = ListingItemType & {
  cartCount: number;
  onCountChange: (cartCount: number) => void;
  onClick: () => void;
};

const ListingItem = ({
  title,
  price,
  category,
  description,
  image,
  rating,
  cartCount,
  onClick,
  onCountChange
}: Props) => {
  return (
    <li
      className='shadow-md rounded-xl flex flex-col px-3 py-2'
      role='button'
      tabIndex={-1}
      onClick={onClick}>
      <div className='h-[100px] p-2'>
        {image && (
          <Image
            src={image}
            alt={title}
            width={0}
            height={0}
            className='h-full w-full object-contain'
            priority
          />
        )}
      </div>
      <h2 className='text-sm grow'>{title}</h2>
      <div className='flex gap-3 items-center justify-between my-1'>
        <span className='text-xs'>${price}</span>
        <CartControl cartCount={cartCount} onCountChange={onCountChange} />
      </div>
      <p className='text-[8px] text-[#6B7F73]'>
        👍 &nbsp;{rating.rate} ({rating.count})
      </p>
    </li>
  );
};

export default ListingItem;
