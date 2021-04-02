"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonSelect = void 0;
const Draw_1 = __importDefault(require("ol/interaction/Draw"));
const GeometryType_1 = __importDefault(require("ol/geom/GeometryType"));
class PolygonSelect extends Draw_1.default {
    constructor(options) {
        super({ type: GeometryType_1.default.POLYGON });
        this.selectedFeatures = [];
        this.map = this.getMap();
        this.sourceVLayer = options.sourceVLayer;
        /**
         * drawend is one of the event revoked when
         * drawing is complete. check Ol API for more event hooks
         * https://openlayers.org/en/latest/apidoc/module-ol_interaction_Draw-Draw.html
         */
        this.drawing = this.on('drawend', this.drawit());
        /**
         * use of this keyword rebukes access
         * to all parent class methods
         */
        // this.setActive(false);
    }
    drawit() {
        return (event) => {
            /**
             * clear the past selected feature list
             *
             */
            if (this.selectedFeatures.length) {
                this.clearSelectedFeatures();
                this.selectedFeatures = [];
            }
            /**
             * event returns the features and the extent where it was drawn
             *
             */
            const extent = event.feature.getGeometry().getExtent();
            /**
             * now we compaire the two feature list with all features
             * drawn on map to all features that exists on drawn extent
             * here sourceVLayer is vector source of vector layer
             */
            this.sourceVLayer.forEachFeatureIntersectingExtent(extent, (e) => {
                /**
                 * setting a property which check for
                 */
                e.set('status', true);
                this.selectedFeatures.push(e);
            });
        };
    }
    clearSelectedFeatures() {
        this.sourceVLayer.forEachFeature((e) => {
            /**
             * setting a property which check for
             */
            e.set('status', false);
        });
    }
}
exports.PolygonSelect = PolygonSelect;
