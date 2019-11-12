var AirqualityCharts = new Charts('airquality')

//RADIALBAR
AirqualityCharts.addChart({
  active: true,
  id: 'CHMIAirqualityIndex',
  className: 'transparent',
  position: {
    x: 2050,
    // y: 800,
    y: 520, //  CAMP
  },
  size: {
    width: 500
  },
  data: {
    seriesType: 'number',
    source: 'actualAirqualityStationIndex'
  },
  options: {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    series: [ 3*25 ],
    labels: ['INDEX KVALITY OVZUDŠÍ'],
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
                  return Math.round(val/25);
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
      colors: ['#FF3100'],
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

// LINE
var sensors = [
  {
    type: 'NO2',
    title: 'NO₂ posledních 48h',
    unit: 'ppm',
  },
  {
    type: 'PM10',
    title: 'PM10 posledních 48h',
    unit: 'ppm',
  },
  {
    type: 'O3',
    title: 'O₃ posledních 48h',
    unit: 'ppm',
  },
]
sensors.forEach((sensor,i)=>{
  AirqualityCharts.addChart({
      active: true,
      id: 'CHMILine-'+sensor.type,
      className: 'transparent',
      position: {
        x: 150+i*620,
        y: 50, // CAMP
        // y: 80,
      },
      size: {
        width: 600
      },
      data: {
        seriesType: 'series-one',
        seriesName: 'Parking Occupancy',
        source: 'lastOccupancy'
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
        dataLabels: {
          enabled: false
        },
        series: [{
          name: 'CHMI - '+sensor.type,
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
          colors: ['#FF3100'],
        },
        fill: {
          colors: ['#FF3100'],
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
            formatter: function(val) {
              return val.toFixed(2);
            }
          },
          // min: 0,
          // max: 100,
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
              colors: Array(10).fill().map(a=>'rgba(255,255,255,.5)'),
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
          text: sensor.title,
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
})


// LINE
var sensorsKarlin = [
  {
    type: 'weather.temperature',
    title: 'Teplota',
    unit: '°C',
  },
  {
    type: 'noise',
    title: 'PM10',
    unit: 'dB',
  },
]
sensorsKarlin.forEach((sensor,i)=>{
  AirqualityCharts.addChart({
      active: true,
      id: 'KarlinLine-'+sensor.type,
      className: 'transparent',
      position: {
        x: 750,
        y: 1350+i*350, // CAMP
        // y: 80, 
      },
      size: {
        width: 650
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
        dataLabels: {
          enabled: false
        },
        series: [{
          name: 'CHMI - '+sensor.type,
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
          colors: ['#FF3100'],
        },
        fill: {
          colors: ['#FF3100'],
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
            formatter: function(val) {
              return val.toFixed(0);
            }
          },
          // min: 0,
          // max: 100,
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 6,
          labels: {
            rotate: 0,
            rotateAlways: false,
            formatter: function (val, timestamp) {
              return moment(new Date(timestamp)).format("H")
            },
            style: {
              colors: Array(10).fill().map(a=>'rgba(255,255,255,.5)'),
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
          text: sensor.title,
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
})

AirqualityCharts.renderCharts();