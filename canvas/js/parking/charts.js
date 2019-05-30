var ParkingCharts = new Charts('parking');

ParkingCharts.addChart({
  active: true,
  id: 'parkingCapacityRatio',
  className: 'transparent',
  position: {
    x: 5920,
    y: 430,
  },
  size: {
    width: 400
  },
  data: {
    seriesType: 'number',
    source: 'actualParkingCapacityRatio'
  },
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    series: [50],
    labels: ['ACTUAL OCCUPANCY'],
    tooltip: {
      enabled: false,
    },
    noData: {
      text: 'no data to show',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '36px',
            fontFamily: 'ExoBold',
            color: 'white',
            offsetY: 140
          },
          value: {
            offsetY: 0,
            fontFamily: 'ExoBold',
            fontSize: '48px',
            color: 'white',
            formatter: function (val) {
              return val + "%";
            }
          },
        },
        track: {
          show: true,
          startAngle: undefined,
          endAngle: undefined,
          background: '#FFFFFF',
          strokeWidth: '10%',
          opacity: .5,
          margin: 5,
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
  },
});

// LINE
ParkingCharts.addChart({
  active: true,
  id: 'parkingOccupancyPast48h',
  className: 'transparent',
  position: {
    x: 5450,
    y: 50,
  },
  size: {
    width: 800
  },
  data: {
    seriesType: 'series-one',
  },
  options: {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      line: {
        curve: 'smooth',
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      name: 'Parking Occupancy',
      data: []
    }],
    markers: {
      size: 0,
      style: 'full',
    },
    grid: {
      show: true,
      borderColor: 'rgba(255,255,255,.5)',
      strokeDashArray: 2,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 10,
        right: 30,
        bottom: 10,
        left: 30
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.65,
        opacityTo: 0.0,
        stops: [10, 100, 100, 100]
      },
    },
    yaxis: {
      tickAmount: 1,
      opposite: true,
      labels: {
        style: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '24px',
          fontFamily: 'ExoRegular',
        },
        offsetX: 0,
        formatter: function (val) {
          return val.toFixed(0) + '%';
        }
      },
      min: 0,
      max: 100,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 5,
      labels: {
        rotate: 0,
        rotateAlways: false,
        formatter: function (val, timestamp) {
          return moment(new Date(timestamp)).format("H")
        },
        style: {
          colors: Array(10).fill().map(a => 'rgba(255,255,255,.5)'),
          fontSize: '24px',
          fontFamily: 'ExoRegular',
        },
        offsetY: 10,
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    title: {
      text: 'OCCUPANCY PAST 48H',
      align: 'left',
      offsetX: 0,
      style: {
        color: 'white',
        fontSize: '36px',
        fontFamily: 'ExoBold'
      }
    },
    tooltip: {
      shared: true
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetX: -10
    }
  },
})


//BARS
Object.keys(Defaults.dayNames).forEach(
  (d) => ParkingCharts.addChart({
    //GENERAL
    active: true,
    id: 'parkingAverageOccupancyBar-' + d,
    className: 'transparent',
    position: {
      x: 6400,
      y: 65 + d * 150,
    },
    size: {
      width: 600
    },
    chart: {},
    data: {
      seriesType: 'series-one-array',
      seriesName: 'Average Occupancy',
      source: 'dayHourOccupancy',
      arrayIndex: d,
    },
    //OPTIONS
    options: {
      chart: {
        height: 190,
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '75%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [{
        name: 'Average Occupancy',
        data: storage.dayHourOccupancy[d],
      }],
      grid: {
        show: true,
        borderColor: 'rgba(255,255,255,.5)',
        strokeDashArray: 2,
        position: 'back',
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 30
        }
      },
      xaxis: {
        categories: Array(24).fill().map((a, i) => (i % 4 == 0) ? i : ''),
        labels: {
          align: 'center',
          style: {
            colors: Array(24).fill().map(a => 'rgba(255,255,255,.5)'),
            fontSize: '16px',
            fontFamily: 'ExoRegular',
          },
          rotate: 0,
          rotateAlways: false,
          offsetY: -4,
        },
        //tickAmount: 8,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        //min: 0,
        //max: 25,
        tickPlacement: 'between',
      },
      yaxis: {
        tickAmount: 1,
        opposite: true,
        labels: {
          style: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '16px',
            fontFamily: 'ExoRegular',
          },
          offsetX: -30,
          formatter: function (val) {
            return val.toFixed(0) + '%';
          }
        },
        min: 0,
        max: 100,
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      title: {
        text: Defaults.dayNames[d],
        align: 'left',
        offsetX: 0,
        offsetY: 40,
        style: {
          color: 'white',
          fontSize: '24px',
          fontFamily: 'ExoBold'
        }
      },
      tooltip: {
        enabled: false,
      }
    }
  })
)

ParkingCharts.renderCharts();