import React from "react";

// components

import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL No of Matches"
                  statTitle="10"
                  statArrow=""
                  statPercent="0"
                  statPercentColor=""
                  statDescripiron=""
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TOTAL NO OF USERS"
                  statTitle="2"
                  statArrow=""
                  statPercent="0"
                  statPercentColor=""
                  statDescripiron=""
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
