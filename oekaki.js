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
let can;
let bg;
let kesi;
let lem;
let mo;
let blue;
let aori;
let ora;
let gif;

let coler;

function preload() {
    ap = loadImage("ap.png");
    gr = loadImage("gr.png");
    can = loadImage("can.png");
    bg = loadImage("bg.png");
    kesi = loadImage("kesi.png");
    lem = loadImage("lem.png");
    mo = loadImage("mo.png");
    ora = loadImage("ora.png");
    aori = loadImage("aori.png");
    blue = loadImage("blue.png");
    gif=loadImage("tree.gif");


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

    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    myDatabase = database.ref("circles");
    myDatabase.on("value", (snapshot) => {
        const data = snapshot.val();

        if (data) {
            circles = data;
        }

    });

    createCanvas(1000, 600);
    background(255,255,255);
    image(bg, 0, 0, width, height);
}


function draw() {
    image(bg, 0, 0, width, height);
    image(kesi, 850, 375, 50, 60);
    image(gif, 0, 0, 500, 600);

    if (mouseIsPressed === true) {

        line(mouseX, mouseY, pmouseX, pmouseY);
        if (mouseX >= 860 && mouseX <= 890 && mouseY >= 375 && mouseY <= 430) {
            console.log("a");
            coler = 7;
        }

    }

    for (var i = 0; i < circles.length; i++) {
        switch (circles[i].fruit) {
            case 0:
                image(ap, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 1:
                image(gr, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 2:
                image(aori, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 3:
                image(lem, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 4:
                image(blue, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 5:
                image(mo, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

            case 6:
                image(ora, circles[i].xpos, circles[i].ypos, 50, 50);
                break;

        }
        circles[i].ypos += 2;
    }

    switch (coler) {
        case 0:
            strokeWeight(3);
            stroke(255, 0, 0);
            break;

        case 1:
            strokeWeight(3);
            stroke(160, 0, 255);
            break;

        case 2:
            strokeWeight(3);
            stroke(0, 255, 0);
            break;

        case 3:
            strokeWeight(3);
            stroke(255, 255, 0);
            break;

        case 4:
            strokeWeight(3);
            stroke(0, 0, 255);
            break;

        case 5:
            strokeWeight(3);
            stroke(255, 130, 255);
            break;

        case 6:
            strokeWeight(3);
            stroke(255, 120, 0);
            break;

        default:
            strokeWeight(10);
            stroke(255, 255, 255);
            break;
    }

}


function mousePressed() {
    let add = true;
    if (mouseX >= 200 && mouseX <= 300 && mouseY >= 350 && mouseY <= 500) {
        let fruit = int(random(7));
        if (add) {
            circles[circles.length] = {
                xpos: random(80, 420),
                ypos: random(80, 300),
                fruit: fruit,
            };
        }
    }

    for (var i = 0; i < circles.length; i++) {

        let x = circles[i].xpos;
        let y = circles[i].ypos;
        let distance = dist(x, y, mouseX, mouseY);

        if (distance < 40) {
            switch (circles[i].fruit) {
                case 0:
                    coler = 0;
                    break;

                case 1:
                    coler = 1;
                    break;

                case 2:
                    coler = 2;
                    break;

                case 3:
                    coler = 3;
                    break;

                case 4:
                    coler = 4;
                    break;

                case 5:
                    coler = 5;
                    break;

                case 6:
                    coler = 6;
                    break;

            }

            circles.splice(i, 1);
            add = false;

        }
    }
    myDatabase.set(circles);
}



