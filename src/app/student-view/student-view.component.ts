import { Component, OnInit } from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../Structs/studentClass';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  private student: Student;

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          steps : 10,
          stepValue : 10,
          max : 50,
        }
      }]
    }
  };
  public barChartLabels:string[] = ['Tweets', 'Retweets', 'Likes'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [0]}
  ];


  public doughnutChartLabels:string[] = ['#2110ctv', 'HuckleBerry', 'Research'];
  public doughnutChartData:number[] = [0,0,0];
  public doughnutChartType:string = 'doughnut';





  constructor(private studentService : StudentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStudent();
  }

  geneateLineGraph() {
    let v = new Map();


  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  getStudent() : void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => {
        this.student = student;
        this.barChartData = [{data: [student.totTweets, student.totRetweets, student.totLikes]}];
        this.doughnutChartData = this.student.topicDistNum;
        console.log('Student recievedd');
        console.log(student);
      });
  }


}
