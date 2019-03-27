export const Inventory = (socket) => {
    let self = {
			items:[], //{id:"itemId",amount:1}
			socket:socket,
    }
    self.addItem =  (id,amount) => {
			console.log('id',id)
			for(let i = 0 ; i < self.items.length; i++){
				console.log(self.items)
			if(self.items[i].id === id){
				self.items[i].amount += amount;
				self.refreshRender();
				return;
			}
		}
		self.items.push({id:id,amount:amount});
		self.refreshRender();
    }
    self.removeItem =  (id,amount) => {
		for(let i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				self.items[i].amount -= amount;
				if(self.items[i].amount <= 0)
					self.items.splice(i,1);
				self.refreshRender();
				return;
			}
		}    
    }
    self.hasItem =  (id,amount) => {
		for(let i = 0 ; i < self.items.length; i++){
			if(self.items[i].id === id){
				return self.items[i].amount >= amount;
			}
		}  
		return false;
    }
	self.refreshRender =  () => {
		console.log('refresh')
		//server
		if(self.socket){
			self.socket.emit('updateInventory',self.items);
			return;
		}
		//client only
		console.log('test 2')
		let str = "";
		for(let i = 0 ; i < self.items.length; i++){
			let item = Item.List[self.items[i].id];
			let onclick = "Item.List['" + item.id + "'].event()";
			str += "<button onclick=\"" + onclick + "\">" + item.name + " x" + self.items[i].amount + "</button><br>";
		}

		document.getElementById("inventory").innerHTML = str;
	}
	return self;
}

export const Item = (id,name,event) => {
	let self = {
		id:id,
		name:name,
		event:event,
	}
	Item.List[self.id] = self;
	return self;
}
Item.List = {};

Item("potion","Potion", () => {
	player.hp = 10;
	playerInventory.removeItem("potion",1);
});

Item("enemy","Spawn Enemy", () => {
	Enemy.randomlyGenerate();
});