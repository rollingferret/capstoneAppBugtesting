import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomBanner() {
 return (
  <>
   <div className="bottom-banner">
    <div className="bottom-banner-row1">
     <a href="https://www.flickr.com/about">About</a>

     <a href="https://www.flickr.com/jobs">Jobs</a>

     <a href="https://flickrhelp.com/">help</a>

     <a href="https://www.flickr.com/abuse">Report abuse</a>
    </div>
    <div className="bottom-banner-row2">
     {/* <div className="bottom-banner-item">
      <NavLink to="https://www.flickr.com/help/privacy">Privicy</NavLink>
      <NavLink tp="https://www.flickr.com/help/terms">Terms</NavLink>
     </div> */}
     <div className="bottom-banner-item">
      Imagecfr Connecting people through photography
     </div>
     <div className="bottom-banner-item">
      <a href="https://www.facebook.com/flickr">
       <img
        className="social-media-icon"
        src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/social-facebook-icon.png"
       />
      </a>
      <a href="https://twitter.com/flickr">
       <img
        className="social-media-icon"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXrOhy5YCzohXdSvrEnqfX1TY_VmnU3MO49A&usqp=CAU"
       />
      </a>
      <a href="https://www.instagram.com/flickr/">
       <img
        className="social-media-icon"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSyT_Qvc17pA5dhEOc9TjijH5xqnZkyDtWqA&usqp=CAU"
       />
      </a>
     </div>
    </div>
   </div>
  </>
 );
}
