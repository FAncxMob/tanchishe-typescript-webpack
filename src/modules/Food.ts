class Food{
    element:HTMLElement;

    constructor(){
        this.element = document.getElementById('food')!
    }
 
    // 获取食物的坐标 
    get X(){
        return this.element.offsetLeft
    }

    get Y(){
        return this.element.offsetTop
    }

    // 修改食物位置
    change(){
        // 区间[0~290],10的倍数
        this.element.style.left = Math.round(Math.random()*29)*10+'px'
        this.element.style.top = Math.round(Math.random()*29)*10+'px'
    }
}

export default Food;