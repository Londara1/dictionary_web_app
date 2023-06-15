import Smile from "../assets/smile.png"

const ErrorPage = ({isChecked}) => {

    console.log(isChecked);
    return(
        <>
        <div className="errorPageDiv">
            <img src={Smile} alt="" />
            <h1 className={` ${isChecked ? "errorHeadingDark" : "errorHeading"}`}>No Definitions Found</h1>                
            <p className="errorParagraph">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
        </div>
        </>
    )
}

export default ErrorPage;