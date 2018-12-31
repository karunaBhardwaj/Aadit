import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  barChart: any;
  doughnutChart: any;
  lineChart: any;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {

    this.barChart = new Chart(this.barCanvas.nativeElement, {

        type: 'bar',
        data: {

            labels: ['Jul-18', 'Aug-18', 'Sep-18', 'Oct-18'],
            datasets: [{
                label: 'User Weight',
                data: [59.7, 59.2, 58.9, 58.4],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
        {
            label: 'Weight Goal',
            type: 'line',
                data: [57.2, 57.2, 57.2, 57.2],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
        }]
        },
        options: {
            scales: {
                xAxes: [{
                    // type: 'time',
                    // time: {
                    //     unit: 'month'
                    // },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });

  this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

    type: 'doughnut',
    data: {
        labels: ['Current Fitness'],
        datasets: [{
            // label: '# of Votes',
            data: [8, 10 - 5],
            backgroundColor: [

                'rgba(75,192,192,0.2)'
            ],
            borderColor: [

                'rgba(75,192,192,1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
    }
});

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April'],
                datasets: [
                    {
                        type: 'bar',
                        label: 'Weight',
                        // fill: false,
                        // lineTension: 0.1,
                        // backgroundColor: 'rgba(75,192,192,1)',
                        // borderColor: 'rgba(75,192,192,1)',
                        // borderCapStyle: 'butt',
                        // borderDash: [],
                        // borderDashOffset: 0.0,
                        // borderJoinStyle: 'miter',
                        // pointBorderColor: 'rgba(75,192,192,1)',
                        // pointBackgroundColor: '#fff',
                        // pointBorderWidth: 1,
                        // pointHoverRadius: 5,
                        // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        // pointHoverBorderColor: 'rgba(220,220,220,1)',
                        // pointHoverBorderWidth: 2,
                        // pointRadius: 1,
                        // pointHitRadius: 10,
                        data: [59.6, 59.2, 59.7, 59.2],
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        spanGaps: false,
                    },
                    {
                        label: 'Fat',
                        type: 'bar',
                        fill: false,
                        data: [34.2, 33.1, 33.7, 34.5],
                        backgroundColor: 'rgba(54, 162, 235, 1)'
                    },
                    {
                        label: 'BMI',
                        type: 'bar',
                        fill: false,
                        data: [24.5, 24.3, 24.5, 24.3],
                        backgroundColor: 'rgba(255, 206, 86, 1)'
                    },
                    {
                        label: 'Muscle',
                        type: 'bar',
                        fill: false,
                        data: [23.7, 24.2, 23.9, 23.6],
                        backgroundColor: 'rgba(75, 192, 192, 1)'
                    }
                ]
            }

        });

    }




  ngOnInit() {
    this.ionViewDidLoad();
  }
}


