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
            console.log("Loading name dropdown. Give it time!")
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

        // selecting tag
        var select = document.getElementById("selDatasetone");

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
                var calvalue = (food[i] * grams)/100
                portionSelection[i] = calvalue;
            }       
        }

        // Data to use displayed on console
        console.log("1. TABLE DATA: ",portionSelection)

        // selecting tag for table id
        var select = document.getElementById("nutrient-panel"); 
        

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
                var calvalue = (food[i] * grams)/100
                portionSelection[i] = calvalue;
            }       
        }
        // Data to use displayed on console
        console.log("2. MACRO BARGRAPH: ",portionSelection) 

        // selecting tag
        var select = document.getElementById("bar-macro");

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
                var calvalue = (food[i] * grams)/100
                portionSelection[i] = calvalue;
            }       
        }
        // Data to use displayed on console
        console.log("3. MICRO BARGRAPH: ",portionSelection) 

        // selecting tag
        var select = document.getElementById("bar-micro");

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
                var calvalue = (food[i] * grams)/100
                portionSelection[i] = calvalue;
            }       
        }
        // Data to use displayed on console
        console.log("4. GAUGE: ",portionSelection) 

        // selecting tag
        var select = document.getElementById("gauge");

    })
};



// 5. SCATTER PLOT
// Category scatter of all the fats, protein, and carbs; compared with kcal
function scatter(select) {
    var sel = select
    d3.json("/descriptioncategory").then((importData) => {

        // Searching food names through json
        var category = importData.data;
        //console.log("scatter plot data", category)

        // Empty list to store food_code data
        getCategoryName = []

        // Use filter() to pass selection as an argument for the specific category
        getCategoryName = category.filter(data => data.category == sel);

        // Data to use displayed on console
        console.log("5. SCATTER PLOT: ", getCategoryName)

        // selecting tag
        var select = document.getElementById("optionScatterChanged");

    })
};



//Initate the default items on the webpage
selectInit();
