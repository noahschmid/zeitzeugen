import { Speaker } from './speaker';

export class Marker {
    constructor(x, y, id, dim, speaker, filename) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.unlocked = false;
        this.code = "A2D";
        this.filename = filename;
        this.updatePosition(dim);
        this.speaker = speaker;
    }
    
    x: number;
    y: number;
    id: number;
    code: string;
    unlocked: boolean;
    filename: string;
    left: string;
    top: string;
    speaker: Speaker;

    updatePosition(dim) {
        this.left = (this.x*dim.width + dim.x - document.documentElement.clientHeight*0.03/2) + 'px';
        this.top = (this.y*dim.height + dim.y - document.documentElement.clientHeight*0.03) + 'px';
    }
}

export class LockedMarker extends Marker {
    constructor(id) {
        super(-1, -1, id, {}, {}, "");
        this.unlocked = false;
    }
}