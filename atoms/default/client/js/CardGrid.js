import { Component, render, h } from "preact";
import FlipCard from "./FlipCard";

export default class CardGrid extends Component {
    render (props) {
        // const cards = new Array(6).fill('item').map(v=> <li><FlipCard props /></li>)
        const cards = props.cards.map(v=> <li><FlipCard {...v} prompt={props.prompt} /></li>)
        return (
            <div>
            <ul class="list-unstyled">
                {cards}
            </ul>
            </div>
        );
    }
}