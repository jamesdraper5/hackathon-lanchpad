function openDeskTicket(e) {
	var $target = $(e.target);
	var ticketNum = $target.closest('tr.table-row').attr('data-ticketId');
	var ticketUrl = "https://digitalcrew.teamwork.com/desk/#tickets/" + ticketNum;

	window.open(ticketUrl, '_blank');
	e.preventDefault();
}

$(document).ready(function(){

	/******** API calls *********/



	/******** Event Handlers *******/
	$('#sectionTicketList').find('tr.table-row').on('click', openDeskTicket);

});