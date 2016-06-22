/*
	StorableData Constructor

	A StorableData object is an extended version of an array that knows how to 
	save to and load from localStorage.

	This constructor could become more advanced later - interacting with a
	database, sorting the array it contains, etc.
*/

function StorableData(localStorageName) {
	this.data = [];
	this.storageName = localStorageName;
	this.load();
}

// _____________________________________________________________________________
// StorableData Array Methods 

StorableData.prototype.getLength = function(index) {
	return this.data.length;
};

StorableData.prototype.get = function(index) {
	return this.data[index];
};

StorableData.prototype.delete = function(index) {
	this.data.splice(index, 1);
	this.save();
};

StorableData.prototype.add = function(obj) {
	this.data.push(obj);
	this.save();
};

// _____________________________________________________________________________
// Local Storage Methods

StorableData.prototype.load = function() {
	var stringData = localStorage.getItem(this.storageName);
	if (stringData !== null) {
		this.data = JSON.parse(stringData);
	}
};

StorableData.prototype.save = function() {
	var stringModel = JSON.stringify(this.data);
	localStorage.setItem(this.storageName, stringModel);
};

StorableData.prototype.clear = function() {
	localStorage.clear();
	this.data = [];
};