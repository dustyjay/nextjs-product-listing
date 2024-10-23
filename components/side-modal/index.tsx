import { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

const SideModal = ({ children, title, onClose }: Props) => {
  return (
    <div>
      <div
        role='button'
        onClick={onClose}
        className='fixed bg-opacity-15 bg-gray-400 w-screen h-screen top-0 left-0'></div>
      <div className='fixed flex flex-col right-0 top-0 w-full md:w-4/5 max-w-[500px] bg-white border-l h-screen py-10'>
        <div className='flex gap-6 items-start justify-between px-6 mb-16'>
          <h3>{title}</h3>
          <button onClick={onClose} className='text-xs p-1 hover:underline'>
            Close
          </button>
        </div>
        <section className='px-6 grow overflow-auto'>{children}</section>
      </div>
    </div>
  );
};

export default SideModal;
