const LoadingSpinner = () => {
    return (
        <div className="grid items-center justify-center">
            <div className="animate-spin w-8 h-8 border-[3px] border-current border-t-transparent text-purple-600 rounded-full text-center justify-self-center" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <p className="pt-3">Loading...</p>
        </div>
    )
}

export default LoadingSpinner;