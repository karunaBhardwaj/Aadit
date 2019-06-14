import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
import HCSoldGauge from 'highcharts/modules/solid-gauge';
import HC_exporting from 'highcharts/modules/exporting';
import {theme} from './theme';
import { GoogleDriveService } from 'src/app/services/google-drive.service';
import { AppService} from '../services/app.service';
import * as moment from 'moment';
import * as $ from 'jquery';
HC_exporting(Highcharts);
More(Highcharts);
HCSoldGauge(Highcharts);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  testData;
  testTarget;

  constructor(private appservice: AppService) { }

// Activity Chart
async chart() {
  const Month1 = moment(this.testData[3][0], 'M/D/YYYY');
  const Month2 = moment(this.testData[2][0], 'M/D/YYYY');
  const Month3 = moment(this.testData[1][0], 'M/D/YYYY');
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
            text: `Weight Chart [ Target: ${this.testTarget[0]}Kg ]`,
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
            y: this.testData[0][1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: this.testData[1][1]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: this.testData[2][1]
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
            text: `Fat Chart [ Target: ${this.testTarget[1]}% ]`,
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
            y: this.testData[0][2]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: this.testData[1][2]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: this.testData[2][2]
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
            text: `BMI Chart [ Target: ${this.testTarget[3]} ]`,
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
            y: this.testData[0][4]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: this.testData[1][4]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: this.testData[2][4]
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
            y: this.testData[0][3]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month2.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: this.testData[1][3]
            }],
            showInLegend: true
        }, {
            type: 'solidgauge',
            name: Month3.format('MMM'),
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: this.testData[2][3]
            }],
            showInLegend: true
        }]

      });
    }

    // ionViewWillEnter() {
    //   this.chart();
    // }
    async ngOnInit() {
      let Data;
      let target;
      await $.ajax('https://aadit-server.azurewebsites.net/getRows', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
          'worksheet': 4
      })
    })
    .then(
        function success(mail) {
            Data = [[mail[0].date, +mail[0].weight, +mail[0].fat.slice(0, -1), +mail[0].bodyage, +mail[0].bmi],
                    [mail[1].date, +mail[1].weight, +mail[1].fat.slice(0, -1), +mail[1].bodyage, +mail[1].bmi],
                    [mail[2].date, +mail[2].weight, +mail[2].fat.slice(0, -1), +mail[2].bodyage, +mail[2].bmi],
                    [mail[3].date, +mail[3].weight, +mail[3].fat.slice(0, -1), +mail[3].bodyage, +mail[3].bmi]];
            // console.log('Schedule', Data);
            // console.log('Schedule Data retrieved succesfully');
        }
    );
    await $.ajax('https://aadit-server.azurewebsites.net/getCells', {
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify({
        'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
        'worksheet': 4,
        'options': {
          'min-row' : 10,
          'max-row' : 10,
          'min-col' : 2,
          'max-col' : 5
        }
    })
  })
  .then(
      function success(mail) {
          target = [+mail[0]['_value'], +mail[1]['_value'].slice(0, -1), +mail[2]['_value'], +mail[3]['_value']];
          // console.log(target);
          // console.log('Schedule Data retrieved succesfully');
      }
  );
  this.testData = Data;
  this.testTarget = target;
  console.log('Test Data', this.testData);
  console.log('Target data', this.testTarget);
  this.chart();

  }


  doRefresh(event) {
      console.log('Begin async operation');
      this.ngOnInit();
      setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      }, 2000);
    }
}
