from pathlib import Path
import base64,json,zipfile
p=Path(__file__).parent
modules={name:base64.b64encode(file.read_bytes()).decode() for name,file in {'three':p.parent/'vendor/three.module.js','controls':p.parent/'vendor/OrbitControls.js','vrm':p.parent/'vendor/three-vrm.module.js','model':p/'model.js','geometry':p/'geometry.js'}.items()}
boot='<script>const libs='+json.dumps(modules)+';const imports={};for(const[k,v]of Object.entries(libs))imports[k]=URL.createObjectURL(new Blob([Uint8Array.from(atob(v),c=>c.charCodeAt(0))],{type:"text/javascript"}));const map=document.createElement("script");map.type="importmap";map.textContent=JSON.stringify({imports});document.head.appendChild(map);window.addEventListener("error",e=>{document.getElementById("status").textContent="錯誤："+e.message});</script><script type="module">'+(p/'ui.js').read_text()+'</script>'
for mode,title,file in [('editor','都市地塊積木編輯器','City_Plot_Editor.html'),('viewer','居民都市 · 地塊對人','People_City_MToon.html')]:
 (p/file).write_text((p/'shell.html').read_text().replace('__TITLE__',title).replace('__MODE__',mode).replace('__BOOT__',boot))
