define(["jquery","sylvester"],function($) {

	var animationObj = {

		DEG_2_RAD: Math.PI / 180,

		getRotationXMatrix: function(rotateX){
			return $M([[1, 0, 0, 0], [0, Math.cos(rotateX * this.DEG_2_RAD), Math.sin(-rotateX * this.DEG_2_RAD), 0], [0, Math.sin(rotateX * this.DEG_2_RAD), Math.cos(rotateX * this.DEG_2_RAD), 0], [0, 0, 0, 1]]);
		},

		getRotationYMatrix: function(rotateY){
			return $M([[Math.cos(rotateY * this.DEG_2_RAD), 0, Math.sin(rotateY * this.DEG_2_RAD), 0], [0, 1, 0, 0], [Math.sin(-rotateY * this.DEG_2_RAD), 0, Math.cos(rotateY * this.DEG_2_RAD), 0], [0, 0, 0, 1]]);
		},

		getRotationZMatrix: function(rotateZ){
			return $M([[Math.cos(rotateZ * this.DEG_2_RAD), Math.sin(-rotateZ * this.DEG_2_RAD), 0, 0], [Math.sin(rotateZ * this.DEG_2_RAD), Math.cos(rotateZ * this.DEG_2_RAD), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
		},

		getScaleMatrix: function(scaleX, scaleY, scaleZ){
			var _scaleX = scaleX? scaleX:1;
			var _scaleY = scaleY? scaleY:1;
			var _scaleZ = scaleZ? scaleZ:1;
			return $M([[_scaleX, 0, 0, 0], [0, _scaleY, 0, 0], [0, 0, _scaleZ, 0], [0, 0, 0, 1]]);
		},

		getTransformationMatrix: function(translationX,translationY,translationZ){
			var _translationX = translationX? translationX:0;
			var _translationY = translationY? translationY:0;
			var _translationZ = translationZ? translationZ:0;
			return $M([[1,0,0,0],[0,1,0,0],[0,0,1,0],[_translationX,_translationY,_translationZ,1]]);
		},

		getResultMatrix: function(listMatix){
			if(listMatix.length === 1){
				return listMatix[0];
			}else{
				var resultMatrix = $M([[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]);
				for (var i = 0; i < listMatix.length; i++) {
					var nextMatrix = listMatix[i];
					resultMatrix = nextMatrix.x(resultMatrix);
				}
				return resultMatrix;
			}
		},

		getStringTransform3d: function(transformationMatrix){
			var stringTransform = "matrix3d(";
			stringTransform += transformationMatrix.e(1, 1).toFixed(10) + "," + transformationMatrix.e(1, 2).toFixed(10) + "," + transformationMatrix.e(1, 3) + "," + transformationMatrix.e(1, 4).toFixed(10) + ",";
			stringTransform += transformationMatrix.e(2, 1).toFixed(10) + "," + transformationMatrix.e(2, 2).toFixed(10) + "," + transformationMatrix.e(2, 3) + "," + transformationMatrix.e(2, 4).toFixed(10) + ",";
			stringTransform += transformationMatrix.e(3, 1).toFixed(10) + "," + transformationMatrix.e(3, 2).toFixed(10) + "," + transformationMatrix.e(3, 3) + "," + transformationMatrix.e(3, 4).toFixed(10) + ",";
			stringTransform += transformationMatrix.e(4, 1).toFixed(10) + "," + transformationMatrix.e(4, 2).toFixed(10) + "," + transformationMatrix.e(4, 3) + "," + transformationMatrix.e(4, 4).toFixed(10);
			stringTransform += ")";
			return stringTransform;
		}
	};

    return animationObj;

});