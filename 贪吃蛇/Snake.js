// 自调用函数----->小蛇的
((function() {

    // 创建一个数组存储小蛇对象
    var elements = [];

    // 小蛇的构造函数
    function Snake(width, height, direction) {
        // 小蛇每个部分的宽和高
        this.width = width || 20;
        this.height = height || 20;
        // 小蛇身体
        this.body = [{
                x: 3,
                y: 2,
                color: "red"
            }, //头
            {
                x: 2,
                y: 2,
                color: "orange"
            }, //身体
            {
                x: 1,
                y: 2,
                color: "orange"
            }, //身体
        ];
        // 小蛇的方向
        this.direction = direction || "right";
    }

    // 在原型中添加方法 初始化小蛇在地图上显示出来
    Snake.prototype.init = function(map) {
        // 先删除小蛇
        remove();
        // 创建小蛇身体的每个部分
        // 循环遍历小蛇的身体
        for (var i = 0; i < this.body.length; i++) {
            var bd = this.body[i];
            // 创建div对象
            var div = document.createElement("div");
            // 把div添加到map中
            map.appendChild(div);
            // 脱离文档流
            div.style.position = "absolute";
            // 初始化小蛇的宽和高
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            // 初始化小蛇的颜色
            div.style.backgroundColor = bd.color;
            // 小蛇的横纵坐标
            div.style.left = bd.x * this.width + "px";
            div.style.top = bd.y * this.height + "px";
            // 把小蛇存放到elements中
            elements.push(div);
        }
    };

    // 在原型中添加方法------>小蛇移动
    Snake.prototype.move = function(food, map) {
        // 移动小蛇的身体  每次移动实际就是把 前一个身体的横纵坐标 给 后一个身体的横纵坐标
        // 倒序遍历小蛇的身体  没有头
        var i = this.body.length - 1;
        for (; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        // 判断小蛇移动的方向  头
        switch (this.direction) {
            case "right":
                this.body[0].x += 1; //右边走每次x加一
                break;
            case "left":
                this.body[0].x -= 1; //左边走每次x减一
                break;
            case "top":
                this.body[0].y -= 1; //上边走每次y减一
                break;
            case "bottom":
                this.body[0].y += 1; //下边走每次x加一
                break;
            default:
                break;
        }

        // 判断小蛇是否吃到食物    小蛇头部的横纵坐标 == 食物的横纵坐标 代表吃到食物
        var headX = this.body[0].x * this.width; //横坐标
        var headY = this.body[0].y * this.height; //纵坐标
        console.log(food.x);
        // 判断
        if (headX == food.x && headY == food.y) { //吃到食物
            // 让小蛇的身体加一个  把小蛇的最后一个元素复制一份加到最后面
            var last = this.body[this.body.length - 1];
            this.body.push({
                x: last.x,
                y: last.y,
                color: last.color,
            });
            // 删除食物并初始化 因为食物的初始化方法里面调用了删除食物的私有函数 所以直接初始化就可以了
            food.init(map);
        }

    };

    // 私有方法 删除小蛇
    function remove() {
        // 从小蛇的后面向前面删除
        var i = elements.length - 1;
        for (; i >= 0; i--) {
            var eles = elements[i]; //从存储小蛇的数组中找到要删除的元素
            eles.parentNode.removeChild(eles); //找到当前元素的父元素然后删除当前元素
            elements.splice(i, 1);
        }
    }

    // 把Snake暴露给window
    window.Snake = Snake;

}()));