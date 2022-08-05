import { Component, render, h } from "preact";
import { useRef } from "preact/hooks";

import FlipIcon from "./FlipIcon";
import { assetsPath } from "./store";

export default class FlipCard extends Component {

    constructor() {
        super();

        // this.ref = useRef();
    }
    componentWillMount() {
        this.setState({'flipped': false});
    }

    componentDidMount() {
        this.ref.current.style.setProperty('--cardbg', this.props.bgcolor);
    }

    handeClick() {
        this.setState({'flipped': !this.state.flipped});
    }

    
    render(props, state) {
        this.ref = useRef(); 
        
        // const img = props.id == '1' ? `<%= path %>/1.jpg`: `<%= path %>/card_${props.id}.svg`;
        return (
            <div ref={this.ref} class={ `flipcard ${state.flipped? 'active': ''}`} data-id={props.id}>
                <div class="card-body">
                    
                    <div class="back">
                        <div class="content">
                            <div class="border"></div>
                            <div className="content-wrap" dangerouslySetInnerHTML={{__html: props.back}}></div>
                        </div>
                        <button class="btn-flip" onclick={this.handeClick.bind(this)}><FlipIcon/></button>
                    </div>
                    <a name={`card${props.id}`} class="front" onclick={this.handeClick.bind(this)}>
                        <div class="content" style={{
                            // backgroundImage: ` linear-gradient(to top, #0008, transparent 54%), url(<%= path %>/${props.image})`
                        }}>
                            {/* <div class="border"></div> */}
                            <div className={`img ${props.imagePos}`} >
                                <div style={{backgroundImage: `url(${assetsPath}/${props.image})`}} />
                            </div>
                            <div className="title">
                                <h2 dangerouslySetInnerHTML={{__html: props.front}}></h2>
                            </div>
                        </div>
                        <button class="btn-flip"><FlipIcon/></button>
                    </a>
                </div>
            </div>
        )
    }
}