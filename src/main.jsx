import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Activity, AlertTriangle, ArrowRight, Bell, BriefcaseBusiness, CalendarDays, Check,
  ChevronDown, CloudRain, Compass, Droplets, GraduationCap, Home, Languages, Leaf,
  Lightbulb, LocateFixed, Map as MapIcon, Menu, Mic, Moon, MoreHorizontal, Navigation,
  Plane, Plus, Search, Send, Settings, ShieldCheck, Sparkles, Sun, Thermometer,
  Umbrella, UserRound, Users, Wind, X, Zap
} from 'lucide-react';
import './styles.css';

const hourly = [
  { time: 'Now', temp: 28, icon: CloudRain, rain: '42%' },
  { time: '11 AM', temp: 29, icon: CloudRain, rain: '58%' },
  { time: '12 PM', temp: 30, icon: Sun, rain: '24%' },
  { time: '1 PM', temp: 31, icon: Sun, rain: '18%' },
  { time: '2 PM', temp: 31, icon: CloudRain, rain: '46%' },
  { time: '3 PM', temp: 30, icon: CloudRain, rain: '61%' },
  { time: '4 PM', temp: 29, icon: CloudRain, rain: '66%' },
  { time: '5 PM', temp: 28, icon: Sun, rain: '34%' },
];
const days = [
  { day: 'Today', date: '20 Jun', icon: CloudRain, high: 31, low: 25, rain: '66%', tone: 'rainy' },
  { day: 'Fri', date: '21 Jun', icon: CloudRain, high: 30, low: 24, rain: '72%', tone: 'rainy' },
  { day: 'Sat', date: '22 Jun', icon: CloudRain, high: 29, low: 24, rain: '80%', tone: 'rainy' },
  { day: 'Sun', date: '23 Jun', icon: Sun, high: 32, low: 25, rain: '28%', tone: 'sunny' },
];
const navItems = [
  { id: 'home', label: 'Home', icon: Home }, { id: 'map', label: 'Map', icon: MapIcon },
  { id: 'ai', label: 'AI assistant', icon: Sparkles }, { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'profile', label: 'Profile', icon: UserRound },
];

function App() {
  const [active, setActive] = useState('home');
  const [entryScreen, setEntryScreen] = useState('dashboard');
  const [dark, setDark] = useState(false);
  const [location, setLocation] = useState('New Delhi');
  const [saved, setSaved] = useState('Home');
  const [showLocations, setShowLocations] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const askAI = (text) => {
    if (!text.trim()) return;
    const answer = text.toLowerCase().includes('college')
      ? 'Your college in South Delhi is 29 C with a 58% chance of rain after 2 PM. Leave by 5:10 PM to beat the shower.'
      : text.toLowerCase().includes('umbrella') || text.toLowerCase().includes('rain')
        ? 'Yes, keep an umbrella handy. Rain is most likely between 2 and 5 PM, especially along your return route.'
        : 'Today is warm and humid at 28 C. A passing shower is likely this afternoon. UV is moderate, so sunscreen is a good idea.';
    setMessages([...messages, { from: 'user', text }, { from: 'ai', text: answer }]);
    setQuery('');
  };

  if (entryScreen === 'auth') return <AuthScreen onContinue={() => setEntryScreen('onboarding')} />;
  if (entryScreen === 'onboarding') return <OnboardingScreen onComplete={() => setEntryScreen('dashboard')} />;

  return <div className={dark ? 'app dark' : 'app'}>
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><CloudRain size={20} /></span><span>Mausam<span className="brand-dot">.</span></span></div>
      <div className="workspace-label">YOUR WEATHER, EXPLAINED</div>
      <nav className="side-nav">{navItems.map(item => <NavButton key={item.id} item={item} active={active} setActive={setActive} />)}</nav>
      <div className="sidebar-bottom">
        <button className="location-switch" onClick={() => setShowLocations(!showLocations)}><span className="location-pin"><LocateFixed size={16} /></span><span><small>Current location</small><strong>{location}</strong></span><ChevronDown size={16} /></button>
        <button className="side-link"><Settings size={17} /> Settings</button>
        <div className="profile-mini"><div className="avatar">AS</div><span><strong>Ananya Sharma</strong><small>Personal plan</small></span><MoreHorizontal size={18} /></div>
      </div>
    </aside>
    <main className="main">
      <header className="topbar"><button className="mobile-menu"><Menu size={21} /></button><div className="mobile-brand"><span className="brand-mark"><CloudRain size={17} /></span> Mausam<span className="brand-dot">.</span></div><div className="topbar-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button notification-button" onClick={() => setActive('alerts')} aria-label="Open alerts"><Bell size={18} /><i /></button><div className="avatar avatar-small">AS</div></div></header>
      {showLocations && <div className="location-popover"><div className="popover-title">Saved locations <button onClick={() => setShowLocations(false)}><X size={16}/></button></div>{['Home', 'College', 'Office'].map((place) => <button key={place} className={saved === place ? 'place selected' : 'place'} onClick={() => { setSaved(place); setLocation(place === 'Home' ? 'New Delhi' : place === 'College' ? 'South Delhi' : 'Gurugram'); setShowLocations(false); }}><span>{place === 'Home' ? <Home size={16}/> : place === 'College' ? <GraduationCap size={16}/> : <BriefcaseBusiness size={16}/>}</span><span><strong>{place}</strong><small>{place === 'Home' ? 'Vasant Kunj, New Delhi' : place === 'College' ? 'Greater Kailash II, New Delhi' : 'Cyber City, Gurugram'}</small></span>{saved === place && <Check size={16}/>}</button>)}</div>}
      {active === 'home' && <HomeScreen setActive={setActive} />}
      {active === 'map' && <MapScreen />}
      {active === 'ai' && <AssistantScreen query={query} setQuery={setQuery} askAI={askAI} messages={messages} />}
      {active === 'alerts' && <AlertsScreen />}
      {active === 'profile' && <ProfileScreen dark={dark} setDark={setDark} onEditProfile={() => setEntryScreen('onboarding')} />}
      <div className="bottom-nav">{navItems.map(item => <NavButton key={item.id} item={item} active={active} setActive={setActive} mobile />)}</div>
    </main>
  </div>;
}

function NavButton({ item, active, setActive, mobile }) { const Icon = item.icon; return <button className={(active === item.id ? 'nav-item active' : 'nav-item') + (mobile ? ' mobile-nav-item' : '')} onClick={() => setActive(item.id)}><Icon size={mobile ? 19 : 18} /><span>{item.label}</span>{item.id === 'alerts' && <b className="alert-count">2</b>}</button>; }

function HomeScreen({ setActive }) { return <div className="content"><div className="page-heading"><div><p className="eyebrow">THURSDAY, 20 JUNE 2024 <span className="live-dot" /> LIVE</p><h1>Good morning, Ananya<span className="heading-spark">✦</span></h1><p className="heading-sub">Here is what the weather means for your day.</p></div><button className="location-button"><LocateFixed size={17} /> New Delhi <ChevronDown size={15} /></button></div>
  <section className="hero-grid"><div className="weather-hero"><div className="hero-top"><div><p className="muted">New Delhi · Vasant Kunj</p><div className="big-temp">28<span>°</span></div><p className="weather-state">Cloudy with a passing shower</p></div><div className="hero-icon"><CloudRain size={72} strokeWidth={1.3} /></div></div><div className="feels">Feels like 31° <span>·</span> H: 31° L: 25°</div><div className="hero-metrics"><Metric icon={Droplets} label="Humidity" value="78%" /><Metric icon={Wind} label="Wind" value="14 km/h" /><Metric icon={Umbrella} label="Rain" value="66%" /></div></div><div className="insight-card"><div className="insight-label"><span className="sparkle"><Sparkles size={15}/></span> MAUSAM AI INSIGHT</div><h2>Plan around the rain</h2><p>Rain is likely during your evening commute. Carry an umbrella and consider leaving <strong>20 minutes earlier.</strong></p><button className="text-button" onClick={() => setActive('ai')}>Ask Mausam AI <ArrowRight size={15} /></button><div className="insight-art"><CloudRain size={55} /></div></div></section>
  <div className="section-head"><div><h2>Your day at a glance</h2><p>Personalized for your outdoor plans</p></div><button className="more-link">Full forecast <ArrowRight size={15}/></button></div>
  <section className="stats-grid"><StatCard icon={Activity} label="Weather risk" value="Low" detail="32 / 100" status="low" /><StatCard icon={Leaf} label="Air quality" value="Good" detail="AQI 42 · Safe to be out" status="good" /><StatCard icon={Sun} label="UV index" value="Moderate" detail="5 · Use SPF after noon" status="moderate" /></section>
  <section className="panel commute-panel"><div className="panel-heading"><div><div className="section-kicker"><Navigation size={14}/> SMART COMMUTE</div><h2>Home <span className="route-line" /> College</h2></div><button className="round-button"><MoreHorizontal size={18}/></button></div><div className="commute-details"><div className="commute-route"><div className="route-point start"><span><Home size={15}/></span><div><small>DEPARTING FROM</small><strong>Home · 5:30 PM</strong></div></div><div className="route-path"><i /><i /><i /></div><div className="route-point"><span><GraduationCap size={15}/></span><div><small>ARRIVE BY</small><strong>College · 6:15 PM</strong></div></div></div><div className="commute-risk"><span className="risk-icon"><CloudRain size={19}/></span><div><strong>Moderate travel risk</strong><small>58% rain on your route</small></div><div className="depart"><small>LEAVE BY</small><strong>5:10 PM</strong></div></div></div></section>
  <section className="forecast-section"><div className="section-head"><div><h2>Hourly forecast</h2><p>Rain probability is shown below</p></div><button className="unit-toggle">°C <span>°F</span></button></div><div className="hourly-row">{hourly.map((hour, i) => { const Icon = hour.icon; return <div className={i === 0 ? 'hour active' : 'hour'} key={hour.time}><span>{hour.time}</span><Icon size={22} className={hour.icon === Sun ? 'sun-icon' : 'rain-icon'} /><strong>{hour.temp}°</strong><small><Droplets size={11}/> {hour.rain}</small></div> })}</div></section>
  <section className="forecast-section daily"><div className="section-head"><div><h2>4-day outlook</h2><p>Monsoon is settling in this week</p></div><CalendarDays size={19} className="muted-icon" /></div><div className="daily-row">{days.map(day => { const Icon = day.icon; return <div className="day" key={day.day}><div><strong>{day.day}</strong><small>{day.date}</small></div><Icon size={24} className={day.tone === 'sunny' ? 'sun-icon' : 'rain-icon'} /><strong>{day.high}° <span>{day.low}°</span></strong><small className="day-rain"><Droplets size={11}/> {day.rain}</small></div> })}</div></section>
</div> }
function Metric({ icon: Icon, label, value }) { return <div><Icon size={17}/><span><small>{label}</small><strong>{value}</strong></span></div> }
function StatCard({ icon: Icon, label, value, detail, status }) { return <div className="stat-card"><div className={'stat-icon '+status}><Icon size={18}/></div><div><p>{label}</p><strong>{value}</strong><small>{detail}</small></div><ChevronDown size={16} className="stat-arrow" /></div> }

function MapScreen() { return <div className="content"><div className="page-heading compact"><div><p className="eyebrow">EXPLORE WEATHER</p><h1>Weather map</h1><p className="heading-sub">See what is moving towards you.</p></div><button className="icon-button"><LayersIcon /></button></div><div className="map-shell"><div className="map-toolbar"><button className="map-search"><Search size={17}/> Search a place</button><button className="map-control active"><CloudRain size={17}/> Rain</button><button className="map-control"><Wind size={17}/> Wind</button><button className="map-control"><Sun size={17}/> UV</button></div><div className="map-canvas"><div className="map-label label-one">Gurugram</div><div className="map-label label-two">New Delhi</div><div className="map-label label-three">Noida</div><div className="rain-cloud cloud-one"/><div className="rain-cloud cloud-two"/><div className="user-marker"><span><LocateFixed size={17}/></span><b>You are here</b></div><div className="map-roads road-one"/><div className="map-roads road-two"/><div className="map-roads road-three"/><div className="map-legend"><span><i className="legend-dot low"/> Light rain</span><span><i className="legend-dot high"/> Heavy rain</span></div></div></div><div className="section-head map-bottom-heading"><div><h2>Saved places</h2><p>Weather at the places that matter</p></div><button className="text-button"><Plus size={15}/> Add place</button></div><div className="saved-place-grid"><SavedPlace icon={Home} name="Home" location="Vasant Kunj" temp="28°" /><SavedPlace icon={GraduationCap} name="College" location="Greater Kailash II" temp="29°" /><SavedPlace icon={BriefcaseBusiness} name="Office" location="Cyber City" temp="30°" /></div></div> }
function LayersIcon() { return <Compass size={19}/> }
function SavedPlace({ icon: Icon, name, location, temp }) { return <div className="saved-place"><div className="place-icon"><Icon size={18}/></div><div><strong>{name}</strong><small>{location}</small></div><div className="saved-temp"><strong>{temp}</strong><small><CloudRain size={11}/> 58%</small></div></div> }

function AssistantScreen({ query, setQuery, askAI, messages }) { const prompts = ['Will it rain today?', 'Should I carry an umbrella?', 'What is the weather at my college?']; return <div className="content ai-page"><div className="page-heading compact"><div><p className="eyebrow"><Sparkles size={13}/> YOUR WEATHER COMPANION</p><h1>Ask Mausam AI</h1><p className="heading-sub">Simple answers for everyday decisions.</p></div><div className="ai-status"><i/> Online</div></div><div className="assistant-layout"><div className="assistant-chat"><div className="ai-welcome"><div className="ai-orb"><Sparkles size={26}/></div><div><h2>How can I help you today?</h2><p>Ask me anything about weather, travel or your plans.</p></div></div>{messages.length === 0 ? <div className="suggestions"><p>Try asking</p>{prompts.map(prompt => <button key={prompt} onClick={() => askAI(prompt)}>{prompt}<ArrowRight size={15}/></button>)}</div> : <div className="messages">{messages.map((message, i) => <div className={'message '+message.from} key={i}>{message.from === 'ai' && <Sparkles size={14}/>}<span>{message.text}</span></div>)}</div>}<div className="chat-input"><input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && askAI(query)} placeholder="Ask about your weather..." /><button className="mic-button"><Mic size={18}/></button><button className="send-button" onClick={() => askAI(query)}><Send size={17}/></button></div><small className="privacy-note"><ShieldCheck size={12}/> Mausam AI uses your preferences and location to give relevant answers.</small></div><div className="assistant-side"><div className="panel"><div className="section-kicker"><Lightbulb size={14}/> QUICK INSIGHT</div><h3>Rain has a pattern today</h3><p>Most of today's rain will arrive after 2 PM. Your morning window is clear for outdoor plans.</p><div className="mini-timeline"><span>NOW</span><i/><i className="filled"/><i/><span>5 PM</span></div></div><div className="panel ask-card"><p>YOUR TOPICS</p><button><Umbrella size={16}/> Daily planning <ArrowRight size={14}/></button><button><Navigation size={16}/> Commute weather <ArrowRight size={14}/></button><button><Leaf size={16}/> Air quality <ArrowRight size={14}/></button></div></div></div></div> }

function AlertsScreen() { return <div className="content"><div className="page-heading compact"><div><p className="eyebrow">STAY AHEAD</p><h1>Alerts</h1><p className="heading-sub">Weather updates ranked for what matters to you.</p></div><button className="icon-button"><Settings size={18}/></button></div><div className="alert-banner"><div className="banner-icon"><CloudRain size={21}/></div><div><span>MODERATE PRIORITY · YOUR ROUTE</span><h2>Rain expected this evening</h2><p>58% chance along Home to College between 5:30 and 6:30 PM.</p></div><button className="round-button"><ArrowRight size={17}/></button></div><div className="filter-row"><button className="filter active">All <b>4</b></button><button className="filter">For you <b>2</b></button><button className="filter">Severe weather</button></div><div className="alert-list"><AlertItem type="moderate" icon={CloudRain} title="Rain may affect your commute" detail="Today, 5:30 PM · Home to College" action="Plan my commute" /><AlertItem type="info" icon={Leaf} title="Air quality is good" detail="AQI 42 in New Delhi · Updated 8 min ago" action="View air quality" /><AlertItem type="watch" icon={Sun} title="UV will be high after noon" detail="Today, 12:00 PM · UV index 6" action="Safety tips" /><AlertItem type="safe" icon={Check} title="No severe weather nearby" detail="All clear for your saved locations" action="View details" /></div></div> }
function AlertItem({ type, icon: Icon, title, detail, action }) { return <div className="alert-item"><div className={'alert-type '+type}><Icon size={18}/></div><div className="alert-copy"><div><strong>{title}</strong><span className={'priority '+type}>{type === 'moderate' ? 'For you' : type === 'watch' ? 'Watch' : type === 'safe' ? 'Clear' : 'Good'}</span></div><p>{detail}</p><button className="text-button">{action} <ArrowRight size={14}/></button></div><MoreHorizontal size={18} className="muted-icon" /></div> }

function ProfileScreen({ dark, setDark, onEditProfile }) { return <div className="content"><div className="page-heading compact"><div><p className="eyebrow">YOUR MAUSAM</p><h1>Profile & preferences</h1><p className="heading-sub">Make Mausam feel more like you.</p></div><div className="avatar profile-avatar">AS</div></div><div className="profile-layout"><div className="profile-card"><div className="profile-identity"><div className="avatar avatar-large">AS</div><div><h2>Ananya Sharma</h2><p>New Delhi · English</p></div><button className="icon-button" onClick={onEditProfile} aria-label="Edit personalization"><Settings size={17}/></button></div><div className="profile-stats"><span><strong>3</strong><small>Saved places</small></span><span><strong>5</strong><small>Interests</small></span><span><strong>82%</strong><small>Profile complete</small></span></div><button className="personalize-button" onClick={onEditProfile}><Sparkles size={15}/> Edit onboarding preferences <ArrowRight size={14}/></button></div><div className="settings-panel"><div className="setting-section"><h3>Personalize your homepage</h3><SettingRow icon={Users} title="I am a..." value="Student" /><SettingRow icon={Navigation} title="Default location" value="New Delhi" /><SettingRow icon={Languages} title="Language" value="English" /></div><div className="setting-section"><h3>Preferences</h3><ToggleRow icon={Moon} title="Dark appearance" detail="Use a darker color palette at night" on={dark} toggle={() => setDark(!dark)} /><ToggleRow icon={Bell} title="Weather notifications" detail="Only alerts that are relevant to you" on={true} /><ToggleRow icon={Mic} title="Voice queries" detail="Ask Mausam without typing" on={false} /></div></div></div></div> }

function AuthScreen({ onContinue }) { return <div className="entry-screen"><div className="entry-brand"><span className="brand-mark"><CloudRain size={24}/></span><strong>Mausam<span className="brand-dot">.</span></strong></div><div className="entry-card"><div className="entry-icon"><Sparkles size={23}/></div><p className="eyebrow">WEATHER, MADE PERSONAL</p><h1>Know what the weather means for you.</h1><p>Get clear, useful weather guidance for your commute, plans and places that matter.</p><button className="primary-button" onClick={onContinue}>Continue with email <ArrowRight size={16}/></button><button className="secondary-button" onClick={onContinue}>Continue with Google</button><small><ShieldCheck size={12}/> Your location stays in your control.</small></div><div className="entry-footer">Already have an account? <button onClick={onContinue}>Log in</button></div></div> }
function OnboardingScreen({ onComplete }) { const [type, setType] = useState('Student'); const [interest, setInterest] = useState('Rain'); const types = ['Student', 'Office Worker', 'Farmer', 'Traveller', 'Outdoor Worker', 'General User']; const interests = ['Rain', 'Temperature', 'AQI', 'UV', 'Severe weather', 'Agriculture']; return <div className="entry-screen onboarding"><div className="onboarding-top"><div className="entry-brand"><span className="brand-mark"><CloudRain size={19}/></span><strong>Mausam<span className="brand-dot">.</span></strong></div><span>STEP 1 OF 2</span></div><div className="onboarding-card"><p className="eyebrow">LET'S MAKE IT YOURS</p><h1>What should Mausam know about you?</h1><p className="entry-sub">This helps us put the right insight first. You can change this anytime.</p><h3>I am a...</h3><div className="choice-grid">{types.map(item => <button className={type === item ? 'choice selected' : 'choice'} onClick={() => setType(item)} key={item}>{item}{type === item && <Check size={15}/>}</button>)}</div><h3>I'm interested in...</h3><div className="choice-grid interest-grid">{interests.map(item => <button className={interest === item ? 'choice selected' : 'choice'} onClick={() => setInterest(item)} key={item}>{item}</button>)}</div><button className="primary-button" onClick={onComplete}>Finish personalization <ArrowRight size={16}/></button></div></div> }
function SettingRow({ icon: Icon, title, value }) { return <button className="setting-row"><span className="setting-icon"><Icon size={17}/></span><span><strong>{title}</strong><small>{value}</small></span><ChevronDown size={16}/></button> }
function ToggleRow({ icon: Icon, title, detail, on, toggle }) { return <div className="toggle-row"><span className="setting-icon"><Icon size={17}/></span><span><strong>{title}</strong><small>{detail}</small></span><button className={on ? 'toggle on' : 'toggle'} onClick={toggle}><i/></button></div> }

createRoot(document.getElementById('root')).render(<App />);
