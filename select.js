"ui";

// 定义选项列表
var options = [
    "美食",
    "丽人"
];

var selectArr = new Array(2);


ui.layout(
    <vertical padding="16">
        <text text="多选框配置页面" textSize="20sp" textColor="black" marginBottom="16"/>
        <checkbox id="checkbox1" text={options[0]}/>
        <checkbox id="checkbox2" text={options[1]}/>
        <button id="confirmBtn" text="确定" marginTop="16"/>
    </vertical>
);

// 设置点击事件监听
ui.checkbox1.on("check", function(checked) {
    // 处理选项1的选中状态
});

ui.checkbox2.on("check", function(checked) {
    // 处理选项2的选中状态
});

ui.confirmBtn.click(function() {
    // 在这里处理点击确认按钮的逻辑，读取选项的状态
    if (ui.checkbox1.checked) {
        selectArr[0] = options[0];
    }
    if (ui.checkbox2.checked) {
        selectArr[1] = options[1];
    }
    var storage = storages.create("select");
    storage.put("selected", selectArr);
});



