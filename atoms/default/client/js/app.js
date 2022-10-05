// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h, Fragment, createContext, createElement } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import store, {fetchData, assetsPath, ACTION_SET_VIEW, ACTION_SET_YEAR } from "./store";
import {IconGlobeTemp, IconGreen, IconGreenSmall, IconRed, IconRedSmall, IconSelect, Logo} from "./Icons";
// import {GreenG1S1, GreenG1S3, GreenG2S2} from "./panels";
import * as ContentPanels from "./panels";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import CardGrid from "./CardGrid";
// import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GA, { initGA } from "./tracking";
// import {motion, AnimatePresence} from 'framer-motion';

let dispatch;

const slideData = {
    green: {
        slides: [
            {
                group: '2022',
                content: [
                    ContentPanels.GreenG1S1,
                    ContentPanels.GreenG1S2,
                    ContentPanels.GreenG1S3,
                ],
                images: [
                    '2022-1.jpg',
                    '2022-2.jpg',
                    '2022-3.jpg',
                ]
            },
            {
                group: '2030',
                content: [
                    ContentPanels.GreenG2S1,
                    ContentPanels.GreenG2S2,
                    null,
                ],
                images: [
                    '2030-1.jpg',
                    '2030-2.jpg',
                    '2030-3.jpg',
                ]
            },
            {
                group: '2040',
                content: [
                    ContentPanels.GreenG3S1,
                    ContentPanels.GreenG3S2,
                    ContentPanels.GreenG3S3,
                ],
                images: [
                    '2040-1.jpg',
                    '2040-2.jpg',
                    '2040-3.jpg',
                ]
            },
            {
                group: '2050',
                content: [
                    ContentPanels.GreenG4S1,
                    ContentPanels.GreenG4S2,
                    ContentPanels.GreenG4S3,
                    ContentPanels.GreenG4S4,
                ],
                images: [
                    '2050-1.jpg',
                    '2050-2.jpg',
                    '2050-3.jpg',
                    '2050-4.jpg',
                ]
            }
        ]
    },
    red: {
        slides: [
            {
                group: '1.1',
                content: [
                    ContentPanels.RedG1S1,
                    ContentPanels.RedG1S2,
                    ContentPanels.RedG1S2,
                    ContentPanels.RedG1S2,
                ],
                images: [
                    'one-1.jpg',
                    'one-2.jpg',
                    'one-3.jpg',
                    'one-4.jpg',
                ]
            },
            {
                group: '1.5',
                content: [
                    ContentPanels.RedG2S1,
                    ContentPanels.RedG2S2,
                    ContentPanels.RedG2S3,
                    ContentPanels.RedG2S4,
                ],
                images: [
                    'two-1.jpg',
                    'two-2.jpg',
                    'two-3.jpg',
                    'two-4.jpg',
                ]
            },
            {
                group: '2',
                content: [
                    ContentPanels.RedG3S1,
                    ContentPanels.RedG3S2,
                    ContentPanels.RedG3S3,
                    ContentPanels.RedG3S4,
                    ContentPanels.RedG3S5,
                ],
                images: [
                    'three-1.jpg',
                    'three-2.jpg',
                    'three-3.jpg',
                    'three-4.jpg',
                    'three-5.jpg',
                ]
            },
            {
                group: '3',
                content: [
                    ContentPanels.RedG4S1,
                    ContentPanels.RedG4S2,
                    ContentPanels.RedG4S3,
                    ContentPanels.RedG4S4,                ],
                images: [
                    'four-1.jpg',
                    'four-2.jpg',
                    'four-3.jpg',
                    'four-4.jpg',
                ]
            }
        ]
    }
}

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
    duration: 0.8,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});

const scrollToTop = () => {
    const t = document.getElementById('feature-top');
    // if (Math.abs(t - window.scrollY) < 200) {
    //     return false;
    // } 
    t.scrollIntoView({
        behavior: 'smooth'
    });
    return false;
}

const Container = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`container ${className}`}>
            <div className="container-inner">
                {children}

            </div>
        </div>
    )
}

const BoxedContainer = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`container boxed ${className}`}>
            <div className="container-inner">
                {children}

            </div>
        </div>
    )
}

const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}


const Loading = () => 
    <FlexContainer className="loading">
        <div style={{width: 300}}>
            <img src={`${assetsPath}/glab_logo.svg`} />
        </div>
    </FlexContainer>


const Attribution = ({content}) => {
    return (
        <div className="attribution">
            <p>Paid for by 
                <a className="mt-4 block" href={content.logoLink} target="_blank">
                    <Logo />
                </a>
            </p>
            <div className="about-content" {...setHtml(content.aboutLink)} />
        </div>
    )
}


const Header = () => {
    const content = useSelector(s=>s.content);

    return (
        <div className="header" >
            <div className="bg" style={{
            backgroundImage: `url(${assetsPath}/hero.jpg)`
        }}>
            <div className="flex ctw">
                <div className="client-tab margin-auto" {...setHtml(content.title)}></div>
            </div>
            <Container className="title-block">
                <div className="icon flex justify-center">
                    <IconGlobeTemp />
                </div>
                <div className="flex justify-center">
                    <div className="main-title" {...setHtml(content.headline)}>
                        <h1>{content.headline}</h1>
                    </div>

                </div>

            </Container>

            </div>
        </div>        
    )
}

const Footer = ({content, related, shareUrl}) => {

    return (
        <Fragment>

            <section className="footer dark-text">
                <div className="content">
                    <div className="cta-wrap">
                        
                        <div className="share">
                            <SocialBar title={content.shareTitle} url={shareUrl} />
                        </div>
                    </div>
                    
                </div>
            </section>

            {related.length > 0 &&
            <section className="related">
                    <div className="mx-auto" >
                        <h3>Related content</h3>
                        <RelatedContent cards={related} />
                    </div>
            </section>
            }
        </Fragment>
    )
}

const Standfirst = ({content}) => {

    return (
        <div className="standfirst">
                <div className="content" {...setHtml(content.standfirst)}></div>
        </div>
    )
}
const Intro = ({content}) => {

    return (
        <div className="intro">
                <div className="content" {...setHtml(content.intro)}></div>
        </div>
    )
}

const Break = () => <div className="break"><span></span><span></span><span></span></div>;

const ImagePanels = () => {
    const ref = useRef(ref);
    const view = useSelector(s=>s.UI.view);

    const [isFirst, setIsFirst] = useState(true);
    const [tl, setTl] = useState();

    useEffect(()=>{
        if (isFirst) {
            setIsFirst(false)
        }

        gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top 10%',
                end: 'bottom bottom',
                toggleClass: 'active',
            }
        });
        
        gsap.to(ref.current, {duration: 0.6, alpha: 1});
    },[view]);

    return (
    <div ref={ref} className="main-panel">
        <div className="panel-wrap">
            {
                view && slideData[view || 'green'].slides.map((v,i)=>{
                    return <SlideGroup 
                        year={v.group} 
                        key={i} 
                        data={v} 
                        view={view|| 'green'} 
                        index={i}
                    />
                })
            }

            { (!view || view === 'green') && <SlideNavGreen />}
            { (view === 'red') && <SlideNavRed />}
            
            
        </div>
    </div>

    )

}

const SlideNavGreen = () => {
    const year = useSelector(s=>s.UI.year);
    const isActive = yr => yr === year ? 'active': '';

    const handleClick = (e) => {
        e.preventDefault();
        const t = document.querySelector(`.main-panel .group-${e.target.dataset.group}`);
        t.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <nav>
            <ul>
                <li className={`${isActive('2022')}`} data-year="2022"><a href="#" data-group="1" onClick={handleClick}>2022</a></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><a href="#" data-group="2" onClick={handleClick}>2030</a></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><a href="#" data-group="3" onClick={handleClick}>2040</a></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><a href="#" data-group="4" onClick={handleClick}>2050</a></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
            </ul>
        </nav>
    )
}
const SlideNavRed = () => {
    const year = useSelector(s=>s.UI.year);
    const isActive = yr => yr === year ? 'active': '';
    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target.dataset)
        document.querySelector(`.slide-group.group-${e.target.dataset.group} .group-top`)
            .scrollIntoView({behavior: 'smooth'});
    }
    return (
        <nav>
            <ul>
                <li className={`${isActive('1.1')}`} data-year="1.1"><a href="#" data-group="1" onClick={handleClick}>1.1</a></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><a href="#" data-group="2" onClick={handleClick}>1.5</a></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><a href="#" data-group="3" onClick={handleClick}>2</a></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><a href="#" data-group="4" onClick={handleClick}>3</a></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
            </ul>
        </nav>
    )
}

const Slide = ({img, view, content}) => {
    const [ref, inView, entry] = useInView();
    const bgRef = useRef();
    useEffect(()=>{

        if (inView) {
            if (entry.boundingClientRect.top > 0) {
                gsap.from(bgRef.current, {ease: 'sine.out', duration: 2, backgroundPositionY: "0%"})
            } else {
                gsap.from(bgRef.current, {ease: 'sine.out', duration: 2, backgroundPositionY: "100%"})

            }
            // console.log(content);
        }
    },[inView])
    return (
        <div className="slide" ref={ref}>
            <div className="bg2"
                ref={bgRef}

                style={{
                    backgroundImage: `url(${assetsPath}/${view}/${img})`,
                    opacity: 1
                }} />

            <div className="content">
                {content}
            </div>
        </div>
    )
}

const SlideGroup = ({year, data, view, index }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const setYear = year => dispatch({type: ACTION_SET_YEAR, payload: year})
    const handleLeave = () => {
        setYear(null);
    }
    const handlEnter = () => {
        setYear(year);
    }

    const [isFirst, setIsFirst] = useState(true);

    const store = useSelector(s=>s.content);

    const [tweens, setTweens] = useState();
    
    useEffect(() => {

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: ref.current,
                start: 'top 50%',
                end: 'bottom 50%',
                scrub: true,
                // pin: true,
                // pinType: 'fixed',
                // invalidateOnRefresh: true,
                toggleClass: 'active',
                onLeave: handleLeave,
                onLeaveBack: handleLeave,
                onEnter: handlEnter,
                onEnterBack: handlEnter,
                }
        })
        // refresh with depaly to allow for page to settle
        setTimeout(()=>{
            ScrollTrigger.refresh();
        }, 1500);


    },[view]);

    return (
        <div ref={ref} className={`slide-group group-${index+1}`}>
            <div className="group-top"></div>
            {
                data.images.map((v, i) => 
                    <Slide view={view} img={v} content={data.content[i] ? data.content[i]({content: store[`slide-${view}${index+1}${i+1}`]}) : false } />
                )
            }            
        </div>        
    )
}

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    // const dispatch = useDispatch();

    dispatch = useDispatch();

    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/1GP49M1PM3_ttJZwTJppHs_mjlyRCoyWkG1Dkn3YHOlI.json') );
    },[]);


    const [isFirst, setIsFirst] = useState(true);

    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    

    const setView = (v) => {
        if (isFirst) GA(v);

        setIsFirst(false);
        document.querySelector('.main-panel').scrollIntoView({behavior:'smooth', inline: 'start'});
        if (v != store.UI.view) {
            ScrollTrigger.getAll().map(s=>s.kill());
            gsap.to('.main-panel', {duration: 0.6, alpha: 0});
            setTimeout(()=>{

                dispatch({type:ACTION_SET_VIEW, payload: v});

            }, 500);
        }
    }
   
 
    useEffect(()=>{
        initGA();
    },[]);

    const home = () => (
        <Fragment>

            <Header  />
            <Container>
                    <div className="intro-body">
                    <Standfirst content={content}></Standfirst>
                    <Attribution content={content}/>
                    <Intro content={content}></Intro>
                    </div>
            </Container>
            <div className={`view-${store.UI.view} is-first-${isFirst}`}
                style={{
                    '--switch-color': `var(--brand-${store.UI.view || 'green'})`
                }}
            >
                <div className="switch-container">
                    <div className="switch">
                        <div className="prompt-wrap">
                            <div className="prompt">
                                <IconSelect />
                                <p>Select Code Red or Code Green to view the possible scenarios</p>
                            </div>

                        </div>
                        <div className="nav">
                            <a href="#"
                                className={`${store.UI.view=='red'? 'active' : ''}`} onClick={(e)=>{e.preventDefault();setView('red')}}><IconRed /><span>Code Red</span></a>
                            <a href="#"
                                className={`green ${store.UI.view=='green' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault();setView('green')}}><IconGreen /><span>Code Green</span></a>
                        </div>
                    </div>

                </div>

                
                <ImagePanels />
                

                <BoxedContainer>
                    <div className="d-flex jcc">
                        {store.UI.view === 'green' &&
                            <a href="#"
                                className={`btn-code-red`}
                                onClick={(e)=>{e.preventDefault();setView('red')}}>
                                    <IconRedSmall />
                                    <span>Click here to view the Code Red scenario</span>
                            </a>
                        }
                        {store.UI.view === 'red' &&
                            <a href="#"
                                className={`btn-code-red`}
                                onClick={(e)=>{e.preventDefault();setView('green')}}>
                                    <IconGreenSmall />
                                    <span>Click here to view the Code Green scenario</span>
                            </a>
                        }
                    </div>
                    <div {...setHtml(content.outro)}></div>
                    <div className="padding-y"></div>
                    <div className="cta" {...setHtml(content.cta)} />
                </BoxedContainer>

                <BoxedContainer>
                    <Break />
                    <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
                </BoxedContainer>
            </div>
        </Fragment>
    )

    // return (
    //     <AnimatePresence>
    //         {loaded && home()}
    //         {!loaded && <Loading />}
    //     </AnimatePresence>
    // )

    return (
        <SwitchTransition>
            <Transition
                key={loaded}
                timeout={1000}
                onEnter={n=>gsap.from(n,{alpha: 0})}
                onExit={n=>gsap.to(n,{alpha:0})}
                mountOnEnter
                unmountOnExit
                appear={true}
            >
                {!loaded && <Loading />}
                {loaded && home()}
            </Transition>            
        </SwitchTransition>  
    )
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));

