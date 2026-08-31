import { Link } from 'react-router-dom'
import PhotoBg from '../components/PhotoBg'
import Slideshow from '../components/Slideshow'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { ArrowIcon } from '../components/BrandMark'
import { serviceAreas, partners, process, industries, identity, vision } from '../data/site'
import { heroSlides } from '../data/slides'
import './Home.css'
const capabilities=serviceAreas.filter(s=>s.category!=='Consulting').slice(0,6)
export default function Home(){
  return(<>
    {/* Premium Hero – strong visual anchor, clear value proposition */}
    <header className="hero" id="top">
      <PhotoBg overlay={0.4}/>
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal as="span" className="eyebrow" delay={0}>Namibian ICT Systems Integrator · Est. {identity.incorporated}</Reveal>
          <Reveal as="h1" delay={80}>{identity.tagline}</Reveal>
          <Reveal as="p" className="lead" delay={160}>
            From the border post to the back office — enterprise systems, security, networks and support, built in Windhoek and run for the long term.
          </Reveal>
          <Reveal className="hero-actions" delay={240}>
            <Link to="/contact" className="btn btn-primary" aria-label="Contact the Syntex team to discuss your project">Talk to Syntex <ArrowIcon/></Link>
            <Link to="/solutions" className="btn btn-ghost hero-ghost">Explore Solutions</Link>
          </Reveal>
        </div>
      </div>
    </header>

    <section className="home-facts" aria-label="Syntex at a glance">
      <div className="wrap home-facts-row">
        <div className="fact"><b>{identity.incorporated}</b><span>Incorporated in Namibia</span></div>
        <div className="fact"><b>10+</b><span>Border deployments since 2012</span></div>
        <div className="fact"><b>Windhoek</b><span>Klein Windhoek head office</span></div>
      </div>
    </section>

    <section className="showcase" aria-label="Syntex in the field"><Slideshow slides={heroSlides} interval={6000}/></section>

    <section className="home-statement"><div className="wrap"><Reveal><span className="eyebrow">What that looks like in practice</span><p className="home-statement-text">ERP, HR, utility billing, biometric access and border‑control systems — integrated, supported, and accountable to a single team in Windhoek.</p></Reveal></div></section>

    <section className="wrap home-caps">
      <Reveal className="home-caps-head"><span className="eyebrow">Core capabilities</span><h2>Solutions across the enterprise technology stack.</h2><Link to="/solutions" className="home-caps-all">View all solutions <ArrowIcon/></Link></Reveal>
      <div className="home-caps-grid">{capabilities.map((s,i)=><Reveal key={s.slug} delay={i*60}><Link to={s.url} className="home-cap"><span className="home-cap-n">{String(i+1).padStart(2,'0')}</span><span className="home-cap-cat">{s.category}</span><h3>{s.title}</h3><p>{s.intro}</p><span className="home-cap-go">Explore area →</span></Link></Reveal>)}</div>
    </section>

    <section className="home-industries"><div className="wrap"><Reveal><span className="eyebrow">Industries</span><h2>Sectors we serve.</h2></Reveal>
      <div className="home-ind-strip">{industries.map((ind,i)=><Reveal key={ind.slug} delay={i*50}><Link to={`/industries/${ind.slug}`} className="home-ind"><span className="home-ind-n">{String(i+1).padStart(2,'0')}</span><h3>{ind.short}</h3><p>{ind.intro}</p></Link></Reveal>)}</div></div></section>

    <section className="home-values"><div className="wrap"><Reveal className="home-values-head"><span className="eyebrow">How we work</span><h2>The standards we build every system around.</h2><p>{identity.legal} applies the same operating values to every engagement, regardless of client size or sector.</p></Reveal>
      <div className="home-values-grid">{vision.values.map((v,i)=><Reveal key={v.n} delay={i*70} className="home-value"><span className="home-value-n">{v.n}</span><h3>{v.title}</h3><p>{v.text}</p></Reveal>)}</div></div></section>

    <section className="wrap home-process"><Reveal className="home-process-head"><span className="eyebrow">Our approach</span><h2>Solving complex systems problems with a proven process.</h2><p>End‑to‑end delivery — project management, change management, business process re‑engineering and knowledge transfer built into every engagement.</p></Reveal>
      <ol className="home-timeline">{process.map((st,i)=><Reveal as="li" key={st.n} delay={i*60} className="home-step"><div className="home-step-marker"><span>{st.n}</span></div><div className="home-step-body"><h3>{st.title}</h3><p>{st.text}</p></div></Reveal>)}</ol></section>

    <section className="home-partners"><div className="wrap"><Reveal className="home-partners-head"><span className="eyebrow">Technology ecosystem</span><h2>Built on the platforms our clients already depend on.</h2><p>Syntex delivery spans {partners.length} vendor platforms and technologies represented across our engagements.</p></Reveal>
      <div className="home-partner-wall">{partners.map((p,i)=><Reveal as="span" key={p} className="home-partner" delay={i*30}>{p}</Reveal>)}</div></div></section>

    <CtaBand heading="Let’s engineer your next technology environment." primaryLabel="Talk to Syntex" primary="/contact"/>
  </>)
}