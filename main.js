function openDeskTicket(e) {
	var $target = $(e.target);
	var ticketNum = $target.closest('tr.table-row').attr('data-ticketId');
	var ticketUrl = "https://digitalcrew.teamwork.com/desk/#tickets/" + ticketNum;

	window.open(ticketUrl, '_blank');
	e.preventDefault();
}

function openProjectsTask(e) {
	var $target = $(e.target);
	var ticketNum = $target.closest('tr.table-row').attr('data-taskId');
	var ticketUrl = "https://digitalcrew.teamwork.com/tasks/" + ticketNum;

	window.open(ticketUrl, '_blank');
	e.preventDefault();
}

function showTaskChart(tasks) {

	console.log('tasks', tasks);

    // Build the chart
    $('#taskPieChart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 270,
            backgroundColor: '#333333'
        },
        title: {
            text: 'Tasks by Type',
            style: {
            	color: '#ffffff'
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                colors: ['#24be43', '#d45b4e']
            }
        },
        series: [{
            name: 'Tasks',
            colorByPoint: true,
            data: [
            	{
	                name: 'Upcoming',
	                y: parseInt(tasks.active, 10)
	            },
	            {
	                name: 'Late',
	                y: parseInt(tasks.late, 10),
	                sliced: true,
	                selected: true
	            }
            ]
        }]
    });

}

function showCommits(data) {

	var commitData = [],
		commitDays = [
			{
				days: 0
			},
			{
				days: 0
			},
			{
				days: 0
			},
			{
				days: 0
			},
			{
				days: 0
			},
			{
				days: 0
			},
			{
				days: 0
			}
		];

		today = moment();

	data.forEach(function(commit) {
		var commitTime = moment(commit.created_at);
		var dayCommitted = today.diff(commitTime, 'days');

		console.log('date', moment(commit.created_at).format('ddd mmmm') );
		console.log('dayCommitted', dayCommitted);
		console.log('commitDays[dayCommitted]', commitDays[dayCommitted]);
		commitDays[dayCommitted].days += 1;

	});

	commitData = _.pluck(commitDays, 'days').reverse();

	console.log('commitDays', commitDays);
	console.log('commitData', commitData);

	console.log('moment.utc().valueOf()', moment().subtract(7, 'days').utc().valueOf());
	console.log('Date.UTC(2015, 10, 19)', Date.UTC(2015, 10, 19));

    $('#commitsChart').highcharts({
        chart: {
            type: 'area',
            height: 270,
            backgroundColor: '#333333'
        },
        title: {
            text: 'My Commits this Week',
            style: {
            	color: '#ffffff'
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            }
        },
        yAxis: {
            title: {
                text: 'Task Count'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        legend: {
        	title: {
	            itemStyle: {
	            	"color": "#ffffff",
	            	"cursor": "pointer",
	            	"fontSize": "12px",
	            	"fontWeight": "bold"
	            }
        	}
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
        	pointStart: moment().subtract(7, 'days').startOf('day').utc().valueOf(),
            pointInterval: 24 * 3600 * 1000, // one day
            name: 'Commits',
            data: commitData
        }]
    });
}

function addTasksChart(data) {
	console.log('1');

	var data = {
		tasks: {
			completed: [
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				},
				{
					createdDate: '20151101'
				}
			],
			completed: [
				{
					completedDate: '20151112'
				},
				{
					completedDate: '20151103'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151104'
				},
				{
					completedDate: '20151105'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				},
				{
					completedDate: '20151101'
				}
			]
		}
	}

	var completedData = '';
	var createdData = '';

    $('#taskChart').highcharts({
        chart: {
            type: 'area',
            height: 270,
            backgroundColor: '#333333'
        },
        title: {
            text: 'Tasks Assigned / Completed',
            style: {
            	color: '#ffffff'
            }
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            allowDecimals: false,
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e of %b'
            }
        },
        yAxis: {
            title: {
                text: 'Task Count'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        legend: {
        	title: {
	            itemStyle: {
	            	"color": "#ffffff",
	            	"cursor": "pointer",
	            	"fontSize": "12px",
	            	"fontWeight": "bold"
	            }
        	}
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
        	pointStart: Date.UTC(2015, 10, 19),
            pointInterval: 24 * 3600 * 1000, // one day
            name: 'Assigned',
            data: [6, 11, 12, 11, 6, 3, 1]
        }, {
        	pointStart: Date.UTC(2015, 10, 19),
            pointInterval: 24 * 3600 * 1000, // one day
            name: 'Completed',
            data: [5, 12, 5, 12, 9, 5, 3]
        }]
    });

}

$(document).ready(function(){

	/******** API calls *********/

	$.ajax({
		method: "GET",
		url: 'https://digitalcrew.teamwork.com/people/41400.json?fullprofile=1&getProjectsStats=1&getTasksStats=1&getMilestonesStats=1',
		beforeSend: function (xhr) {
		  	xhr.setRequestHeader ("Authorization", "Basic " + btoa(window.teamworkAPIKey + ":" + '123'));
		}
	})
	.done(function( data ) {
		console.log( "Data: ", data );
		if ( data.person && data.person.tasks ) {
			showTaskChart(data.person.tasks);
		}
	});


	$.ajax({
		method: "GET",
		url: 'https://api.github.com/users/jamesdraper5/events',
		data: {
			page: 1
		},
		beforeSend: function (xhr) {
		  	xhr.setRequestHeader ("Authorization", "Basic " + btoa(window.gitUserName + ":" + window.gitUserPassword));
		}
	})
	.done(function( data ) {
		console.log( "Data: ", data );
		showCommits(data);
	});




	/******** Event Handlers *******/
	$('#sectionTicketList').find('tr.table-row').on('click', openDeskTicket);

	$('#sectionTasksList').find('tr.table-row').on('click', openProjectsTask);

	/******** Charts *******/
	addTasksChart();


});