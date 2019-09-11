var SharingCharts = new Charts('sharing')

SharingCharts.addChart({
  active: true,
  id: 'providers',
  className: 'transparent',
  position: {
    x: 3000,
    y: 400,
  },
  size: {
    width: 600,
    height: 250,
  },
  data: {
    seriesType: 'serie',
  },
  options: {
    chart: {
        width: 600,
        height: 400,
        type: 'pie',
    },
    plotOptions: {
      pie: {
        size: 100,
        offsetY: 0,
        offsetX: 0,
        dataLabels: {
          offset: 40,
          minAngleToShowLabel: 5,
        },
      },
    },
    series: [25, 15, 44, 55, 41, 17],
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    theme: {
        monochrome: {
            enabled: true,
            color: 'rgb(213, 61, 240)',
            shadeTo: 'dark',
            shadeIntensity: 0.65,
        },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'right',
      horizontalAlign: 'center', 
      floating: false,
      fontSize: '24px',
      fontFamily: 'ExoBold',
      width: undefined,
      height: undefined,
      formatter: undefined,
      offsetX: 10,
      offsetY: 150,
      labels: {
        colors: ['#FFF'],
        useSeriesColors: false
      },
    },
    dataLabels: {
      style: {
        colors: ['#FFF'],
        fontSize: '24px',
        fontFamily: 'ExoBold',
      }
    },
    title: {
      text: 'Providers share',
      align: 'left',
      offsetX: 0,
      offsetY: 10,
      style: {
        color: 'white',
        fontSize: '36px',
        fontFamily: 'ExoBold'
      },
    },
  }
})


SharingCharts.addChart({
  active: true,
  id: 'fuelTypes',
  className: 'transparent',
  position: {
    x: 3000,
    y: 800,
  },
  size: {
    width: 600,
    height: 350,
  },
  data: {
    seriesType: 'series-one',
  },
  options: {
    chart: {
      width: 600,
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '75%',
        endingShape: 'flat'
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
      data: [1, 3, 4, 2],
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
      categories: ['A','B','C','D'],
      labels: {
        align: 'center',
        style: {
          colors: Array(20).fill().map(a => 'rgba(255,255,255,.5)'),
          fontSize: '16px',
          fontFamily: 'ExoRegular',
        },
        rotate: -60,
        rotateAlways: false,
        offsetY: 5,
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
      tickAmount: 2,
      opposite: true,
      labels: {
        style: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '16px',
          fontFamily: 'ExoRegular',
        },
        offsetX: -30,
        formatter: function (val) {
          return val.toFixed(0) + '';
        }
      },
      min: 0,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#d53df0"],
    fill: {
      type: "gradient",
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      }
    },
    title: {
      text: 'Car fuel types',
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
      enabled: false,
    }
  }
})

SharingCharts.addChart({
  //GENERAL
  active: true,
  id: 'vehicleTypes',
  className: 'transparent',
  position: {
    x: 3000,
    y: 50,
  },
  size: {
    width: 600,
    height: 350,
  },
  chart: {},
  data: {
    seriesType: 'series-one',
  },
  //OPTIONS
  options: {
    chart: {
      width: 600,
      height: 350,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '75%',
        endingShape: 'flat'
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
      data: [1, 3, 4, 2],
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
      categories: ['A','B','C','D'],
      labels: {
        align: 'center',
        style: {
          colors: Array(20).fill().map(a => 'rgba(255,255,255,.5)'),
          fontSize: '16px',
          fontFamily: 'ExoRegular',
        },
        rotate: -60,
        rotateAlways: false,
        offsetY: 5,
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
      tickAmount: 2,
      opposite: true,
      labels: {
        style: {
          color: 'rgba(255,255,255,.5)',
          fontSize: '16px',
          fontFamily: 'ExoRegular',
        },
        offsetX: -30,
        formatter: function (val) {
          return val.toFixed(0) + '';
        }
      },
      min: 0,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#d53df0"],
    fill: {
      type: "gradient",
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      }
    },
    title: {
      text: 'Available car types',
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
      enabled: false,
    }
  }
})

//BIKES

SharingCharts.addChart({
  active: true,
  id: 'bikeProviders',
  className: 'transparent',
  position: {
    x: 6350,
    y: 700,
  },
  size: {
    width: 400,
    height: 400,
  },
  data: {
    seriesType: 'serie',
  },
  options: {
    chart: {
        width: 400,
        height: 400,
        type: 'pie',
    },
    plotOptions: {
      pie: {
        size: 80,
        offsetY: 0,
        offsetX: 0,
        dataLabels: {
          offset: 20,
          minAngleToShowLabel: 1,
        },
      },
    },
    series: [25, 15, 44, 55, 41, 17],
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    theme: {
        monochrome: {
            enabled: true,
            color: 'rgb(213, 61, 240)',
            shadeTo: 'dark',
            shadeIntensity: 0.65,
        },
    },
    stroke: {
      width: 0,
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: 'bottom',
      horizontalAlign: 'center', 
      floating: false,
      fontSize: '24px',
      fontFamily: 'ExoBold',
      width: undefined,
      height: undefined,
      formatter: undefined,
      offsetX: 0,
      offsetY: 40,
      labels: {
        colors: ['#FFF'],
        useSeriesColors: false
      },
    },
    dataLabels: {
      style: {
        colors: ['#FFF'],
        fontSize: '24px',
        fontFamily: 'ExoBold',
      }
    },
    title: {
      text: 'Providers actual share',
      align: 'left',
      offsetX: 0,
      offsetY: 10,
      style: {
        color: 'white',
        fontSize: '36px',
        fontFamily: 'ExoBold'
      },
    },
  }
})


SharingCharts.renderCharts();