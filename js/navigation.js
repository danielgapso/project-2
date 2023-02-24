$(document).ready(function() {
  const homeBtn = $("#homeBtn");
  const liveChartsBtn = $("#liveChartsBtn");
  const aboutBtn = $("#aboutBtn");
  
  const container = $("#container");
  const liveChartsSection = $("#liveCharts");
  const aboutSection = $("#about");
  
  homeBtn.on("click", function() {
  container.show();
  liveChartsSection.hide();
  aboutSection.hide();
  });
  
  liveChartsBtn.on("click", function() {
  container.hide();
  liveChartsSection.show();
  aboutSection.hide();
  });
  
  aboutBtn.on("click", function() {
  container.hide();
  liveChartsSection.hide();
  aboutSection.show();
  });
  });