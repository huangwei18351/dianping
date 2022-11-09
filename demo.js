//程序开始运行之前判断无障碍服务
if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    exit();
};

auto.waitFor();
console.show(); //开启日志（悬浮窗权限）
console.setPosition(0, 100);

let sleepTime = 1500;
sleep(sleepTime);
app.launchApp("大众点评");
// console.setSize(sleepTime,2000)
sleep(sleepTime);


toast("open dianping");
sleep(sleepTime);
//back to index page
while(!id("city_arrow").exists()){
	back();
	sleep(sleepTime);
}
// if(text("国内(含港澳台)").findOnce()){
// 	back();
// 	sleep(sleepTime);
// }
//判断city 是不是上海
let b ;
var isShanghai = text("上海").findOnce();
if(isShanghai == null){
	if(id("city_arrow").exists()){
		console.log("click city_arrow");
		b = id("city_arrow").findOne().bounds();
		click(b.centerX(), b.centerY());
		sleep(sleepTime);
	}
	var arr = className("android.widget.TextView").text("上海").find();
	if(arr.empty()){
		toast("not found");
		sleep(sleepTime);
	}else{
		let i = 1;
		arr.forEach(function(a){
			let isClick = a.click();
			if(isClick){
				toast("上海" + i + "被点击了");
			}
			i++;
			sleep(sleepTime);
		});
	}
	console.log(b);

	// click(b.centerX(), b.centerY());
	console.log("choose city shanghai");
}
console.log("in shanghai");
//进入免费试
var freeTry ;
id("main_listview").findOne().children().forEach(child => {
	freeTry = className("android.widget.ImageButton").desc("免费试瓷片位（10.32.0以上Picasso）-活动后恢复").findOne();
});
freeTry.click();
toast("进入免费试");
sleep(sleepTime);


var categories = className("android.widget.TextView").text("全部分类").findOne().parent();
b = categories.bounds();
click(b.centerX(), b.centerY());
sleep(sleepTime);

var food = className("android.widget.TextView").text("美食").findOne().parent();
b = food.bounds();
// console.log(device.width - 100);
click(device.width - 100, b.centerY());
toast("点击美食");
sleep(sleepTime);

//筛选
var selectBtn = className("android.widget.TextView").text("筛选").findOne().parent();
b = selectBtn.bounds();
click(b.centerX(), b.centerY());
sleep(sleepTime);

var notApply = className("android.widget.TextView").text("只看未抢").findOne().parent();
b = notApply.bounds();
click(device.width - 100, b.centerY());
toast("点击只看未抢");
sleep(sleepTime);

let num = 1;
//翻页，每次翻5个
let slideHight = 348 * 5;
let swipeBtY = 2046;
let swipeBtX = device.width - 200;
let swipeToY = swipeBtY - slideHight;



var categories = className("android.widget.TextView").text("全部分类").findOne().parent();
b = categories.bounds();
click(b.centerX(), b.centerY());
sleep(sleepTime);

var food = className("android.widget.TextView").text("美食").findOne().parent();
b = food.bounds();
// console.log(device.width - 100);
click(device.width - 100, b.centerY());
toast("点击美食");
sleep(sleepTime);

//筛选
var selectBtn = className("android.widget.TextView").text("筛选").findOne().parent();
b = selectBtn.bounds();
click(b.centerX(), b.centerY());
sleep(sleepTime);

var notApply = className("android.widget.TextView").text("只看未抢").findOne().parent();
b = notApply.bounds();
click(device.width - 100, b.centerY());
toast("点击只看未抢");
sleep(sleepTime);

// do{
// //点击免费抽

	var list = className("android.support.v7.widget.RecyclerView").scrollable(true).depth(13).findOne().children();
	for(var i = 0; i < list.size() - 1; i++){
		var child = list.get(i);
		//找到那一栏，说明是上面的，需要跳过
		if(child.findOne(text("美食")) != null){
			continue;
		}
		var target = child.findOne(text("免费抽"));
		let bound = target.bounds();
		// console.log(bound.centerX(), bound.centerY());
		click(device.width - 200, bound.centerY());
		sleep(sleepTime);

		do {
			back();
			sleep(sleepTime);
		}while(className("android.widget.TextView").text("免费抽").findOnce() == null);
	}
// }while(className("android.widget.TextView").text("当前无更多活动，请耐心等待~").findOnce() == null);

function backToFree(){
	do {
		back();
		sleep(sleepTime);
	}while(className("android.widget.TextView").text("免费抽").findOnce() == null);
}
