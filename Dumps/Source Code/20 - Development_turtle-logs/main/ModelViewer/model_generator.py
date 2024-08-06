from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import urllib
from urllib.request import urlretrieve

from flask import Flask
from flask import send_file
from flask import Response
import os
import os.path
import re

app = Flask(__name__)
working_dir = currentDirectory = os.getcwd()
allowed_models = [
    "humanfemale",
    "humanmale",
    "gnomefemale",
    "gnomemale",
    "nightelffemale",
    "nightelfmale",
    "draeneifemale",
    "draeneimale",
    "dwarffemale",
    "dwarfmale",
    "orcfemale",
    "orcmale",
    "trollfemale",
    "trollmale",
    "taurenfemale",
    "taurenmale",
    "scourgefemale",
    "scourgemale",
    "bloodelffemale",
    "bloodelfmale",
    "goblinfemale",
    "goblinmale"
]

allowed_item_chars=re.compile(r'[^0-9,X]')

@app.route('/model_viewer/<model>/<int:sk>/<int:ha>/<int:hc>/<int:fa>/<int:fh>', defaults={'items': ""})
@app.route('/model_viewer/<model>/<int:sk>/<int:ha>/<int:hc>/<int:fa>/<int:fh>/', defaults={'items': ""})
@app.route('/model_viewer/<model>/<int:sk>/<int:ha>/<int:hc>/<int:fa>/<int:fh>/<items>')
def get_model(model, sk, ha, hc, fa, fh, items):
    if model not in allowed_models:
        return Response(status=404)

    if bool(allowed_item_chars.search(items)):
        return Response(status=404)

    model_name = model + "_" + str(sk) + "_" + str(ha) + "_" + str(hc) + "_" + str(fa) + "_" + str(fh) + "_" + items + ".jpg"

    if os.path.isfile(working_dir + "/models/" + model_name):
        return send_file(working_dir + "/models/" + model_name, mimetype='image/jpg')

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--window-size=500,1500")
    options.add_argument("--disable-web-security")
    options.add_argument("--allow-file-access-from-files")
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option('useAutomationExtension', False)
    driver = webdriver.Chrome(options=options, executable_path=r'/usr/bin/chromedriver', service_args=["--log-path=./logs"])
    driver.implicitly_wait(300)
    viewer_file_path = "file://" + working_dir + "/viewer/index.html?model="+model+"&sk="+str(sk)+"&ha="+str(ha)+"&hc="+str(hc)+"&fa="+str(fa)+"&fh="+str(fh)+"&items="+items
    driver.get(viewer_file_path)

    try:
        image = driver.find_element_by_id("result_image")
        src = image.get_attribute("src")
        urlretrieve(src, working_dir + "/models/" + model_name)
    finally:
        driver.quit()

    return send_file(working_dir + "/models/" + model_name, mimetype='image/jpg')

app.run(port = 5555)