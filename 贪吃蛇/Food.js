    // 自调用函数 ----->食物的
    ((function() {
        var element = []; //用来存储每个食物对象的

        //    食物对象------->有宽和高 颜色 横纵坐标------->构造函数
        function Food(width, height, color, x, y) {
            // 宽和高
            this.width = width || 20;
            this.height = height || 20;
            // 横纵坐标
            this.x = x || 0;
            this.y = y || 0;
            // 颜色
            this.color = color || "green";
        }

        // 在原型中添加方法------在地图上显示出食物
        // 因为是在地图上显示食物 所以需要地图对象 ----->其实就是外面的div
        Food.prototype.init = function(map) {

            // 方法执行之前先调用私有函数删除一个食物然后在创建
            remove();

            // 创建食物div元素对象
            var div = document.createElement("div");
            // 初始化宽和高
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            // 初始化颜色
            div.style.backgroundColor = this.color;
            // 先让食物脱离文档流
            div.style.position = "absolute";
            // 再随机获取横纵坐标 最小值 = 0     最大值 = 地图的宽度 / 食物的宽度 * 食物的宽度
            this.x = parseInt(Math.random() * (map.offsetWidth / this.width)) * this.width;
            this.y = parseInt(Math.random() * (map.offsetHeight / this.height)) * this.height;
            div.style.left = this.x + "px";
            div.style.top = this.y + "px";
            // 把食物添加到地图中
            map.appendChild(div);
            // 把食物最加到element数组中
            element.push(div);
        };

        // 创建一个私有函数，用来删除食物的
        function remove() {
            // 循环遍历数组 找到所有的食物
            for (var i = 0; i < element.length; i++) {
                var ele = element[i];
                // 找到食物的父级元素 然后删除自己
                ele.parentNode.removeChild(ele);
                // 元素删除了 数组中的元素也没有用了 所以删除数组中的元素
                element.splice(i, 1);
            }
        }

        // 把Food暴露给window 使它在外部也可以使用 ----->变成全局对象
        window.Food = Food;

    }()));