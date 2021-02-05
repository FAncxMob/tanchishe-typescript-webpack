import Snake from './Snake'
import Food from './Food'
import ScorePanel from './ScorePanel'

class GameControl{
    snake:Snake
    food:Food
    scorePanel:ScorePanel
    direction:string = 'Right'

    isLive:boolean = true

    constructor(){
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(20,1)
        this.init()
    }

    init(){
        document.addEventListener('keydown',this.handleKeydown.bind(this))
        this.run()
    }

    handleKeydown(event:KeyboardEvent){
        const arr = ['ArrowUp',,'ArrowDown','ArrowLeft','ArrowRight','Up','Down','Left','Right']
        if(arr.includes(event.key)) this.direction = event.key
        
    }

    run(){
        let {X,Y} = this.snake

        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y-=10
                break;
            case 'ArrowDown':
            case 'Down':
                Y+=10
                break;
            case 'ArrowLeft':
            case 'Left':
                X-=10
                break;
            case 'ArrowRight':
            case 'Right':
                X+=10
                break;
            default:
                break;
        }

        this.checkEat(X,Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            alert(e.message)
            this.isLive = false
        }

        this.isLive&&setTimeout(()=>{
            this.run()
        },300 - (this.scorePanel.level-1)*30) 
    }

    checkEat(X:number,Y:number){
        if(X=== this.food.X && Y === this.food.Y){
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
        
    }
}

export default GameControl