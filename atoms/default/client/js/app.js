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
import {IconGlobeTemp, Logo} from "./Icons";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import CardGrid from "./CardGrid";
// import {motion, AnimatePresence} from 'framer-motion';

let dispatch;

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
        <div className={`GlabsContainer ${className}`}>
            <div className="ResponsiveContainer">
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
                        <div className="cta" {...setHtml(content.cta)} />
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

    useEffect(()=>{
        gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: 'top top',
                end: 'bottom bottom',
                toggleClass: 'active',
            }
        })
    },[]);

    return (
    <div ref={ref} className="main-panel">
        <div className="panel-wrap">
            <SlideGroup year="2022" />
            <SlideGroup year="2030" />
            <SlideGroup year="2040" />
            <SlideGroup year="2050" />
            <SlideNav />
            
            
        </div>
    </div>

    )

}

const SlideNav = () => {
    const year = useSelector(s=>s.UI.year);
    const isActive = yr => yr === year ? 'active': '';
    return (
        <nav>
            <ul>
                <li className={`${isActive('2022')}`} data-year="2022"><a href="#">2022</a></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2022')}`} data-year="2022"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><a href="#">2030</a></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2030')}`} data-year="2030"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><a href="#">2040</a></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2040')}`} data-year="2040"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><a href="#">2050</a></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
                <li className={`${isActive('2050')}`} data-year="2050"><i /></li>
            </ul>
        </nav>
    )
}

const SlideGroup = ({year}) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const setYear = year => dispatch({type: ACTION_SET_YEAR, payload: year})
    const handleLeave = () => {
        setYear(null);
    }
    const handlEnter = () => {
        setYear(year);
    }
    useEffect(() => {
        const bgs = Array.from(ref.current.querySelectorAll('.bg:not(.end)'));
        const slides = Array.from(ref.current.querySelectorAll('.slide'));
        // console.log(bgs, slides)
      
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
            const panel = slide.querySelector('.content-panel');
            const content = slide.querySelector('.content');
            gsap.timeline({
                scrollTrigger: {
                    trigger: slide,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true
                }
            })
            .from(bgs[i],{
                alpha: i? 0: 1,
                scale: 1.2,
                ease: 'none',
            })
            // .from(panel, {scale: .8, rotateY: '45deg', y: '-=100', alpha: 0}, 0)
            // .from(content,{perspectiveOriginY: '100%'}, 0)
            
        });
        // refresh with depaly to allow for page to settle
        setTimeout(()=>{
            ScrollTrigger.refresh();
        }, 1500);

    },[]);

    return (
        <div ref={ref} className="slide-group">
            <div className="bg"></div>
            <div className="bg"></div>
            <div className="bg"></div>
            <div className="bg"></div>
            <div className="bg end"></div>
            <div className="slide">
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
            </div>
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
        
        <ImagePanels />

        <Container>
            <div {...setHtml(content.outro)}></div>
        </Container>

        <Container>
            <Break />
            <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
        </Container>
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

