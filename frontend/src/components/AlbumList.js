import React from "react";
import AlbumTile from "./AlbumTile";

function AlbumList({ albums, user }) {
 console.log("PhotoList albums: ", albums);

 return albums?.map((album) => (
  <div key={album?.id}>
   <AlbumTile album={album} user={user} />{" "}
  </div>
 ));
}
export default AlbumList;
