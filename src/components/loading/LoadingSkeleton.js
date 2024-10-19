import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = ({height = 15 , count = 10 , highlightColor = '#b7b5b5'}) => {
  const props = {
    height,
    count,
    highlightColor
  }
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <Skeleton
          {...props} 
          />
        </div>
      </div>
    </section>
  );
};
export default LoadingSkeleton;
