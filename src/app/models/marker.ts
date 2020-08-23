import { Speaker } from './speaker';

export class Marker {
    constructor(x, y, id, speaker, filename) {
        this.x = x;
        this.y = y;
        this.left = (this.x - document.documentElement.clientHeight*0.03/2) + "px";
        this.top = (this.y - document.documentElement.clientHeight*0.03)+ "px";
        this.id = id;
        this.unlocked = false;
        this.code = "A2D";
        this.filename = filename;
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
    
    prettyPrint() : String {
        let tmp = Object.assign({}, this as any);
        tmp = tmp
        delete(tmp.left);
        delete(tmp.top);
        delete(tmp.code);
        delete(tmp.unlocked);
        tmp.number = tmp.id + 1;
        delete(tmp.id);
        return JSON.stringify(tmp);
    }

    setBounds(bounds) {
        this.left = (this.x*bounds.width - document.documentElement.clientHeight*0.03/2) + "px";
        this.top = (this.y*bounds.height - document.documentElement.clientHeight*0.09)+ "px";
    }
}

export class LockedMarker extends Marker {
    constructor(id) {
        super(-1, -1, id, {}, "");
        this.unlocked = false;
    }
}