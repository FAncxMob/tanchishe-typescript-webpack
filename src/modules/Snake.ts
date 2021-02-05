class Snake{
    head:HTMLElement;
    bodies:HTMLCollection;
    element:HTMLElement

    constructor(){
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    get X(){
        return this.head.offsetLeft
    }
    get Y(){
        return this.head.offsetTop
    }
    set X(value){
        if(this.X === value) return
        
        // 撞墙
        if(value<0 || value >290) throw new Error('蛇撞墙了') 

        // 掉头
        if((this.bodies[1] as HTMLElement)?.offsetLeft === value) {
            if(value > this.X) value = this.X - 10
            else value = this.X + 10
        }
        this.moveBody() // 移动身体
        this.head.style.left = value+'px' // 移动头
        this.checkHeadBody()
    }
    set Y(value){
        if(this.Y === value) return

        // 撞墙
        if(value<0 || value >290) throw new Error('蛇撞墙了') 

        // 掉头
        if((this.bodies[1] as HTMLElement)?.offsetTop === value) {
            if(value > this.Y) value = this.Y - 10
            else value = this.Y + 10
        }
        this.moveBody()
        this.head.style.top = value+'px'
        this.checkHeadBody()
    }

    addBody(){
        const body = document.createElement('div')
        this.element.insertAdjacentElement('beforeend',body)
    }

    moveBody(){
        // 将后边身体的位置设置为前边身体的位置
        for (let i = this.bodies.length-1; i > 0; i--) {
           let lastX = (this.bodies[i-1] as HTMLElement).offsetLeft;
           let lastY = (this.bodies[i-1] as HTMLElement).offsetTop;
 
           (this.bodies[i] as HTMLElement).style.left = lastX + 'px';
           (this.bodies[i] as HTMLElement).style.top = lastY + 'px';
        }
    }

    checkHeadBody(){
        for (let i = 1; i < this.bodies.length; i++) {
            let bd = this.bodies[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) throw new Error('蛇到自己了')
        }
    }
 
}

export default Snake;