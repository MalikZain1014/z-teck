import React from "react";
import TopSlider from "./TopSlider";
import Category from "./Category";
import TrustCompany from "./TrustCompany";

export default function Home() {
  return (
    <div>
      <MemoizedTopSlider />
      <MemoizedCategory />
      <MemoizedTrustCompany />
    </div>
  );
}

const MemoizedTopSlider = React.memo(TopSlider);
const MemoizedCategory = React.memo(Category);
const MemoizedTrustCompany = React.memo(TrustCompany);
