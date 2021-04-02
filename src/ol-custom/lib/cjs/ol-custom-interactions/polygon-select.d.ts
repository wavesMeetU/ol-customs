import Draw from 'ol/interaction/Draw';
import { Vector } from 'ol/source';
export declare class PolygonSelect extends Draw {
    map: any;
    drawing: any;
    selectedFeatures: any;
    sourceVLayer: Vector;
    constructor(options: any);
    drawit(): (event: any) => void;
    clearSelectedFeatures(): void;
}
