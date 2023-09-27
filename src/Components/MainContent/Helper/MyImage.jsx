import React, { useState } from "react";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {imgs.map((curElm, index) => {
        return (
          <figure key={index} className="cursor-pointer">
            <img
              src={curElm.url}
              alt={curElm.filename}
              className="max-w-full max-h-full object-contain box-border shadow-md"
              onClick={() => setMainImage(curElm)}
            />
          </figure>
        );
      })}
      {/* Main Image */}
      <div className="col-span-3">
        <img
          src={mainImage.url}
          alt={mainImage.filename}
          className="max-w-full h-auto box-border shadow-md"
        />
      </div>
    </div>
  );
};

export default MyImage;
