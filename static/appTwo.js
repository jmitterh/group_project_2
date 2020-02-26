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

        // 1.1 Dropdown list
        for (var i = 0; i < names.length; i++) {
            console.log("Loading 1.1 food name dropdown. Give it time!")
            select.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // 1.2 Dropdown list for the second comparison
        for (var i = 0; i < names.length; i++) {
            console.log("Loading 2.1 food name dropdown. Give it time!")
            selectTwo.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // default selection
        var defualtFoodNameOne = names[0].food_code;
        var defualtFoodNameTwo = names[0].food_code;

        // adding dropdown for default selection quantity
        optionCompareChangedOne(defualtFoodNameOne);
        optionCompareChangedTwo(defualtFoodNameTwo);

    });
};

// 1.1 PORTION SELECTION DROPDOWN ONE
// Execution function for second dropdown acting as a cascading dropdown
function optionCompareChangedOne(select) {
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

        // Food name of filtered data
        var nameOne = filterSelect[0].main_food_description;

        // selecting tag for displaying the name
        var selectFoodName = document.getElementById("nameOne");

        // Clear html display name
        selectFoodName.innerHTML = "";

        // Create html tag showing food name
        selectFoodName.innerHTML = selectFoodName.innerHTML +
            '<h3>' + nameOne + '</h3>';

        // selecting tag for dropdown
        var select = document.getElementById("selCompareTwo");

        //Clear dropdown
        select.innerHTML = "";

        // For loop for drop down. referencing id and seq_num of portion size
        for (var i = 0; i < filterSelect.length; i++) {
            select.innerHTML = select.innerHTML +
                '<option value="' + filterSelect[i].food_code + ',' + filterSelect[i].seq_num + '">' + filterSelect[i].portion_description + '</option>';

        }

        // default selection
        var defaultPortionID = filterSelect[0].food_code
        var defaultPortionSeq_num = filterSelect[0].seq_num

        // Adding default selection into selection categfory
        optionCompareWeightChangedOne(defaultPortionID, defaultPortionSeq_num);
        // GAUGE ONE
        gaugeOne(defaultPortionID, defaultPortionSeq_num);

    });
};


// 1.2 PORTION SELECTION DROPDOWN TWO
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

        // Food name of filtered data
        var nameTwo = filterSelect[0].main_food_description;

        // selecting tag for displaying the name
        var selectFoodName = document.getElementById("nameTwo");

        // Clear html display name
        selectFoodName.innerHTML = "";

        // Create html tag showing food name
        selectFoodName.innerHTML = selectFoodName.innerHTML +
            '<h3>' + nameTwo + '</h3>';

        // selecting tag
        var select = document.getElementById("selCompareFour");

        //Clear dropdown
        select.innerHTML = "";

        // For loop for drop down. referencing id and seq_num of portion size
        for (var i = 0; i < filterSelect.length; i++) {
            select.innerHTML = select.innerHTML +
                '<option value="' + filterSelect[i].food_code + ',' + filterSelect[i].seq_num + '">' + filterSelect[i].portion_description + '</option>';
        }
        // default selection
        var defaultPortionID = filterSelect[0].food_code
        var defaultPortionSeq_num = filterSelect[0].seq_num

        // Adding default selection into selection categfory
        optionCompareWeightChangedTwo(defaultPortionID, defaultPortionSeq_num);
        // GAUGE TWO
        gaugeTwo(defaultPortionID, defaultPortionSeq_num);

    });
};

////////////////////////////////////////////////////////
///////EXECUTION FUNCTION DEFINITIONS FOR PORTION///////
////////////////////////////////////////////////////////


// 1.1 GRAPH EXECUTION FUNCTION DEFINTION ONE
// Execute function for nutrient info, macro and micro graph, and gauge
function optionCompareWeightChangedOne(id, select) {

    // Nutrient fact initiated
    nutrient_fact_one(id, select);
    // Radar Graph initiated
    macroRadar();
    // Micro Radar Graph initiated
    microRadar();
    // GAUGE ONE
    gaugeOne(id, select)
    // Macro Grouped Bar Chart initiated
    macroGroupBar();
    // Micro Grouped Bar Chart initiated
    microGroupBar();
};

// 1.2 GRAPH EXECUTION FUNCTION DEFINTION TWO
// Execute function for nutrient info, macro and micro graph, and gauge
function optionCompareWeightChangedTwo(id, select) {

    // Nutrient fact initiated
    nutrient_fact_two(id, select);
    // Radar Graph initiated
    macroRadar();
    // Micro Radar Graph initiated
    microRadar();
    // GAUGE ONE
    gaugeTwo(id, select)
    // Grouped Bar Chart initiated
    macroGroupBar();
    // Micro Grouped Bar Chart initiated
    microGroupBar();
};


////////////////////////////////////////////////////////
///////////////GRAPH FUNCTION DEFINITIONS///////////////
////////////////////////////////////////////////////////

// Chart.js requires a defined a variable to store the chart instance 
// (this must be outside of your function)
// This is to clear the visuals from chart.js
var myMacroRadar;
var myMicroRadar;
var myMacroChart;
var myMicroChart;


// 1.1 NUTRIENT FACT TABLE
// Nutrient facts to be listed function definition
function nutrient_fact_one(id, select) {
    //Rename variables
    var id_num = id
    var sel = select
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // Empty list to store food_code data
        getFoodCodes = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodes = category.filter(data => data.food_code == id_num);

        // empty list to get portions of food code
        var filterPortion = []

        // Using filter to pass sequence number selection
        filterPortion = getFoodCodes.filter(data => data.seq_num == sel)

        //calculation of attributes
        food = filterPortion[0]
        // Grams to use in our calculation
        grams = food.portion_weight_g

        // Empty object
        portionSelection = {}

        // For loop to run the calculation of portion size
        for (i in food) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelection[i] = food[i];
            }
            else {
                var calvalue = (food[i] * grams) / 100
                portionSelection[i] = calvalue;
            }
        }

        // selecting tag for table id
        var select = document.getElementById("nutrient-panel-one");

        //************************** */

        //Clear dropdown
        select.innerHTML = "";

        //Loop through Nutrient array to find nutrient List
        Object.entries(portionSelection).forEach(([key, value]) => {
            if (key !== 'food_code' && key !== 'main_food_description' && key !== 'seq_num' && key !== 'portion_description') {
                // Removing underscores
                newKey = key.replace(/_/g, " ")
                var num = parseFloat(value).toFixed(2)
                select.innerHTML = select.innerHTML +
                    '<li class="list-group-item text-capitalize font-italic">' + newKey + ':    ' + num + '</li>';
            }

        });
        //************************** */

    })

};


// 1.2 NUTRIENT FACT TABLE
// Nutrient facts to be listed function definition
function nutrient_fact_two(id, select) {
    //Rename variables
    var id_num = id
    var sel = select
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // Empty list to store food_code data
        getFoodCodes = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodes = category.filter(data => data.food_code == id_num);

        // empty list to get portions of food code
        var filterPortion = []

        // Using filter to pass sequence number selection
        filterPortion = getFoodCodes.filter(data => data.seq_num == sel)

        //calculation of attributes
        food = filterPortion[0]
        // Grams to use in our calculation
        grams = food.portion_weight_g

        // Empty object
        portionSelection = {}

        // For loop to run the calculation of portion size
        for (i in food) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelection[i] = food[i];
            }
            else {
                var calvalue = (food[i] * grams) / 100
                portionSelection[i] = calvalue;
            }
        }

        // selecting tag for table id
        var select = document.getElementById("nutrient-panel-two");

        //************************** */

        //Clear dropdown
        select.innerHTML = "";

        //Loop through Nutrient array to find nutrient List
        Object.entries(portionSelection).forEach(([key, value]) => {
            if (key !== 'food_code' && key !== 'main_food_description' && key !== 'seq_num' && key !== 'portion_description') {
                // Removing underscores
                newKey = key.replace(/_/g, " ")
                var num = parseFloat(value).toFixed(2)
                select.innerHTML = select.innerHTML +
                    '<li class="list-group-item text-capitalize font-italic">' + newKey + ':    ' + num + '</li>';
            }

        });
        //************************** */

    })

};



// 2. MACRO RADAR CHART GRAPH
// Another chart displaying the items using the chart library
function macroRadar() {

    d3.json("/portionsandweights").then((importData) => {

        // Caling selected items for 1. food name and portion
        var xOne = document.getElementById("selCompareTwo").value.split(',')[0]
        var xTwo = document.getElementById("selCompareTwo").value.split(',')[1]

        // Caling selected items for 2. food name and portion
        var zOne = document.getElementById("selCompareFour").value.split(',')[0]
        var zTwo = document.getElementById("selCompareFour").value.split(',')[1]

        // Searching food names through json
        var categoryOne = importData.data;
        var categoryTwo = importData.data;

        // Empty list to store food_code data
        getFoodCodesOne = []
        getFoodCodesTwo = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodesOne = categoryOne.filter(data => data.food_code == xOne);
        getFoodCodesTwo = categoryTwo.filter(d => d.food_code == zOne);


        // empty list to get portions of food code
        var filterPortionOne = []
        var filterPortionTwo = []

        // Using filter to pass sequence number selection
        filterPortionOne = getFoodCodesOne.filter(data => data.seq_num == xTwo)
        filterPortionTwo = getFoodCodesTwo.filter(d => d.seq_num == zTwo)

        //calculation of attributes
        foodOne = filterPortionOne[0]
        foodTwo = filterPortionTwo[0]

        // Grams to use in our calculation
        gramsOne = foodOne.portion_weight_g
        gramsTwo = foodTwo.portion_weight_g

        // Empty object
        portionSelectionOne = {}
        portionSelectionTwo = {}

        // 1.1 For loop to run the calculation of portion size
        for (i in foodOne) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionOne[i] = foodOne[i];
            }
            else {
                var calvalueOne = (foodOne[i] * gramsOne) / 100
                portionSelectionOne[i] = calvalueOne;
            }
        }

        // 1.2 For loop to run the calculation of portion size
        for (i in foodTwo) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionTwo[i] = foodTwo[i];
            }
            else {
                var calvalueTwo = (foodTwo[i] * gramsTwo) / 100
                portionSelectionTwo[i] = calvalueTwo;
            }
        }

        // name of foods
        foodNameOne = portionSelectionOne.main_food_description
        foodNameTwo = portionSelectionTwo.main_food_description


        // 1.1 Empty list for radar graph
        labelsOne = [];
        dataOne = []
        for (i in portionSelectionOne) {
            if (i == 'total_fat_g' || i == 'fatty_acids_total_saturated_g' || i == 'fatty_acids_total_monounsaturated_g' || i == 'fatty_acids_total_polyunsaturated_g' || i == 'protein_g' || i == 'carbohydrate_g' || i == 'sugars_total_g' || i == 'fiber_total_dietary_g') {
                var n = i.replace(/_g/g, "")
                var newIOne = n.replace(/_/g, " ")
                var numOne = parseFloat(portionSelectionOne[i]).toFixed(2)
                labelsOne.push(newIOne);
                dataOne.push(numOne);
            }
        };

        //1.2 Empty list for radar graph
        labelsTwo = [];
        dataTwo = []
        for (i in portionSelectionTwo) {
            if (i == 'total_fat_g' || i == 'fatty_acids_total_saturated_g' || i == 'fatty_acids_total_monounsaturated_g' || i == 'fatty_acids_total_polyunsaturated_g' || i == 'protein_g' || i == 'carbohydrate_g' || i == 'sugars_total_g' || i == 'fiber_total_dietary_g') {
                var n = i.replace(/_g/g, "")
                var newITwo = n.replace(/_/g, " ")
                var numTwo = parseFloat(portionSelectionTwo[i]).toFixed(2)
                labelsTwo.push(newITwo);
                dataTwo.push(numTwo);
            }
        };

        // selecting tag
        var select = document.getElementById("macro-radar");

        // if the chart is not undefined (e.g. it has been created)
        // then destory the old one so we can create a new one later
        if (myMacroRadar) {
            myMacroRadar.destroy();
        }

        myMacroRadar = new Chart(select, {
            type: 'radar',
            data: {
                labels: labelsOne,
                datasets: [{
                    label: `${foodNameOne}`,
                    data: dataOne,
                    fill: true,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)",
                    pointBackgroundColor: "rgb(54, 162, 235)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(54, 162, 235)"
                },
                {
                    label: `${foodNameTwo}`,
                    data: dataTwo,
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"

                }],

            },
            option: options = {
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                },
            },

        });

    })
};


// 3. MICRO RADAR CHART GRAPH
// Another chart displaying the items using the chart library
function microRadar() {
    d3.json("/portionsandweights").then((importData) => {

        // Caling selected items for 1. food name and portion
        var xOne = document.getElementById("selCompareTwo").value.split(',')[0]
        var xTwo = document.getElementById("selCompareTwo").value.split(',')[1]

        // Caling selected items for 2. food name and portion
        var zOne = document.getElementById("selCompareFour").value.split(',')[0]
        var zTwo = document.getElementById("selCompareFour").value.split(',')[1]

        // Searching food names through json
        var categoryOne = importData.data;
        var categoryTwo = importData.data;

        // Empty list to store food_code data
        getFoodCodesOne = []
        getFoodCodesTwo = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodesOne = categoryOne.filter(data => data.food_code == xOne);
        getFoodCodesTwo = categoryTwo.filter(d => d.food_code == zOne);


        // empty list to get portions of food code
        var filterPortionOne = []
        var filterPortionTwo = []

        // Using filter to pass sequence number selection
        filterPortionOne = getFoodCodesOne.filter(data => data.seq_num == xTwo)
        filterPortionTwo = getFoodCodesTwo.filter(d => d.seq_num == zTwo)

        //calculation of attributes
        foodOne = filterPortionOne[0]
        foodTwo = filterPortionTwo[0]

        // Grams to use in our calculation
        gramsOne = foodOne.portion_weight_g
        gramsTwo = foodTwo.portion_weight_g

        // Empty object
        portionSelectionOne = {}
        portionSelectionTwo = {}

        // 1.1 For loop to run the calculation of portion size
        for (i in foodOne) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionOne[i] = foodOne[i];
            }
            else {
                var calvalueOne = (foodOne[i] * gramsOne) / 100
                portionSelectionOne[i] = calvalueOne;
            }
        }

        // 1.2 For loop to run the calculation of portion size
        for (i in foodTwo) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionTwo[i] = foodTwo[i];
            }
            else {
                var calvalueTwo = (foodTwo[i] * gramsTwo) / 100
                portionSelectionTwo[i] = calvalueTwo;
            }
        }

        //name of food
        foodNameOne = portionSelectionOne.main_food_description
        foodNameTwo = portionSelectionTwo.main_food_description


        // Empty list for radar graph
        labelsOne = [];
        dataOne = []

        // Empty list for radar graph
        labelsTwo = [];
        dataTwo = []

        // 1.1 For loop to format specified keys
        Object.entries(portionSelectionOne).forEach(([key, value]) => {
            var macroNameOne = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroNameOne.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    var keyName = nSlice;
                    if (keyName == "vitamin_d_d2__d3") { keyName = "vitamin_d's"; }
                    if (keyName == "vitamin_e_alphatocopherol") { keyName = "vitamin_e_alpha"; }
                    if (keyName == "vitamin_k_phylloquinone") { keyName = "vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);
                    labelsOne.push(keyName);
                    dataOne.push(numm);

                }
            }
        });

        // 1.2 For loop to format specified keys
        Object.entries(portionSelectionTwo).forEach(([key, value]) => {
            var macroNameTwo = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroNameTwo.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    var keyName = nSlice;
                    if (keyName == "vitamin_d_d2__d3") { keyName = "vitamin_d's"; }
                    if (keyName == "vitamin_e_alphatocopherol") { keyName = "vitamin_e_alpha"; }
                    if (keyName == "vitamin_k_phylloquinone") { keyName = "vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);
                    labelsTwo.push(keyName);
                    dataTwo.push(numm);

                }
            }
        });

        // selecting tag
        var select = document.getElementById("micro-radar");

        // if the chart is not undefined (e.g. it has been created)
        // then destory the old one so we can create a new one later
        if (myMicroRadar) {
            myMicroRadar.destroy();
        }

        myMicroRadar = new Chart(select, {
            type: 'radar',
            data: {
                labels: labelsOne,
                datasets: [{
                    label: `${foodNameOne}`,
                    data: dataOne,
                    fill: true,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)",
                    pointBackgroundColor: "rgb(54, 162, 235)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(54, 162, 235)"
                },
                {
                    label: `${foodNameTwo}`,
                    data: dataTwo,
                    fill: true,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"

                }],

            },
            option: options = {
                scale: {
                    angleLines: {
                        display: false
                    },
                    ticks: {
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                },
            },

        });

    })
};


// 4. MACRO GROUPED BARCHART
function macroGroupBar() {

    d3.json("/portionsandweights").then((importData) => {

        // Caling selected items for 1. food name and portion
        var xOne = document.getElementById("selCompareTwo").value.split(',')[0]
        var xTwo = document.getElementById("selCompareTwo").value.split(',')[1]

        // Caling selected items for 2. food name and portion
        var zOne = document.getElementById("selCompareFour").value.split(',')[0]
        var zTwo = document.getElementById("selCompareFour").value.split(',')[1]

        // Searching food names through json
        var categoryOne = importData.data;
        var categoryTwo = importData.data;

        // Empty list to store food_code data
        getFoodCodesOne = []
        getFoodCodesTwo = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodesOne = categoryOne.filter(data => data.food_code == xOne);
        getFoodCodesTwo = categoryTwo.filter(d => d.food_code == zOne);


        // empty list to get portions of food code
        var filterPortionOne = []
        var filterPortionTwo = []

        // Using filter to pass sequence number selection
        filterPortionOne = getFoodCodesOne.filter(data => data.seq_num == xTwo)
        filterPortionTwo = getFoodCodesTwo.filter(d => d.seq_num == zTwo)

        //calculation of attributes
        foodOne = filterPortionOne[0]
        foodTwo = filterPortionTwo[0]

        // Grams to use in our calculation
        gramsOne = foodOne.portion_weight_g
        gramsTwo = foodTwo.portion_weight_g

        // Empty object
        portionSelectionOne = {}
        portionSelectionTwo = {}

        // 1.1 For loop to run the calculation of portion size
        for (i in foodOne) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionOne[i] = foodOne[i];
            }
            else {
                var calvalueOne = (foodOne[i] * gramsOne) / 100
                portionSelectionOne[i] = calvalueOne;
            }
        }

        // 1.2 For loop to run the calculation of portion size
        for (i in foodTwo) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionTwo[i] = foodTwo[i];
            }
            else {
                var calvalueTwo = (foodTwo[i] * gramsTwo) / 100
                portionSelectionTwo[i] = calvalueTwo;
            }
        }

        // name of foods
        foodNameOne = portionSelectionOne.main_food_description
        foodNameTwo = portionSelectionTwo.main_food_description


        // 1.1 Empty list for radar graph
        labelsOne = [];
        dataOne = []
        for (i in portionSelectionOne) {
            if (i == 'total_fat_g' || i == 'fatty_acids_total_saturated_g' || i == 'fatty_acids_total_monounsaturated_g' || i == 'fatty_acids_total_polyunsaturated_g' || i == 'protein_g' || i == 'carbohydrate_g' || i == 'sugars_total_g' || i == 'fiber_total_dietary_g') {
                var n = i.replace(/_g/g, "")
                var newIOne = n.replace(/_/g, " ")
                var numOne = parseFloat(portionSelectionOne[i]).toFixed(2)
                labelsOne.push(newIOne);
                dataOne.push(numOne);
            }
        };

        //1.2 Empty list for radar graph
        labelsTwo = [];
        dataTwo = []
        for (i in portionSelectionTwo) {
            if (i == 'total_fat_g' || i == 'fatty_acids_total_saturated_g' || i == 'fatty_acids_total_monounsaturated_g' || i == 'fatty_acids_total_polyunsaturated_g' || i == 'protein_g' || i == 'carbohydrate_g' || i == 'sugars_total_g' || i == 'fiber_total_dietary_g') {
                var n = i.replace(/_g/g, "")
                var newITwo = n.replace(/_/g, " ")
                var numTwo = parseFloat(portionSelectionTwo[i]).toFixed(2)
                labelsTwo.push(newITwo);
                dataTwo.push(numTwo);
            }
        };

        // selecting tag
        var select = document.getElementById("macro-bar-chart-grouped");

        // if the chart is not undefined (e.g. it has been created)
        // then destory the old one so we can create a new one later
        if (myMacroChart) {
            myMacroChart.destroy();
        }

        //Grouped bar chart
        myMacroChart = new Chart(select, {
            type: 'bar',
            data: {
                labels: labelsOne,
                datasets: [
                    {
                        label: `${foodNameOne}`,
                        backgroundColor: "rgba(54, 162, 235, 1.0)",
                        data: dataOne
                    }, {
                        label: `${foodNameTwo}`,
                        backgroundColor: "rgb(34,139,34,1.0)",
                        data: dataTwo
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Comparision of Macro Nutrients'
                }
            }
        });
    })

};


// 5. MICRO GROUPED BARGRAPH
function microGroupBar() {

    d3.json("/portionsandweights").then((importData) => {

        // Caling selected items for 1. food name and portion
        var xOne = document.getElementById("selCompareTwo").value.split(',')[0]
        var xTwo = document.getElementById("selCompareTwo").value.split(',')[1]

        // Caling selected items for 2. food name and portion
        var zOne = document.getElementById("selCompareFour").value.split(',')[0]
        var zTwo = document.getElementById("selCompareFour").value.split(',')[1]

        // Searching food names through json
        var categoryOne = importData.data;
        var categoryTwo = importData.data;

        // Empty list to store food_code data
        getFoodCodesOne = []
        getFoodCodesTwo = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodesOne = categoryOne.filter(data => data.food_code == xOne);
        getFoodCodesTwo = categoryTwo.filter(d => d.food_code == zOne);


        // empty list to get portions of food code
        var filterPortionOne = []
        var filterPortionTwo = []

        // Using filter to pass sequence number selection
        filterPortionOne = getFoodCodesOne.filter(data => data.seq_num == xTwo)
        filterPortionTwo = getFoodCodesTwo.filter(d => d.seq_num == zTwo)

        //calculation of attributes
        foodOne = filterPortionOne[0]
        foodTwo = filterPortionTwo[0]

        // Grams to use in our calculation
        gramsOne = foodOne.portion_weight_g
        gramsTwo = foodTwo.portion_weight_g

        // Empty object
        portionSelectionOne = {}
        portionSelectionTwo = {}

        // 1.1 For loop to run the calculation of portion size
        for (i in foodOne) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionOne[i] = foodOne[i];
            }
            else {
                var calvalueOne = (foodOne[i] * gramsOne) / 100
                portionSelectionOne[i] = calvalueOne;
            }
        }

        // 1.2 For loop to run the calculation of portion size
        for (i in foodTwo) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelectionTwo[i] = foodTwo[i];
            }
            else {
                var calvalueTwo = (foodTwo[i] * gramsTwo) / 100
                portionSelectionTwo[i] = calvalueTwo;
            }
        }

        // name of foods
        foodNameOne = portionSelectionOne.main_food_description
        foodNameTwo = portionSelectionTwo.main_food_description


        // Empty list for radar graph
        labelsOne = [];
        dataOne = []

        // Empty list for radar graph
        labelsTwo = [];
        dataTwo = []

        // 1.1 For loop to format specified keys
        Object.entries(portionSelectionOne).forEach(([key, value]) => {
            var macroNameOne = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroNameOne.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    var keyName = nSlice;
                    if (keyName == "vitamin_d_d2__d3") { keyName = "vitamin_d's"; }
                    if (keyName == "vitamin_e_alphatocopherol") { keyName = "vitamin_e_alpha"; }
                    if (keyName == "vitamin_k_phylloquinone") { keyName = "vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);
                    labelsOne.push(keyName);
                    dataOne.push(numm);

                }
            }
        });

        // 1.2 For loop to format specified keys
        Object.entries(portionSelectionTwo).forEach(([key, value]) => {
            var macroNameTwo = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroNameTwo.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    var keyName = nSlice;
                    if (keyName == "vitamin_d_d2__d3") { keyName = "vitamin_d's"; }
                    if (keyName == "vitamin_e_alphatocopherol") { keyName = "vitamin_e_alpha"; }
                    if (keyName == "vitamin_k_phylloquinone") { keyName = "vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);
                    labelsTwo.push(keyName);
                    dataTwo.push(numm);

                }
            }
        });

        // selecting tag
        var select = document.getElementById("micro-bar-chart-grouped");

        // if the chart is not undefined (e.g. it has been created)
        // then destory the old one so we can create a new one later
        if (myMicroChart) {
            myMicroChart.destroy();
        }

        //Grouped bar chart
        myMicroChart = new Chart(select, {
            type: 'bar',
            data: {
                labels: labelsOne,
                datasets: [
                    {
                        label: `${foodNameOne}`,
                        backgroundColor: "rgba(54, 162, 235, 1.0)",
                        data: dataOne
                    }, {
                        label: `${foodNameTwo}`,
                        backgroundColor: "rgb(34,139,34,1.0)",
                        data: dataTwo
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Comparision of Micro Nutrient'
                }
            }
        });
    })

};


// 6.1 GAUGE ONE
function gaugeOne(id, select) {
    //Rename variables
    var id_num = id
    var sel = select
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // Empty list to store food_code data
        getFoodCodes = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodes = category.filter(data => data.food_code == id_num);

        // empty list to get portions of food code
        var filterPortion = []

        // Using filter to pass sequence number selection
        filterPortion = getFoodCodes.filter(data => data.seq_num == sel)

        //calculation of attributes
        food = filterPortion[0]
        // Grams to use in our calculation
        grams = food.portion_weight_g

        // Empty object
        portionSelection = {}

        // For loop to run the calculation of portion size
        for (i in food) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelection[i] = food[i];
            }
            else {
                var calvalue = (food[i] * grams) / 100
                portionSelection[i] = calvalue;
            }
        }

        // selecting tag
        var select = document.getElementById("gauge-one");

        // Variable for kcals
        var kCals = portionSelection.energy_kcal;

        // Variable for name
        var pDescription = portionSelection.portion_description;
        var pWeight = portionSelection.portion_weight_g;

        // data
        var data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: kCals,// change value with washing freq
                title: { text: `Calories from ${pDescription} or ${pWeight} grams`, font: { size: 18 } },
                gauge: {
                    axis: { range: [0, 500], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 3,
                    bordercolor: "darkblue",
                    steps: [
                        { range: [0, 50], color: "#00cc00" },
                        { range: [50, 100], color: "#33cc00" },
                        { range: [100, 150], color: "#66cc00" },
                        { range: [150, 200], color: "#99cc00" },
                        { range: [200, 250], color: "#cccc00" },
                        { range: [250, 300], color: "#cc9900" },
                        { range: [300, 350], color: "#cc6600" },
                        { range: [350, 400], color: "#cc3300" },
                        { range: [400, 500], color: "#cc0000" }
                    ],
                    threshold: {
                        line: { color: "cyan", width: 6 },
                        thickness: 1.0,
                        value: kCals
                    }
                }
            }
        ];
        // App layout
        var layout = {
            width: 600,
            height: 500,
            margin: { t: 40, r: 40, l: 40, b: 40 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };
        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot(select, data, layout, {displayModeBar: false});

    })
};


// 6.2 GAUGE TWO
function gaugeTwo(id, select) {
    //Rename variables
    var id_num = id
    var sel = select
    d3.json("/portionsandweights").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // Empty list to store food_code data
        getFoodCodes = []

        // Use filter() to pass selection as an argument for the food_code
        getFoodCodes = category.filter(data => data.food_code == id_num);

        // empty list to get portions of food code
        var filterPortion = []

        // Using filter to pass sequence number selection
        filterPortion = getFoodCodes.filter(data => data.seq_num == sel)

        //calculation of attributes
        food = filterPortion[0]
        // Grams to use in our calculation
        grams = food.portion_weight_g

        // Empty object
        portionSelection = {}

        // For loop to run the calculation of portion size
        for (i in food) {
            if (i == 'food_code' || i == 'main_food_description' || i == 'seq_num' || i == 'portion_description' || i == 'portion_weight_g') {
                portionSelection[i] = food[i];
            }
            else {
                var calvalue = (food[i] * grams) / 100
                portionSelection[i] = calvalue;
            }
        }

        // selecting tag
        var select = document.getElementById("gauge-two");

        // Variable for kcals
        var kCals = portionSelection.energy_kcal;

        // Variable for name
        var pDescription = portionSelection.portion_description;
        var pWeight = portionSelection.portion_weight_g;

        // data
        var data = [
            {
                type: "indicator",
                mode: "gauge+number",
                value: kCals,// change value with washing freq
                title: { text: `Calories from ${pDescription} or ${pWeight} grams`, font: { size: 18 } },
                gauge: {
                    axis: { range: [0, 500], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 3,
                    bordercolor: "darkblue",
                    steps: [
                        { range: [0, 50], color: "#00cc00" },
                        { range: [50, 100], color: "#33cc00" },
                        { range: [100, 150], color: "#66cc00" },
                        { range: [150, 200], color: "#99cc00" },
                        { range: [200, 250], color: "#cccc00" },
                        { range: [250, 300], color: "#cc9900" },
                        { range: [300, 350], color: "#cc6600" },
                        { range: [350, 400], color: "#cc3300" },
                        { range: [400, 500], color: "#cc0000" }
                    ],
                    threshold: {
                        line: { color: "cyan", width: 6 },
                        thickness: 1.0,
                        value: kCals
                    }
                }
            }
        ];
        // App layout
        var layout = {
            width: 600,
            height: 500,
            margin: { t: 40, r: 40, l: 40, b: 40 },
            paper_bgcolor: "white",
            font: { color: "darkblue", family: "Arial" }
        };
        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot(select, data, layout, {displayModeBar: false});

    })
};


// INITIATE ONCE WEBPAGE STARTS
selectInit();