import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import HCSoldGauge from 'highcharts/modules/solid-gauge';
import HC_exporting from 'highcharts/modules/exporting';
import {theme} from './theme';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { SheetTabsTitleConst } from '../constants/sheet.constant';
import { AppService} from '../services/app.service';
import * as moment from 'moment';
HC_exporting(Highcharts);
More(Highcharts);
HCSoldGauge(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private appservice: AppService, private googleDriveService: GoogleDriveService) { }

// Activity Chart
async chart() {
  const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.TEST_DATA);
  const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
  const value = myJson['values'] ;
  console.log(value);
  return value;
  });
  let Data = [];
  await Info.then(function (x) { Data = (x); });
  const weights = [+Data[4][1], +Data[3][1], +Data[2][1]];
  const weightTarget = +Data[9][1];
  const fat = [+Data[4][2].slice(0, -1), +Data[3][2].slice(0, -1), +Data[2][2].slice(0, -1)];
  const fatTarget = +Data[9][2].slice(0, -1);
  const bmi = [+Data[4][4], +Data[3][4], +Data[2][4]];
  const bmiTarget = +Data[9][4];
  const bodyage = [+Data[4][3], +Data[3][3], +Data[2][3]];
  const Month1 = moment(Data[4][0], 'M/D/YYYY');
  const Month2 = moment(Data[3][0], 'M/D/YYYY');
  const Month3 = moment(Data[2][0], 'M/D/YYYY');
    // apply theme
    Highcharts.setOptions(theme);

    function renderIcons() {
    // Month 1 Icon
    if (!this.series[0].icon) {
        this.series[0].icon = this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }
    this.series[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
            (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Month 2 Icon
    if (!this.series[1].icon) {
        this.series[1].icon = this.renderer.path(
            ['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                'M', 8, -8, 'L', 16, 0, 8, 8]
            )
            .attr({
                'stroke': '#ffffff',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }
    this.series[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
            (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Month 3 icon
    if (!this.series[2].icon) {
        this.series[2].icon = this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .add(this.series[2].group);
    }

    this.series[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
            (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    );
    }

// Draw Weight Chart
    Highcharts.chart('container1', {

        chart: {
          type: 'solidgauge',
          height: '100%',
          events: {
            render: renderIcons
        }
        },
        title: {
            text: `Weight Chart [ Target: ${weightTarget}Kg ]`,
            style: {
                fontSize: '15px'
            }
        },
        tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {fontSize: '16px'},
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}Kg</span>',
        positioner: function () {
            return {
                x: (this.chart.chartWidth - 80 ) / 2,
                y: (this.chart.plotHeight / 2) + 12
            };
        }
    },
        pane: { // track for Month 1
            startAngle: 0,
            endAngle: 360,
            background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 2
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 3
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
            borderWidth: 0
            }]
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []

        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: true
            },
            stickyTracking: false,
            linecap: 'round',
            rounded: true


          }
        },
        credits: {
            enabled: false
          },

        series: [{
            type: 'solidgauge',
            name: Month1.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: weights[0]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: weights[1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: weights[2]
            }],
            showInLegend: true
        }]

      });


      // Draw Fat Chart
      Highcharts.chart('container2', {

        chart: {
          type: 'solidgauge',
          height: '100%',
          events: {
            render: renderIcons
        }
        },
        title: {
            text: `Fat Chart [ Target: ${fatTarget}% ]`,
            style: {
                fontSize: '15px'
            }
        },
        tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {fontSize: '16px'},
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        positioner: function () {
            return {
                x: (this.chart.chartWidth - 80 ) / 2,
                y: (this.chart.plotHeight / 2) + 12
            };
        }
    },
        pane: { // track for Month 1
            startAngle: 0,
            endAngle: 360,
            background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 2
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 3
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
            borderWidth: 0
            }]
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []

        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: true
            },
            stickyTracking: false,
            linecap: 'round',
            rounded: true


          }
        },
        credits: {
            enabled: false
          },

        series: [{
            type: 'solidgauge',
            name: Month1.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: fat[0]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: fat[1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: fat[2]
            }],
            showInLegend: true
        }]

      });

    // Draw BMI Chart
      Highcharts.chart('container3', {

        chart: {
          type: 'solidgauge',
          height: '100%',
          events: {
            render: renderIcons
        }
        },
        title: {
            text: `BMI Chart [ Target: ${bmiTarget} ]`,
            style: {
                fontSize: '15px'
            }
        },
        tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {fontSize: '16px'},
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function () {
            return {
                x: (this.chart.chartWidth - 80 ) / 2,
                y: (this.chart.plotHeight / 2) + 12
            };
        }
    },
        pane: { // track for Month 1
            startAngle: 0,
            endAngle: 360,
            background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 2
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 3
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
            borderWidth: 0
            }]
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []

        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: true
            },
            stickyTracking: false,
            linecap: 'round',
            rounded: true


          }
        },
        credits: {
            enabled: false
          },

        series: [{
            type: 'solidgauge',
            name: Month1.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: bmi[0]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: bmi[1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: bmi[2]
            }],
            showInLegend: true
        }]

      });

    // Draw Body Age Chart
      Highcharts.chart('container4', {

        chart: {
          type: 'solidgauge',
          height: '100%',
          events: {
            render: renderIcons
        }
        },
        title: {
            text: `Body Age Chart`,
            style: {
                fontSize: '15px'
            }
        },
        tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {fontSize: '16px'},
        pointFormat: '{series.name}<br><span style="font-size:1em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function () {
            return {
                x: (this.chart.chartWidth - 80 ) / 2,
                y: (this.chart.plotHeight / 2) + 12
            };
        }
    },
        pane: { // track for Month 1
            startAngle: 0,
            endAngle: 360,
            background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 2
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Month 3
            outerRadius: '62%',
            innerRadius: '38%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[2]).setOpacity(0.3).get(),
            borderWidth: 0
            }]
        },

        yAxis: {
          min: 0,
          max: 100,
          lineWidth: 0,
          tickPositions: []

        },

        plotOptions: {
          solidgauge: {
            dataLabels: {
              enabled: true
            },
            stickyTracking: false,
            linecap: 'round',
            rounded: true


          }
        },
        credits: {
            enabled: false
          },

        series: [{
            type: 'solidgauge',
            name: Month1.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: bodyage[0]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: bodyage[1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: bodyage[2]
            }],
            showInLegend: true
        }]

      });
    }

    ionViewWillEnter() {
      this.chart();
    }
    ngOnInit() {
      // this.chart();
    }
    doRefresh(event) {
        console.log('Begin async operation');
        this.ionViewWillEnter();
        setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
        }, 2000);
    }
}
