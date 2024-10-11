//程序开始运行之前判断无障碍服务
if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    exit();
};
auto.waitFor();
console.show(); //开启日志（悬浮窗权限）
console.setPosition(0, 100);

threads.start(function () {  //开启子线程
    //监听音量键-，关闭所有脚本
    events.observeKey();
    events.onKeyDown("volume_down", function (event) {//音量+改为volume_up
        engines.stopAllAndToast();
    });

});


let sleepTime = 1500;
sleep(sleepTime);
app.launchApp("学习强国");
// console.setSize(sleepTime,2000)
sleep(sleepTime);

backToIndex();

enterInMine();

//找到学习积分
className("android.view.View").scrollable(true).findOne().children().forEach(child => {
    var target = child.findOne(className("android.widget.ImageView").desc("学习积分"));
    b = target.bounds();
    myClick(b);
    sleep(sleepTime);

});


className("android.widget.ListView").findOne().children().forEach(child => {
    var target = child.findOne(className("android.widget.TextView").text("去看看"));
    target.click();
});


function enterInMine() {
    b = id("comm_head_xuexi_mine").findOne().bounds();
    myClick(b);
    sleep(sleepTime);
}


function backToIndex() {
    //back to index page
    while (!id("comm_head_xuexi_mine").exists()) {
        back();
        sleep(sleepTime);
    }
}

function myClick(bound) {
    random = randomPosition(bound.top, bound.bottom, bound.left, bound.right);
    click(random[0], random[1]);
}

function randomPosition(top, bottom, left, right) {
    var randomX = random(left + 1, right - 1); // 生成[x1, x2)范围内的随机整数  
    var randomY = random(top + 1, bottom - 1); // 生成[y1, y2)范围内的随机整数  

    // 输出随机点  
    console.log("Random point in rectangle: (" + randomX + ", " + randomY + ")");
    return [randomX, randomY];
}


