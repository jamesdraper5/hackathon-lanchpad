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
		/*
		day1Count = 0,
		day2Count = 0,
		day3Count = 0,
		day4Count = 0,
		day5Count = 0,
		day6Count = 0,
		day7Count = 0,
		*/
		today = moment();

	data.forEach(function(commit) {
		//console.log('date', commit.created_at);

		var commitTime = moment(commit.created_at);
		var dayCommitted = today.diff(commitTime, 'days');
		commitDays[dayCommitted].days += 1;

		//console.log('foo', foo);

	});

	commitData = _.pluck(commitDays, 'days');

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
            text: 'Your Commits this Week',
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
	/*
	var tasksUrl = 'data/tasksCreatedAndCompleted.json';
	$.getJSON(tasksUrl,
		function() {
			console.log('222');
		}
	);

	$.ajax({
	  dataType: "json",
	  url: tasksUrl,
	  data: {
	  	test: 'e'
	  },
	  success: function() {
			console.log('222');
		}
	});


	.done(function( data ) {
		console.log( "second success" );
	});

	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	  $.getJSON( flickerAPI, {
	    tags: "mount rainier",
	    tagmode: "any",
	    format: "json"
	  })
	    .done(function( data ) {
	      console.log('data', data);
	    });

    */

	/*
	.fail(function(e) {
		console.log( "error", e );
		//addTasksChart(data)
	})
	.always(function() {
		console.log( "complete" );
	});
	*/


	$.ajax({
	  method: "GET",
	  url: 'https://api.github.com/users/jamesdraper5/events',
	  beforeSend: function (xhr) {
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