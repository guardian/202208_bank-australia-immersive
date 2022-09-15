import { render, h, Fragment, createContext } from "preact";
import { IconGreenG2s2, IconGreenG3s2, IconGreenG4s2, IconGreenG4s3, IconGreenG4s4, IconRedG1s2, IconRedG2s2, IconRedG3s2, IconRedG4s2, IconRedG4s3, IconRedG4s4 } from "./Icons";


const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});


export const GreenG1S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <p>Australia’s landmass, enormous solar and wind resources, and support for scientific research into new technologies such as hydrogen fuel put the country in a prime position to be a clean energy exporter.</p>
                </div>
        </div>
    )    

}
export const GreenG1S1 = ({content}) => {
    return (
        <h1>2022</h1>
    )    

}

export const GreenG1S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}


export const GreenG2S1 = ({content}) => {
    return (
        <h1>2030</h1>
    )
}

export const GreenG2S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG2s2 />
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}

export const GreenG3S1 = ({content}) => {
    return (
        <h1>2040</h1>
    )
}

export const GreenG3S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG3s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}

export const GreenG3S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}

export const GreenG4S1 = ({content}) => {
    return (
        <h1>2050</h1>
    )
}

export const GreenG4S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}

export const GreenG4S3  = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s3 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}

export const GreenG4S4 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s4 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}



export const RedG1S1 = ({content}) => {
    return (
        <div {...setHtml(content)}></div>
    )
}

export const RedG1S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG1s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG1S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG1s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG1S4 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG1s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG2S1 = ({content}) => {
    return (
        <div {...setHtml(content)}></div>
    )
}

export const RedG2S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG2s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG2S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG2S4 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG3S1 = ({content}) => {
    return (
        <div {...setHtml(content)}></div>
    )
}

export const RedG3S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG3s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG3S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">

                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG3S4 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">

                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG3S5 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">

                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG4S1 = ({content}) => {
    return (
        <div {...setHtml(content)}></div>
    )
}

export const RedG4S2 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG4s2 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG4S3 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG4s3 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}
export const RedG4S4 = ({content}) => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconRedG4s4 />
                        
                    </div>
                    <div {...setHtml(content)}></div>
                </div>
        </div>
        
    )
}