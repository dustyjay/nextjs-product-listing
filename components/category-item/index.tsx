type Props = {
  category: string;
  isActive: boolean;
  onClick: () => void;
};

const CategoryItem = ({ category, isActive, onClick }: Props) => {
  return (
    <button
      className={`border  px-3 py-1 rounded capitalize ${
        isActive ? 'bg-red-50 border-red-500' : 'bg-transparent border-gray-300'
      }`}
      onClick={onClick}>
      {category}
    </button>
  );
};

export default CategoryItem;
