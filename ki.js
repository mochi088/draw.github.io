"use strict";

//Firebaseのデータベースを参照するオブジェクトの変数
let database;

// データベースの中からキーを指定して取り出したデータベースの変数
let myDatabase;

// 配列を宣言する
let circles = [];

// 画像の変数
let ap;
let gr;
let tree;
let can;
let bg;
let kesi;
let lem;
let mo;
let blue;
let aori;
let ora;

let coler;

// preload()関数はsetup()より前に実行されるシステム関数
function preload() {
    // 画像の読み込み
    ap = loadImage("ap.png");
    gr = loadImage("gr.png");
    tree = loadImage("tree.png");
    can = loadImage("can.png");
    bg = loadImage("bg.png");
    kesi = loadImage("kesi.png");
    lem = loadImage("lem.png");
    mo = loadImage("mo.png");
    ora = loadImage("ora.png");
    aori = loadImage("aori.png");
    blue = loadImage("blue.png");
    

}

function setup() {
    // Firebaseの設定
    const firebaseConfig = {
        apiKey: "AIzaSyBj6DHCnFOO1570QyUbUzvpLjSX8zSliuc",
        authDomain: "test-d251c.firebaseapp.com",
        databaseURL: "https://test-d251c-default-rtdb.firebaseio.com",
        projectId: "test-d251c",
        storageBucket: "test-d251c.appspot.com",
        messagingSenderId: "518198556725",
        appId: "1:518198556725:web:e8a94715610d427534997c",
        measurementId: "G-HCMNBN629R"
    };
    // Firebaseの初期化
    firebase.initializeApp(firebaseConfig);
    // データベースを参照
    database = firebase.database();
    // キーを指定して取り出す
    myDatabase = database.ref("circles");

    // データベース内のデータが更新されたときの処理
    myDatabase.on("value", (snapshot) => {
        const data = snapshot.val();

        // もしデータがあれば
        if (data) {
            // 配列にデータを取得
            circles = data;
        }
    });

    createCanvas(1000, 600);

}

function draw() {

    image(bg, 0, 0, width, height);
    image(tree, 0, 0, 500, 600);
    image(kesi, 850, 375, 50, 60);

    if (mouseIsPressed === true) {
        // 今のマウス位置から、前のマウス位置まで線を描く
        
        line(mouseX, mouseY, pmouseX, pmouseY);
        if (mouseX >= 860 && mouseX <= 890 && mouseY >= 375 && mouseY <= 430) {
            console.log("a");
            
            coler=3;
        }
    }

    for (var i = 0; i < circles.length; i++) {

        if (circles[i].fruit < 1) {
            image(ap, circles[i].xpos,
                circles[i].ypos, 50, 50);
        }
        else {
            image(gr, circles[i].xpos,
                circles[i].ypos, 50, 50);
        }

        circles[i].ypos += 2;
    }

    if (coler === 0) {
        strokeWeight(3);
        stroke(255, 0, 0);
    }
    else if (coler === 1) {
        strokeWeight(3);
        stroke(255, 0, 255);
    }
    else {
        strokeWeight(10);
        stroke(255, 255, 255);
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);
    let add = true;
    if (mouseX >= 200 && mouseX <= 300 && mouseY >= 350 && mouseY <= 500) {
        // 追加するかどうか

        if (add) {
            let fruit = random(2);

            circles[circles.length] = {
                xpos: random(80, 420),
                ypos: random(80, 300),
                fruit: fruit,
            };
        }
    }
    // for文ですべてをチェック
    for (var i = 0; i < circles.length; i++) {
        // 座標を取得
        let x = circles[i].xpos;
        let y = circles[i].ypos;
        // マウスとの距離
        let distance = dist(x, y, mouseX, mouseY);

        // マウスとの距離が半径以下なら
        if (distance < 40) {
            if (circles[i].fruit < 1) {
                coler = 0;
            }
            else {
                coler = 1;

            }
            circles.splice(i, 1);
            add = false;

            console.log(coler);
        }
    }
    //Firebaseのデータベースに送信
    myDatabase.set(circles);
}


