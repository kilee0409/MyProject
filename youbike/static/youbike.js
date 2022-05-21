document.addEventListener("onload", getData());
//宣告各區資料存放區
let sarea100 = [];
let sarea103 = [];
let sarea104 = [];
let sarea105 = [];
let sarea106 = [];
let sarea108 = [];
let sarea110 = [];
let sarea111 = [];
let sarea112 = [];
let sarea114 = [];
let sarea115 = [];
let sarea116 = [];

function getData() {
  let url =
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";
  fetch(url)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      /*區域 sarea
            站點 sna
            地址 ar
            總停車格 tot
            可借車位數 sbi
            可還車位數 bemp
            時間 updateTime
            */
      for (let i = 0; i < data.length; i++) {
        //區域 sarea
        let sarea = data[i].sarea;
        // 將所需的資料整理成json
        function pushSareaData() {
          let sareaData = {
            sarea: data[i].sarea,
            sna: data[i].sna.slice(11, data[i].sna.length),
            ar: data[i].ar,
            //總停車格 tot
            tot: data[i].tot,
            //可借車位數 sbi
            sbi: data[i].sbi,
            //可還車位數 bemp
            bemp: data[i].bemp,
            //時間 updateTime
            updateTime: data[i].updateTime,
          };
          return sareaData;
        }
        //比對區域如符合則push 進入 array中
        if (sarea == "中正區") {
          let sareaData = pushSareaData();
          sarea100.push(sareaData);
        } else if (sarea == "大同區") {
          let sareaData = pushSareaData();
          sarea103.push(sareaData);
        } else if (sarea == "中山區") {
          let sareaData = pushSareaData();
          sarea104.push(sareaData);
        } else if (sarea == "松山區") {
          let sareaData = pushSareaData();
          sarea105.push(sareaData);
        } else if (sarea == "大安區") {
          let sareaData = pushSareaData();
          sarea106.push(sareaData);
        } else if (sarea == "萬華區") {
          let sareaData = pushSareaData();
          sarea108.push(sareaData);
        } else if (sarea == "信義區") {
          let sareaData = pushSareaData();
          sarea110.push(sareaData);
        } else if (sarea == "士林區") {
          let sareaData = pushSareaData();
          sarea111.push(sareaData);
        } else if (sarea == "北投區") {
          let sareaData = pushSareaData();
          sarea112.push(sareaData);
        } else if (sarea == "內湖區") {
          let sareaData = pushSareaData();
          sarea114.push(sareaData);
        } else if (sarea == "南港區") {
          let sareaData = pushSareaData();
          sarea115.push(sareaData);
        } else if (sarea == "文山區") {
          let sareaData = pushSareaData();
          sarea116.push(sareaData);
        }
      }
    });
}
// 區域選取
let area = document.querySelector("#area");

function getArea() {
  //區域 sarea
  let sarea;
  //站點 sna
  let sna;
  //地址 ar
  let ar;
  //總停車格 tot
  let tot;
  //可借車位數 sbi
  let sbi;
  //可還車位數 bemp
  let bemp;
  //時間 updateTime
  let updateTime;

  function putData() {
    //創建新的div 放入 show 中
    let div = document.createElement("div");
    div.setAttribute("class", "data col border-bottom border-info");
    show.appendChild(div);
    //div 裏面加入取得的data
    div.innerHTML =
      "<p>" +
      "區域: " +
      sarea +
      "</p>" +
      "<p>" +
      "站點: " +
      sna +
      "</p>" +
      "<p>" +
      "地址: " +
      ar +
      "</p>" +
      "<p>" +
      "總停車位: " +
      tot +
      "</p>" +
      "<p>" +
      "可借車位： " +
      sbi +
      "</p>" +
      "<p>" +
      "可還車位： " +
      bemp +
      "</p>" +
      "<p>" +
      "更新時間： " +
      updateTime +
      "</p>";
  }

  if (area.value == "100") {
    clearShow();
    for (let i = 0; i < sarea100.length; i++) {
      sarea = sarea100[i].sarea;
      sna = sarea100[i].sna;
      ar = sarea100[i].ar;
      tot = sarea100[i].tot;
      sbi = sarea100[i].sbi;
      bemp = sarea100[i].bemp;
      updateTime = sarea100[i].updateTime;
      putData();
    }
  } else if (area.value == "103") {
    clearShow();
    for (let i = 0; i < sarea103.length; i++) {
      sarea = sarea103[i].sarea;
      sna = sarea103[i].sna;
      ar = sarea103[i].ar;
      tot = sarea103[i].tot;
      sbi = sarea103[i].sbi;
      bemp = sarea103[i].bemp;
      updateTime = sarea103[i].updateTime;
      putData();
    }
  } else if (area.value == "104") {
    clearShow();
    for (let i = 0; i < sarea104.length; i++) {
      sarea = sarea104[i].sarea;
      sna = sarea104[i].sna;
      ar = sarea104[i].ar;
      tot = sarea104[i].tot;
      sbi = sarea104[i].sbi;
      bemp = sarea104[i].bemp;
      updateTime = sarea104[i].updateTime;
      putData();
    }
  } else if (area.value == "105") {
    clearShow();
    for (let i = 0; i < sarea105.length; i++) {
      sarea = sarea105[i].sarea;
      sna = sarea105[i].sna;
      ar = sarea105[i].ar;
      tot = sarea105[i].tot;
      sbi = sarea105[i].sbi;
      bemp = sarea105[i].bemp;
      updateTime = sarea105[i].updateTime;
      putData();
    }
  } else if (area.value == "106") {
    clearShow();
    for (let i = 0; i < sarea106.length; i++) {
      sarea = sarea106[i].sarea;
      sna = sarea106[i].sna;
      ar = sarea106[i].ar;
      tot = sarea106[i].tot;
      sbi = sarea106[i].sbi;
      bemp = sarea106[i].bemp;
      updateTime = sarea106[i].updateTime;
      putData();
    }
  } else if (area.value == "108") {
    clearShow();
    for (let i = 0; i < sarea108.length; i++) {
      sarea = sarea108[i].sarea;
      sna = sarea108[i].sna;
      ar = sarea108[i].ar;
      tot = sarea108[i].tot;
      sbi = sarea108[i].sbi;
      bemp = sarea108[i].bemp;
      updateTime = sarea108[i].updateTime;
      putData();
    }
  } else if (area.value == "110") {
    clearShow();
    for (let i = 0; i < sarea110.length; i++) {
      sarea = sarea110[i].sarea;
      sna = sarea110[i].sna;
      ar = sarea110[i].ar;
      tot = sarea110[i].tot;
      sbi = sarea110[i].sbi;
      bemp = sarea110[i].bemp;
      updateTime = sarea110[i].updateTime;
      putData();
    }
  } else if (area.value == "111") {
    clearShow();
    for (let i = 0; i < sarea111.length; i++) {
      sarea = sarea111[i].sarea;
      sna = sarea111[i].sna;
      ar = sarea111[i].ar;
      tot = sarea111[i].tot;
      sbi = sarea111[i].sbi;
      bemp = sarea111[i].bemp;
      updateTime = sarea111[i].updateTime;
      putData();
    }
  } else if (area.value == "112") {
    clearShow();
    for (let i = 0; i < sarea112.length; i++) {
      sarea = sarea112[i].sarea;
      sna = sarea112[i].sna;
      ar = sarea112[i].ar;
      tot = sarea112[i].tot;
      sbi = sarea112[i].sbi;
      bemp = sarea112[i].bemp;
      updateTime = sarea112[i].updateTime;
      putData();
    }
  } else if (area.value == "114") {
    clearShow();
    for (let i = 0; i < sarea114.length; i++) {
      sarea = sarea114[i].sarea;
      sna = sarea114[i].sna;
      ar = sarea114[i].ar;
      tot = sarea114[i].tot;
      sbi = sarea114[i].sbi;
      bemp = sarea114[i].bemp;
      updateTime = sarea114[i].updateTime;
      putData();
    }
  } else if (area.value == "115") {
    clearShow();
    for (let i = 0; i < sarea115.length; i++) {
      sarea = sarea115[i].sarea;
      sna = sarea115[i].sna;
      ar = sarea115[i].ar;
      tot = sarea115[i].tot;
      sbi = sarea115[i].sbi;
      bemp = sarea115[i].bemp;
      updateTime = sarea115[i].updateTime;
      putData();
    }
  } else if (area.value == "116") {
    clearShow();
    for (let i = 0; i < sarea116.length; i++) {
      sarea = sarea116[i].sarea;
      sna = sarea116[i].sna;
      ar = sarea116[i].ar;
      tot = sarea116[i].tot;
      sbi = sarea116[i].sbi;
      bemp = sarea116[i].bemp;
      updateTime = sarea116[i].updateTime;
      putData();
    }
  }
}
//刷新
function reload() {
  location.reload();
}
//清空畫面
function clearShow() {
  if (show.childElementCount > 0) {
    let datas = document.querySelectorAll(".data");
    let datas_pn = datas.parentNode;
    for (let i = 0; i < datas.length; i++) {
      let data = document.querySelector(".data");
      let pn = data.parentNode;
      pn.removeChild(data);
    }
  }
}
