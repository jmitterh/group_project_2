import numpy as np
import os

import requests

# used this for function in api_func
from decimal import Decimal

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

import pandas.io.sql as pdsql

from config import pg_user, pg_password, db_name

from flask import Flask, jsonify, render_template

#################################################
# Database Setup
##################################################

connection_string = f"{pg_user}:{pg_password}@localhost:5432/{db_name}"
engine = create_engine(f'postgresql://{connection_string}')

engine.table_names()

# reflect an existing database into a new model
Base = automap_base()
Base.prepare(engine, reflect=True)

# Save reference to the tables
NutrientValue = Base.classes.nutrientvalue
PortionsAndWeight = Base.classes.portionsandweights
Category = Base.classes.category
DescriptionCategory = Base.classes.descriptioncategory
DailyValue = Base.classes.dailyvalue

# Open a communication session with the database
session = Session(engine)

# Query all tables
nutrientValues = session.query(NutrientValue).all()
portionsAndWeights = session.query(PortionsAndWeight).all()
categories = session.query(Category).all()
descriptionCategories = session.query(DescriptionCategory).all()
dailyValues = session.query(DailyValue).all()

# close the session to end the communication with the database
session.close()


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
    df = pdsql.read_sql("SELECT * FROM nutrientvalue", engine)
    df.set_index('food_code', inplace=True)
    df = df.to_json(orient='table')

    return df


@app.route('/portionsandweights')
def portionsandweights():

    df = pdsql.read_sql("SELECT * FROM portionsandweights", engine)
    df.set_index('food_code', inplace=True)
    df = df.to_json(orient='table')

    return df

@app.route('/descriptioncategory')
def descriptioncategory():

    df = pdsql.read_sql("SELECT * FROM descriptioncategory", engine)
    df.set_index('wweia_category_code', inplace=True)
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
