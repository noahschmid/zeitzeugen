export class Marker {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.unlocked = false;
        this.code = "A2D";
        this.filename = "interview_pius.mp3";
    }
    
    x: number;
    y: number;
    id: number;
    code: string;
    unlocked: boolean;
    filename: string;
}