var storage = sessionStorage;
function doFirst(){
	if(storage['addItemList'] == null){
		storage['addItemList'] = '';
//		storage.setItem('addItemList', '');
	}
	//先幫每個Add Cart按鈕,建事件聆聽的功能
	//spans是陣列的型態
	var spans = document.querySelectorAll('.addButton');
	for(var i=0; i<spans.length; i++){
		spans[i].addEventListener('click',function(){
			var teddyInfo = document.querySelector('#'+this.id+' input').value;
			addItem(this.id, teddyInfo);
		},false);
	}
}
function addItem(itemId,itemValue){
//	alert(itemId + ' : ' + itemValue);
	
	var newItem = document.getElementById('newItem');
	
	var img = document.createElement('img');
	img.src = 'imgs/' + itemValue.split('|')[1];
	img.id = 'itemImageSelect';

	var title = document.createElement('span');
	title.innerText = itemValue.split('|')[0];
	title.id = 'titleSelect';

	var price = document.createElement('span');
	price.innerText = '$' + itemValue.split('|')[2];
	price.id = 'priceSelect';

	//先判斷此處是否已有物件,如果有先刪除
	while(newItem.childNodes.length >= 1){
		newItem.removeChild(newItem.firstChild);
	}

	//再顯示新物件
	newItem.appendChild(img);
	newItem.appendChild(title);
	newItem.appendChild(price);

	//寫入storage中
	if(storage[itemId]){
		alert('You have ckecked.');
	}else{
		storage.setItem(itemId,itemValue);
		storage['addItemList'] += itemId + ', ';
	}

	//計算購買數量和小計
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');

	var subtotal = 0;
	for(var key in items){
		var itemInfo = storage[items[key]];	//use items[key]
		var sprice = parseInt(itemInfo.split('|')[2]);
		subtotal += sprice;
	}

	document.getElementById('itemCount').innerHTML = items.length;
	document.getElementById('subtotal').innerHTML = subtotal;
}
window.addEventListener('load',doFirst,false);


















