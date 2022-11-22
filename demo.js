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
	freeTry = className("android.widget.ImageButton").descContains("免费试").findOne();
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
do{
//点击免费抽

	var list = className("android.support.v7.widget.RecyclerView").scrollable(true).depth(13).findOne().children();
	console.log(list.size());
	for(var i = 0; i < list.size() - 1; i++){
		var child = list.get(i);
		//找到那一栏，说明是上面的，需要跳过
		if(child.findOne(text("美食")) != null){
			continue;
		}
		console.log("apply for the " + (num++) + " free of charge meal.");
		var target = child.findOne(text("免费抽"));
		if(target != null){
			let bound = target.bounds();
			click(device.width - 200, bound.centerY());
			sleep(sleepTime);
			applyFood();
		}
	}
	swipe(swipeBtX, swipeBtY, swipeBtX, swipeToY, 3*sleepTime);
	sleep(sleepTime);
}while(className("android.widget.TextView").text("当前无更多活动，请耐心等待~").findOnce() == null);

function backToFree(){
	do {
		back();
		sleep(sleepTime);
	}while(className("android.widget.TextView").text("免费抽").findOnce() == null);
}

function applyFood(){
	var apply = text("我要报名").findOnce();
	if(apply == null){
		backToFree();
		return;
	}
	let bound = apply.bounds();
	click(device.width - 200, bound.centerY());
	sleep(sleepTime);
	var confirmApply = text("确认报名").findOnce();
	if(confirmApply == null){
		backToFree();
		return ;
	}

	var chooseStore = textContains("请选择").findOnce();
	if(chooseStore != null){
		bound = chooseStore.bounds();
		click(device.width - 200, bound.centerY());
		// console.log("点击请选择店");
		sleep(sleepTime);

		var store = className("android.widget.TextView").textContains("距您").findOnce();
		if(store != null){
			bound = store.bounds();
			click(1000, bound.centerY());
			sleep(sleepTime);
		}
	}

	chooseStore = textContains("请选择").findOnce();
	if(chooseStore != null){
		bound = chooseStore.bounds();
		click(device.width - 200, bound.centerY());
		// console.log("点击请选择分店");
		sleep(sleepTime);

		var store = className("android.widget.TextView").textContains("距您").findOnce();
		if(store != null){
			bound = store.bounds();
			click(1000, bound.centerY());
			sleep(sleepTime);
		}
	}
	var unJoin = text("未参加").findOnce();
	if(unJoin != null){
		bound = unJoin.bounds();
		click(1000, bound.centerY());
		// console.log("点击未参加");
		sleep(sleepTime);
	}

	bound = confirmApply.bounds();
	click(1000, bound.centerY());
	sleep(sleepTime);

	text("报名成功").waitFor();
	backToFree();
}
