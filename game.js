'use strict';
// 課本第五課〈翹翹板〉內容
const SYMBOLS=['ㄋ','ㄍ','ㄞ','ㄥ','ㄧㄚ','ㄧㄡ','ㄧㄤ'];
const SAY={'ㄋ':'呢','ㄍ':'哥','ㄞ':'哀','ㄥ':'鞥','ㄧㄚ':'鴨','ㄧㄡ':'優','ㄧㄤ':'央'};
const WORDS=[
 {w:'翹翹板',z:'ㄑㄧㄠˋ ㄑㄧㄠˋ ㄅㄢˇ',e:'🎠'},
 {w:'好朋友',z:'ㄏㄠˇ ㄆㄥˊ ㄧㄡˇ',e:'🧑‍🤝‍🧑'},
 {w:'一起',z:'ㄧˋ ㄑㄧˇ',e:'🤝'},
 {w:'來玩',z:'ㄌㄞˊ ㄨㄢˊ',e:'🎈'},
 {w:'上上下下',z:'ㄕㄤˋ ㄕㄤˋ ㄒㄧㄚˋ ㄒㄧㄚˋ',e:'↕️'},
 {w:'高高低低',z:'ㄍㄠ ㄍㄠ ㄉㄧ ㄉㄧ',e:'⛰️'},
 {w:'好像小鳥',z:'ㄏㄠˇ ㄒㄧㄤˋ ㄒㄧㄠˇ ㄋㄧㄠˇ',e:'🐦'},
 {w:'飛',z:'ㄈㄟ',e:'🕊️'}];
const COMBOS=[{a:'ㄧ',b:'ㄚ'},{a:'ㄧ',b:'ㄡ'},{a:'ㄧ',b:'ㄤ'}];
const PARTS=['ㄧ','ㄚ','ㄡ','ㄤ','ㄞ','ㄥ'];
const app=document.getElementById('app'),fx=document.getElementById('fx');
let stars=+(localStorage.getItem('zyStars')||0);
const shuffle=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(v=>v[1]);
const pick=(arr,n,inc)=>shuffle([inc,...shuffle(arr.filter(x=>x!==inc)).slice(0,n-1)]);
function speak(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='zh-TW';u.rate=.8;
 const v=speechSynthesis.getVoices().find(v=>/zh[-_]TW/i.test(v.lang));if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}}
function showStars(){document.getElementById('stars').textContent='⭐ '+stars}
function good(next){stars++;localStorage.setItem('zyStars',stars);showStars();
 const m=['🌟','🎉','👍','💯','🥳'][Math.floor(Math.random()*5)];
 fx.innerHTML='<div class="pop">'+m+'</div>';speak(['好棒','答對了','你好厲害'][Math.floor(Math.random()*3)]);setTimeout(()=>{fx.innerHTML='';next()},1100)}
function bad(el){el.classList.remove('wrong');void el.offsetWidth;el.classList.add('wrong');speak('再試一次')}
function btn(cls,txt,fn){const b=document.createElement('button');b.className=cls;b.textContent=txt;b.onclick=fn;return b}
function menu(){app.innerHTML='<div class="big">🐰🐱🐦</div>';const m=document.createElement('div');m.className='menu';
 m.append(btn('c1','🔊 聽音找注音',listen),btn('c2','🔗 詞語配對',match),btn('c3','🧩 拼拼看',build),btn('c4','✏️ 描寫練習',trace));app.append(m)}
function listen(){const ans=SYMBOLS[Math.floor(Math.random()*SYMBOLS.length)];
 app.innerHTML='';app.append(btn('play','🔊',()=>speak(SAY[ans])));const o=document.createElement('div');o.className='opts';
 pick(SYMBOLS,4,ans).forEach(s=>o.append(btn('opt',s,e=>s===ans?(e.target.classList.add('right'),good(listen)):bad(e.target))));
 app.append(o);setTimeout(()=>speak(SAY[ans]),300)}
function match(){const ans=WORDS[Math.floor(Math.random()*WORDS.length)];
 app.innerHTML='';const q=btn('q',ans.e+' '+ans.w,()=>speak(ans.w));app.append(q);const o=document.createElement('div');o.className='opts';
 pick(WORDS,3,ans).forEach(w=>o.append(btn('opt zy',w.z,e=>w===ans?(e.currentTarget.classList.add('right'),good(match)):bad(e.currentTarget))));
 app.append(o);speak(ans.w)}
function build(){const c=COMBOS[Math.floor(Math.random()*COMBOS.length)],t=c.a+c.b;let got=[];
 app.innerHTML='';app.append(btn('play','🔊 '+t,()=>speak(SAY[t])));
 const sl=document.createElement('div');sl.className='slots';sl.innerHTML='<div class="slot"></div><div class="slot"></div>';app.append(sl);
 const o=document.createElement('div');o.className='opts';
 shuffle(PARTS).forEach(p=>o.append(btn('opt',p,e=>{const need=got.length?c.b:c.a;
  if(p===need){sl.children[got.length].textContent=p;got.push(p);speak(SAY[p]||'衣');if(got.length===2)good(build)}else bad(e.target)})));
 app.append(o);speak(SAY[t])}
function trace(){let cur=SYMBOLS[0];app.innerHTML='';const r=document.createElement('div');r.className='row';
 SYMBOLS.forEach(s=>r.append(btn(s===cur?'sel':'',s,e=>{cur=s;[...r.children].forEach(b=>b.classList.toggle('sel',b===e.target));draw();speak(SAY[s])})));
 app.append(r);const W=Math.min(500,innerWidth-40);const cv=document.createElement('canvas');cv.width=W;cv.height=W;app.append(cv);
 const ctx=cv.getContext('2d');let drawing=false,ink=0;
 function draw(){ctx.clearRect(0,0,W,W);ctx.fillStyle='#e3e3e3';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.font=(cur.length>1?W*.42:W*.75)+'px sans-serif';ctx.fillText(cur,W/2,W/2);ink=0}
 const pos=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)*W/b.width,(e.clientY-b.top)*W/b.height]};
 cv.onpointerdown=e=>{drawing=true;const[x,y]=pos(e);ctx.beginPath();ctx.moveTo(x,y);cv.setPointerCapture(e.pointerId)};
 cv.onpointermove=e=>{if(!drawing)return;const[x,y]=pos(e);ctx.lineTo(x,y);ctx.strokeStyle='#f15bb5';ctx.lineWidth=W/22;ctx.lineCap=ctx.lineJoin='round';ctx.stroke();ink++};
 cv.onpointerup=()=>drawing=false;
 const r2=document.createElement('div');r2.className='row';
 r2.append(btn('','🧽 擦掉',draw),btn('','✅ 寫好了',()=>{if(ink>15)good(draw);else speak('再寫寫看')}));app.append(r2);draw();speak(SAY[cur])}
document.getElementById('home').onclick=menu;showStars();menu();
if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=()=>{};
