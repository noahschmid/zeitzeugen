export class Marker {
    constructor(x, y, id, dim) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.unlocked = false;
        this.code = "A2D";
        this.filename = "interview_pius.mp3";
        this.updatePosition(dim);
    }
    
    x: number;
    y: number;
    id: number;
    code: string;
    unlocked: boolean;
    filename: string;
    left: string;
    top: string;

    updatePosition(dim) {
        this.left = (this.x*dim.width + dim.x - document.documentElement.clientHeight*0.05/2) + 'px';
        this.top = (this.y*dim.height + dim.y - document.documentElement.clientHeight*0.05) + 'px';
    }
}