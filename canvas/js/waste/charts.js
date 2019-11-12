var WasteCharts = new Charts('waste')

//RADIALBAR
WasteCharts.addChart({
  active: true,
  id: 'actualFullness',
  className: 'transparent',
  position: {
    x: 3150,
    y: 1450,
  },
  size: {
    width: 500
  },
  data: {
    seriesType: 'serie',
    source: 'actualAirqualityStationIndex'
  },
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    series: [ 80, 20, 30, 64, 29, 42 ],
    labels: ['ZAPLNĚNOST'],
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
        startAngle: -115,
        endAngle: 115,
        // dataLabels: {
        //   name: {
        //       fontSize: '36px',
        //       fontFamily: 'ExoBold',
        //       color: 'white',
        //       offsetY: 140
        //   },
        //   value: {
        //       offsetY: 0,
        //       fontFamily: 'ExoBold',
        //       fontSize: '48px',
        //       color: 'white',
        //       formatter: function (val) {
        //           return '%';
        //       }
        //   },
        // },
        hollow: {
          size: '10%',
        },
        track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: '#FFFFFF',
            strokeWidth: '50%',
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
      colors: ['#efef64','#55b4fc','#64efd1','#fcae55','#ffffff','#aaaaaa'],
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
    title: {
      text: 'AKTUÁLNÍ ZAPLNĚNOST',
      align: 'center',
      offsetX: 0,
      offsetY: 300,
      style: {
        color: 'white',
        fontSize: '36px',
        fontFamily: 'ExoBold'
      }
    },
  },
})

var wastes = [
  {
    type: 'plastic',
    color: '#efef64',
    title: 'PLASTY',
  },
  {
    type: 'paper',
    color: '#55b4fc',
    title: 'PAPÍR',
  },
  {
    type: 'otherglass',
    color: '#64efd1',
    title: 'BAREVNÉ SKLO',
  },
  {
    type: 'beveragecartons',
    color: '#fcae55',
    title: 'NÁP. KARTONY',
  },
  {
    type: 'whiteglass',
    color: '#ffffff',
    title: 'BÍLÉ SKLO',
  },
  {
    type: 'metal',
    color: '#aaaaaa',
    title: 'KOVY',
  },
]
wastes.forEach((w,i) => {
  WasteCharts.addChart({
    active: true,
    id: 'waste-'+w.type,
    className: 'transparent',
    position: {
      x: 2500+i%2*600, // CAMP
      // x: 3600+i%2*600,
      y: 90+i%3*340,
    },
    size: {
      width: 600,
      height: 300,
    },
    data: {
      seriesType: 'series-one',
    },
    options: {
      chart: {
        type: 'area',
        stacked: false,
        width: 600,
        height: 300,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false
      },
      series: [{
        name: 'Waste',
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
      stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: [w.color],
      },
      fill: {
        colors: [w.color],
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
        tickAmount: 2,
        opposite: true,
        labels: {
          style: {
            color: 'rgba(255,255,255,.5)',
            fontSize: '24px',
            fontFamily: 'ExoRegular',
          },
          offsetX: 0,
          formatter: function(val) {
            return val.toFixed();
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
            return moment(new Date(timestamp)).format("M/D")
          },
          style: {
            colors: Array(50).fill().map(a=>'rgba(255,255,255,.5)'),
            fontSize: '24px',
            fontFamily: 'ExoRegular',
          },
          offsetY: 10,
          offsetX: 5,
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
      },
      title: {
        text: w.title,
        align: 'left',
        offsetX: 0,
        offsetY: 10,
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
})


WasteCharts.addChart({
  active: true,
  id: 'picksRatioUnder50',
  className: 'transparent',
  position: {
    x: 800,
    y: 150,
  },
  size: {
    width: 500
  },
  data: {
    seriesType: 'serie',
  },
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    series: [ 80 ],
    labels: [''],
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
              show: false,
          },
          value: {
              offsetY: 15,
              fontFamily: 'ExoBold',
              fontSize: '48px',
              color: 'white',
              formatter: function(val) {
                return val+'%'
              },
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
      colors: ['#64efd1'],
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
})

WasteCharts.renderCharts();