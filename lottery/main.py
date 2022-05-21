from flask import Flask, render_template, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')
#威力彩查詢
@app.route('/lottery0.html', methods=['GET'])
def lottery0():
    url = 'https://www.taiwanlottery.com.tw/'
    res = requests.get(url)
    html = BeautifulSoup(res.text, "html.parser")
    #找出威力彩的位置
    lottery=html.findAll('div',class_='contents_box02')[0]
    #找出日期與期號
    date = lottery.find('span',class_='font_black15').text.split("\xa0")[0]
    title = lottery.find('span',class_='font_black15').text.split("\xa0")[1]
    #找出號碼
    nums = lottery.findAll('div',class_='ball_tx ball_green')
    numList=[]
    for i in range(6,12):
        num=nums[i].text
        numList.append(int(num))
    #找出特別號
    specialNum=int(lottery.find('div',class_='ball_red').text)
    #建立字典
    data ={
        'title': title,
        'date': date,
        'numList': numList,
        'specialNum': specialNum
    }
    return render_template('lottery0.html',data=data)

@app.route('/lottery1.html', methods=['GET'])
def lottery1():
    url = 'https://www.taiwanlottery.com.tw/'
    res = requests.get(url)
    html = BeautifulSoup(res.text, "html.parser")
    #找出大樂透的位置
    lottery=html.findAll('div',class_='contents_box02')[2]
    #找出日期與期號
    date = lottery.find('span',class_='font_black15').text.split("\xa0")[0]
    title = lottery.find('span',class_='font_black15').text.split("\xa0")[1]
    #找出號碼
    nums = lottery.findAll('div',class_='ball_tx ball_yellow')
    numList=[]
    for i in range(6,12):
        num=nums[i].text
        numList.append(int(num))
    #找出特別號
    specialNum=int(lottery.find('div',class_='ball_red').text)
    #建立字典
    data ={
        'title': title,
        'date': date,
        'numList': numList,
        'specialNum': specialNum
    }
    return render_template('lottery0.html',data=data)

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080,
    debug=True)