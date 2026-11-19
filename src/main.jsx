import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, Grid2X2, Wrench, Users, Bell, ChevronDown, ChevronLeft, ChevronRight,
  CalendarDays, UserRound, LockKeyhole, Handshake, ArrowRight, ArrowDown,
  Plus, Menu, X, LayoutDashboard, ClipboardList, CheckCircle2, Clock3,
  ImagePlus, SlidersHorizontal, Coffee, Settings, Smartphone, Monitor,
  HeartHandshake, Pencil, Trash2, Mail, Phone, Tag, ShieldCheck, CalendarCheck,
  CircleHelp, LogIn, Upload, Eye, Ban, Check, Filter, ListChecks
} from 'lucide-react';
import './style.css';

import logo from './assets/repair-cafe-logo.png';
import heroPhoto from './assets/landing-hero-photo.png';
import workflowPhoto from './assets/landing-workflow.jpg';
import volunteerPhoto from './assets/landing-volunteer.jpg';
import bottomBanner from './assets/landing-bottom.jpg';
import radio from './assets/radio.jpg';
import headphones from './assets/headphones.jpg';
import bike from './assets/bike.jpg';
import chair from './assets/chair.jpg';
import toaster from './assets/toaster.jpg';
import lamp from './assets/lamp.jpg';
import drawer from './assets/drawer.jpg';

const initialCategories = [
  {name:'Elektronika',description:'Elektronická zařízení, domácí spotřebiče a další technika.',icon:'cpu',active:true},
  {name:'Jízdní kola',description:'Opravy a údržba jízdních kol.',icon:'bike',active:true},
  {name:'Nábytek',description:'Opravy nábytku, židlí, stolů a dalších předmětů.',icon:'chair',active:true},
  {name:'Ostatní',description:'Opravy, které nespadají do žádné výše uvedené kategorie.',icon:'wrench',active:true}
];
const initialRequests = [
 {id:1,title:'Nefunkční rádio',category:'Elektronika',owner:'Anna K.',date:'2. listopadu 2026',dateISO:'2026-11-02',status:'Otevřeno',desc:'Rádio se po zapojení do zásuvky vůbec nezapíná. Dříve fungovalo bez problémů, ale poslední týden nereaguje. Budu ráda za pomoc s diagnostikou a případnou opravou.',image:radio,email:'anna.kralova@email.cz',phone:'+420 777 123 456',interests:[
  {id:'v1',name:'Petr Novák',message:'S opravami starších rádií mám zkušenosti. Pravděpodobně se jedná o běžnou závadu a rád se na to podívám.',done:12},
  {id:'v2',name:'Eva Malá',message:'Věnuji se drobné elektronice a oprava rádia by pro mě byla zajímavá výzva. Ráda pomohu.',done:7},
  {id:'v3',name:'Tomáš Dvořák',message:'Mám zkušenosti s opravami audio techniky.',done:9}
 ],volunteer:null,appointment:null},
 {id:2,title:'Oprava brzdy na kole',category:'Jízdní kola',owner:'Anna K.',date:'29. října 2026',dateISO:'2026-10-29',status:'Naplánováno',desc:'Brzda téměř nereaguje, potřebovala bych ji seřídit nebo opravit.',image:bike,email:'anna.kralova@email.cz',phone:'+420 777 123 456',interests:[{id:'v1',name:'Petr Novák',message:'Rád se na brzdu podívám.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-11-07',start:'10:00',end:'11:00'}},
 {id:3,title:'Stolní lampa se nerozsvítí',category:'Elektronika',owner:'Anna K.',date:'20. října 2026',dateISO:'2026-10-20',status:'Naplánováno',desc:'Stolní lampa se přestala rozsvěcet. Možná je problém v kabelu.',image:lamp,email:'anna.kralova@email.cz',phone:'+420 777 123 456',interests:[{id:'v1',name:'Petr Novák',message:'Rád pomohu s diagnostikou.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-11-07',start:'14:00',end:'15:00'}},
 {id:4,title:'Uvolněná židle',category:'Nábytek',owner:'Anna K.',date:'15. října 2026',dateISO:'2026-10-15',status:'Dokončeno',desc:'U židle se uvolnil spoj a byla nestabilní.',image:chair,email:'anna.kralova@email.cz',phone:'+420 777 123 456',interests:[{id:'v1',name:'Petr Novák',message:'Spoj jsem znovu zpevnil.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-10-31',start:'10:00',end:'11:00'},result:'Úspěšně opraveno',note:'Spoj byl znovu slepen a zpevněn.',completedAt:'31. října 2026'},
 {id:5,title:'Nefunkční sluchátka',category:'Elektronika',owner:'Anna K.',date:'10. října 2026',dateISO:'2026-10-10',status:'Dokončeno',desc:'Sluchátka hrála pouze na jednu stranu.',image:headphones,email:'anna.kralova@email.cz',phone:'+420 777 123 456',interests:[{id:'v1',name:'Petr Novák',message:'Diagnostikováno.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-10-21',start:'15:00',end:'16:00'},result:'Nepodařilo se opravit',note:'Poškozený kabel uvnitř mušle. Oprava by nebyla spolehlivá.',completedAt:'21. října 2026'},
 {id:6,title:'Oprava zásuvky',category:'Nábytek',owner:'Martin D.',date:'30. října 2026',dateISO:'2026-10-30',status:'Otevřeno',desc:'Zásuvka se špatně otevírá a drhne. Potřeboval bych ji opravit.',image:drawer,email:'martin@example.cz',phone:'',interests:[],volunteer:null,appointment:null},
 {id:7,title:'Oprava lampičky',category:'Elektronika',owner:'Tomáš V.',date:'29. října 2026',dateISO:'2026-10-29',status:'Naplánováno',desc:'Lampička po zapnutí bliká a po chvíli zhasne.',image:lamp,email:'tomasv@example.cz',phone:'+420 777 111 222',interests:[{id:'v1',name:'Petr Novák',message:'Rád pomohu.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-11-07',start:'14:00',end:'15:00'}},
 {id:8,title:'Nefunkční sluchátka',category:'Elektronika',owner:'Jana P.',date:'10. října 2026',dateISO:'2026-10-10',status:'Naplánováno',desc:'Jedno sluchátko přestalo hrát.',image:headphones,email:'jana@example.cz',phone:'',interests:[{id:'v1',name:'Petr Novák',message:'Mohu se na to podívat.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-11-21',start:'15:00',end:'16:00'}},
 {id:9,title:'Uvolněná židle',category:'Nábytek',owner:'Eva M.',date:'15. října 2026',dateISO:'2026-10-15',status:'Dokončeno',desc:'Uvolněný spoj u nohy židle.',image:chair,email:'eva@example.cz',phone:'',interests:[{id:'v1',name:'Petr Novák',message:'Opraveno.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-10-31',start:'10:00',end:'11:00'},result:'Úspěšně opraveno',note:'Spoj byl znovu slepen a zpevněn.',completedAt:'31. října 2026'},
 {id:10,title:'Nefunkční sluchátka',category:'Elektronika',owner:'Jana P.',date:'10. října 2026',dateISO:'2026-10-10',status:'Dokončeno',desc:'Sluchátka hrála pouze na jednu stranu.',image:headphones,email:'jana@example.cz',phone:'',interests:[{id:'v1',name:'Petr Novák',message:'Diagnostikováno.',done:12}],volunteer:'Petr Novák',appointment:{date:'2026-10-21',start:'15:00',end:'16:00'},result:'Nepodařilo se opravit',note:'Poškozený kabel uvnitř mušle. Oprava by nebyla spolehlivá.',completedAt:'21. října 2026'}
];
const volunteers = [
 {id:'v1',name:'Petr Novák',initials:'PN',done:12,message:'Mám zkušenosti s opravami elektroniky a starších přístrojů.'},
 {id:'v2',name:'Eva Malá',initials:'EM',done:7,message:'Věnuji se drobné elektronice a domácím spotřebičům.'},
 {id:'v3',name:'Tomáš Dvořák',initials:'TD',done:9,message:'Rád pomohu s diagnostikou a opravami.'}
];
const roles = ['Dobrovolník','Zákazník','Administrátor'];
const fmtDate = iso => iso ? new Date(iso+'T12:00:00').toLocaleDateString('cs-CZ',{day:'numeric',month:'long',year:'numeric'}) : '';
const parseAppointment = a => a ? `${fmtDate(a.date)} · ${a.start}–${a.end}` : 'Termín zatím není stanoven';

function App(){
 const [device,setDevice]=useState('desktop');
 const [role,setRole]=useState('Dobrovolník');
 const [page,setPage]=useState('O nás');
 const [requests,setRequests]=useState(initialRequests);
 const [categories,setCategories]=useState(initialCategories);
 const [selectedId,setSelectedId]=useState(null);
 const [detailReturnPage,setDetailReturnPage]=useState('Dostupné opravy');
 const [query,setQuery]=useState('');
 const [category,setCategory]=useState('Všechny opravy');
 const [sort,setSort]=useState('Nejnovější');
 const [customerTab,setCustomerTab]=useState('Všechny požadavky');
 const [volunteerTab,setVolunteerTab]=useState('Všechny opravy');
 const [modal,setModal]=useState('');
 const [message,setMessage]=useState('');
 const [chosenVolunteer,setChosenVolunteer]=useState(null);
 const [schedule,setSchedule]=useState({date:'2026-11-14',start:'10:00',end:'11:30'});
 const [result,setResult]=useState('Úspěšně opraveno');
 const [note,setNote]=useState('');
 const [toast,setToast]=useState('');
 const [mobileNav,setMobileNav]=useState(false);
 const [showMobilePreview,setShowMobilePreview]=useState(false);
 const [photo,setPhoto]=useState(null);
 const [form,setForm]=useState({title:'',category:'Elektronika',desc:'',email:'',phone:''});
 const [newCategory,setNewCategory]=useState({name:'',description:''});
 const [editingCategory,setEditingCategory]=useState(null);
 const [adminSearch,setAdminSearch]=useState('');
 const [users,setUsers]=useState([
  {id:'u1',name:'Anna Kralová',email:'anna.kralova@email.cz',role:'Zákazník'},
  {id:'u2',name:'Petr Novák',email:'petr.novak@email.cz',role:'Dobrovolník'},
  {id:'u3',name:'Eva Malá',email:'eva.mala@email.cz',role:'Dobrovolník'},
  {id:'u4',name:'Adam Správce',email:'admin@repaircafe.cz',role:'Administrátor'}
 ]);
 const [statusFilter,setStatusFilter]=useState(['Otevřeno']);
 const [showFilters,setShowFilters]=useState(true);
 const [adminRequestTab,setAdminRequestTab]=useState('Všechny');
 const [loginMode,setLoginMode]=useState(false);

 const notify = t => { setToast(t); window.clearTimeout(window.__rcTimer); window.__rcTimer=window.setTimeout(()=>setToast(''),2800); };
 const updateRequest = (id,patch) => setRequests(rs=>rs.map(r=>r.id===id?{...r,...patch}:r));
 const selected = requests.find(r=>r.id===selectedId) || null;
 const go = p => {setPage(p);setSelectedId(null);setModal('');setMobileNav(false);setQuery('');setCategory('Všechny opravy');};
 const nav = role==='Zákazník' ? ['Moje požadavky','O nás'] : role==='Administrátor' ? ['Přehled','Správa požadavků','Kalendář oprav','Uživatelé a role','Správa kategorií','O nás'] : ['Dostupné opravy','Moje opravy','Kalendář oprav','O nás'];
 const navIcon = n => n==='Dostupné opravy'?<Grid2X2/>:n==='Moje opravy'?<Wrench/>:n==='Kalendář oprav'?<CalendarDays/>:n==='Moje požadavky'?<ClipboardList/>:n==='Správa kategorií'?<Tag/>:n==='Správa požadavků'?<ListChecks/>:n==='Uživatelé a role'?<Users/>:<LayoutDashboard/>;

 const createRequest = () => {
  if(!form.title.trim() || !form.desc.trim() || (!form.email.trim()&&!form.phone.trim())) {notify('Vyplňte název, popis a alespoň jeden kontaktní údaj.');return;}
  const item={id:Date.now(),title:form.title.trim(),category:form.category,owner:'Anna K.',date:'17. listopadu 2026',dateISO:'2026-11-17',status:'Otevřeno',desc:form.desc.trim(),image:photo||radio,email:form.email.trim(),phone:form.phone.trim(),interests:[],volunteer:null,appointment:null};
  setRequests(rs=>[item,...rs]);setForm({title:'',category:'Elektronika',desc:'',email:'',phone:''});setPhoto(null);go('Moje požadavky');notify('Požadavek byl vytvořen.');
 };
 const sendInterest = () => {
  if(!selected)return;
  if(selected.interests.some(i=>i.id==='v1')) {notify('Zájem již byl odeslán.');setModal('');return;}
  updateRequest(selected.id,{interests:[...selected.interests,{...volunteers[0],message:message||'Rád/a vám s opravou pomohu.'}]});
  setModal('');setMessage('');notify('Zájem o opravu byl odeslán zákazníkovi.');
 };
 const chooseVolunteer = v => {setChosenVolunteer(v);setModal('schedule');setSchedule({date:'2026-11-14',start:'10:00',end:'11:30'});};
 const saveSchedule = () => {
  if(!selected||!chosenVolunteer)return;
  if(schedule.end<=schedule.start){notify('Čas ukončení musí být později než začátek.');return;}
  updateRequest(selected.id,{status:'Naplánováno',volunteer:chosenVolunteer.name,appointment:{...schedule}});
  setModal('');setChosenVolunteer(null);notify('Termín opravy byl uložen.');
 };
 const completeRepair = () => {if(!selected)return;updateRequest(selected.id,{status:'Dokončeno',result,note,completedAt:'17. listopadu 2026'});setModal('');notify('Výsledek opravy byl uložen.');};
 const cancelRequest = id => {updateRequest(id,{status:'Zrušeno'});setModal('');notify('Požadavek byl zrušen.');};
 const filtered = useMemo(()=>requests.filter(r=>{
   const q=query.toLocaleLowerCase('cs');
   const statusOk=page==='Dostupné opravy'?r.status==='Otevřeno':page==='Moje požadavky'?(r.owner==='Anna K.'&&(customerTab==='Všechny požadavky'||(customerTab==='Otevřené'&&r.status==='Otevřeno')||(customerTab==='Naplánované'&&r.status==='Naplánováno')||(customerTab==='Uzavřené'&&['Dokončeno','Zrušeno'].includes(r.status)))):page==='Moje opravy'?(r.volunteer==='Petr Novák'||r.interests.some(i=>i.id==='v1'))&&(volunteerTab==='Všechny opravy'||(volunteerTab==='Naplánované'&&r.status==='Naplánováno')||(volunteerTab==='Dokončené'&&r.status==='Dokončeno')):true;
   return statusOk&&(category==='Všechny opravy'||r.category===category)&&(`${r.title} ${r.desc} ${r.category} ${r.owner}`).toLocaleLowerCase('cs').includes(q);
 }).sort((a,b)=>sort==='Nejnovější'?b.id-a.id:a.id-b.id),[requests,page,query,category,customerTab,volunteerTab,sort]);

 const categorySave = () => {
  if(!newCategory.name.trim()){notify('Zadejte název kategorie.');return;}
  if(editingCategory){setCategories(cs=>cs.map(c=>c.name===editingCategory?{...c,...newCategory,name:newCategory.name.trim()} : c));}
  else if(categories.some(c=>c.name.toLocaleLowerCase('cs')===newCategory.name.trim().toLocaleLowerCase('cs'))){notify('Tato kategorie již existuje.');return;}
  else setCategories(cs=>[...cs,{...newCategory,name:newCategory.name.trim(),active:true,icon:'wrench'}]);
  setModal('');setEditingCategory(null);setNewCategory({name:'',description:''});notify(editingCategory?'Kategorie byla upravena.':'Kategorie byla přidána.');
 };
 const categoryDelete = name => {setCategories(cs=>cs.filter(c=>c.name!==name));notify('Kategorie byla odstraněna.');};
 const openRequest = r => {setDetailReturnPage(page);setSelectedId(r.id);setPage('Detail požadavku');setModal('');setMobileNav(false);};
 const closeRequestDetail = () => {setPage(detailReturnPage);setSelectedId(null);};
 const switchRole = next => {setRole(next);go(next==='Zákazník'?'Moje požadavky':next==='Administrátor'?'Přehled':'Dostupné opravy');};
 const handlePhoto = e => {const f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/')){notify('Vyberte prosím obrázek.');return;}if(f.size>5*1024*1024){notify('Fotografie může mít maximálně 5 MB.');return;}setPhoto(URL.createObjectURL(f));};

 return <div className="demo-shell">
  <div className="previewbar">
   <div className="previewbrand"><span className="previewdot"><Coffee size={16}/></span><b>REPAIR CAFÉ</b><span className="previewlabel">INTERAKTIVNÍ PROTOTYP</span></div>
   <div className="device-switch"><button className={device==='desktop'?'selected':''} onClick={()=>setDevice('desktop')}><Monitor size={16}/> Desktop</button><button className={device==='mobile'?'selected':''} onClick={()=>setDevice('mobile')}><Smartphone size={16}/> Mobil</button></div>
   <div className="previewnote">Demo obsahuje ukázková data a lokální interakce</div>
  </div>
  <div className={'device-stage '+(device==='mobile'?'mobile-stage':'')}>
   <div className={'app '+(device==='mobile'?'mobile-app':'')}>
    {page==='O nás' ? <Landing onAbout={()=>document.getElementById('o-nas')?.scrollIntoView({behavior:'smooth'})} onLogin={()=>setModal('login')} onCustomer={()=>switchRole('Zákazník')} onVolunteer={()=>switchRole('Dobrovolník')}/> :
    <>
     <header className="topnav">
      <button className="hamb" onClick={()=>setMobileNav(v=>!v)} aria-label="Otevřít navigaci"><Menu/></button>
      <button className="logo-home" onClick={()=>go('O nás')} aria-label="Zpět na úvodní stránku"><img src={logo} className="logo" alt="Repair Café"/></button>
      <div className={'mainnav '+(mobileNav?'nav-open':'')}>{nav.map(n=><button key={n} className={page===n?'active':''} onClick={()=>go(n)}>{navIcon(n)}<span>{n}</span></button>)}</div>
      <div className="top-actions"><button className="iconbtn" onClick={()=>notify('Nemáte nová oznámení.')} aria-label="Oznámení"><Bell/><i/></button><div className="user-menu"><span className="user-avatar"><UserRound size={16}/></span><select aria-label="Přepnout demo roli" value={role} onChange={e=>switchRole(e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select><ChevronDown size={14}/></div></div>
     </header>
     {page==='Detail požadavku' ? (selected ? <main className="page-area request-detail-page"><RequestDetail request={selected} role={role} onInterest={()=>{setMessage('');setModal('interest')}} onSchedule={v=>chooseVolunteer(v)} onComplete={()=>{setResult('Úspěšně opraveno');setNote('');setModal('complete')}} onCancel={()=>cancelRequest(selected.id)} onApprove={()=>setModal('interest-list')} onClose={closeRequestDetail}/></main> : <main className="page-area"><EmptyState title="Požadavek nebyl nalezen" text="Vraťte se na seznam požadavků."/></main>) :
     page==='Vytvořit požadavek' ? <CreateRequestPage form={form} setForm={setForm} categories={categories} photo={photo} onPhoto={handlePhoto} onRemovePhoto={()=>setPhoto(null)} onSubmit={createRequest} onCancel={()=>go('Moje požadavky')}/> :
     page==='Dostupné opravy' ? <AvailablePage requests={filtered} categories={categories} category={category} setCategory={setCategory} query={query} setQuery={setQuery} sort={sort} setSort={setSort} onOpen={openRequest}/> :
     page==='Moje požadavky' ? <CustomerPage requests={filtered} tab={customerTab} setTab={setCustomerTab} query={query} setQuery={setQuery} onCreate={()=>go('Vytvořit požadavek')} onOpen={openRequest} onCancel={cancelRequest}/> :
     page==='Moje opravy' ? <VolunteerPage requests={filtered} tab={volunteerTab} setTab={setVolunteerTab} onOpen={openRequest} onCalendar={()=>go('Kalendář oprav')}/> :
     page==='Kalendář oprav' ? <CalendarPage requests={requests} onOpen={openRequest} onGo={go} role={role}/> :
     page==='Správa kategorií' ? <AdminCategories categories={categories} onGo={go} onAdd={()=>{setEditingCategory(null);setNewCategory({name:'',description:''});setModal('category')}} onEdit={c=>{setEditingCategory(c.name);setNewCategory({name:c.name,description:c.description});setModal('category')}} onDelete={categoryDelete}/> :
     page==='Správa požadavků' ? <AdminRequests requests={requests} onGo={go} query={adminSearch} setQuery={setAdminSearch} tab={adminRequestTab} setTab={setAdminRequestTab} onOpen={openRequest}/> :
     page==='Uživatelé a role' ? <AdminUsers users={users} setUsers={setUsers} onGo={go}/> :
     <AdminOverview requests={requests} onGo={go}/>
     }
    </>}
   </div>
  </div>
  {modal && <Modal onClose={()=>setModal('')}>
   {modal==='interest'&&<><div className="eyebrow">ZÁJEM O OPRAVU</div><h2>Projevit zájem o opravu</h2><p className="muted">Napište zákazníkovi krátkou zprávu. Kontaktní údaje se zobrazí až po schválení vašeho zájmu.</p><label className="field">Vaše zpráva (nepovinné)<textarea rows="4" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Dobrý den, rád/a vám s opravou pomohu..."/></label><div className="modal-actions"><button className="btn-light" onClick={()=>setModal('')}>Zrušit</button><button className="btn-primary" onClick={sendInterest}>Odeslat zájem</button></div></>}
   {modal==='schedule'&&<><div className="eyebrow">PLÁNOVÁNÍ OPRAVY</div><h2>Naplánovat opravu</h2><p className="muted">Zadejte termín, na kterém jste se se zákazníkem domluvili.</p><label className="field">Datum opravy<input type="date" value={schedule.date} onChange={e=>setSchedule({...schedule,date:e.target.value})}/></label><div className="two-col"><label className="field">Začátek<input type="time" value={schedule.start} onChange={e=>setSchedule({...schedule,start:e.target.value})}/></label><label className="field">Konec<input type="time" value={schedule.end} onChange={e=>setSchedule({...schedule,end:e.target.value})}/></label></div><div className="modal-actions"><button className="btn-light" onClick={()=>setModal('')}>Zrušit</button><button className="btn-primary" onClick={saveSchedule}>Uložit termín</button></div></>}
   {modal==='complete'&&<><div className="eyebrow">VÝSLEDEK OPRAVY</div><h2>Dokončit opravu</h2><p className="muted">Zaznamenejte výsledek opravy a případnou poznámku.</p><label className="field">Výsledek opravy<select value={result} onChange={e=>setResult(e.target.value)}><option>Úspěšně opraveno</option><option>Nepodařilo se opravit</option></select></label><label className="field">Poznámka (nepovinné)<textarea rows="4" value={note} onChange={e=>setNote(e.target.value)} placeholder="Co bylo příčinou problému, jak proběhla oprava nebo doporučení do budoucna…"/></label><div className="modal-actions"><button className="btn-light" onClick={()=>setModal('')}>Zrušit</button><button className="btn-primary" onClick={completeRepair}>Uložit výsledek</button></div></>}
   {modal==='category'&&<><div className="eyebrow">ADMINISTRACE</div><h2>{editingCategory?'Upravit kategorii':'Přidat kategorii'}</h2><label className="field">Název kategorie<input value={newCategory.name} onChange={e=>setNewCategory({...newCategory,name:e.target.value})} placeholder="Např. Sportovní vybavení"/></label><label className="field">Popis<textarea rows="3" value={newCategory.description} onChange={e=>setNewCategory({...newCategory,description:e.target.value})} placeholder="Stručný popis kategorie"/></label><div className="modal-actions"><button className="btn-light" onClick={()=>setModal('')}>Zrušit</button><button className="btn-primary" onClick={categorySave}>Uložit</button></div></>}
   {modal==='interest-list'&&selected&&<InterestList request={selected} onChoose={v=>chooseVolunteer(v)} onBack={()=>setModal('')}/>}
   {modal==='login'&&<><div className="eyebrow">PŘIHLÁŠENÍ</div><h2>Přihlásit se do Repair Café</h2><p className="muted">Pro demonstrační účely zvolte roli, pod kterou chcete aplikaci procházet.</p><div className="login-options">{roles.map(r=><button key={r} onClick={()=>{setModal('');switchRole(r)}}><UserRound/><span><b>{r}</b><small>Pokračovat jako {r.toLocaleLowerCase('cs')}</small></span><ArrowRight/></button>)}</div></>}
  </Modal>}
  {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
 </div>;
}

function Landing({onAbout,onLogin,onCustomer,onVolunteer}){
 return <div className="figma-landing">
  <header className="landing-header">
   <button className="landing-brand" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Repair Café – úvod"><img src={logo} alt="Repair Café"/></button>
   <span className="landing-header-divider"/>
   <button className="landing-about" onClick={onAbout}>O nás</button>
   <button className="landing-login" onClick={onLogin}><UserRound/> Přihlásit se</button>
  </header>
  <section className="landing-hero">
   <img className="landing-hero-photo" src={heroPhoto} alt="Kavárenský stůl s kávou a nářadím"/>
   <div className="landing-hero-overlay"/>
   <div className="landing-hero-copy"><h1>Dejme věcem druhou šanci.</h1><p>Repair Café propojuje lidi, kteří potřebují něco opravit,<br className="desktop-break"/> s dobrovolníky, kteří jim rádi pomohou.</p><div className="landing-hero-actions"><button className="landing-primary" onClick={onCustomer}><Wrench/> Začít s opravou</button><a className="landing-secondary" href="#jak-to-funguje">Jak to funguje? <ArrowDown/></a></div></div>
  </section>
  <section className="figma-how" id="jak-to-funguje"><img className="figma-workflow-image" src={workflowPhoto} alt="Tři kroky opravy: popište problém, vyberte dobrovolníka a domluvte opravu"/></section>
  <section className="figma-landing-cards">
   <article className="figma-landing-card"><img src={radio} alt="Staré rádio připravené k opravě"/><div><h3><Wrench/> Potřebuji opravu</h3><p>Máte doma něco rozbitého? Popište svůj problém a dejte dobrovolníkům možnost vám pomoci.</p><button onClick={onCustomer}>Vytvořit požadavek <ArrowRight/></button></div></article>
   <article className="figma-landing-card"><img src={volunteerPhoto} alt="Dobrovolník opravuje elektroniku"/><div><h3><Users/> Chci pomáhat</h3><p>Baví vás opravování? Zapojte se jako dobrovolník a pomozte dát rozbitým věcem druhou šanci.</p><button onClick={onVolunteer}>Jak se stát dobrovolníkem <ArrowRight/></button></div></article>
  </section>
  <section className="figma-bottom-banner" id="o-nas"><img src={bottomBanner} alt="Ne všechno rozbité patří do koše. Opravování šetří materiály a spojuje lidi."/></section>
 </div>;
}

function CreateRequestPage({form,setForm,categories,photo,onPhoto,onRemovePhoto,onSubmit,onCancel}){
 return <main className="page-area create-page">
  <button className="backlink" onClick={onCancel}><ChevronLeft size={16}/> Zpět na moje požadavky</button>
  <div className="page-title"><div><h1>Vytvořit nový požadavek</h1><p>Popište, co potřebujete opravit, a najděte dobrovolníka, který vám pomůže.</p></div></div>
  <div className="panel create-form-panel">
   <div className="upload-section"><b>Fotografie předmětu <span className="muted">(nepovinné)</span></b><div className="upload-row">{photo&&<div className="photo-preview"><img src={photo} alt="Náhled nahrané fotografie"/><button type="button" onClick={onRemovePhoto} aria-label="Odebrat fotografii"><X/></button></div>}<label className="upload-tile"><ImagePlus/><b>{photo?'Změnit fotografii':'Přidat fotografii'}</b><small>JPG nebo PNG, max. 5 MB</small><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onPhoto}/></label></div></div>
   <label className="field">Název požadavku <em>*</em><input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Např. Nefunkční rádio"/></label>
   <label className="field">Kategorie opravy <em>*</em><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.filter(c=>c.active).map(c=><option key={c.name}>{c.name}</option>)}</select></label>
   <label className="field">Popis problému <em>*</em><textarea rows="5" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Popište, jak se závada projevuje a co jste již vyzkoušeli. Můžete také uvést, které dny a časy se vám pro opravu hodí."/></label>
   <p className="field-hint"><CircleHelp/> Popište, jak se závada projevuje a co jste případně již vyzkoušeli. Můžete také uvést, které dny a časy během týdne se vám pro opravu obvykle hodí.</p>
   <div className="form-separator"/>
   <h2>Kontaktní údaje</h2><p className="muted">Vyplňte alespoň jeden kontakt. Zobrazí se pouze dobrovolníkovi, kterého schválíte.</p>
   <div className="two-col"><label className="field">E-mail<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="vas@email.cz"/></label><label className="field">Telefonní číslo<input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+420 777 123 456"/></label></div>
   <div className="form-actions"><button className="btn-light" onClick={onCancel}>Zrušit</button><button className="btn-primary" onClick={onSubmit}><Plus/> Vytvořit požadavek</button></div>
  </div>
 </main>;
}

function AvailablePage({requests,categories,category,setCategory,query,setQuery,sort,setSort,onOpen}){
 return <main className="page-area">
  <div className="browse-layout">
   <aside className="filters"><b>Vyhledávání</b><div className="searchbox"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Hledat požadavky..."/></div><hr/><b>Kategorie</b><div className="filter-options">{['Všechny opravy',...categories.filter(c=>c.active).map(c=>c.name)].map((c,i)=><button key={c} className={category===c?'chosen':''} onClick={()=>setCategory(c)}><span>{i===0?<Grid2X2/>:<Wrench/>}</span>{c}</button>)}</div><hr/><b>Stav požadavku</b><div className="status-counts"><span><i className="dot open"/>Otevřeno</span><b>12</b><span><i className="dot planned"/>Naplánováno</span><b>0</b><span><i className="dot done"/>Dokončeno</span><b>0</b></div></aside>
   <section className="results"><div className="results-head"><div><h1>Dostupné opravy</h1><p>Najděte něco, s čím můžete pomoci.</p></div><label className="sort">Řadit podle: <select value={sort} onChange={e=>setSort(e.target.value)}><option>Nejnovější</option><option>Nejstarší</option></select></label></div><div className="request-grid">{requests.length?requests.map(r=><RequestCard key={r.id} item={r} onOpen={()=>onOpen(r)}/>):<EmptyState title="Žádné požadavky nenalezeny" text="Zkuste změnit kategorii nebo hledaný výraz."/>}</div></section>
  </div>
 </main>;
}
function CustomerPage({requests,tab,setTab,query,setQuery,onCreate,onOpen,onCancel}){
 const tabs=['Všechny požadavky','Otevřené','Naplánované','Uzavřené'];
 return <main className="page-area"><div className="page-title"><div><h1>Moje požadavky</h1><p>Přehled vašich oprav a jejich aktuální stav.</p></div><button className="btn-primary" onClick={onCreate}><Plus/> Vytvořit požadavek</button></div><div className="list-toolbar"><div className="tabs">{tabs.map(t=><button key={t} className={tab===t?'selected':''} onClick={()=>setTab(t)}>{t}</button>)}</div><div className="searchbox"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Hledat požadavky..."/></div></div>
 {requests.length?<div className="my-list">{requests.map(r=><article className="my-row customer-row" key={r.id}><img src={r.image} alt=""/><div className="my-row-main"><b>{r.title}</b><small>{r.category} · Vytvořeno {r.date}</small><small>{r.status==='Otevřeno'?`${r.interests.length} zájemci čekají na vaše rozhodnutí`:r.status==='Naplánováno'?`Vybraný dobrovolník: ${r.volunteer||'—'} · ${r.appointment?`Termín ${fmtDate(r.appointment.date)} v ${r.appointment.start}`:'Termín se domlouvá'}`:r.result||r.status}</small></div><span className={'status-pill '+statusClass(r.status)}>{r.status}</span><button className="btn-outline" onClick={()=>onOpen(r)}>{r.interests.length&&r.status==='Otevřeno'?'Zobrazit zájemce':'Zobrazit detail'}</button></article>)}</div>:<div className="empty-panel"><EmptyState title="Zatím nemáte žádné požadavky" text="Máte doma něco rozbitého? Vytvořte svůj první požadavek a najděte dobrovolníka, který vám pomůže."/><button className="btn-primary" onClick={onCreate}><Plus/> Vytvořit požadavek</button></div>}
 </main>;
}
function VolunteerPage({requests,tab,setTab,onOpen,onCalendar}){
 return <main className="page-area"><div className="volunteer-layout"><aside className="filters volunteer-sidebar"><h2>Moje opravy</h2>{['Všechny opravy','Naplánované','Dokončené'].map(t=><button className={tab===t?'side-current':''} key={t} onClick={()=>setTab(t)}>{t==='Všechny opravy'?<Grid2X2/>:t==='Naplánované'?<CalendarDays/>:<CheckCircle2/>}{t}</button>)}<hr/><button onClick={onCalendar}><CalendarDays/>Kalendář</button></aside><section className="volunteer-content"><div className="page-title"><div><h1>Moje opravy</h1><p>Přehled oprav, o které se staráte jako dobrovolník.</p></div></div>{requests.length?<div className="my-list volunteer-list">{requests.map(r=><article className="my-row volunteer-row" key={r.id}><img src={r.image} alt=""/><div className="my-row-main"><b>{r.title}</b><small>{r.category} · Vytvořeno {r.date}</small><small>{r.owner}</small></div><div className="volunteer-status"><span className={'status-pill '+statusClass(r.status)}>{r.status}</span><small>{r.status==='Naplánováno'&&r.appointment?`${fmtDate(r.appointment.date)} · ${r.appointment.start}–${r.appointment.end}`:r.completedAt||''}</small></div><button className="btn-outline" onClick={()=>onOpen(r)}>Zobrazit detail</button></article>)}</div>:<EmptyState title="Zatím nemáte žádné opravy" text="Projděte dostupné požadavky a nabídněte pomoc."/>}</section></div></main>;
}
function RequestDetail({request:r,role,onInterest,onSchedule,onComplete,onCancel,onClose,onApprove}){
 const [activeVolunteer,setActiveVolunteer]=useState(r.volunteer||null);
 const [tab,setTab]=useState('detail');
 return <div className="request-detail-content">
  <button className="backlink" onClick={onClose}><ChevronLeft/> Zpět na {role==='Zákazník'?'Moje požadavky':role==='Administrátor'?'Správa požadavků':'Dostupné opravy'}</button>
  <div className="detail-grid"><div className="detail-main"><h2>{r.title}</h2><div className="detail-tags"><span>{r.category}</span><span className={'status-pill '+statusClass(r.status)}>{r.status}</span></div><img className="detail-image" src={r.image} alt={r.title}/><div className="panel description"><h3>Popis problému</h3><p>{r.desc}</p></div>
   {r.status==='Dokončeno'&&<div className="panel result-panel"><h3>Výsledek opravy</h3><b>{r.result}</b><p>{r.note||'Bez doplňující poznámky.'}</p><small>Dokončeno {r.completedAt}</small></div>}
  </div><aside className="panel detail-aside"><h3>Informace o požadavku</h3><Info icon={<Tag/>} label="Kategorie" value={r.category}/><Info icon={<UserRound/>} label="Zadavatel" value={r.owner}/><Info icon={<CalendarDays/>} label="Vytvořeno" value={r.date}/>
   {role==='Dobrovolník'&&r.status==='Otevřeno'&&!r.interests.some(i=>i.id==='v1')&&<><div className="privacy-note"><LockKeyhole/><span><b>Kontakt zatím není dostupný</b><small>Kontaktní údaje uvidíte až po schválení vašeho zájmu zákazníkem.</small></span></div><button className="btn-primary full" onClick={onInterest}><Handshake/> Mám zájem o opravu</button></>}{role==='Dobrovolník'&&r.status==='Otevřeno'&&r.interests.some(i=>i.id==='v1')&&<div className="privacy-note success-note"><CheckCircle2/><span><b>Zájem o opravu odeslán</b><small>Váš zájem byl odeslán zákazníkovi. Jakmile se rozhodne, dáme vám vědět.</small></span></div>}
   {role==='Zákazník'&&r.status==='Otevřeno'&&<div className="interest-box"><b>{r.interests.length} zájemci čekají na vaše rozhodnutí</b>{r.interests.length===0?<p>Zatím nikdo neprojevil zájem.</p>:r.interests.map(v=><div className="person-row" key={v.id}><span className="person-avatar">{v.initials||'VN'}</span><span><b>{v.name}</b><small>{v.done} úspěšných oprav</small><small>{v.message}</small></span><button className="btn-primary small" onClick={()=>onSchedule(v)}>Vybrat dobrovolníka</button></div>)}{r.interests.length>0&&<button className="btn-outline full" onClick={onApprove}>Zobrazit všechny zájemce</button>}</div>}
   {r.status==='Naplánováno'&&<><Info icon={<UserRound/>} label="Dobrovolník" value={r.volunteer||'—'}/><Info icon={<CalendarCheck/>} label="Termín opravy" value={parseAppointment(r.appointment)}/>{role==='Dobrovolník'&&<><div className="privacy-note"><ShieldCheck/><span><b>Zákazník schválil váš zájem</b><small>{r.email} {r.phone}</small></span></div><button className="btn-primary full" onClick={onComplete}>Dokončit opravu</button></>}</>}
   {r.status==='Dokončeno'&&<><Info icon={<UserRound/>} label="Dobrovolník" value={r.volunteer||'—'}/><Info icon={<CalendarCheck/>} label="Dokončeno" value={r.completedAt||'—'}/></>}
   {role==='Zákazník'&&r.status!=='Dokončeno'&&r.status!=='Zrušeno'&&<button className="btn-light full danger-outline" onClick={()=>onCancel(r.id)}>Zrušit požadavek</button>}
   {r.status==='Zrušeno'&&<div className="privacy-note"><Ban/><span><b>Požadavek byl zrušen</b></span></div>}
  </aside></div>
 </div>;
}
function InterestList({request,onChoose,onBack}){
 return <><div className="eyebrow">ZÁJEMCI O OPRAVU</div><h2>{request.title}</h2><p className="muted">Prohlédněte si dobrovolníky, kteří mají zájem o opravu, a vyberte si, kdo vám pomůže.</p>{request.interests.map(v=><div className="interest-person" key={v.id}><span className="person-avatar">{v.initials}</span><div><b>{v.name}</b><small>{v.done} úspěšných oprav</small><p>{v.message}</p></div><button className="btn-primary small" onClick={()=>onChoose(v)}>Vybrat dobrovolníka</button></div>)}<div className="modal-actions"><button className="btn-light" onClick={onBack}>Zpět</button></div></>;
}
function CalendarPage({requests,onOpen,onGo,role}){
 const [month,setMonth]=useState(new Date(2026,10,1));const [view,setView]=useState('Měsíc');const [selectedDay,setSelectedDay]=useState(14);
 const monthNames=['Leden','Únor','Březen','Duben','Květen','Červen','Červenec','Srpen','Září','Říjen','Listopad','Prosinec'];const week=['Po','Út','St','Čt','Pá','So','Ne'];
 const samples=[{id:100,title:'Oprava lampičky',day:7,year:2026,month:10,time:'14:00–15:00'},{id:101,title:'Nefunkční rádio',day:14,year:2026,month:10,time:'10:00–11:30'},{id:102,title:'Nefunkční sluchátka',day:21,year:2026,month:10,time:'15:00–16:00'}];
 const live=requests.filter(r=>r.status==='Naplánováno'&&r.appointment).map(r=>({id:r.id,title:r.title,day:Number(r.appointment.date.slice(8,10)),year:Number(r.appointment.date.slice(0,4)),month:Number(r.appointment.date.slice(5,7))-1,time:`${r.appointment.start}–${r.appointment.end}`,request:r}));
 const events=[...samples,...live.filter(e=>!samples.some(s=>s.title===e.title&&s.day===e.day))];
 const offset=(new Date(month.getFullYear(),month.getMonth(),1).getDay()+6)%7;const daysInMonth=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();const prevDays=new Date(month.getFullYear(),month.getMonth(),0).getDate();
 const cells=Array.from({length:42},(_,i)=>{const n=i-offset+1;if(n<1)return{day:prevDays+n,other:true,date:new Date(month.getFullYear(),month.getMonth()-1,prevDays+n)};if(n>daysInMonth)return{day:n-daysInMonth,other:true,date:new Date(month.getFullYear(),month.getMonth()+1,n-daysInMonth)};return{day:n,other:false,date:new Date(month.getFullYear(),month.getMonth(),n)};});
 const changeMonth=d=>setMonth(new Date(month.getFullYear(),month.getMonth()+d,1));
 const today=()=>{const d=new Date(2026,10,17);setMonth(new Date(d.getFullYear(),d.getMonth(),1));setSelectedDay(d.getDate());};
 const selectedEvents=cell=>events.filter(e=>e.year===cell.date.getFullYear()&&e.month===cell.date.getMonth()&&e.day===cell.day);
 const dayCells=view==='Den'?cells.filter(c=>!c.other&&c.day===selectedDay):cells.slice(Math.floor((offset+selectedDay-1)/7)*7,Math.floor((offset+selectedDay-1)/7)*7+7);
 return <main className={(role==='Administrátor'?'page-area admin-layout':'page-area volunteer-layout')}>{role==='Administrátor'?<AdminSidebar active="Kalendář oprav" onGo={onGo}/>:<aside className="filters volunteer-sidebar"><h2>Moje opravy</h2><button onClick={()=>onGo('Moje opravy')}><Grid2X2/>Všechny opravy</button><button onClick={()=>onGo('Moje opravy')}><CalendarDays/>Naplánované</button><button onClick={()=>onGo('Moje opravy')}><CheckCircle2/>Dokončené</button><hr/><button className="side-current" onClick={()=>onGo('Kalendář oprav')}><CalendarDays/>Kalendář</button></aside>}<section className={role==='Administrátor'?'admin-content':'volunteer-content'}><div className="page-title"><div><h1>Kalendář oprav</h1><p>Přehled naplánovaných oprav</p></div></div><div className="panel calendar-panel"><div className="calendar-toolbar"><div className="calendar-controls"><button onClick={()=>changeMonth(-1)} aria-label="Předchozí měsíc"><ChevronLeft/></button><button onClick={()=>changeMonth(1)} aria-label="Další měsíc"><ChevronRight/></button><button className="today-btn" onClick={today}>Dnes</button></div><h2>{monthNames[month.getMonth()]} {month.getFullYear()}</h2><div className="calendar-views">{['Měsíc','Týden','Den'].map(v=><button key={v} className={view===v?'selected':''} onClick={()=>setView(v)}>{v}</button>)}</div></div>
 {view==='Měsíc'?<div className="calendar-grid-full">{week.map(d=><div className="calendar-weekday" key={d}>{d}</div>)}{cells.map((c,i)=><button key={i} className={`calendar-cell ${c.other?'outside':''} ${!c.other&&c.day===selectedDay?'chosen-day':''}`} onClick={()=>{setSelectedDay(c.day);if(c.other)setMonth(new Date(c.date.getFullYear(),c.date.getMonth(),1));}}><span>{c.day}</span>{selectedEvents(c).map(e=><small key={e.id} onClick={ev=>{if(e.request){ev.stopPropagation();onOpen(e.request);}}}>{e.time}<br/>{e.title}</small>)}</button>)}</div>:<div className="calendar-agenda">{dayCells.map((c,i)=><div className="agenda-day" key={i}><b>{week[(c.date.getDay()+6)%7]} {c.day}. {monthNames[c.date.getMonth()]}</b>{selectedEvents(c).length?selectedEvents(c).map(e=><div className="agenda-event" key={e.id}><strong>{e.time}</strong><span>{e.title}</span></div>):<span className="muted">Žádná naplánovaná oprava</span>}</div>)}</div>}
 </div></section></main>;
}
function AdminCategories({categories,onGo,onAdd,onEdit,onDelete}){
 return <main className="page-area admin-layout"><AdminSidebar active="Správa kategorií" onGo={onGo}/><section className="admin-content"><div className="page-title"><div><h1>Správa kategorií</h1><p>Spravujte kategorie oprav, které si mohou uživatelé vybírat při vytváření požadavku.</p></div><button className="btn-primary" onClick={onAdd}><Plus/> Přidat kategorii</button></div><div className="panel category-list">{categories.map(c=><div className="category-row" key={c.name}><span className="category-icon"><Wrench/></span><div className="category-description"><b>{c.name}</b><small>{c.description||'Bez popisu kategorie.'}</small></div><button className="icon-action" onClick={()=>onEdit(c)} aria-label="Upravit kategorii"><Pencil/></button><button className="icon-action delete" onClick={()=>onDelete(c.name)} aria-label="Odstranit kategorii"><Trash2/></button></div>)}</div></section></main>;
}
function AdminSidebar({active,onGo}){return <aside className="filters admin-sidebar"><h2>Administrace</h2>{[['Přehled',<LayoutDashboard/>],['Správa požadavků',<ListChecks/>],['Kalendář oprav',<CalendarDays/>],['Uživatelé a role',<Users/>],['Správa kategorií',<Tag/>]].map(([n,i])=><button type="button" key={n} onClick={()=>onGo?.(n)} className={active===n?'admin-side-current':''}>{i}<span>{n}</span></button>)}</aside>;}
function AdminRequests({requests,query,setQuery,tab,setTab,onOpen,onGo}){
 const tabs=['Všechny','Otevřené','Naplánované','Uzavřené'];
 const rows=requests.filter(r=>(tab==='Všechny'||(tab==='Otevřené'&&r.status==='Otevřeno')||(tab==='Naplánované'&&r.status==='Naplánováno')||(tab==='Uzavřené'&&['Dokončeno','Zrušeno'].includes(r.status)))&&(r.title+' '+r.owner).toLocaleLowerCase('cs').includes(query.toLocaleLowerCase('cs')));
 return <main className="page-area admin-layout"><AdminSidebar active="Správa požadavků" onGo={onGo}/><section className="admin-content"><div className="page-title"><div><h1>Správa požadavků</h1><p>Dohled nad požadavky a jejich aktuálním stavem.</p></div></div><div className="list-toolbar"><div className="tabs">{tabs.map(t=><button className={tab===t?'selected':''} key={t} onClick={()=>setTab(t)}>{t}</button>)}</div><div className="searchbox"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Hledat požadavky..."/></div></div><div className="panel table-panel"><table><thead><tr><th>Požadavek</th><th>Zadavatel</th><th>Kategorie</th><th>Stav</th><th></th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td><b>{r.title}</b><small>{r.date}</small></td><td>{r.owner}</td><td>{r.category}</td><td><span className={'status-pill '+statusClass(r.status)}>{r.status}</span></td><td><button className="btn-outline" onClick={()=>onOpen(r)}>Zobrazit detail</button></td></tr>)}</tbody></table></div></section></main>;
}
function AdminUsers({users,setUsers,onGo}){return <main className="page-area admin-layout"><AdminSidebar active="Uživatelé a role" onGo={onGo}/><section className="admin-content"><div className="page-title"><div><h1>Uživatelé a role</h1><p>Přehled uživatelů a jejich oprávnění.</p></div></div><div className="panel table-panel"><table><thead><tr><th>Uživatel</th><th>E-mail</th><th>Role</th></tr></thead><tbody>{users.map(u=><tr key={u.id}><td><b>{u.name}</b></td><td>{u.email}</td><td><select value={u.role} onChange={e=>setUsers(us=>us.map(x=>x.id===u.id?{...x,role:e.target.value}:x))}>{roles.map(r=><option key={r}>{r}</option>)}</select></td></tr>)}</tbody></table></div><p className="field-hint"><ShieldCheck/> Změna role je pouze demonstrační. Skutečné ověřování oprávnění zajišťuje backend.</p></section></main>;}
function AdminOverview({requests,onGo}){return <main className="page-area admin-layout"><AdminSidebar active="Přehled" onGo={onGo}/><section className="admin-content"><div className="page-title"><div><h1>Přehled</h1><p>Základní přehled komunitních oprav.</p></div></div><div className="stats"><Stat icon={<ClipboardList/>} value={requests.length} label="Požadavků celkem"/><Stat icon={<Clock3/>} value={requests.filter(r=>r.status==='Otevřeno').length} label="Otevřené požadavky"/><Stat icon={<CalendarDays/>} value={requests.filter(r=>r.status==='Naplánováno').length} label="Naplánované opravy"/><Stat icon={<CheckCircle2/>} value={requests.filter(r=>r.status==='Dokončeno').length} label="Dokončené opravy"/></div><div className="admin-shortcuts"><button onClick={()=>onGo('Správa požadavků')}><ListChecks/> Správa požadavků <ArrowRight/></button><button onClick={()=>onGo('Kalendář oprav')}><CalendarDays/> Kalendář oprav <ArrowRight/></button><button onClick={()=>onGo('Uživatelé a role')}><Users/> Uživatelé a role <ArrowRight/></button><button onClick={()=>onGo('Správa kategorií')}><Tag/> Správa kategorií <ArrowRight/></button></div></section></main>;}
function RequestCard({item,onOpen}){return <article className="request-card"><div className="photo-wrap"><img src={item.image} alt={item.title}/><span className="open-badge">{item.status}</span></div><div className="card-content"><span className="category-chip"><Wrench/>{item.category}</span><h3>{item.title}</h3><p>{item.desc}</p><div className="card-meta"><span><CalendarDays/>{item.date}</span><span><UserRound/>{item.owner}</span></div><button className="btn-primary card-button" onClick={onOpen}>Zobrazit detail <ArrowRight/></button></div></article>;}
function EmptyState({title,text}){return <div className="empty-state"><Wrench/><h3>{title}</h3><p>{text}</p></div>;}
function Info({icon,label,value}){return <div className="info-row"><span>{icon}</span><small>{label}</small><b>{value}</b></div>;}
function Stat({icon,value,label}){return <div className="stat-card"><span>{icon}</span><b>{value}</b><small>{label}</small></div>;}
function Modal({children,onClose}){return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Zavřít"><X/></button>{children}</div></div>;}
function statusClass(s){return s==='Otevřeno'?'open':s==='Naplánováno'?'planned':s==='Dokončeno'?'done':'cancelled';}

createRoot(document.getElementById('root')).render(<App/>);
