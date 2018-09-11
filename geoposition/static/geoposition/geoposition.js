if (jQuery != undefined) {
    var django = {
        'jQuery': jQuery,
    }
}


(function($) {

    $(document).ready(function() {

        try {
            var _ = geobcn;
        } catch (ReferenceError) {
            console.log('geoposition: "geobcn" not defined.  You might not be connected to the internet.');
            return;
        }

        var mapDefaults = {
            "controls": true,
            "proj": 'EPSG:4326',
            "zoom": 3,
            "scrollwheel": true,
        };


        $('.geoposition-widget').each(function() {
            var $container = $(this),
                idMap = 'contact-map',
                $mapContainer = $('<div class="geoposition-map" id="' + idMap + '" >'),
                $addressRow = $('<div class="geoposition-address" />'),
                $searchRow = $('<div class="geoposition-search" />'),
                $latitudeField = $container.find('input.geoposition:eq(0)'),
                $longitudeField = $container.find('input.geoposition:eq(1)'),
                latitude = parseFloat($latitudeField.val()) || null,
                longitude = parseFloat($longitudeField.val()) || null,
                map,
                mapLatLng,
                mapOptions;

            $mapContainer.css('height', $container.attr('data-map-widget-height') + 'px');

            $container.append($searchRow, $mapContainer, $addressRow);

            mapLatLng = bcnPlanol.maps.LatLng(latitude, longitude);

            function setGuideDetailPlanolBCNPoints() {
                var feature = {
                  'id': idMap,
                  'latLng': mapLatLng,
                  // 'html': html.replace(/["']/g, "\'").toString("utf8"),
                  'proj': 'EPSG:4326'
                };
                bcnPlanol.maps.addPoint(feature);
            }

            mapOptions = $.extend({}, mapDefaults, {"center": mapLatLng, "callback": setGuideDetailPlanolBCNPoints});

            function init_bcn_map() {
                if ($('#contact-map').length > 0 && typeof bcnPlanol.maps !== 'undefined') {
                    map = new bcnPlanol.maps.Map(idMap, mapOptions);
                }
            }

            if (typeof geobcn !== "undefined") {
                geobcn.apiManager('Wm6AyzelmDfIIm6K3LbnoiuzIMxwiB', 'v2', init_bcn_map);
            }

            $latitudeField.add($longitudeField).bind('change', function(e) {
                var latitude = parseFloat($latitudeField.val()) || 0;
                var longitude = parseFloat($longitudeField.val()) || 0;
                init_bcn_map();
            });
        });
    });
})(django.jQuery);
