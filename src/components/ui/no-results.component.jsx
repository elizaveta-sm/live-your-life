const NoResults = () => {  
    return (
        <div className="flex flex-col justify-center items-center mt-4">
            <img src="https://cdn-icons-png.flaticon.com/256/5058/5058372.png" alt="no results found for this user" className="w-16 h-16" />
            <h1 className="text-xl font-semibold pt-4">No Results.</h1>
        </div>
    )
}

export default NoResults;