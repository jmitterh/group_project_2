
![](https://www.pinclipart.com/picdir/big/267-2678052_healthy-food-clipart-cute-png-download.png)

# Project Two: Food Dashboard

Team of three:
* Baoxing Wang 
    * Data munging; created the categories table for the scatter bubble graph, based on about 38,000 datasets. Developed visualizations using the chart.js module.
* Lyna Olivares
    * Data managing; created the Postgres SQL query functionality to our RESTful API's. Constructed the visualizations using plotly.js module.
* Jean-Paul Mitterhofer
    * Developed the flask application layout; database connection, and HTML/CSS layout. Helped with minor visual and functionality details.

## Project Description

Our chosen topic is food and beverage information provided by the USDA Agricultural Research Service. The food and beverage dashboard shall give the user the option to search any food or beverage to their liking with the nutritional and graphical information. A comparison page shall be included were you can compare to different food/beverages and visually see the macro/micro nutritional differences. A gauge shall also display how much caloric daily value meal is impacted based on the food/beverage and quantity selected.

 ## Requirements
* Web application includes Python Flask-powered RESTful API, HTML/CSS, JavaScript and one Postgres Database
* Dashboard page has multiple charts that update from the RESTful API.
* Web application includes one JS library not covered in class called Chart.js
* Web application is powered by a data set over 100 records.
* Web application includes dropdowns for user-driven interaction.
* Web application has at least three views.

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the following:

```bash
pip install -r requirements.txt
```

## Folder And File Description

#### Repository folders and main file descrption:
1. *app.py* - Main file to execute to start web application.
2. *data/*
    * *database/* - DB schema, DB_Queries, and text file DB diagram.
    *  *formatted_data/* - formatted csv data.
    * *raw_data/* - raw excel files downloaded from FNDDS.
3. *dataMunging/* - py files to cleanup, and load data to Postgres DB.
4. *Initial Proposal/* - document of chosen topic, mockup pdf and ppt.
5. *projRequirements/* - screenshots of requirments for project.
6. *static/* - .js apps of functionality and visuals. CSS style sheet.
    * *img/* - images used in mystyle.css.


#### Flask and SQLAlchemy are used to connect to our database, and create our API's. The JSON functionality of our webpages:
***Webpages:***

* *Dashboard*: Consists of the three selections; food name, portion and category. There are seven visualizations.
* *Comparison*: Consists of four selections; two food name and portion selections. There are eight visualizations 
* *API Links*: Consist of the API used to grab the data using javascript. There are five API links.

#### Javascript shall run the functionality of our visualizations:
***Project 2: static/appOne.js and appTwo.js***

* appOne.js - Functionality for the index.html.
* appTwo.js - Functionality for the comparison.html.


## Sources
* [***Food & Nutrition Database For Dietary Studies***](https://www.ars.usda.gov/northeast-area/beltsville-md-bhnrc/beltsville-human-nutrition-research-center/food-surveys-research-group/docs/fndds-download-databases/)
 FNDDS is a database that provides the nutrient values for foods and beverages reported in What We Eat in America, the dietary intake component of the National Health and Nutrition Examination Survey.

 * [***% Daily Value***](https://www.accessdata.fda.gov/scripts/InteractiveNutritionFactsLabel/pdv.html)
 The % Daily Value (%DV) shows how much of a nutrient is in one serving of the food. The %DVs are based on the Daily Values for key nutrients, which are the amounts (in grams, milligrams, or micrograms) of nutrients recommended per day for Americans 4 years of age and older. The %DV column doesn’t add up vertically to 100%. Instead, the %DV is the percentage of the Daily Value for each nutrient in one serving of the food.


## Considerations
**Data Restriction**
Running the app and viewing the webpage initiates the page to fill up with data from the app. The data is considerably large, at about 8,000 records. This would often cause the app to crash, or freeze. We limited the amount of data being pulled from the database to the API, to about 400 records. 

To view the full dataset you must alter the query statement within the app.py, or view the data from the Postgres database.

## License
[MIT](https://choosealicense.com/licenses/mit/)