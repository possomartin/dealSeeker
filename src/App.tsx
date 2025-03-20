import React, { ReactElement } from "react";
import LatestDealsAppA from "./LatestDealsAppA";
import DealsWebsite from "./dealsWebsite";

const App = (): ReactElement => {
  return (
    <>
      <LatestDealsAppA />
      <DealsWebsite />
    </>
  );
};

export default App;
