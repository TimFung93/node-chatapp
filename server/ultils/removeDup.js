const removeDup = (arr) => {
	let copyArr = arr

	//remove duplicate
	copyArr = copyArr.filter((name, index, inputArray)=> {
		return inputArray.indexOf(name) === index
	});

	//compare to old array
	if (arr.length === copyArr.length) {
		return 'No Dupilicates'
	} else {
		return 'Name in use'
	}

}

module.exports = {
	removeDup
}
