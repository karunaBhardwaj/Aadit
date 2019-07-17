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
  CardioData;

  constructor(private appservice: AppService) { }

// Activity Chart
async chart() {
  const Month1 = moment(this.testData[2][0], 'M/D/YYYY');
  const Month2 = moment(this.testData[1][0], 'M/D/YYYY');
  const Month3 = moment(this.testData[0][0], 'M/D/YYYY');
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


      // Draw Cardiovascular profile

      Highcharts.chart('container5', {
        chart: {
          type: 'line',
          height: '100%',
        //   events: {
        //     render: renderIcons
        // }
        },

        title: {
            text: 'Cardiovascular Profile'
        },

        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },

        yAxis: {
            title: {
                text: 'Heart Rate (BPM)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                // pointStart: 100
            }
        },
        credits: {
          enabled: false
        },
        series: [{
            type: 'line',
            name: `${this.CardioData[0][0]}`,
            data: [this.CardioData[0][1], this.CardioData[0][2], this.CardioData[0][3], this.CardioData[0][4],
            this.CardioData[0][5], this.CardioData[0][6], this.CardioData[0][7]]
        }, {
            type: 'line',
            name: `${this.CardioData[1][0]}`,
            data: [this.CardioData[1][1], this.CardioData[1][2], this.CardioData[1][3], this.CardioData[1][4],
            this.CardioData[1][5], this.CardioData[1][6], this.CardioData[1][7]]
        }, {
            type: 'line',
            name: `${this.CardioData[2][0]}`,
            data: [this.CardioData[2][1], this.CardioData[2][2], this.CardioData[2][3], this.CardioData[2][4],
            this.CardioData[2][5], this.CardioData[2][6], this.CardioData[2][7]]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
    }

    ionViewWillEnter() {
      // this.chart();
    }


    async ngOnInit() {
      let Data;
      let target;
      let cardioData;

    await $.ajax('https://aadit-nodeserver.herokuapp.com/getCells', {
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify({
        'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
        'worksheet': 4,
        'options': {
          'min-row' : 2,
          'max-row' : 10,
          'min-col' : 1,
          'max-col' : 5
        }
    })
  })
  .then(
      function success(data) {
          Data = [[data[5]['_value'].slice(1, -1), +data[6]['_value'], +data[7]['_value'].slice(0, -1), +data[8]['_value'], +data[9]['_value']],
                  [data[10]['_value'].slice(1, -1), +data[11]['_value'], +data[12]['_value'].slice(0, -1), +data[13]['_value'], +data[14]['_value']],
                  [data[15]['_value'].slice(1, -1), +data[16]['_value'], +data[17]['_value'].slice(0, -1), +data[18]['_value'], +data[19]['_value']]];
          target = [+data[21]['_value'], +data[22]['_value'].slice(0, -1), +data[23]['_value'], +data[24]['_value']];

          // console.log(target);
          // console.log('Target Data retrieved succesfully');
      }
  );
      await $.ajax('https://aadit-nodeserver.herokuapp.com/getRows', {
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          'sheetid': `${this.appservice.getUserInfo().token.sheetId}`,
          'worksheet': 5
      })
    })
    .then(
        function success(mail) {
            cardioData = [[mail[0].date.slice(1, -1), +mail[0]['_cokwr'], +mail[0]['_cpzh4'], +mail[0]['_cre1l'],
            +mail[0]['_chk2m'], +mail[0]['_ciyn3'], +mail[0]['_ckd7g'], +mail[0]['_clrrx']],
                    [mail[1].date.slice(1, -1), +mail[1]['_cokwr'], +mail[1]['_cpzh4'], +mail[1]['_cre1l'],
                    +mail[1]['_chk2m'], +mail[1]['_ciyn3'], +mail[1]['_ckd7g'], +mail[1]['_clrrx']],
                    [mail[2].date.slice(1, -1), +mail[2]['_cokwr'], +mail[2]['_cpzh4'], +mail[2]['_cre1l'],
                    +mail[2]['_chk2m'], +mail[2]['_ciyn3'], +mail[2]['_ckd7g'], +mail[2]['_clrrx']]]
            // console.log('Schedule', Data);
            // console.log('Schedule Data retrieved succesfully');
        }
    );
    this.CardioData = cardioData;
    console.log('Cardio Data', this.CardioData);
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
