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
  async chart1() {

// Load data from sheets
    let Data: string[];

    const Url = this.appservice.getParsedGetDataUrl(this.googleDriveService.getSheetId(), SheetTabsTitleConst.TEST_DATA);
    const Info = fetch(Url).then(function(response) {return response.json(); }).then(function(myJson) {
    const value = myJson['values'] ;
    const List: string[] = [] ;
    value.forEach(element => {
        for ( let i = 0; i < value.length ; i++) {
        if ( moment(element[i], 'M/D/YYYY', true).isValid() === true) { List.push(element[1] ); } }
        });
    return List;
    });
    await Info.then(function (x) { Data = x; });
    const Weights = Data.map(Number);
    console.log('Weights: ', Weights);

// Apply the theme
Highcharts.setOptions(theme);
    // Draw Chart
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Weight chart',
        style: {
            color: 'black'
        }
      },
      subtitle: {
        text: 'on daily basis',
        style: {
            color: 'black'
        }
      },
      xAxis: {
        type: 'datetime',
        // dateTimeLabelFormats: {
        //     day: '%e %b'
        // }
        labels: {
            style: {
                color: 'black'
            }
        }
      },
      yAxis: {
        min: 50,
        title: {
          text: 'Weight',
          align: 'high',
          style: {
              color: 'black'
          }
        },
        labels: {
          overflow: 'justify',
          style: {
              color: 'black'
          }
        }
      },
      tooltip: {
        valueSuffix: ' Kgs'
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: false
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 40,
        floating: true,
        borderWidth: 1,
        backgroundColor: ( '#FFFFFF'),
        shadow: true
      },
      credits: {
        enabled: false
      },

      series: [{
        type: 'column',
        name: 'Present weight',
        data: Weights,
        pointStart: Date.UTC(2018, 5, 1),
        pointInterval: 24 * 3600 * 1000 // one day
    },
    {
    type: 'column',
    name: 'Goal',
    data: [59, 59, 59, 59],
    pointStart: Date.UTC(2018, 5, 1),
    pointInterval: 24 * 3600 * 1000 // one day
    }]
  });

}

// Activity Chart
chart2() {
    // apply theme
    Highcharts.setOptions(theme);

    function renderIcons() {
    // Weight icon
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

    // Fat icon
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

    // BMI icon
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

// Draw Chart
    Highcharts.chart('container2', {

        chart: {
          type: 'solidgauge',
          height: '100%',
          events: {
            render: renderIcons
        }
        },
        title: {
            text: 'Activity Chart',
            style: {
                fontSize: '15px'
            }
        },
        tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {fontSize: '16px'},
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
        positioner: function () {
            return {
                x: (this.chart.chartWidth - 80 ) / 2,
                y: (this.chart.plotHeight / 2) + 12
            };
        }
    },
        pane: { // track for Weight
          startAngle: 0,
          endAngle: 360,
          background: [{
            outerRadius: '112%',
            innerRadius: '88%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for Fat
            outerRadius: '87%',
            innerRadius: '63%',
            backgroundColor: (Highcharts as any).Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
            borderWidth: 0
          },
         {
            // Track for BMI
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
              enabled: false
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
            name: 'Weight',
            data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '112%',
            innerRadius: '88%',
            y: 80
            }]
        }, {
            type: 'solidgauge',
            name: 'Fat',
            data: [{
            color: Highcharts.getOptions().colors[1],
            radius: '87%',
            innerRadius: '63%',
            y: 65
            }]
        }, {
            type: 'solidgauge',
            name: 'BMI',
            data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '62%',
            innerRadius: '38%',
            y: 50
            }]
        }]

      });
    }

   ionViewDidLoad() {
    this.chart1();
    this.chart2();
   }
  ngOnInit() {
      this.ionViewDidLoad();
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
