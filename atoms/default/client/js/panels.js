import { render, h, Fragment, createContext } from "preact";
import { IconGreenG2s2, IconGreenG3s2, IconGreenG4s2, IconGreenG4s3, IconGreenG4s4 } from "./Icons";

export const GreenG1S3 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <p>Australia’s landmass, enormous solar and wind resources, and support for scientific research into new technologies such as hydrogen fuel put the country in a prime position to be a clean energy exporter.</p>
                </div>
        </div>
    )    

}
export const GreenG1S1 = () => {
    return (
        <h1>2022</h1>
    )    

}

export const GreenG2S1 = () => {
    return (
        <h1>2030</h1>
    )
}

export const GreenG2S2 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG2s2 />
                        <p>Global greenhouse emissions drop. Methane by 33%.</p>
                    </div>
                    <p>
                        If the transition to fossil fuels started in 2022, global greenhouse gas emissions peaked in 2025, and by 2030, global greenhouse emissions have dropped by 43%, methane by 33%.
                    </p>
                </div>
        </div>
        
    )
}

export const GreenG3S1 = () => {
    return (
        <h1>2040</h1>
    )
}

export const GreenG3S2 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG3s2 />
                        
                    </div>
                    <p>
                    Ocean acidification has begun to be halted and reversed. 
                    </p>
                </div>
        </div>
        
    )
}

export const GreenG3S3 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <p>
                    If the UN sustainable development goal on hunger has been met, food production systems and resilient agricultural practices are reversing losses in productivity and production. Tree planting and revegetation, soil carbon, and emerging methods such as biochar combined with science to reduce animal emissions are strengthening the capacity for adaptation to climate change, extreme weather, drought, flooding and other disasters while progressively improving land and soil quality.
                    </p>
                </div>
        </div>
        
    )
}

export const GreenG4S1 = () => {
    return (
        <h1>2050</h1>
    )
}

export const GreenG4S2 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s2 />
                        
                    </div>
                    <p>
                    Between 2021 and 2050, investments in energy infrastructure and sources such as renewables, biofuels and hydrogen hit an estimated minimum US$275tn, and have reduced the carbon intensity of electricity to zero.
                    </p>
                </div>
        </div>
        
    )
}

export const GreenG4S3 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s3 />
                        
                    </div>
                    <p>
                    Global emissions have hit net zero and temperatures have begun to stabilise.
                    </p>
                </div>
        </div>
        
    )
}

export const GreenG4S4 = () => {
    return (
        <div className="content-panel">
                <div className="panel-body">
                    <div className="illo-box">
                        <IconGreenG4s4 />
                        
                    </div>
                    <p>
                     
                    Permafrost thawing has been limited to 1.5 to 2.5m sq km. Ocean temperatures and acidification have fallen, protecting marine biodiversity, fisheries, and ecosystems, and the world is protected against severe water, food and heat stress. 
                    </p>
                </div>
        </div>
        
    )
}