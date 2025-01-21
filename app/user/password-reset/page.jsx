import React, { Suspense } from "react";
import ResetPassword from "./ResetPassword";
const page = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default page;
