import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const initialRequests = [
  {id:1,title:"Nefunkční rádio",category:"Elektronika",owner:"Anna K.",date:"2. 11. 2026",status:"Otevřeno",desc:"Rádio se po zapnutí rozsvítí, ale není slyšet žádný zvuk. Zkoušela jsem jiný kabel i zásuvku.",interests:[],contact:"anna@example.cz",volunteer:""},
  {id:2,title:"Vrže zadní brzda na kole",category:"Jízdní kola",owner:"Petr S.",date:"5. 11. 2026",status:"Otevřeno",desc:"Při brzdění zadní brzda nepříjemně vrže. Kolo je jinak pojízdné.",interests:[],contact:"petr@example.cz",volunteer:""},
  {id:3,title:"Uvolněná noha židle",category:"Nábytek",owner:"Eva M.",date:"7. 11. 2026",status:"Naplánováno",desc:"Dřevěná židle má uvolněnou zadní nohu. Spoj je potřeba zpevnit.",interests:["Martin Černý"],contact:"eva@example.cz",volunteer:"Martin Černý",appointment:"21. 11. 2026 · 10:00"},
  {id:4,title:"Lampička občas bliká",category:"Domácí spotřebiče",owner:"Tomáš V.",date:"8. 11. 2026",status:"Dokončeno",desc:"Stolní lampička občas přestává svítit.",interests:["Eva Malá"],contact:"tomas@example.cz",volunteer:"Eva Malá",result:"Úspěšně opraveno",note:"Vyměněn poškozený kabel."}
];
const categories = ["Elektronika","Jízdní kola","Nábytek","Domácí spotřebiče","Ostatní"];
const volunteers = ["Petr Nový","Eva Malá","Martin Černý"];
function App(){
  const [role,setRole]=useState("Dobrovolník");
  const [page,setPage]=useState("Dostupné opravy");
  const [requests,setRequests]=useState(initialRequests);
  const [selected,setSelected]=useState(null);
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState("Všechny opravy");
  const [modal,setModal]=useState("");
  const [message,setMessage]=useState("");
  const [form,setForm]=useState({title:"",category:categories[0],desc:"",contact:""});
  const [schedule,setSchedule]=useState({date:"2026-11-21",start:"10:00",end:"11:00"});
  const [result,setResult]=useState("Úspěšně opraveno");
  const [note,setNote]=useState("");
  const [toast,setToast]=useState("");
  const visible=useMemo(()=>requests.filter(r=>(page==="Dostupné opravy"?r.status==="Otevřeno":page==="Moje opravy"? (role==="Zákazník"?r.owner==="Anna K.":r.volunteer==="Petr Nový"||r.interests.includes("Petr Nový")):true) && (filter==="Všechny opravy"||r.category===filter) && (r.title+" "+r.desc+" "+r.category).toLowerCase().includes(query.toLowerCase())),[requests,page,role,filter,query]);
  const notify=(s)=>{setToast(s);setTimeout(()=>setToast(""),2600)};
  const update=(id,patch)=>setRequests(rs=>rs.map(r=>r.id===id?{...r,...patch}:r));
  const openDetail=(r)=>{setSelected(r);setModal("detail");setMessage("");};
  const submitRequest=()=>{if(!form.title.trim()||!form.desc.trim()||!form.contact.trim()){notify("Vyplňte název, popis a kontakt.");return;}setRequests(rs=>[{id:Date.now(),...form,owner:"Anna K.",date:"17. 11. 2026",status:"Otevřeno",interests:[],volunteer:""},...rs]);setForm({title:"",category:categories[0],desc:"",contact:""});setModal("");setPage("Moje opravy");notify("Požadavek byl vytvořen.");};
  const nav=role==="Zákazník"?["Moje opravy","Vytvořit požadavek","O nás"]:role==="Administrátor"?["Dostupné opravy","Moje opravy","Správa kategorií","O nás"]:["Dostupné opravy","Moje opravy","Kalendář oprav","O nás"];
  const shown=selected?requests.find(r=>r.id===selected.id)||selected:null;
  return <div className="app">
    <aside className="sidebar"><div className="brand"><div className="brandmark">☕</div><div><b>Repair Café</b><small>OPRAV · SDÍLEJ · ZNOVU POUŽIJ</small></div></div>
      <div className="side-nav">{nav.map(n=><button className={page===n?"active":""} onClick={()=>{setPage(n);setSelected(null);setModal("");setFilter("Všechny opravy")}} key={n}><span>{({"Dostupné opravy":"▦","Moje opravy":"▤","Vytvořit požadavek":"＋","Kalendář oprav":"▦","Správa kategorií":"⚙","O nás":"ⓘ"})[n]}</span>{n}</button>)}</div>
      <div className="rolebox"><small>DEMO ROLE</small><select value={role} onChange={e=>{setRole(e.target.value);setPage(e.target.value==="Zákazník"?"Moje opravy":"Dostupné opravy");setModal("");setSelected(null)}}><option>Dobrovolník</option><option>Zákazník</option><option>Administrátor</option></select><p>Lokální ukázka · bez připojení k API</p></div>
      <div className="profile"><div className="avatar">PN</div><div><b>{role==="Zákazník"?"Anna K.":role==="Administrátor"?"Admin":"Petr Nový"}</b><small>{role}</small></div></div>
    </aside>
    <main className="main"><header><div className="crumb">Komunitní opravy <span>/</span> {page}</div><div className="topright"><span>Demo prostředí</span><div className="avatar light">PN</div></div></header>
      <div className="content">
      {page==="O nás"?<section className="hero-about"><div className="eyebrow">OPRAVUJEME SPOLEČNĚ</div><h1>Věcem můžeme dát<br/>druhý život.</h1><p>Propojujeme lidi, kteří potřebují něco opravit, s dobrovolníky, kteří umí pomoci.</p><button className="primary" onClick={()=>setPage(role==="Zákazník"?"Vytvořit požadavek":"Dostupné opravy")}>Začít s opravou</button></section>:
      page==="Vytvořit požadavek"?<><div className="pagehead"><div><div className="eyebrow">ZÁKAZNICKÁ ČÁST</div><h1>Vytvořit požadavek</h1><p>Popište, co potřebuje opravit. Dobrovolníci se vám mohou ozvat.</p></div></div><div className="formcard"><label>Název požadavku<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Např. Nefunkční rádio"/></label><label>Kategorie<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label>Popis problému<textarea rows="5" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Popište závadu, co jste již zkoušeli a kdy se vám hodí oprava."/></label><label>Kontaktní e-mail nebo telefon<input value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} placeholder="Kontakt bude viditelný až schválenému dobrovolníkovi"/></label><button className="primary" onClick={submitRequest}>Odeslat požadavek</button></div></>:
      page==="Správa kategorií"?<><div className="pagehead"><div><div className="eyebrow">ADMINISTRACE</div><h1>Správa kategorií</h1><p>Kategorie pomáhají třídit požadavky na opravu.</p></div><button className="primary" onClick={()=>setModal("category")}>＋ Přidat kategorii</button></div><div className="category-grid">{categories.map((c,i)=><div className="category-card" key={c}><div className="cat-icon">{["⌁","🚲","⌂","⌑","⋯"][i]}</div><b>{c}</b><small>Aktivní kategorie</small></div>)}</div></>:
      page==="Kalendář oprav"?<><div className="pagehead"><div><div className="eyebrow">DOBROVOLNÍK</div><h1>Kalendář oprav</h1><p>Přehled naplánovaných termínů.</p></div></div><div className="calendar"><div className="calhead">Listopad 2026 <span>‹　›</span></div><div className="calgrid">{["Po","Út","St","Čt","Pá","So","Ne",...Array.from({length:30},(_,i)=>String(i+1))].map((d,i)=><div className={i===21?"eventday":""} key={i}>{d}{i===21&&<small>Oprava židle<br/>10:00</small>}</div>)}</div></div></>:
      <><div className="pagehead"><div><div className="eyebrow">{role.toUpperCase()}</div><h1>{page}</h1><p>{page==="Dostupné opravy"?"Prohlédněte si otevřené požadavky a nabídněte pomoc.":"Přehled požadavků a jejich aktuálního stavu."}</p></div>{role==="Zákazník"&&<button className="primary" onClick={()=>setPage("Vytvořit požadavek")}>＋ Vytvořit požadavek</button>}</div>
        <div className="toolbar"><input className="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="⌕  Hledat požadavky…"/><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Všechny opravy</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select><option>Nejnovější</option><option>Nejstarší</option></select></div>
        <div className="statrow"><div><b>{requests.filter(r=>r.status==="Otevřeno").length}</b><span>Otevřené</span></div><div><b>{requests.filter(r=>r.status==="Naplánováno").length}</b><span>Naplánované</span></div><div><b>{requests.filter(r=>r.status==="Dokončeno").length}</b><span>Dokončené</span></div></div>
        {visible.length===0?<div className="empty"><div>⌁</div><h2>Zatím zde nic není</h2><p>Zkuste změnit filtr nebo vyhledávání.</p></div>:<div className="cards">{visible.map(r=><article className="request-card" key={r.id}><div className="request-photo">{r.category==="Jízdní kola"?"🚲":r.category==="Nábytek"?"🪑":r.category==="Elektronika"?"📻":"💡"}</div><div className="request-body"><div className="cardtop"><span className="tag">{r.category}</span><span className={"status "+(r.status==="Otevřeno"?"open":r.status==="Naplánováno"?"planned":"done")}>{r.status}</span></div><h3>{r.title}</h3><p>{r.desc}</p><div className="meta">{r.owner} · {r.date}</div><div className="cardfoot"><span>{r.interests.length} zájemci</span><button className="outline" onClick={()=>openDetail(r)}>Zobrazit detail →</button></div></div></article>)}</div>}
      </>}
      </div>
    </main>
    {modal&&<div className="overlay" onClick={()=>setModal("")}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setModal("")}>×</button>
      {modal==="detail"&&shown&&<><div className="eyebrow">DETAIL POŽADAVKU</div><h2>{shown.title}</h2><span className="tag">{shown.category}</span><p className="detaildesc">{shown.desc}</p><div className="detailinfo"><div><small>ŽADATEL</small><b>{shown.owner}</b></div><div><small>VYTVOŘENO</small><b>{shown.date}</b></div><div><small>STAV</small><b>{shown.status}</b></div></div>
        {role==="Dobrovolník"&&shown.status==="Otevřeno"&&<><label>Zpráva zákazníkovi (nepovinné)<textarea rows="3" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Krátce se představte…"/></label><button className="primary full" onClick={()=>{update(shown.id,{interests:[...shown.interests,"Petr Nový"]});setModal("");notify("Zájem o opravu byl odeslán.");}}>Mám zájem o opravu</button></>}
        {role==="Zákazník"&&shown.interests.length>0&&<div className="interestbox"><b>Zájemci o opravu</b>{shown.interests.map(v=><div className="volrow" key={v}><span className="avatar">{v.split(" ").map(x=>x[0]).join("")}</span><span>{v}</span><button className="outline" onClick={()=>{update(shown.id,{volunteer:v,status:"Naplánováno",appointment:"Termín bude domluven"});setModal("");notify("Dobrovolník byl vybrán.");}}>Vybrat</button></div>)}</div>}
        {role==="Dobrovolník"&&shown.volunteer==="Petr Nový"&&shown.status==="Naplánováno"&&<><button className="primary full" onClick={()=>setModal("schedule")}>Naplánovat opravu</button><button className="outline full" onClick={()=>setModal("complete")}>Dokončit opravu</button></>}
        {shown.status==="Dokončeno"&&<div className="successbox"><b>{shown.result||"Oprava dokončena"}</b><p>{shown.note||"Výsledek opravy je uložen."}</p></div>}
      </>}
      {modal==="schedule"&&<><div className="eyebrow">PLÁNOVÁNÍ</div><h2>Naplánovat opravu</h2><label>Datum<input type="date" value={schedule.date} onChange={e=>setSchedule({...schedule,date:e.target.value})}/></label><div className="two"><label>Od<input type="time" value={schedule.start} onChange={e=>setSchedule({...schedule,start:e.target.value})}/></label><label>Do<input type="time" value={schedule.end} onChange={e=>setSchedule({...schedule,end:e.target.value})}/></label></div><button className="primary full" onClick={()=>{update(shown.id,{status:"Naplánováno",appointment:`${schedule.date} · ${schedule.start}–${schedule.end}`,volunteer:"Petr Nový"});setModal("");notify("Termín byl uložen.");}}>Uložit termín</button></>}
      {modal==="complete"&&<><div className="eyebrow">VÝSLEDEK OPRAVY</div><h2>Dokončit opravu</h2><label>Výsledek<select value={result} onChange={e=>setResult(e.target.value)}><option>Úspěšně opraveno</option><option>Nepodařilo se opravit</option></select></label><label>Poznámka (nepovinné)<textarea rows="3" value={note} onChange={e=>setNote(e.target.value)}/></label><button className="primary full" onClick={()=>{update(shown.id,{status:"Dokončeno",result,note,completed:"17. 11. 2026"});setModal("");notify("Výsledek opravy byl uložen.");}}>Uložit výsledek</button></>}
      {modal==="category"&&<><div className="eyebrow">ADMINISTRACE</div><h2>Přidat kategorii</h2><label>Název kategorie<input placeholder="Nová kategorie"/></label><button className="primary full" onClick={()=>{setModal("");notify("Ukázková akce – ukládání do API není zapojeno.");}}>Uložit kategorii</button></>}
    </div></div>}
    {toast&&<div className="toast">{toast}</div>}
  </div>
}
createRoot(document.getElementById("root")).render(<App/>);
