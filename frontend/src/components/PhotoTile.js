import React from "react";

function PhotoTile({ photo }) {
 return (
  <div>
   <img src={`${photo?.url}`} style={{ height: "200px" }} />
  </div>
 );
}
export default PhotoTile;
