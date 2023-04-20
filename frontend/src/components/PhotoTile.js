import React from "react";

function PhotoTile({ photo }) {
 return (
  <div>
   <img src={`${photo?.url}`} style={{ height: "200px" }} />
   <button>update</button>
   <button>delete</button>
  </div>
 );
}
export default PhotoTile;
