const ErrorPage = (isChecked, setIsChecked) => {
    return(
        <>
        <div className="errorPageDiv">
            <h1>😕</h1>
            <h1 className={`errorHeading ${isChecked ? "errorHeadingDark" : ""}`}>No Definitions Found</h1>
            <p className="errorParagraph">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
        </div>
        </>
    )
}

export default ErrorPage;