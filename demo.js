//程序开始运行之前判断无障碍服务
if (auto.service == null) {
    toastLog("请先开启无障碍服务！");
    exit();
};

var storage = storages.create("select");
var selectArr = storage.get("selected");

if(selectArr.length == 0){
    selectArr = new Array(2);
    selectArr[0] = "美食";
    selectArr[1] = "美食";
}

auto.waitFor();
console.show(); //开启日志（悬浮窗权限）
console.setPosition(0, 100);

threads.start(function(){  //开启子线程
	//监听音量键-，关闭所有脚本
	events.observeKey();
	events.onKeyDown("volume_down",function(event){//音量+改为volume_up
	  engines.stopAllAndToast();    
	 });
 
 });
 
for(var i = 0; i < selectArr.length; i++){
	console.log(selectArr[i]);
}

let sleepTime = 1500;
sleep(sleepTime);
app.launchApp("大众点评");
// console.setSize(sleepTime,2000)
sleep(sleepTime);


toast("open dianping");
sleep(sleepTime);

backToIndex();

let num = 1;
//翻页，每次翻5个
let slideHight = 348 * 4;
let swipeBtY = 2046;
let swipeBtX = device.width - 200;
let swipeToY = swipeBtY - slideHight-200;
let b ;

for(var i = 0; i < selectArr.length; i++){
    var item = selectArr[i];
    // console.log(item);
    if(item!=null){
    for(var cycle = 0; cycle < 4; cycle ++){
        //go to free
        enterIn();
        clickCat(item);
        doWhileForFree();
        backToIndex();
    }
    }
}


console.log("end");

function enterIn(){
	//判断city 是不是上海
	
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
}

function clickCat(type){
    console.log(type);
	var categories = className("android.widget.TextView").text("全部分类").find();
	for(var i = 0; i < categories.size(); i++){
		var cat = categories.get(i);
		b = cat.bounds();
		if(b.centerY() < 1000 || b.centerY() > 1500){
			continue;
		}
		click(b.centerX(), b.centerY());
		sleep(sleepTime);
	}

	var food = className("android.widget.TextView").text(type).findOne().parent();
	b = food.bounds();
	// console.log(device.width - 100);
	click(device.width - 100, b.centerY());
	toast("点击美食");
	sleep(sleepTime);

	//筛选
	var selectBtn = className("android.widget.TextView").text("更多筛选").findOne();
	b = selectBtn.bounds();
	click(b.centerX(), b.centerY());
	sleep(sleepTime);

	var notApply = className("android.widget.TextView").text("只看未报名").findOne().parent();
	b = notApply.bounds();
	click(device.width - 100, b.centerY());
	toast("点击只看未抢");
	sleep(sleepTime);
}

function doWhileForFree(){
	do{
		//点击免费抽
		
			var freeFreeList = className("android.widget.TextView").text("免费抽").find();
			for(var i = 0; i < freeFreeList.size() - 1; i++){
				
				var free = freeFreeList.get(i);
				let bound = free.bounds();
				if(bound.centerX() < 890 || bound.centerX() > 1000 || bound.centerY() <= 351){
					continue ;
				}
				console.log(bound.centerX(), bound.centerY());
				var random = randomPosition(bound.top, bound.bottom, bound.left-100, bound.right-100);
				click(random[0], random[1]);
				sleep(sleepTime);
				applyFood();
			}
			swipe(swipeBtX, swipeBtY, swipeBtX, swipeToY, 3*sleepTime);
			sleep(sleepTime);
	}while(className("android.widget.TextView").textContains("暂无更多活动").findOnce() == null);
}

function backToIndex(){
	//back to index page
	while(!id("city_arrow").exists()){
		back();
		sleep(sleepTime);
	}
}

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
	var random = randomPosition(bound.top, bound.bottom, bound.left, bound.right);
	click(random[0], random[1]);
	sleep(sleepTime);

	var confirmApply = text("知道啦，继续报名").findOnce();
	if(confirmApply != null){
		bound = chooseStore.bounds();
		click(bound.centerX(), bound.centerY());
		sleep(sleepTime);
	}

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
	var random = randomPosition(bound.top, bound.bottom, bound.left, bound.right);
	click(random[0], random[1]);
	sleep(sleepTime);

	text("报名成功").waitFor();
	backToFree();
}


function randomPosition(top, bottom, left, right){
	var randomX = random(left, right); // 生成[x1, x2)范围内的随机整数  
	var randomY = random(top, bottom); // 生成[y1, y2)范围内的随机整数  
	  
	// 输出随机点  
	console.log("Random point in rectangle: (" + randomX + ", " + randomY + ")");
	return [randomX, randomY];
}

