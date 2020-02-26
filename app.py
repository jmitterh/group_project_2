import numpy as np
import os
import requests
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import pandas.io.sql as pdsql
from config import pg_user, pg_password, db_name
from flask import Flask, jsonify, render_template, abort, redirect

#################################################
# Database Setup
##################################################

connection_string = f"{pg_user}:{pg_password}@localhost:5432/{db_name}"
engine = create_engine(f'postgresql://{connection_string}')

# checking the table names
engine.table_names()


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/comparison")
def comparison():
    return render_template("comparison.html")


@app.route('/nutrientvalue')
def nutrientvalue():
    sqlStatement = """
    SELECT food_code, main_food_description FROM nutrientvalue
    
    WHERE food_code BETWEEN 11000000 AND 13120120
    ORDER BY main_food_description;
    """
    df = pdsql.read_sql(sqlStatement, engine)
    df.set_index('food_code', inplace=True)
    df = df.to_json(orient='table')

    return df


@app.route('/portionsandweights')
def portionsandweights():
    sqlStatement = """
    SELECT n.food_code, n.main_food_description, p.seq_num,p.portion_description, p.portion_weight_g, n.energy_kcal, n.protein_g, n.carbohydrate_g, n.sugars_total_g, n.fiber_total_dietary_g, n.total_fat_g, n.fatty_acids_total_saturated_g, n.fatty_acids_total_monounsaturated_g, n.fatty_acids_total_polyunsaturated_g, n.cholesterol_mg, n.retinol_mcg, n.vitamin_a_rae_mcg_rae, n.carotene_alpha_mcg, n.carotene_beta_mcg, n.cryptoxanthin_beta_mcg, n.lycopene_mcg, n.lutein__zeaxanthin_mcg, n.thiamin_mg, n.riboflavin_mg, n.niacin_mg, n.vitamin_b6_mg, n.folic_acid_mcg, n.folate_food_mcg, n.folate_dfe_mcg_dfe, n.folate_total_mcg, n.choline_total_mg, n.vitamin_b12_mcg, n.vitamin_b12_added_mcg, n.vitamin_c_mg, n.vitamin_d_d2__d3_mcg, n.vitamin_e_alphatocopherol_mg, n.vitamin_e_added_mg, n.vitamin_k_phylloquinone_mcg, n.calcium_mg, n.phosphorus_mg, n.magnesium_mg, n.iron_mg, n.zinc_mg, n.copper_mg, n.selenium_mcg, n.potassium_mg, n.sodium_mg, n.caffeine_mg, n.theobromine_mg, n.alcohol_g, n.water_g
    FROM nutrientvalue AS n 
    INNER JOIN portionsandweights AS p
    ON n.food_code = p.food_code
    WHERE n.food_code BETWEEN 11000000	AND 13120120
    AND p.portion_weight_g > 0
    AND p.portion_description != 'Quantity not specified'
    ORDER BY main_food_description
    """
    df = pdsql.read_sql(sqlStatement, engine)
    df.set_index('food_code', inplace=True)
    df = df.to_json(orient='table')

    return df


@app.route('/descriptioncategory')
def descriptioncategory():
    sqlStatment = """
    SELECT d.category_num, n.main_food_description,c.category, d.wweia_category_code, p.wweia_category_description, p.portion_description, p.portion_weight_g, n.energy_kcal, n.protein_g, n.sugars_total_g, n.carbohydrate_g, n.total_fat_g
    FROM nutrientvalue AS n
    INNER JOIN portionsandweights AS p
    ON n.food_code = p.food_code
    INNER JOIN descriptioncategory AS d
    ON n.wweia_category_code = d.wweia_category_code
    INNER JOIN category AS c
    ON d.category_num = c.category_num
    """

    df = pdsql.read_sql(sqlStatment, engine)
    df.set_index('category', inplace=True)
    df = df.to_json(orient='table')

    return df


@app.route('/category')
def category():

    df = pdsql.read_sql("SELECT * FROM category", engine)
    df.set_index('category_num', inplace=True)
    df = df.to_json(orient='table')

    return df


@app.route('/dailyvalue')
def dailyvalue():

    df = pdsql.read_sql("SELECT * FROM dailyvalue", engine)
    df.set_index('dv_id', inplace=True)
    df = df.to_json(orient='table')

    return df


if __name__ == '__main__':
    app.run(debug=True)
