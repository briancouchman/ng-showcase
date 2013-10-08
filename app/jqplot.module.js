define(['../bower_components/jqplot/jquery.jqplot'],
  function () {
    require([
        '../bower_components/jqplot/plugins/jqplot.barRenderer'
      , '../bower_components/jqplot/plugins/jqplot.logAxisRenderer'
      , '../bower_components/jqplot/plugins/jqplot.categoryAxisRenderer'
      , '../bower_components/jqplot/plugins/jqplot.canvasAxisTickRenderer'
      , '../bower_components/jqplot/plugins/jqplot.canvasTextRenderer'
      , '../bower_components/jqplot/plugins/jqplot.pointLabels'
      , '../bower_components/jqplot/plugins/jqplot.enhancedLegendRenderer'
    ], 
    function (){
      return $.jqplot;
      }
    );
  }
);