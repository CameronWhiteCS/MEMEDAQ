import React from 'react';
import {Link} from 'react-router-dom';

const About = (props) => {

    return (
        <React.Fragment>
            <h1>About</h1>
            <hr/>
            <p>The MEMEDAQ is a community-driven online stock exchange for memes. Players can invest in memes from a variety of categories in a bid to earn their DogeCoin fortune or die trying.</p>
            <h2>Gameplay</h2>
            <p>Players start out with a balance of 10,000 DogeCoins which can be used to purchase shares of memes from the <Link to="/stonks">stonks page</Link>. Meme prices fluxuate every 2 hours and can even be influenced by real world events visible on the <Link to="/news">MEMEDAQ news feed</Link>. Market saturation, adoption by politicians and/or the mainstream media, and boomerfication are all events that can influce a meme's trading price.</p>
            <p>To keep things fresh, all memes are destined to eventually become cringe as a product of our cringe decay function. The older a meme, the more likely it is to become cringe. Once it does, its market value plummets and cannot recover unless the meme becomes post-ironic (example: 2009 Doge versus modern Doge). </p>
            <p>In addition to earning players a spot on the <Link to="/highscores">highscores page</Link>, dogecoins can be spent on non-stock investments, used to bribe politicians, and even hire a hitman to rob other players. Each of these activites has its own risks and rewards. </p>
            <h2>Installing the MEMEDAQ App</h2>
            <p>The MEMEDAQ is available for installation on both mobile and desktop devices as a progressive web app (PWA). Installing the MEMEDAQ app will let you recieve push notifications for in-game events. Learn more about PWAs <Link to="#">here</Link>.</p>
        </React.Fragment>
    );

}

export default About;