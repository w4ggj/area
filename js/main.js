/* AREA — shared scripts: mobile menu + growth-ring cross-section. */
(function(){
  // mobile menu (present on every page)
  var hd=document.getElementById('hd'),mt=document.getElementById('mt');
  if(hd&&mt){
    mt.addEventListener('click',function(){var o=hd.classList.toggle('open');mt.setAttribute('aria-expanded',o?'true':'false')});
    hd.querySelectorAll('nav.main a').forEach(function(a){a.addEventListener('click',function(){hd.classList.remove('open');mt.setAttribute('aria-expanded','false')})});
  }

  // growth rings — only runs where the #rings svg exists
  var svg=document.getElementById('rings');
  if(!svg) return;
  var YEARS=52,cx=240,cy=240,maxR=210,minR=14;
  var group=document.getElementById('ringGroup'),labels=document.getElementById('labels');
  var NS='http://www.w3.org/2000/svg';
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // brand green stops, center(old)->outer(new): forest -> leaf
  var stops=[[7,99,36],[0,133,62],[58,181,74],[122,193,65]];
  function mix(t){var n=stops.length-1,i=Math.min(n-1,Math.floor(t*n)),f=t*n-i;
    var a=stops[i],b=stops[i+1];
    return 'rgb('+Math.round(a[0]+(b[0]-a[0])*f)+','+Math.round(a[1]+(b[1]-a[1])*f)+','+Math.round(a[2]+(b[2]-a[2])*f)+')';}

  function noise(s,t){return Math.sin(s*1.3+t*2)*.6+Math.sin(s*0.7+t*5)*.3+Math.sin(s*2.9+t*11)*.18;}
  function ringPath(r,seed,wob){var pts=96,d='',ox=Math.sin(seed*.9)*7*(r/maxR),oy=Math.cos(seed*1.7)*6*(r/maxR);
    for(var i=0;i<=pts;i++){var a=i/pts*Math.PI*2,rr=r+noise(seed,a)*wob,x=cx+ox+Math.cos(a)*rr,y=cy+oy+Math.sin(a)*rr*.985;
      d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1);}return d+'Z';}

  var made=[];
  for(var i=0;i<YEARS;i++){
    var f=Math.sqrt((i+1)/YEARS),r=minR+(maxR-minR)*f,wob=1.6+(1-f)*2.2;
    var p=document.createElementNS(NS,'path');
    p.setAttribute('class','ring');p.setAttribute('d',ringPath(r,i+1,wob));
    p.setAttribute('stroke',mix(f));
    p.setAttribute('stroke-width',(i%4===3?1.5:1.0).toFixed(2));
    p.setAttribute('opacity',(0.5+0.45*f).toFixed(2));
    group.appendChild(p);made.push(p);
  }
  var pith=document.createElementNS(NS,'circle');pith.setAttribute('cx',cx);pith.setAttribute('cy',cy);
  pith.setAttribute('r',4.5);pith.setAttribute('fill','#076324');group.appendChild(pith);

  function label(idx,txt,big){var f=Math.sqrt((idx+1)/YEARS),r=minR+(maxR-minR)*f;
    var t=document.createElementNS(NS,'text');t.setAttribute('x',cx);t.setAttribute('y',cy-r-7);
    t.setAttribute('text-anchor','middle');t.setAttribute('class','yearlab'+(big?' big':''));t.textContent=txt;labels.appendChild(t);
    var k=document.createElementNS(NS,'line');k.setAttribute('x1',cx);k.setAttribute('x2',cx);
    k.setAttribute('y1',cy-r);k.setAttribute('y2',cy-r-4);k.setAttribute('stroke','#3AB54A');k.setAttribute('stroke-width','1');labels.appendChild(k);}
  label(0,'1973',true);label(26,"'99",false);label(YEARS-1,'today',true);

  function draw(){made.forEach(function(p,idx){var len=p.getTotalLength();
    p.style.strokeDasharray=len;p.style.strokeDashoffset=len;void p.getBoundingClientRect();
    p.style.transitionDelay=(idx*16)+'ms';requestAnimationFrame(function(){p.style.strokeDashoffset=0;});});}
  if(reduce){made.forEach(function(p){p.style.strokeDashoffset=0;});}
  else if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){draw();io.disconnect();}});},{threshold:.2});
    io.observe(svg);
  }else{draw();}
})();
