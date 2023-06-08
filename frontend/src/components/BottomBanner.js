import React from "react";
import { NavLink } from "react-router-dom";

export default function BottomBanner() {
 return (
  <>
   <div className="bottom-banner">
    <div className="bottom-banner-row1">
     <div className="bottom-banner-item">
      <strong>Imagecfr</strong> Connecting people through photography
     </div>
     <div className="bottom-banner-item">
      <a target="_blank" href="https://wellfound.com/u/helen-koo-3">
       <img
        className="social-media-icon"
        src="https://e7.pngegg.com/pngimages/31/978/png-clipart-angellist-angel-investor-startup-company-logo-others-company-hand-thumbnail.png"
       />
      </a>
      <a target="_blank" href="https://github.com/ChunyiKoo/ChunyiKoo">
       <img
        className="social-media-icon"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUipP9pYxwb1Bs5PQuJqraOH4CXMwdZ-30vA&usqp=CAU"
       />
      </a>
      <a
       target="_blank"
       href="https://www.linkedin.com/in/chunyi-koo-70780025a/?trk=public-profile-join-page"
      >
       <img
        className="social-media-icon"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgcJ7WA60a4vkJl7f-ZtWhdOa2c3p2rKkLNQ&usqp=CAU"
       />
      </a>
     </div>
    </div>
    <div className="bottom-banner-row2">
     <div className="bottom-banner-copyright">
      Copyright &#169; 2020 by{" "}
      <a target="_blank" href="https://chunyikoo.github.io/">
       <strong>Helen Koo</strong>
      </a>
     </div>
    </div>
   </div>
  </>
 );
}
