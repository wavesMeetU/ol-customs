import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { PolygonSelect } from './ol-custom/lib/esm';
var vectorSource = new VectorSource({
  url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson',
  format: new GeoJSON(),
});
vectorSource.forEachFeature((feature: Feature) => {
  feature.set('status', false);
});
const styles2: any = [
  new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({ color: '#666666' }),
      stroke: new Stroke({ color: '#bada55', width: 1 }),
    }),
  }),
];
const styles: any = [
  new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({ color: '#666666' }),
      stroke: new Stroke({ color: '#bada55', width: 1 }),
    }),
  }),
];

var map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
    constrainRotation: 16,
  }),
});

map.addLayer(
  new VectorLayer({
    style: (feature: any) => {
      return feature.get('status') ? styles : styles2;
    },
    source: vectorSource,
  }),
);
map.addInteraction(new PolygonSelect({ sourceVLayer: vectorSource }));
