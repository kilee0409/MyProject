from flask import Flask, request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import requests
from bs4 import BeautifulSoup
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import *
import time

app = Flask(__name__)
#linebot setting
# 必須放上你的 Channel Access Token
line_bot_api = LineBotApi("T1xHJEQD3GUSiE8RmZrzugJWzBHB5mERY+Dh/wP3ZAG1EqQe/conlOwnASk7364XWGe1m3UPqQ92wemJvpHlr6Kd9S+BOYhVSN7CgAFC0Op2uV2GwtaLOkdy/GqXQdMGD2mBF2NmdXXpOQDvqY70BgdB04t89/1O/w1cDnyilFU=")
# 必須放上你的 Channel Secret
handler = WebhookHandler("44cc09b51d6e79f3143adbccaa0008fd")
# 必須放上你的 User ID
line_bot_api.push_message("U69d3ad3ce695eaa09b95ac45538d28f3", TextSendMessage(text="樂透資料已更新"))

firebase_admin.initialize_app()
db = firestore.client()

help_txt = """
樂透兌獎聊天機器人
---------------------------
使用教學：

指令 樂透代碼 期號
---------------------------
例：查詢 lottery0 111000028

便會回傳威力彩該期的開獎資料
---------------------------
樂透代號：

lottery0 威力彩
lottery1 大樂透
---------------------------
目前支援的指令有：

1. 查詢  搜尋該彩票的該期開獎號碼
2. 教學  顯示教學 
"""
#查找資料是否在firebase，沒有就立刻爬取資料
def createReplyMessge(sid,title):
    doc = db.collection(f"{sid}").document(f"第{title}期").get()
    
    if doc.to_dict() ==None:
        if sid == lottery0:
            data=lottery0()
        elif sid== lottery1:
            data=lottery1()
    else:
        data=doc.to_dict()
        
    replyCheckMessage = ("樂透兌獎機器人\n\n"
                         f"開獎期號：{data['title']}\n"
                         f"開獎日期：{data['date']} \n"
                         f"開獎號碼：{data['numList']} \n"
                         f"特別號：{data['specialNum']} \n")
    return replyCheckMessage
    
#訊息處理，將用戶輸入的指令用split分割提取指令
@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    if "查詢" in event.message.text: 
        sid = event.message.text.split()[1]
        title = event.message.text.split()[2]
        line_bot_api.reply_message(
            event.reply_token,
            TextMessage(text=createReplyMessge(sid,title), type="text")
        )
        # 若使用者輸入“help” 或 “教學”，顯示教學訊息
    elif "help" in event.message.text or "教學" in event.message.text:
        line_bot_api.reply_message(
            event.reply_token,
            TextMessage(text=help_txt, type="text")
        )
#威力彩資料
def lottery0():
    url = 'https://www.taiwanlottery.com.tw/'
    res = requests.get(url)
    html = BeautifulSoup(res.text, "html.parser")
    #找出威力彩的位置
    lottery=html.findAll('div',class_='contents_box02')[0]
    #找出日期與期號
    date = lottery.find('span',class_='font_black15').text.split("\xa0")[0]
    title = lottery.find('span',class_='font_black15').text.split("\xa0")[1].rstrip()
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
    return data
#大樂透資料
def lottery1():
    url = 'https://www.taiwanlottery.com.tw/'
    res = requests.get(url)
    html = BeautifulSoup(res.text, "html.parser")
    #找出大樂透的位置
    lottery=html.findAll('div',class_='contents_box02')[2]
    #找出日期與期號
    date = lottery.find('span',class_='font_black15').text.split("\xa0")[0]
    title = lottery.find('span',class_='font_black15').text.split("\xa0")[1].rstrip()
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
    return data

# 監聽所有來自 /callback 的 Post Request
@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'

        
@app.route("/")
def index():
    return "Hello Flask Web Crawler!"

#將資料寫入firebase
@app.route('/get_lottery_data', methods=['GET'])
def get_lottery_data():   
    #威力彩寫入
    data_0 = lottery0()
    db.collection("lottery0").document(f"{data_0['title']}").set(data_0)
    #大樂透寫入
    data_1 = lottery1()
    db.collection("lottery1").document(f"{data_1['title']}").set(data_1)
    return "威力彩與大樂透資料截取完畢!"

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=8080, debug=false)