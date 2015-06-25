/*global define */
define(['jquery', 'underscore', 'backbone', 'gmaps'], 				
	function($, _, Backbone, gmaps) {
	'use strict';

	// Map Model
	// ------------------
	var Map = Backbone.Model.extend({
		// This model contains all of the map settings used for searching datasets
		defaults: function(){
			
			return {
				map: null,
				
				//The options for the map using the Google Maps API MapOptions syntax
				mapOptions: 
					(gmaps)? 
						{   zoom: 3,
							minZoom: 3,
							maxZoom: 16,
						    center: new google.maps.LatLng(44, -103),
							disableDefaultUI: true,
						    zoomControl: true,
						    zoomControlOptions: {
							          style: google.maps.ZoomControlStyle.LARGE,
							          position: google.maps.ControlPosition.LEFT_CENTER
							        },
							panControl: false,
							scaleControl: true,
							streetViewControl: false,
							mapTypeControl: true,
							mapTypeControlOptions:{
									style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
									mapTypeIds: [google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
									position: google.maps.ControlPosition.LEFT_BOTTOM
							},
						    mapTypeId: google.maps.MapTypeId.TERRAIN,
						    styles: [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]
						} 
					: null,
				
				//Set to true to draw markers where tile counts are equal to 1. If set to false, a tile with the count "1" will be drawn instead.
				drawMarkers: false,
				
				//If this theme doesn't have an image in this location, Google maps will use their default marker image
				markerImage: "./js/themes/" + theme + "/img/map-marker.png",
				
				//Keep track of the geohash level used to draw tiles on this map
				tileGeohashLevel: 1,
				
				///****** MAP TILE OPTIONS **********//
				//The options for the tiles. Using Google Maps Web API
				tileOptions: {
				      strokeWeight: 0,
				      fillOpacity: 0.6
				},		
				
				//The options for the tiles when they are hovered on. Using Google Maps Web API
				tileOnHover: {
					opacity: 0.8,
					strokeColor: "#FFFF00",
					fillColor: "#FFFF66",
					strokeWeight: 1
				},			
				
				//The options for the tile text 
				tileLabelColorOnHover: '#333333',			
				tileLabelColor: '#FFFFFF',
				
				//The tile colors - there are 5 levels of color, with level1 representing tiles with a relatively LOW count of datasets and level5 representing tiles with the HIGHEST amount of datasets
				tileColors: {
					level1: "#15a2a9",
					level2: "#167f8a",
					level3: "#1c6e84",
					level4: "#1a435e",
					level5: "#660033"
				}
			}
		},
		
		isMaxZoom: function(map){
			var zoom = map.getZoom(),
				type = map.getMapTypeId();
			
			if(zoom >= this.get("mapOptions").maxZoom) return true;
			else return false;
		},
		
		/**
		 * This function will return the appropriate geohash level to use for mapping geohash tiles on the map at the specified zoom level.
		 */ 
		determineGeohashLevel: function(zoom){
			var geohashLevel;
			
			switch(zoom){
				case 0: // The whole world zoom level
					geohashLevel = 2;
					break;
				case 1:
					geohashLevel = 2;
					break;
				case 2:
					geohashLevel = 2;
					break;
				case 3:
					geohashLevel = 2;
					break;
				case 4:
					geohashLevel = 2;
					break;
				case 5:
					geohashLevel = 3;
					break;
				case 6:
					geohashLevel = 3;
					break;
				case 7:
					geohashLevel = 4;
					break;
				case 8:
					geohashLevel = 4;
					break;
				case 9:
					geohashLevel = 4;
					break;
				case 10:
					geohashLevel = 5;
					break;
				case 11:
					geohashLevel = 5;
					break;
				case 12:
					geohashLevel = 6;
					break;
				case 13:
					geohashLevel = 6;
					break;
				case 14:
					geohashLevel = 7;
					break;
				case 15:
					geohashLevel = 7;
					break;
				case 16:
					geohashLevel = 7;
					break;
				case 17:
					geohashLevel = 8;
					break;
				case 18:
					geohashLevel = 9;
					break;
				case 19:
					geohashLevel = 9;
					break;
				case 20:
					geohashLevel = 9;
					break;
				default:  //Anything over (Gmaps goes up to 19)
					geohashLevel = 9;
			}
			
			return geohashLevel;
		},
		
		getSearchPrecision: function(zoom){
			if(zoom <= 5) return 2;
			else if(zoom <= 7) return 3;
			else if (zoom <= 8) return 4;
			else if (zoom <= 12) return 5;
			else if (zoom <= 16) return 6;
			else return 7;
		},
		
		clear: function() {
		    return this.set(_.clone(this.defaults()));
		  }
		
	});
	return Map;
});
