// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h, Fragment, createContext } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import store, {fetchData, assetsPath, ACTION_SET_VIEW, ACTION_SET_YEAR } from "./store";
import {IconGlobeTemp, IconGreen, IconRed, IconRedSmall, Logo} from "./Icons";
// import {GreenG1S1, GreenG1S3, GreenG2S2} from "./panels";
import * as ContentPanels from "./panels";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import CardGrid from "./CardGrid";
// import {motion, AnimatePresence} from 'framer-motion';

let dispatch;

const slideData = {
    green: {
        slides: [
            {
                group: '2022',
                content: [
                    ContentPanels.GreenG1S1,
                    null,
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
                    ContentPanels.GreenG1S1,
                    null,
                    ContentPanels.GreenG1S3,
                    ContentPanels.GreenG1S3,
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
                    ContentPanels.GreenG1S1,
                    null,
                    ContentPanels.GreenG1S3,
                    ContentPanels.GreenG1S3,
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
                    ContentPanels.GreenG1S1,
                    null,
                    ContentPanels.GreenG1S3,
                    ContentPanels.GreenG1S3,
                    ContentPanels.GreenG1S3,
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
                    ContentPanels.GreenG1S1,
                    null,
                    ContentPanels.GreenG1S3,
                    ContentPanels.GreenG1S3,
                ],
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
            <div className="flex">
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

    useEffect(()=>{
        gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'bottom bottom',
                toggleClass: 'active',
            }
        })
    },[view]);

    return (
    <div ref={ref} className="main-panel">
        <div className="panel-wrap">
            {
                slideData[view || 'green'].slides.map((v,i)=>{
                    return <SlideGroup year={v.group} key={i} data={v} view={view|| 'green'}/>
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
    return (
        <nav>
            <ul>
                <li className={`${isActive('2022')}`} data-year="2022"><a href="#">2022</a></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><a href="#">2030</a></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><a href="#">2040</a></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><a href="#">2050</a></li>
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
    return (
        <nav>
            <ul>
                <li className={`${isActive('1.1')}`} data-year="1.1"><a href="#">1.1</a></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.1')}`} data-year="1.1"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><a href="#">1.5</a></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('1.5')}`} data-year="1.5"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><a href="#">2</a></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('2')}`} data-year="2"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><a href="#">3</a></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
                <li className={`${isActive('3')}`} data-year="3"><i /></li>
            </ul>
        </nav>
    )
}

const SlideGroup = ({year, data, view }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const setYear = year => dispatch({type: ACTION_SET_YEAR, payload: year})
    const handleLeave = () => {
        setYear(null);
    }
    const handlEnter = () => {
        setYear(year);
    }

    const [tweens, setTweens] = useState();
    
    useEffect(() => {
        const bgs = Array.from(ref.current.querySelectorAll('.bg:not(.end)'));
        const bgs2 = Array.from(ref.current.querySelectorAll('.bg:not(.end)'));
        const slides = Array.from(ref.current.querySelectorAll('.slide'));
        const tweens = [];
        console.log(view, bgs, slides)
        
        // ScrollTrigger.killAll();

        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: ref.current,
                start: 'top top',
                end: 'bottom bottom',
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
        // bgs.map((bg,i)=>{
        //     console.log(bg)
            
        //     tl.from(bg,{
        //         alpha: i? 0: 1,
        //         // alpha: 0,
        //         duration: 1
        //     }, i);
        // });
        slides.map((slide,i)=>{
           
            // gsap.from(bgs[i],{
            //     alpha: i? 0: 1,
            //     scale: 1.2,
            //     ease: 'none',
            //     scrollTrigger: {
            //         trigger: slide,
            //         start: 'top bottom',
            //         end: 'top top',
            //         scrub: true
            //     }
            // });
            // const panel = slide.querySelector('.content-panel');
            // const content = slide.querySelector('.content');
            
            let tw = gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                    toggleActions: 'play none reverse none'
                }
            })
            .from(bgs[i],{
                // startAt: {alpha: 1},
                duration: 0.4,
                // alpha: i? 0: 1,
                scaleY: 1.3,
                ease: 'none',
                // transformOriginY: '100%'
            });

            tweens.push(tw);

            ScrollTrigger.create( {
                trigger: slide,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
                toggleActions: 'play none reverse none',
                animation: gsap.from(bgs2[i], {scaleY: 1.3})
            })
            // .from(panel, {scale: .8, rotateY: '45deg', y: '-=100', alpha: 0}, 0)
            // .from(content,{perspectiveOriginY: '100%'}, 0)
            
        });
        tweens.push(tl);
        setTweens(tweens);
        // refresh with depaly to allow for page to settle
        setTimeout(()=>{
            ScrollTrigger.refresh();
            // ScrollTrigger.clearScrollMemory()
            console.log('refresh')
        }, 1500);

        return () => {
            // ScrollTrigger.killAll();
            tweens.map((v)=>v.kill());
            // slides.map((v)=> v.kill();
        }
    },[view]);

    return (
        <div ref={ref} className="slide-group">
            {/* {
                data.images.map(v => 
                    <div 
                        className="bg" 
                        style={{
                            backgroundImage: `url(${assetsPath}/${view}/${v})`,
                            opacity: 1
                        }}
                    />
                )
            } */}
            {/* <div className="bg"></div>
            <div className="bg"></div>
            <div className="bg"></div>
            <div className="bg"></div> */}
            {/* <div 
                className="bg end" 
                style={{
                    backgroundImage: `url(${assetsPath}/${view}/${data.images[data.images.length -1]})`
                }}                
            /> */}

            {
                data.images.map((v, i) => 
                    <div className="slide" >
                        <div className="bg2"
                    style={{
                        backgroundImage: `url(${assetsPath}/${view}/${v})`,
                        opacity: 1
                    }} />
                        <div className="content">
                            {data.content[i] ? data.content[i]() : false }
                        </div>
                    </div>
                )
            }            
            {/* <div className="slide">
                <div className="content">
                    <div className="content-panel">
                            <div className="panel-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias repellendus aut amet eius nesciunt labore modi voluptatem enim quibusdam doloribus, maiores magnam dolore totam asperiores? Voluptatem nostrum velit ducimus quo.</p>
                            </div>
                    </div>
                </div>
            </div>
            <div className="slide">
                <div className="content">
                    <h1>item 2</h1>
                </div>
            </div>
            <div className="slide">
                <div className="content">
                    <h1>item 3</h1>
                </div>
            </div>
            <div className="slide">
                <div className="content">
                    <h1>item 4</h1>
                </div>
            </div> */}
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


    

    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    

    const setView = (v) => {
        // ScrollTrigger.killAll();
        ScrollTrigger.getAll().map(s=>s.kill());
        console.log(ScrollTrigger.getAll());
        setTimeout(()=>{

            dispatch({type:ACTION_SET_VIEW, payload: v});
        }, 500);
    }
   
    // if (!loaded) return <Loading />;
 


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
        
        <div className="switch">
            <div className="prompt-wrap">
                <div className="prompt">Select Code Red or Code Green to view the possible scenarios</div>

            </div>
            <div className="nav">
                <a href="#"
                    className={`${store.UI.view=='red'? 'active' : ''}`} onClick={(e)=>{e.preventDefault();setView('red')}}><IconRed /><span>Code Red</span></a>
                <a href="#"
                    className={`green ${store.UI.view=='green' ? 'active' : ''}`} onClick={(e)=>{e.preventDefault();setView('green')}}><IconGreen /><span>Code Green</span></a>
            </div>
        </div>

        <ImagePanels />

        <BoxedContainer>
            <a href="#"
                className={`btn-code-red`}
                onClick={(e)=>{e.preventDefault();}}><IconRedSmall /><span>Click here to view the Code Red scenario</span></a>
            <div {...setHtml(content.outro)}></div>
            <div className="padding-y"></div>
            <div className="cta" {...setHtml(content.cta)} />
        </BoxedContainer>

        <BoxedContainer>
            <Break />
            <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
        </BoxedContainer>
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

