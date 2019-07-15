   // 自调用函数--------->游戏的
   ((function() {

       var that = null;

       // 游戏的构造函数
       function Game(map) {
           this.food = new Food(); //食物对象
           this.snake = new Snake(); //小蛇对象
           this.map = map; //地图
           that = this //把当前对象保存到that中
       }

       // 添加原型对象方法 初始化游戏
       Game.prototype.init = function() {
           this.food.init(this.map); //初始化食物
           this.snake.init(this.map); //初始化小蛇
           this.snake.move(this.food, this.map); //小蛇移动
           // 调用小蛇自动移动方法
           this.runSnake(this.food, this.map);
           // 调用小蛇移动的方向
           this.bindKey();
       };

       // 在原型对象中添加方法 小蛇自动跑起来
       Game.prototype.runSnake = function(food, map) {

           var timeId = setInterval(function() {
               // 注意定时器中的this是window 不是Game的实例对象
               this.snake.move(food, map); //每隔一段时间移动小蛇  先移动
               this.snake.init(map); //每隔一段时间时间生成一个小蛇

               // 小蛇移动的最大值
               var maxX = map.offsetWidth / this.snake.width; //横向移动最大值
               var maxY = map.offsetHeight / this.snake.height; //纵向移动最大值
               // 实时获取小蛇头部的横纵坐标
               var headX = this.snake.body[0].x; //小蛇头部的横坐标
               var headY = this.snake.body[0].y; //小蛇头部的纵坐标
               // console.log(maxX + "=====" + headX);
               // 判断小蛇是否到达边界
               if (headX < 0 || headX >= maxX) { //撞墙了
                   console.log(headX);
                   // 清理定时器
                   clearInterval(timeId);
                   alert("Game Over");
               }
               if (headY < 0 || headY >= maxY) { //撞墙了
                   // 清理定时器
                   clearInterval(timeId);
                   alert("Game Over");
               }
           }.bind(that), 70);



       };

       //在原型中添加方法   小蛇移动的方向
       Game.prototype.bindKey = function() {

           // 为document绑定多个方法
           document.addEventListener("keydown", function(e) {
               // 此时的this是触发keydown的对象  所以当前的this是document 所以通过bink改变当前this的值  改变为Game的实例对象
               switch (e.keyCode) {
                   case 37:
                       this.snake.direction = "left";
                       break;
                   case 38:
                       this.snake.direction = "top";
                       break;
                   case 39:
                       this.snake.direction = "right";
                       break;
                   case 40:
                       this.snake.direction = "bottom";
                       break;

                   default:
                       break;
               }
           }.bind(that), false)
       };

       // 把Game暴露给window
       window.Game = Game;

   })());