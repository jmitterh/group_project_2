import pandas as pd
import pandas.io.sql as pdsql
import time
from sqlalchemy import create_engine
import datetime
from datetime import timedelta
import multiprocessing
from config import pg_user, pg_password, db_name

connection_string = f"{pg_user}:{pg_password}@localhost:5432/{db_name}"
engine = create_engine(f'postgresql://{connection_string}')

df  = pdsql.read_sql("SELECT main_food_description FROM %s" % ('nutrientvalue'), engine)
df2 = pdsql.read_sql("SELECT * FROM %s" % ('portionsandweights'), engine)

df=df.to_json(orient='table')
print(df)

#print(df.columns)

#df=df.to_json(orient='split')
#print(df)
#print(df2)