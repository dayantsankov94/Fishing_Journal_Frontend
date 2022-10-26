const NotFound = ({ error }) => {
    console.log(error);
    
    return (
        <main >
            <div className="not-found-container">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The Page you are looking for doesn't exist or another error occurred. Go to <a href="/">Home Page.</a></p>
            </div>
        </main >
    )
} 

export default NotFound;