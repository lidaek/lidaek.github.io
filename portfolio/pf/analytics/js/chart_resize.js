$(document).ready(function() {
	var w = 2;
	var h = 1.3;
	var Wchart = 0;
	$('.eDetailView').click(function () {
		setTimeout(checkEvent, 100);
	});

	$(window).resize(function(){
		checkEvent();
	}).resize();

	function checkEvent(){
		var windowWidth = $(window).width();
		if(windowWidth < 768) {
			if(windowWidth <= 391){
				legend = 27;
			}else{
				legend = 0;
			}
			Wchart = windowWidth;
		}else{
			legend = 0;
			Wchart = $("#div_vis_smr_pvd_vie_chart").width();
		}
		var wcul = ((h*Wchart)/w)+legend;
		$("#div_vis_smr_pvd_vie_chart").height(wcul);
	}

});