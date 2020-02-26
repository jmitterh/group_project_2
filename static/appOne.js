// Defnintion of what should be aviable on our webpage when running app.py
function selectInit() {

    // FOOD NAME DROPDOWN
    // Importing data from nutrientvalue
    d3.json("/nutrientvalue").then((importData) => {

        // Searching food names through json
        var names = importData.data;

        // selecting tag
        var select = document.getElementById("selDataset");

        // Dropdown list
        for (var i = 0; i < names.length; i++) {
            console.log("Loading food name dropdown. Give it time!")
            select.innerHTML = select.innerHTML +
                '<option value="' + names[i].food_code + '">' + names[i].main_food_description + '</option>';
        }

        // default selection
        var defualtFoodName = names[0].food_code

        // adding dropdown fordefault selection quantity
        optionFoodChanged(defualtFoodName);

    });

    // CATEGORY NAME DROPDOWN
    //Importing data for dropdown of category
    d3.json("/descriptioncategory").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // selecting tag
        var select = document.getElementById("selDatasettwo");

        // empty object to store list
        var unique = {};

        // for loop to find unique values
        category.forEach(data => {
            unique[data.category] = unique[data.category] || {};

        })

        // Creating dropdown list
        Object.entries(unique).forEach(([val]) => {
            select.innerHTML = select.innerHTML +
                '<option value="' + val + '">' + val + '</option>';
        })

        // Create an array to store object keys
        arrUnique = Object.getOwnPropertyNames(unique)

        // default selection
        var defaultCategory = arrUnique[0]

        // adding default selection into selection categfory
        optionScatterChanged(defaultCategory);

    });

};


// PORTION SELECTION DROPDOWN
// Execution function for second dropdown acting as a cascading dropdown
function optionFoodChanged(select) {
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
        var name = filterSelect[0].main_food_description;

        // selecting tag for displaying the name
        var selectFoodName = document.getElementById("name");

        // Clear html display name
        selectFoodName.innerHTML = "";

        // Create html tag showing food name
        selectFoodName.innerHTML = selectFoodName.innerHTML +
            '<h3 >' + name + '</h3>';

        // selecting tag
        var select = document.getElementById("selDatasetone");

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
        optionWeightChanged(defaultPortionID, defaultPortionSeq_num);

    });
};

// GRAPH EXECUTION FUNCTION DEFINTION
// Execute function for nutrient info, macro and micro graph, and gauge
function optionWeightChanged(id, select) {

    // Nutrient fact initiated
    nutrient_fact(id, select);
    // Macro Graph initiated
    macro_graph(id, select);
    // Micro Graph initiated
    micro_graph(id, select);
    // Gauge initiated
    gauge(id, select);
    // macro Radar initiated
    macroRadar(id, select);
    // micro Radar initiated
    microRadar(id, select);

};

// SCATTER PLOT EXECUTION FUNCTION
// Execution function for scatter plot
function optionScatterChanged(select) {
    // Scatter initiated
    scatter(select)
};


////////////////////////////////////////////////////////
///////////////GRAPH FUNCTION DEFINITIONS///////////////
////////////////////////////////////////////////////////

// Chart.js requires a defined a variable to store the chart instance 
// (this must be outside of your function)
// This is to clear the visuals from chart.js
var myMacroRadar;
var myMicroRadar;


// 1. NUTRIENT FACT TABLE
// Nutrient facts to be listed function definition
function nutrient_fact(id, select) {
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
        var select = document.getElementById("nutrient-panel");

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



// 2. MACRO BAR GRAPH
// Macro Nutrients (fat,protein, and carbs)
function macro_graph(id, select) {
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
        var select = document.getElementById("bar-macro");

        // ********************************
        //Empty array to store chart data
        yBar = [];
        xBar = [];
        xAll = [];
        string = {};

        // Iterate through object to alter object label and store into array
        Object.entries(portionSelection).forEach(([key, value]) => {
            var macroName = ['protein_g', 'carbohydrate_g', 'sugars_total_g', 'total_fat_g'];
            if (macroName.indexOf(key) !== -1) {
                var n = key.indexOf("_g");
                var nSlice = key.slice(0, n);
                var keyName = nSlice[0].toUpperCase() + nSlice.substring(1);
                keyName = keyName.replace(/_/g, " ");
                var numb = value;
                numb = numb.toFixed(2);

                string = { type: keyName, amt: numb };
                xAll.push(string);
            }
        });

        // Sort Object Array in Descending Order by Amount field
        xAll.sort(function (a, b) { return b.amt - a.amt });

        // Chart Axis Arrays
        yBar = xAll.map(arr => arr.type);
        xBar = xAll.map(arr => arr.amt);

        // Reversing data 
        yBar.reverse();
        xBar.reverse();

        // Trace is for the Bar graph data
        var trace = {
            x: xBar,
            y: yBar,
            text: yBar,
            name: "Grams",
            type: "bar",
            orientation: "h",
            marker: {
                color: '#009966'
            }
        };
        // data
        var data = [trace];

        // Apply layout
        var layout = {
            title: "Macro Nutrients",
            titlefont: { size: 20, color: "darkblue" },
            xaxis: {
                title: "Grams",
                titlefont: { size: 14, color: "darkblue" },
                showgird: true,
                showline: true,
                linewidth: 2,
                autorange: true
            },
            yaxis: {
                showgird: true,
                showline: true,
                linewidth: 2,
                autorange: true,
                tickfont: { size: 14 }
            },
            margin: { l: 120, r: 80, t: 60, b: 100 },
            width: 500,
            height: 400
        };
        // Render the plot to the div tag with id "bar"
        Plotly.newPlot(select, data, layout, {displayModeBar: false});

        //******************************** */

    })

};


// 3. MICRO BAR GRAPH
// Micro Nutrients (vitamins and minerals)
function micro_graph(id, select) {
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
        var select = document.getElementById("bar-micro");

        // ******************************
        //Empty array to store chart data
        yBar = [];
        xBar = [];
        xAll = [];
        string = {};

        // Iterate through object to alter object label and store into array
        Object.entries(portionSelection).forEach(([key, value]) => {
            var macroName = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroName.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    var keyName = nSlice[0].toUpperCase() + nSlice.substring(1);
                    if (keyName == "Vitamin_d_d2__d3") { keyName = "Vitamin_d's"; }
                    if (keyName == "Vitamin_e_alphatocopherol") { keyName = "Vitamin_e_alpha"; }
                    if (keyName == "Vitamin_k_phylloquinone") { keyName = "Vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);

                    string = { type: keyName, amt: numm };
                    xAll.push(string);
                }
            }
        });

        // Sort Object Array in Descending Order by Amount field
        xAll.sort(function (a, b) { return b.amt - a.amt });

        // Chart Axis Arrays top 10 Nutirients
        yBar = xAll.slice(0, 10).map(arr => arr.type);
        xBar = xAll.slice(0, 10).map(arr => arr.amt);

        //Reversing data
        xBar.reverse();
        yBar.reverse();


        // Trace is for the Bar graph data
        var trace = {
            x: xBar,
            y: yBar,
            text: yBar,
            name: "Grams",
            type: "bar",
            orientation: "h",
            marker: {
                color: '#009966'
            }
        };
        // data
        var data = [trace];

        // Apply layout
        var layout = {
            title: "Micro Nutrients",
            titlefont: { size: 20, color: "darkblue" },
            xaxis: {
                title: "Milligram",
                titlefont: { size: 14, color: "darkblue" },
                showgird: true,
                showline: true,
                linewidth: 2,
                autorange: true,
            },
            yaxis: {
                showgird: true,
                showline: true,
                linewidth: 2,
                autorange: true,
                tickfont: { size: 14 }
            },
            margin: { l: 125, r: 10, t: 50, b: 100 },
            width: 500,
            height: 400
        };

        // Render the plot to the div tag with id "bar"
        Plotly.newPlot("bar-micro", data, layout, {displayModeBar: false});

        //****************************** */
    })

};


// 4. GAUGE
// Daily Value Gauge
function gauge(id, select) {
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
        var select = document.getElementById("gauge");

        // Variable for kcals
        var kCals = portionSelection.energy_kcal;

        // Variable for name
        var pDescription = portionSelection.portion_description
        var pWeight = portionSelection.portion_weight_g

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


// 5. SCATTER PLOT
// Category scatter of all the fats, protein, and carbs; compared with kcal
function scatter(select) {
    var sel = select
    d3.json("/descriptioncategory").then((importData) => {

        // Searching food names through json
        var category = importData.data;

        // Empty list to store food_code data
        getCategoryName = []

        // Use filter() to pass selection as an argument for the specific category
        getCategoryName = category.filter(data => data.category == sel);

        // selecting tag
        var select = document.getElementById("scatter");

        // varable for category name selected
        var catName = getCategoryName[0].category

        // Empty list for initiate
        xVal = []
        yVal_1 = []
        yVal_2 = []
        yVal_3 = []
        yVal_4 = []
        labals = []
        // For loop to add variables to a list to initiate bubble graph
        for (var i = 0; i < getCategoryName.length; i++) {
            xVal.push(getCategoryName[i].energy_kcal)
            yVal_1.push(getCategoryName[i].total_fat_g)
            yVal_2.push(getCategoryName[i].protein_g)
            yVal_3.push(getCategoryName[i].sugars_total_g)
            yVal_4.push(getCategoryName[i].carbohydrate_g)
            labals.push(getCategoryName[i].main_food_description)
        }
        // Build variables for Bubble Chart 
        var xBubble = xVal;
        var yBubble_1 = yVal_1;
        var yBubble_2 = yVal_2;
        var yBubble_3 = yVal_3;
        var yBubble_4 = yVal_4;
        var bubbleLabel = labals;
        var cSize_1 = yVal_1;
        var cSize_2 = yVal_2;
        var cSize_3 = yVal_3;

        // Trace is for the Bubble graph data
        var trace_1 = {
            x: xBubble,
            y: yBubble_1,
            text: bubbleLabel,
            mode: 'markers',
            marker: {
                size: cSize_1,
                // Using defualt colors = color: yvalue or xvalue

            },
            name: 'Total Fats VS Calories',

        };
        var trace_2 = {
            x: xBubble,
            y: yBubble_2,
            text: bubbleLabel,
            mode: 'markers',
            marker: {
                size: cSize_2,
                // Using defualt colors
            },
            name: 'Proteins VS Calories'
        };
        var trace_3 = {
            x: xBubble,
            y: yBubble_3,
            text: bubbleLabel,
            mode: 'markers',
            marker: {
                size: cSize_3,
                // Using defualt colors

            },
            name: 'Total Sugars VS Calories'
        };
        var trace_4 = {
            x: xBubble,
            y: yBubble_4,
            text: bubbleLabel,
            mode: 'markers',
            marker: {
                size: cSize_3,
                // Using defualt colors

            },
            name: 'Carbohydrates VS Calories'
        };

        // data
        var data = [trace_1, trace_2, trace_3, trace_4];

        // Apply layout
        var layout = {
            width: 1200,
            height: 700,
            title: `Comparing ${catName} products to find the relationship of Calories to Fats, Proteins, Total Sugars, and Carbohydrates`,
            xaxis: { title: "Calories" },
            yaxis: { title: "Grams" },
        };

        // Render the plot to the div tag with id "bubble"
        Plotly.newPlot(select, data, layout, {displayModeBar: false})

    })
};


// 6. MACRO RADAR CHARTGRAPH
// Another chart displaying the items using the chart library
function macroRadar(id, select) {
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

        //name of food
        foodName = portionSelection.main_food_description


        //Empty list for radar graph
        labels = [];
        data = []
        for (i in portionSelection) {
            if (i == 'total_fat_g' || i == 'fatty_acids_total_saturated_g' || i == 'fatty_acids_total_monounsaturated_g' || i == 'fatty_acids_total_polyunsaturated_g' || i == 'protein_g' || i == 'carbohydrate_g' || i == 'sugars_total_g' || i == 'fiber_total_dietary_g') {
                var n = i.replace(/_g/g, "")
                var newI = n.replace(/_/g, " ")
                var num = parseFloat(portionSelection[i]).toFixed(2)
                labels.push(newI);
                data.push(num);
            }
        };

        // selecting tag
        var select = document.getElementById("marco-radar");

        if (myMacroRadar) {
            myMacroRadar.destroy();
        }

        myMacroRadar = new Chart(select, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: `${foodName}`,
                    data: data,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgb(255, 99, 132)",
                    pointBackgroundColor: "rgb(255, 99, 132)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(255, 99, 132)"
                }]
            },
            option: options = {
                scale: {
                    angleLines: {
                        display: false
                        // display: true,
                        // text: `Distribution in grams for ${foodName}`
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


// 7. MICRO RADAR CHARTGRAPH
function microRadar(id, select) {
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
        var select = document.getElementById("micro-radar");

        // 
        foodName = portionSelection.main_food_description

        //Empty list for radar graph
        labels = [];
        data = []

        Object.entries(portionSelection).forEach(([key, value]) => {
            var macroName = ['thiamin_mg', 'riboflavin_mg', 'niacin_mg', 'vitamin_b6_mg', 'folic_acid_mcg',
                'folate_total_mcg', 'choline_total_mg', 'vitamin_b12_mcg', 'vitamin_c_mg',
                'vitamin_d_d2__d3_mcg', 'vitamin_e_alphatocopherol_mg', 'vitamin_k_phylloquinone_mcg',
                'calcium_mg', 'phosphorus_mg', 'magnesium_mg', 'iron_mg', 'zinc_mg', 'copper_mg',
                'selenium_mcg', 'potassium_mg', 'sodium_mg', 'caffeine_mg', 'theobromine_mg',
                'alcohol_g', 'water_g'];
            if (macroName.indexOf(key) !== -1) {
                if (value > 0) {
                    var n = key.indexOf("_m");
                    var nSlice = key.slice(0, n)
                    // var keyName = nSlice[0].toUpperCase() + nSlice.substring(1);
                    var keyName = nSlice;
                    if (keyName == "vitamin_d_d2__d3") { keyName = "vitamin_d's"; }
                    if (keyName == "vitamin_e_alphatocopherol") { keyName = "vitamin_e_alpha"; }
                    if (keyName == "vitamin_k_phylloquinone") { keyName = "vitamin_k_phyllo"; }
                    keyName = keyName.replace(/_/g, " ");
                    var numm = value;
                    numm = parseFloat(value).toFixed(2);
                    labels.push(keyName);
                    data.push(numm);
                }
            }
        });

        // selecting tag
        var select = document.getElementById("micro-radar");

        if (myMicroRadar) {
            myMicroRadar.destroy();
        }

        myMicroRadar = new Chart(select, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: `${foodName}`,
                    data: data,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)",
                    pointBackgroundColor: "rgb(54, 162, 235)",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgb(54, 162, 235)"
                }]
            },
            option: options = {
                scale: {
                    angleLines: {
                        display: false
                        // display: true,
                        // text: `Distribution in grams for ${foodName}`
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


//Initate the default items on the webpage
selectInit();
