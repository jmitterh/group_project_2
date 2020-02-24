// Defnintion of what should be aviable on our webpage when running app.py
function selectInit() {

    // FOOD NAME DROPDOWN FOR COMPARISON 1 AND 2
    // Importing data from nutrientvalue
    d3.json("/nutrientvalue").then((importData) => {

        // Searching food names through json
        var names = importData.data;

        // selecting tag COMPARISON 1 AND 2
        var select = document.getElementById("selCompareOne");
        var selectTwo = document.getElementById("selCompareThree");

        // Dropdown list
        for (var i = 0; i < names.length; i++) {
            console.log("Loading name dropdown. Give it time!")
            select.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // Dropdown list for the second comparison
        for (var i = 0; i < names.length; i++) {
            console.log("Loading name dropdown. Give it time!")
            selectTwo.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // default selection
        var defualtFoodNameOne = names[0].food_code
        var defualtFoodNameTwo = names[10].food_code

        // adding dropdown for default selection quantity
        optionCompareChangedOne(defualtFoodNameOne);
        optionCompareChangedTwo(defualtFoodNameTwo);

    });
};

// PORTION SELECTION DROPDOWN ONE
// Execution function for second dropdown acting as a cascading dropdown
function optionCompareChangedOne(select) {
    //Giving select a variable name
    var sel = select
    console.log(sel)
    // Importing data from portionsandweights
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var portions = importData.data;

        //Empty Variable
        var filterSelect = []

        // Filter the search
        filterSelect = portions.filter(d => d.food_code == sel);

        // selecting tag
        var select = document.getElementById("selCompareTwo");

        //Clear dropdown
        select.innerHTML = "";

        // For loop for drop down. referencing id and seq_num of portion size
        for (var i = 0; i < filterSelect.length; i++) {
            if (filterSelect[i].portion_description != 'Quantity not specified') {
                select.innerHTML = select.innerHTML +
                    '<option value="' + filterSelect[i].food_code + ',' + filterSelect[i].seq_num + '">' + filterSelect[i].portion_description + '</option>';
            }
        }
        // default selection
        var defaultPortionID = filterSelect[0].food_code
        var defaultPortionSeq_num = filterSelect[0].seq_num

        // Adding default selection into selection categfory
        optionCompareWeightChangedOne(defaultPortionID, defaultPortionSeq_num);

    });
};


// PORTION SELECTION DROPDOWN TWO
// Execution function for second dropdown acting as a cascading dropdown
function optionCompareChangedTwo(select) {
    //Giving select a variable name
    var sel = select
    // Importing data from portionsandweights
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var portions = importData.data;

        //Empty Variable
        var filterSelect = []

        // Filter the search
        filterSelect = portions.filter(d => d.food_code == sel);

        // selecting tag
        var select = document.getElementById("selCompareFour");

        //Clear dropdown
        select.innerHTML = "";

        // For loop for drop down. referencing id and seq_num of portion size
        for (var i = 0; i < filterSelect.length; i++) {
            if (filterSelect[i].portion_description != 'Quantity not specified') {
                select.innerHTML = select.innerHTML +
                    '<option value="' + filterSelect[i].food_code + ',' + filterSelect[i].seq_num + '">' + filterSelect[i].portion_description + '</option>';
            }
        }
        // default selection
        var defaultPortionID = filterSelect[0].food_code
        var defaultPortionSeq_num = filterSelect[0].seq_num

        // Adding default selection into selection categfory
        optionCompareWeightChangedTwo(defaultPortionID, defaultPortionSeq_num);

    });
};

// GRAPH EXECUTION FUNCTION DEFINTION ONE
// Execute function for nutrient info, macro and micro graph, and gauge
function optionCompareWeightChangedOne(id, select) {
    console.log("select 1:",id, select)

    // // Nutrient fact initiated
    // nutrient_fact(id, select);
    // // Macro Graph initiated
    // macro_graph(id, select);
    // // Micro Graph initiated
    // micro_graph(id, select);
    // // Gauge initiated
    // gauge(id, select);
    optionCompareWeightChangedTwo(id,select);

};

// GRAPH EXECUTION FUNCTION DEFINTION TWO
// Execute function for nutrient info, macro and micro graph, and gauge
function optionCompareWeightChangedTwo(id2,selection,id,select) {
    console.log("select 2:",id, select,id2,selection)
    // Nutrient fact initiated
    //test(id, select,id2,select2);
    // // Macro Graph initiated
    // macro_graph(id, select);
    // // Micro Graph initiated
    // micro_graph(id, select);
    // // Gauge initiated
    // gauge(id, select);
    //graph()

};

function graph(id1,p1,id2,p2){
    var idOne = id1;
    var pOne = p1;
    var idTwo = id2
    var pTwo = p2
    console.log("ids:",idOne,idTwo)
    console.log("portion:",pOne,pTwo)
}

//INITIATE ONCE WEBPAGE STARTS
selectInit();