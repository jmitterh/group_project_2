function selectInit() {
    // Importing data from nutrientvalue
    d3.json("/nutrientvalue").then((importData) => {
        //console.log(importData);

        // Searching food names through json
        var names = importData.data;
        console.log(names)

        // selecting tag
        var select = document.getElementById("selDataset");

        // Dropdown list
        for (var i = 0; i < names.length; i++) {
            console.log("Loading dropdown. Give it time!")
            select.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // default selection
        var defSelection = names[0].food_code

        // adding default selection into selection quantity to
        optionFoodChanged(defSelection);

    });
};

function optionFoodChanged(select) {

    var sel = select
    // Importing data from portionsandweights
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var portions = importData.data;
        
        //Empty Variable
        var filterSelect = []

        // Filter the search
        filterSelect = portions.filter(d => d.food_code == sel);
        console.log("filter:", filterSelect)

        // selecting tag
        var select = document.getElementById("selDatasetone");

        //Clear 
        select.innerHTML = "";

        // For loop to create 
        for (var i = 0; i < filterSelect.length; i++) {
            if (filterSelect[i].portion_description != 'Quantity not specified') {
                select.innerHTML = select.innerHTML +
                    '<option value="' + filterSelect[i].portion_description + '">' + filterSelect[i].portion_description + '</option>';
            }

        }

    });


};

function optionWeightChanged(select) {


};

selectInit();
