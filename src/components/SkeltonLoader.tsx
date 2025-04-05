import './SkeltonLoader.css';

const SkeltonLoader = ({ w, h }: { w: string; h: string }) => {
  return (
    <div className={`${w} animate-pulse rounded shadow-sm`}>
      <div className={`bg-gray-800/20 rounded h-${h}`}></div>
    </div>
  );
};

export default SkeltonLoader;
