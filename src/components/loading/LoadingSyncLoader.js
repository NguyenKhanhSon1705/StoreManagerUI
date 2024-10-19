import { SyncLoader } from "react-spinners";

const LoadingSyncLoader = ({
    cssOverride,
    loading,
    margin,
    size,
    speedMultiplier,
    color = "#818484"
}) => {

    return (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-slate-100 bg-opacity-40 z-50">
            <div className="w-full h-full flex justify-center items-center">
                <SyncLoader
                    cssOverride={cssOverride}
                    loading={loading}
                    margin={margin}
                    color = {color}
                    size={size}
                    speedMultiplier={speedMultiplier}
                />
            </div>

        </div>
    )

}
export default LoadingSyncLoader;