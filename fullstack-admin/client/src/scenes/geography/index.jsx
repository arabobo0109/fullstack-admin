import React from "react";
import Header from "components/Header";
import { useGetGeographyQuery } from "state/api";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "state/geoData";
import { Box, useTheme } from "@mui/material";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header titlt="Geography" subtitle="Find where your users locations." />
      <Box
        mt="40px"
        height="75vh"
        width="100%"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        { data ? (
          <ResponsiveChoropleth
            data={ data }
            theme={{
                axis: {
                    domain: {
                        line: {
                            stroke: theme.palette.secondary[200]
                        }
                    },
                    legend: {
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    },
                    ticks:{
                        line: {
                            stroke: theme.palette.secondary[200],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: theme.palette.secondary[200]
                        }
                    }
                },
                legends: {
                    text: {
                        fill: theme.palette.secondary[200]
                    }
                },
                tooltip: {
                    container: {
                        color: theme.palette.primary.main
                    }
                }
            }}
            features={ geoData.features }
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={140}
            projectionTranslation={[0.5, 0.65]}
            projectionRotation={[-13, 0, 0]}
            enableGraticule={false}
            graticuleLineColor="#dddddd"
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000000",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
