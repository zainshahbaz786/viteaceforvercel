/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect } from "react";
import objectPath from "object-path";
import ApexCharts from "apexcharts";
import { useHtmlClassService } from "../../layout";
import { KTUtil } from "../../_assets/js/components/util";

export function SalesTargets(props) {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      data: props,
      colorsGrayGray100: objectPath.get(uiService.config, "js.colors.gray.gray100"),
      colorsGrayGray700: objectPath.get(uiService.config, "js.colors.gray.gray700"),
      colorsThemeBaseSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.base.success"
      ),
      colorsThemeLightSuccess: objectPath.get(
        uiService.config,
        "js.colors.theme.light.success"
      ),
      fontFamily: objectPath.get(uiService.config, "js.fontFamily")
    };
  }, [uiService]);

  useEffect(() => {
    let graphValue = parseInt(props.callStats.markedKeyword / props.callStats.totalKeyword * 100);
    graphValue = graphValue >= 0 ? graphValue : 0;
    const element = document.getElementById("kt_mixed_widget_14_chart");
    if (!element) {
      return;
    }

    const height = parseInt(KTUtil.css(element, 'height'));
    const options = getChartOptions(layoutProps, height, graphValue);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [props]);

  return (
    <div className={`card card-custom ${props.className}`}>
      {/* Header */}
      <div className="card-header">
        <div className="card-title">
          {/* <h3 className="card-label"><small> Today's</small><br /> Statistics</h3> */}
          <h3 className="card-label">Statistics</h3>
        </div>
      </div>
      {/* Body */}
      <div className="card-body d-flex flex-column pt-0">
        <div className="flex-grow-1">
          <div id="kt_mixed_widget_14_chart" style={{ height: "200px" }}></div>
        </div>
        <div className="pt-3">
          {/* Stat */}
          {/* <h3 className="card-title font-weight-bolder"></h3> */}
          <div className="">
            <div className="row m-0">
              <div className="col bg-light-primary p-4 rounded-xl mr-7 mb-7 text-center">
                <div className="text-primary font-weight-bold">Total Calls</div>
                <div className="text-primary font-weight-bolder font-size-h2 mt-3">{props.callStats.totalCalls}</div>
              </div>
              <div className="col bg-light-warning p-4 rounded-xl mb-7 text-center">
                <div className="text-warning font-weight-bold">Total Words</div>
                <div className="text-warning font-weight-bolder font-size-h2 mt-3">{props.callStats.totalKeyword}</div>
              </div>
            </div>
            <div className="row m-0">
              <div className="col bg-light-success p-4 rounded-xl mr-7 text-center">
                <div className="text-success font-weight-bold">Marked Words</div>
                <div className="text-success font-weight-bolder font-size-h2 mt-3">{props.callStats.markedKeyword}</div>
              </div>
              <div className="col bg-light-danger p-4 rounded-xl text-center">
                <div className="text-danger font-weight-bold">Unmarked Words</div>
                <div className="text-danger font-weight-bolder font-size-h2 mt-3">{props.callStats.unMarkedKeyword}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function getChartOptions(layoutProps, height, graphValue = 0) {
  const options = {
    series: [graphValue],
    chart: {
      height: height,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%"
        },
        dataLabels: {
          showOn: "always",
          name: {
            show: false,
            fontWeight: "700",
          },
          value: {
            color: layoutProps.colorsGrayGray700,
            fontSize: "30px",
            fontWeight: "700",
            offsetY: 12,
            show: true
          },
        },
        track: {
          background: layoutProps.colorsThemeLightSuccess,
          strokeWidth: '100%'
        }
      }
    },
    colors: [layoutProps.colorsThemeBaseSuccess],
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"]
  };
  return options;
}
