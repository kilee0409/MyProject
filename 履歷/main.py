from flask import Flask, render_template, request,make_response
import requests

app = Flask(
    __name__,
      static_folder="static",
    static_url_path="/static"
    )

@app.route("/")
def index():
    return render_template("resume.html")

if __name__ == "__main__":
    app.run()


