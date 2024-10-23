import { ChangeEvent, MouseEvent } from 'react';

type Props = {
  cartCount: number;
  onCountChange: (val: number) => void;
  size?: 'regular' | 'large';
};

const CartControl = ({ cartCount = 0, size = 'regular', onCountChange }: Props) => {
  const incrementButtonClass = `bg-green-800 text-white rounded-full ${
    size === 'large' ? ' w-12 py-2.5 text-lg' : 'w-6'
  }`;
  const handleButtonChange = (e: MouseEvent, newCount: number) => {
    e.stopPropagation();
    onCountChange(newCount);
  };

  if (cartCount === 0) {
    return (
      <button
        className={`bg-green-800 text-white ${
          size === 'large' ? 'rounded-3xl py-3' : ' w-6 rounded-full'
        }`}
        onClick={(e) => handleButtonChange(e, 1)}>
        + {size === 'large' ? 'Add to cart' : ''}
      </button>
    );
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    onCountChange(+value);
  };
  return (
    <div className={`flex items-center ${size === 'large' ? 'gap-4' : 'gap-1'}`}>
      <button
        className={incrementButtonClass}
        onClick={(e) => handleButtonChange(e, cartCount - 1)}>
        -
      </button>
      <input
        className={`text-xs text-center ${size === 'large' ? 'w-1/5' : 'w-6'}`}
        value={cartCount}
        type='number'
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className={incrementButtonClass}
        onClick={(e) => handleButtonChange(e, cartCount + 1)}>
        +
      </button>
      {size === 'large' && (
        <button className='bg-red-50 grow rounded-3xl py-3' onClick={(e) => onCountChange(0)}>
          Remove
        </button>
      )}
    </div>
  );
};

export default CartControl;
