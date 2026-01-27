let showClosed = true;

/* ADD NOTE */
function addNote(){
  const t = document.getElementById("title").value.trim();
  const d = document.getElementById("desc").value.trim();
  if(!t) return;

  const note = document.createElement("div");
  note.className = "note";
  note.style.left = Math.random()* (window.innerWidth-250) + "px";
  note.style.top  = Math.random()* (window.innerHeight-250) + "px";

  note.innerHTML = `
    <h3>${t}</h3>
    <p>${d}</p>
    <div class="actions">
      <button onclick="closeNote(this)">CLOSE</button>
      <button onclick="removeNote(this)">REMOVE</button>
    </div>
  `;

  drag(note);
  document.body.appendChild(note);

  document.getElementById("title").value="";
  document.getElementById("desc").value="";
}

/* CLOSE */
function closeNote(btn){
  btn.closest(".note").classList.add("hidden");
}

/* REMOVE */
function removeNote(btn){
  btn.closest(".note").remove();
}

/* SHOW CLOSED */
function toggleClosed(){
  showClosed = !showClosed;
  document.querySelectorAll(".note.hidden").forEach(n=>{
    n.style.display = showClosed ? "block" : "none";
  });
}

/* DRAG - FULLY */
function drag(el){
  let offsetX=0, offsetY=0, isDown=false;

  el.addEventListener("mousedown", e=>{
    isDown=true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.zIndex=9999;
    el.style.cursor="grabbing";
  });

  document.addEventListener("mousemove", e=>{
    if(!isDown) return;
    el.style.left = e.clientX - offsetX + "px";
    el.style.top  = e.clientY - offsetY + "px";
  });

  document.addEventListener("mouseup", e=>{
    if(isDown){
      isDown=false;
      el.style.zIndex="";
      el.style.cursor="grab";
    }
  });
}

/* BACKGROUND ANIMATION */
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
c.width = window.innerWidth;
c.height = window.innerHeight;

let p = [];
for(let i=0;i<80;i++){
  p.push({
    x:Math.random()*c.width,
    y:Math.random()*c.height,
    vx:(Math.random()-.5)*0.4,
    vy:(Math.random()-.5)*0.4
  });
}

function anim(){
  ctx.clearRect(0,0,c.width,c.height);
  p.forEach(a=>{
    a.x+=a.vx; a.y+=a.vy;
    if(a.x<0||a.x>c.width) a.vx*=-1;
    if(a.y<0||a.y>c.height) a.vy*=-1;
    ctx.fillStyle="#00ff88";
    ctx.beginPath();
    ctx.arc(a.x,a.y,2,0,Math.PI*2);
    ctx.fill();
    p.forEach(b=>{
      let d = Math.hypot(a.x-b.x, a.y-b.y);
      if(d<120){
        ctx.strokeStyle="rgba(0,255,136,.15)";
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(anim);
}
anim();

/* WINDOW RESIZE */
window.addEventListener("resize", ()=>{
  c.width = window.innerWidth;
  c.height = window.innerHeight;
});
