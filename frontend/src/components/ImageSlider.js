import { useEffect, useState } from "react";

const ImageSlider = ({ photos, index, setPhoto_id }) => {
 const [currentIndex, setCurrentIndex] = useState(index);
 console.log("photos, index", photos, index);

 let photo;
 useEffect(() => {
  setCurrentIndex(index);
 }, [index]);
 if (photos !== undefined && currentIndex !== undefined)
  photo = photos[currentIndex];

 console.log({ currentIndex, index, photos, photo });

 const sliderStyles = {
  height: "100%",
  position: "relative",
 };
 const slideStyles = {
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundImage: `url(${photo?.imageUrl})`,
 };

 const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0,-50%)",
  left: "-200px",
  fontSize: "45px",
  color: "white",
  zIndex: 1,
  cursor: "pointer",
 };

 const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0,-50%)",
  right: "-200px",
  fontSize: "45px",
  color: "white",
  zIndex: 1,
  cursor: "pointer",
 };

 const dotsContainerStyles = {
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#222",
  color: "white",
 };

 const dotStyles = {
  margin: "6px",
  cursor: "pointer",
  fontSize: "40px",
 };

 const goToPrevious = () => {
  const isFirstSlide = currentIndex === 0;
  const newIndex = isFirstSlide ? photos.length - 1 : currentIndex - 1;
  setCurrentIndex(newIndex);
  setPhoto_id(photos[newIndex].id);
 };

 const goToNext = () => {
  const isLastSlide = currentIndex === photos.length - 1;
  const newIndex = isLastSlide ? 0 : currentIndex + 1;
  setCurrentIndex(newIndex);
  setPhoto_id(photos[newIndex].id);
 };

 //  const goToSlide = (idx) => {
 //   setCurrentIndex(idx);
 //  };

 console.log(`ImageSlider:url(${photo?.imageUrl})`);

 return (
  <>
   <div className="ImageSlider-parent-container">
    <div style={sliderStyles}>
     <div style={leftArrowStyles} onClick={goToPrevious}>
      {"<"}
     </div>
     <div style={rightArrowStyles} onClick={goToNext}>
      {">"}
     </div>
     <div style={slideStyles}></div>
    </div>
   </div>
   <div style={dotsContainerStyles}>
    {photos?.map((photo, idx) => (
     <div
      key={idx}
      style={dotStyles}
      onClick={() => {
       setCurrentIndex(idx);
       console.log(
        "????????idx, photos[idx],photos[idx].id",
        idx,
        photos[idx],
        photos[idx].id
       );
       setPhoto_id(photos[idx].id);
      }}
     >
      &#8226;
     </div>
    ))}
   </div>
  </>
 );
};
export default ImageSlider;
