define(["jquery"],function($) {

	var mathObj = {

		/***********************************************************************/
		/*/
		/*************** TRIGONOMETRY /
		/*/
		/***********************************************************************/
		DEG_2_RAD: Math.PI / 180,
		RAD_2_DEG: 180 / Math.PI,

		getPositionOnCircle: function(radius, angle){
			var xp = Math.sin(angle) * radius;
			var yp = Math.cos(angle) * radius;
			return {x:xp, y:yp};
		},

		getShortestRotation: function(currentAngle, targetAngle){
			return Math.atan2(Math.sin(targetAngle - currentAngle), Math.cos(targetAngle - currentAngle));
		},

		getAngleFromPoint: function(currentPoint, originPoint){
			return Math.atan2((currentPoint.y-originPoint.y),(currentPoint.x - originPoint.x));
		},

		/***********************************************************************/
		/*/
		/*************** DISTANCE /
		/*/
		/***********************************************************************/
		getDistance: function(valueA, valueB){
			return (valueB - valueA);
		},

		getAbsDistance: function(valueA, valueB){
			return Math.abs(valueB - valueA);
		},

		getPointDistance: function(pointA, pointB){
			var xs = 0;
			var ys = 0;

			xs = getDistance(pointB.x, pointA.x);
			ys = getDistance(pointB.y, pointA.y);
			 
			return Math.sqrt((xs * xs) + (ys * ys));
		},

		/***********************************************************************/
		/*/
		/*************** DIVERS /
		/*/
		/***********************************************************************/
		clampValue: function(value, min, max){
			return Math.max(min, Math.min(value, max));
		},

		simpleEasing: function(target, current, easing){
			return (target - current) * easing;
		},

		valueToPercentage: function(value, total){
			return (value / total);
		},

		percentageToValue: function(percentage, total){
			return (percentage * total);
		}
	};

    return mathObj;

});