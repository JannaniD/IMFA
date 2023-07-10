from flask import Flask, render_template, redirect, request, flash
from werkzeug.utils import secure_filename
import os

# import magic
import urllib.request
from datetime import datetime

app = Flask(__name__)

name = []
phone = []


app.secret_key = "caircocoders-ednalan"

UPLOAD_FOLDER = "imfa\\flask\\static\\uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ALLOWED_EXTENSIONS = set(["png", "jpg", "jpeg", "gif"])


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/", methods=["POST", "GET"])
def index():
    uname = request.args.get("username")
    uphone = request.args.get("phone")
    print(uname)
    name.append(uname)
    phone.append(uphone)
    print(name)
    return render_template("index.html")


@app.route("/upload", methods=["POST", "GET"])
def upload():
    now = datetime.now()
    if request.method == "POST":
        files = request.files.getlist("files[]")
        # print(files)
        i = 1
        for file in files:
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                print(name[-1])
                namenow = filename[: filename.index(".")]
                filename = filename.replace(namenow, str(i))
                i += 1

                try:
                    os.mkdir(os.path.join(app.config["UPLOAD_FOLDER"], name[-1]))
                except:
                    pass
                file.save(os.path.join(app.config["UPLOAD_FOLDER"], name[-1], filename))

            print(file)
        flash("File(s) successfully uploaded")
    return redirect(
        "http://localhost:5000/signup4.html?mode=1&username=" + name[-1]+ "&phone="+ phone[-1]
    )


if __name__ == "__main__":
    app.run(debug=True, port=5555)
