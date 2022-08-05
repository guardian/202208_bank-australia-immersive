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
import store, { ACTION_SET_SECTIONS, fetchData, assetsPath, ACTION_SET_VIEW, ACTION_SET_SCORE } from "./store";
import {Logo} from "./Icons";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import CardGrid from "./CardGrid";

let dispatch;

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
    duration: 0.8,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({__html: html});

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
            <div className="about-content" dangerouslySetInnerHTML={setHtml(content.aboutLink)} />
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

            <Container className="title-block">
                <div className="client-tab">
                    <h1 dangerouslySetInnerHTML={setHtml(content.title)}></h1>
                </div>
                <div>
                    <div className="main-title" dangerouslySetInnerHTML={setHtml(content.headline)}>
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
                        <div className="cta" dangerouslySetInnerHTML={setHtml(content.cta)} />
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
                <div className="content" dangerouslySetInnerHTML={setHtml(content.standfirst)}></div>
        </div>
    )
}
const Intro = ({content}) => {

    return (
        <div className="intro">
                <div className="content" dangerouslySetInnerHTML={setHtml(content.intro)}></div>
        </div>
    )
}

const Break = () => <div className="break"><span></span><span></span><span></span></div>;

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    // const dispatch = useDispatch();

    dispatch = useDispatch();

    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/1RlfJnyzwn2qJGZUXXo7zxqTUhLpWKsN7myuqirR5BLA.json') );
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
        <Container>
            <div className="grid">
                <CardGrid cards={content.cards} prompt={content.cardPrompt} />

            </div>
            <Break />
            <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
        </Container>
        </Fragment>
    )

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

