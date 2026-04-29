function show(id){
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

/* QUESTIONS */
let preQuestions = [
    {q:"∬1 dA gives?", a:"Area"},
];

let postQuestions = [
    {q:"∬x dA over unit square?", a:"0.5"},
];

function loadQuestions(){
    document.getElementById("preQ").innerHTML =
        preQuestions.map((q,i)=>`${q.q}<input id="pre${i}"><br>`).join("");

    document.getElementById("postQ").innerHTML =
        postQuestions.map((q,i)=>`${q.q}<input id="post${i}"><br>`).join("");
}

function submitPre(){
    alert("Submitted!");
}
function submitPost(){
    alert("Submitted!");
}

/* INTEGRATION */
function solve(){
    let fStr = document.getElementById("func").value;
    let x1 = parseFloat(document.getElementById("x1").value);
    let x2 = parseFloat(document.getElementById("x2").value);
    let y1Str = document.getElementById("y1").value;
    let y2Str = document.getElementById("y2").value;

    let f = (x,y)=>math.evaluate(fStr,{x,y});
    let y1=(x)=>math.evaluate(y1Str,{x});
    let y2=(x)=>math.evaluate(y2Str,{x});

    let sum=0, n=40;

    for(let i=0;i<n;i++){
        let x=x1+(x2-x1)*i/n;
        for(let j=0;j<n;j++){
            let y=y1(x)+(y2(x)-y1(x))*j/n;
            sum+=f(x,y);
        }
    }

    document.getElementById("output").innerHTML="Result ≈ "+sum.toFixed(4);

    drawGraph(fStr,x1,x2);
}

/* GRAPH */
function drawGraph(fStr,x1,x2){
    let x=[],y=[],z=[];
    for(let i=0;i<30;i++){
        let row=[];
        let xi=x1+(x2-x1)*i/30;
        x.push(xi);
        for(let j=0;j<30;j++){
            let yj=j/10;
            if(i===0) y.push(yj);
            row.push(math.evaluate(fStr,{x:xi,y:yj}));
        }
        z.push(row);
    }

    Plotly.newPlot("graph",[{
        z:z,x:x,y:y,type:"surface"
    }]);
}

/* FEEDBACK */
function saveFeedback(){
    let fb=document.getElementById("fb").value;
    localStorage.setItem("feedback",fb);
    alert("Saved!");
}

window.onload=loadQuestions;
