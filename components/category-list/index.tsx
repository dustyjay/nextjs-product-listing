import { Fragment } from 'react';

type Props = {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

const CategoryList = ({ categories, activeCategory, onSelect }: Props) => {
  return (
    <Fragment>
      <select
        className='md:hidden'
        value={activeCategory}
        onChange={(e) => onSelect(e.target.value)}>
        {categories.map((item) => (
          <option value={item} key={item} className='capitalize'>
            {item}
          </option>
        ))}
      </select>
      <ul className='hidden md:flex flex-wrap items-center gap-2'>
        {categories.map((category) => (
          <button
            key={category}
            className={`border px-2 py-0.5 text-sm rounded capitalize whitespace-nowrap ${
              activeCategory === category
                ? 'bg-red-50 border-red-500'
                : 'bg-transparent border-gray-300'
            }`}
            onClick={() => onSelect(category)}>
            {category}
          </button>
        ))}
      </ul>
    </Fragment>
  );
};

export default CategoryList;
