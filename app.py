from sqlalchemy import create_engine
from sqlalchemy.orm import Session
import psycopg2
from config import db_password
from flask import Flask, render_template, url_for, jsonify
import pandas as pd

app = Flask(__name__)

connection_string = f"postgresql://postgres:{db_password}@127.0.0.1:5432/log_data"
engine = create_engine(connection_string)
@app.route("/")
def index():
  return render_template("index.html")

@app.route("/api/all")
def get_all():
  res = engine.execute("select * from log_data").fetchall()
  res_df = pd.DataFrame(res)
  res_df.columns = ["Closing_User_ID","Severity","Type","Created","Closed",	"Close_Reason","Open_Duration"]
  new_df = res_df.groupby("Closing_User_ID")["Closed"].count().reset_index()
  new_df.columns = ["Ticket Closed by", "# of Tickets"]
  
  print(new_df)
  # return {"Ticket Closed by":list(new_df["Ticket Closed by"]),
  # "# of Tickets":list(new_df["# of Tickets"])
  
  # }
  return jsonify(tickets_closed_by=list(new_df["Ticket Closed by"]),num_tickets=list(new_df["# of Tickets"]))



if __name__ == "__main__":
  app.run()
