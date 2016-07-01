var storage = sessionStorage;
var subtotal = 0;
function doFirst(){
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');

	newItem = document.createElement('div');
	newTable = document.createElement('table');

	for(var key in items){
		var itemInfo = storage[items[key]];	//use items[key]
		createCartList(items[key],itemInfo);
	}

	//subtotal();
	for(var key in items){
		var itemInfo = storage[items[key]];	//use items[key]
		var sprice = parseInt(itemInfo.split('|')[2]);
		subtotal += sprice;
	}

	document.getElementById('subtotal').innerHTML = subtotal;
}

function createCartList(itemKey,itemInfo){
//	alert(itemKey + ' : ' + itemInfo);
	var itemTitle = itemInfo.split('|')[0];
	var itemImage = itemInfo.split('|')[1];
	var itemPrice = itemInfo.split('|')[2];

	//建立每個品項的區域 -- tr
	var trItemList = document.createElement('tr');
	trItemList.className = 'item';
//	trItemList.setAttribute('class','item');	

	//建立商品圖片 -- 第一個td
	var tdImage = document.createElement('td');
	tdImage.style.width = '120px';

	var img = document.createElement('img');
	img.src = 'imgs/' + itemImage;
	img.width = 60;

	tdImage.appendChild(img);
	trItemList.appendChild(tdImage);

	//建立商品名稱和刪除按鈕 -- 第二個td
	var tdTitle = document.createElement('td');
	tdTitle.style.width = '360px';
	tdTitle.id = itemKey;

	pTitle = document.createElement('p');
	pTitle.innerHTML = itemTitle;

	var button = document.createElement('button');
	button.innerHTML = 'Delete';
	button.onclick = deleteHandler;

	tdTitle.appendChild(pTitle);
	tdTitle.appendChild(button);

	trItemList.appendChild(tdTitle);

	//建立商品價格 -- 第三個td
	var tdPrice = document.createElement('td');
	tdPrice.style.width = '170px';
	tdPrice.innerHTML = itemPrice;

	trItemList.appendChild(tdPrice);

	//建立商品數量 -- 第四個td
	var tdItemCount = document.createElement('td');
	tdItemCount.style.width = '60px';

	var itemCount = document.createElement('input');
	itemCount.type = 'number';
	itemCount.value = 1;
	itemCount.oninput = inputHandler;
//	itemCount.onkeyup = inputHandler;

	tdItemCount.appendChild(itemCount);
	trItemList.appendChild(tdItemCount);

	newTable.appendChild(trItemList);
	newItem.appendChild(newTable);
	document.getElementById('cartList').appendChild(newItem);
}
function deleteHandler(){
	var itemId = this.parentNode.getAttribute('id');
	storage['addItemList'] = storage['addItemList'].replace(itemId+', ','');
	storage.removeItem(itemId);
	this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
	
	//subtotalDel();
	//var itemValue = storage.getItem(itemId);
	var itemStringDel = storage.getItem('addItemList');
	var itemsDel = itemStringDel.substr(0,itemStringDel.length-2).split(', ');
	subtotalDel = 0;
	var quantityDel;
	for(var i=0;i<itemsDel.length;i++){
		var itemDel = document.getElementById(itemsDel[i]);
		
		if(itemDel == null){
			subtotalDel = 0;
		}else{
			quantityDel = itemDel.nextSibling.nextSibling.lastChild.value;
			var unitPriceDel = parseInt(storage.getItem(itemsDel[i]).split('|')[2]);
			var tdPriceDel = itemDel.nextSibling;
			tdPriceDel.innerHTML =  quantityDel * unitPriceDel;
			subtotalDel += unitPriceDel * quantityDel;
		}
	}
	document.getElementById('subtotal').innerHTML = subtotalDel;
}

function inputHandler(){
	//作業
	var itemString = storage.getItem('addItemList');
	var items = itemString.substr(0,itemString.length-2).split(', ');

	subtotal = 0;
	for(var i=0;i<items.length;i++){
		var item = document.getElementById(items[i]);
		var quantity = item.nextSibling.nextSibling.lastChild.value;
		var unitPrice = parseInt(storage.getItem(items[i]).split('|')[2]);
		var tdPrice = item.nextSibling;
		tdPrice.innerHTML =  quantity * unitPrice;	
		subtotal += unitPrice * quantity;
	}
	document.getElementById('subtotal').innerHTML = subtotal;
}
window.addEventListener('load',doFirst,false);