'use strict';

/**
 * @ngdoc directive
 * @name easyHeatApp.directive:tempControl
 * @description
 * # tempControl
 */
angular.module('easyHeatApp')
  .directive('tempControl', function () {
    return {
      //template: '<div></div>',
      scope: {"days":'='},
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        //The data for our line

        scope.$watch('days', function() {
          var container = d3.select(element[0]).append('svg')
            .attr("height", 200)
            .attr("width", '100%');

          var width = element[0].clientWidth - 50;


          var data = scope.days[1].hours;


          var scaleX = d3.scale.linear().range([0, width]).domain([0, 23]);
          var scaleY = d3.scale.linear().range([200, 0]).domain([15, 27]);

          //   var render = function () {


          //This is the accessor function we talked about above
          var lineFunction = d3.svg.line()
            .x(function (d, i) {
              return scaleX(d.index);
            })
            .y(function (d) {
              return scaleY(d.temperature);
            })


          //The line SVG Path we draw
          var lineGraph = container.append("path")
            .attr("d", lineFunction(data))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "none")
            .attr("class", "line")


          var dotsData = container.selectAll("dots")
            .data(data)


          var dots = dotsData.enter()
            .append("circle")
            .attr("cx", function (d, i) {
              return scaleX(d.index);
            })
            .attr("cy", (function (d) {
              return scaleY(d.temperature);
            }))
            .attr("r", 2)
            .attr("class", "circle")

          var xAxis = d3.svg.axis().scale(scaleX)
            .orient("bottom").ticks(20);

          var yAxis = d3.svg.axis().scale(scaleY)
            .orient("right").ticks(5);
          //        dotsData.exit().remove();

          container.append("g")
            .attr("class", "y axis")
            .call(yAxis);

          container.append("g")
            .attr("class", "x axis")
            .call(xAxis);


          // }

          //    render();

          container.on("mousedown", function (e) {

            var x = Math.round(scaleX.invert(d3.mouse(this)[0]));
            var y = Math.round(scaleY.invert(d3.mouse(this)[1]));
            console.log("Clicked " + x + ", " + y)
            data[x].temperature = y;
            //render();
            //var dotsData = container.selectAll("dots")
            //  .data(data).enter()
            container.select(".line")   // change the line
              // .duration(750)
              .attr("d", lineFunction(data));

            container.selectAll(".circle")   // change the line
              // .duration(750)
              .data(data)
              // //.enter()
              //  .append("circle")
              .attr("cx", function (d, i) {
                return scaleX(d.index);
              })
              .attr("cy", (function (d) {
                return scaleY(d.temperature);
              }))

          });
        });

      }
    };
  });
