# -*- coding: utf-8 -*-
import io
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from flask import Flask, send_file
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/',methods=["GET","POST"])
def hello():
    image = io.BytesIO()
    x = np.linspace(0, 10)
    y = np.sin(x)
    plt.plot(x, y)
    plt.savefig(image, format='png')
    image.seek(0)
    return send_file(image,
                     attachment_filename="image.png",
                     as_attachment=True)

if __name__ == "__main__":
    app.run(host='127.0.0.1',debug=True)