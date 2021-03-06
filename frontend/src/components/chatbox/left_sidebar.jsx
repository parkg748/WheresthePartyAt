import React from "react";
import ChatRoom from "../chat/chat_room";
import "./chatbox.css";
import { Link } from "react-router-dom";
import { Zoom } from "react-slideshow-image";
// import Slider from 'react-slick'; //TODO: multi-image-slider https://stackoverflow.com/a/47050930/2734863
// import StarRatings from "react-star-ratings";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";
const Handle = Slider.Handle;

class LeftSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      feeling: "",
      music: "",
      infoSidebar: "info",
      upvotePercentage: 0,
      downvotePercentage: 0,
      malePercentage: 50,
      // oneStar: "",
      // twoStar: "",
      // threeStar: "",
      // fourStar: "",
      // fiveStar: "",
      loaded: false
    };
    this.rate = this.rate.bind(this);
    this.leftSidebarChange = this.leftSidebarChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setFeeling = this.setFeeling.bind(this);
    this.setMusic = this.setMusic.bind(this);
    this.retrieveLogos = this.retrieveLogos.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }

  componentDidMount() {
    // console.log("about to request party");
    // this.props
    //   .requestParty(this.props.match.params.id)
    //   .then(() => this.setState({ loaded: true }));
    const that = this;
    this.props.requestParty(this.props.match.params.id).then(res => {
      that.setState({ loaded: true });
    });
    this.props.fetchPartyOpinions(this.props.match.params.id).then(payload => {
      this.setState({
        upvotePercentage: payload.opinions.data.upvotePercentage,
        downvotePercentage: payload.opinions.data.downvotePercentage
      });
    });
  }

  leftSidebarChange(side) {
    if (side === "create") {
      //TODO double check sidebar as merge might have made this wrong again
      this.setState({ infoSidebar: "create" });
    } else {
      this.setState({ infoSidebar: "info" });
    }
  }

  rate(star) {
    if (star === "one-star") {
      this.setState({ rating: -2 });
    } else if (star === "two-star") {
      this.setState({ rating: -1 });
    } else if (star === "three-star") {
      this.setState({ rating: 1 });
    } else if (star === "four-star") {
      this.setState({ rating: 2 });
    } else {
      this.setState({ rating: 3 });
      // if (star === "one-star") {
      //   this.setState({
      //     oneStar: "green",
      //     twoStar: "",
      //     threeStar: "",
      //     fourStar: "",
      //     fiveStar: ""
      //   });
      // } else if (star === "two-star") {
      //   this.setState({
      //     oneStar: "green",
      //     twoStar: "green",
      //     threeStar: "",
      //     fourStar: "",
      //     fiveStar: ""
      //   });
      // } else if (star === "three-star") {
      //   this.setState({
      //     oneStar: "green",
      //     twoStar: "green",
      //     threeStar: "green",
      //     fourStar: "",
      //     fiveStar: ""
      //   });
      // } else if (star === "four-star") {
      //   this.setState({
      //     oneStar: "green",
      //     twoStar: "green",
      //     threeStar: "green",
      //     fourStar: "green",
      //     fiveStar: ""
      //   });
      // } else {
      //   this.setState({
      //     oneStar: "green",
      //     twoStar: "green",
      //     threeStar: "green",
      //     fourStar: "green",
      //     fiveStar: "green"
      //   });
    }
  }

  setFeeling(e) {
    this.setState({ feeling: e.target.value });
  }

  setMusic(e) {
    this.setState({ music: e.target.value });
  }

  handleSubmit(e) {
    if (
      this.state.rating === 0 ||
      this.state.feeling === "" ||
      this.state.music === ""
    ) {
      console.log("pick attributes to submit");
      return;
    }
    const opinion = {
      rating: this.state.rating,
      feeling: this.state.feeling,
      music: this.state.music,
      author: this.props.currentUser.id,
      party: this.props.match.params.id
    };
    this.props.createOpinion(opinion);
    this.leftSidebarChange("info");
    window.location.reload();
  }

  // sliderHandle(props) {
  //   const { value, dragging, index, ...restProps } = props;
  //   return (
  //     <Tooltip
  //       prefixCls="rc-slider-tooltip"
  //       overlay={value}
  //       visible={dragging}
  //       placement="top"
  //       key={index}
  //     >
  //       <Handle value={value} {...restProps} />
  //     </Tooltip>
  //   );
  // };

  onSliderChange = value => {
    this.setState({ malePercentage: value });
  };

  onAfterChange = value => {
    console.log(value); //eslint-disable-line
  };

  render() {
    if (this.state.loaded && this.props.opinion) {
      let currentUser =
        this.props.currentUser === undefined ? null : this.props.currentUser.id;

      let chatRoom =
        this.props.party === undefined ? (
          ""
        ) : (
          <ChatRoom
            partyId={this.props.party._id}
            currentUserId={currentUser}
          />
        );

      const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
      };
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

      let oneStar = "";
      let twoStar = "";
      let threeStar = "";
      let fourStar = "";
      let fiveStar = "";
      if (this.state.rating != 0) {
        oneStar = "green";
        twoStar = this.state.rating >= -1 ? "green" : "";
        threeStar = this.state.rating >= 1 ? "green" : "";
        fourStar = this.state.rating >= 2 ? "green" : "";
        fiveStar = this.state.rating >= 3 ? "green" : "";
      }

      // TODO: fetch parties added by party host
      const images = [
        `https://res.cloudinary.com/wtpa/image/upload/v1540573064/ynx03yd2m9isj0qh7xip.jpg`,
        `https://res.cloudinary.com/wtpa/image/upload/v1540572935/yd0lpvtcoumcpjlzpuvq.jpg`,
        `https://res.cloudinary.com/wtpa/image/upload/v1540511137/sample.jpg`
      ];

      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////

      // let currentSection = this.state.infoSidebar === `info` ? <div className="left-homepage-sidebar">
      //       <div className="toggle-info-create">
      //         <div className="info-rectangle" />
      //         <div onClick={() => this.leftSidebarChange("create")} className="create-rectangle" />
      //       </div>
      //       <div className="left-homepage-sidebar-inner">
      //         <div className="party-title-wrapper">
      //           <h1>Party Title Testing</h1>
      //         </div>
      //     {/* TODO: represent M:F ratio aggregate */}
      //     {/* <Slider
      //       min={0} max={100}
      //       defaultValue={50}
      //       trackStyle={{ backgroundColor: 'blue', height: 10 }}
      //       handleStyle={{
      //         borderColor: 'green',
      //         height: 28,
      //         width: 28,
      //         marginLeft: -14,
      //         marginTop: -9,
      //         backgroundColor: '#00bc66',
      //       }}
      //       railStyle={{ backgroundColor: 'red', height: 10 }}
      //       value={this.state.malePercentage}
      //       tipFormatter={value => `${value / 10}:${(100 - value) / 10}`}
      //       onChange={value => this.onSliderChange(value)}
      //     /> */}
      //         <div className="thumbs-up-thumbs-down">
      //           <span>
      //             {this.state.upvotePercentage}% <i className="far fa-thumbs-up" />
      //           </span>
      //           <span>
      //             {this.state.downvotePercentage}% <i className="far fa-thumbs-down" />
      //           </span>
      //         </div>
      //         <div className="party-icon-bar">
      //           {this.retrieveLogos()}
      //           {/* <img className='emoji-icon' src={require('../../images/mood/637646.png')} />
      //     <img className='emoji-icon' src={require('../../images/theme/673890.png')} />
      //     <img className='emoji-icon' src={require('../../images/music/1184619.png')} />
      //     <img className='emoji-icon' src={require('../../images/food/931959.svg')} />
      //     <img className='emoji-icon' src={require('../../images/drugs/991884.png')} /> */}
      //         </div>
      //         {/* <div className='five-star'>
      //     <img className='five-star-icons' src={require('../../images/header/149765.png')} />
      //     <img className='five-star-icons' src={require('../../images/header/149765.png')} />
      //     <img className='five-star-icons' src={require('../../images/header/149765.png')} />
      //     <img className='five-star-icons' src={require('../../images/header/149765.png')} />
      //     <img className='five-star-icons' src={require('../../images/header/149765.png')} />
      //   </div> */}
      //         <Zoom {...zoomOutProperties}>
      //           {images.map((each, index) => (
      //             <img
      //               className="left-sidebar-slideshow-img"
      //               key={index}
      //               src={each}
      //             />
      //           ))}
      //         </Zoom>
      //         <a>See more</a>
      //       </div>
      //     </div> : <div className="left-homepage-sidebar">
      //       <div className="toggle-info-create">
      //         <div onClick={() => this.leftSidebarChange("info")} className="info-rect" />
      //         <div className="create-rect" />
      //       </div>
      //       <form className="left-create-homepage-sidebar-inner" onSubmit={this.handleSubmit}>
      //         <div className="five-star-section">
      //           <span className="bold">Rate the party:</span>
      //           <div className="form-five-star">
      //             <i onClick={() => this.rate("one-star")} className={`${oneStar} fas fa-star`} />
      //             <i onClick={() => this.rate("two-star")} className={`${twoStar} fas fa-star`} />
      //             <i onClick={() => this.rate("three-star")} className={`${threeStar} fas fa-star`} />
      //             <i onClick={() => this.rate("four-star")} className={`${fourStar} fas fa-star`} />
      //             <i onClick={() => this.rate("five-star")} className={`${fiveStar} fas fa-star`} />
      //           </div>
      //         </div>
      //         <div className="select-dropdown">
      //           <span className="bold">Select the mood:</span>
      //           <i className="fas fa-caret-down" />
      //           <select className="mood-dropdown" onChange={this.setFeeling}>
      //             <option>-- SELECT ONE --</option>
      //             <option>Aggressive</option>
      //             <option>Angry</option>
      //             <option>Calm</option>
      //             <option>Cheesy</option>
      //             <option>Celebratory</option>
      //             <option>Confident</option>
      //             <option>Dark</option>
      //             <option>Energetic</option>
      //             <option>Fancy</option>
      //             <option>Funky</option>
      //             <option>Happy</option>
      //             <option>Introspective</option>
      //             <option>Mellow</option>
      //             <option>Pumped-up</option>
      //             <option>Romantic</option>
      //             <option>Rawdy</option>
      //             <option>Sad</option>
      //             <option>Sexy</option>
      //             <option>Spacey</option>
      //             <option>Trippy</option>
      //           </select>
      //         </div>
      //         <div className="select-dropdown">
      //           <span className="bold">Select the music:</span>
      //           <i className="music-caret fas fa-caret-down" />
      //           <select className="mood-dropdown" onChange={this.setMusic}>
      //             <option>-- SELECT ONE --</option>
      //             <option>Alternative/Indie</option>
      //             <option>Blues</option>
      //             <option>Bollywood & Indian</option>
      //             <option>Children's Music</option>
      //             <option>Christian</option>
      //             <option>Christmas</option>
      //             <option>Classical</option>
      //             <option>Country</option>
      //             <option>Dance & Electronic</option>
      //             <option>Folk & Americana</option>
      //             <option>Hip-Hop/Rap</option>
      //             <option>Jazz</option>
      //             <option>K-Pop</option>
      //             <option>Latin</option>
      //             <option>Metal</option>
      //             <option>New Age</option>
      //             <option>Oldies</option>
      //             <option>Opera</option>
      //             <option>Pop</option>
      //             <option>Punk</option>
      //             <option>R&B</option>
      //             <option>Reggae</option>
      //             <option>Rock</option>
      //             <option>Singer-Songwriter</option>
      //             <option>Soul</option>
      //             <option>Soundtracks</option>
      //             <option>Easy Listening</option>
      //             <option>World</option>
      //           </select>
      //         </div>
      //         <div className="left-sidebar-mf-ratio-slider">
      //           <p>
      //           M:F <i className="fas fa-male" />:<i className="fas fa-female" /> Ratio
      //           </p>
      //           {/* <Slider min={0} max={100} defaultValue={50} tipFormatter={value => `${value / 10}:${(100 - value) / 10}`} handle={this.slider}/> */}
      //           <Slider
      //             // min={0} max={100}
      //             defaultValue={this.state.malePercentage}
      //             trackStyle={{ backgroundColor: 'blue', height: 10 }}
      //             handleStyle={{
      //               borderColor: 'green',
      //               height: 28,
      //               width: 28,
      //               marginLeft: -14,
      //               marginTop: -9,
      //               backgroundColor: '#00bc66',
      //             }}
      //             railStyle={{ backgroundColor: 'red', height: 10 }}
      //             value={this.state.malePercentage}
      //             // tipFormatter={value => `${value / 10}:${(100 - value) / 10}`}
      //             onChange={this.onSliderChange}
      //             onAfterChange={this.onAfterChange}
      //           />
      //         </div>
      //         {/* <div className="select-dropdown">
      //           <span className="bold">Drug of choice:</span>
      //           <i className="drug-caret fas fa-caret-down" />
      //           <select className="mood-dropdown">
      //             <option>Ecstasy</option>
      //             <option>Marijuana</option>
      //           </select>
      //         </div>
      //         <div className="select-dropdown">
      //           <span className="bold">Food & Drink of choice:</span>
      //           <i className="food-drink-caret fas fa-caret-down" />
      //           <select className="mood-dropdown">
      //             <option>Beer</option>
      //             <option>Champagne</option>
      //             <option>Cocktail</option>
      //             <option>Cupcakes</option>
      //             <option>Martini</option>
      //             <option>Pizza</option>
      //             <option>Wine</option>
      //           </select>
      //         </div>
      //         <div className="select-dropdown">
      //           <span className="bold">Type of party:</span>
      //           <i className="type-party-caret fas fa-caret-down" />
      //           <select className="mood-dropdown">
      //             <option>Bachelor</option>
      //             <option>Bachelorette</option>
      //             <option>BBQ</option>
      //             <option>Birthday</option>
      //             <option>Casino</option>
      //             <option>Christmas</option>
      //             <option>Cocktail</option>
      //             <option>Costume</option>
      //             <option>Dance</option>
      //             <option>Dinner</option>
      //             <option>Easter</option>
      //             <option>Fourth of July</option>
      //             <option>Frat</option>
      //             <option>Game Day</option>
      //             <option>Halloween</option>
      //             <option>Magic Show</option>
      //             <option>New Year's Eve</option>
      //             <option>Office</option>
      //             <option>Pinata</option>
      //             <option>Pool</option>
      //             <option>Tea</option>
      //             <option>Thanksgiving</option>
      //             <option>Valentine's Day</option>
      //             <option>Wedding</option>
      //           </select>
      //         </div> */}
      //         <input type="submit" value="Submit" />
      //       </form>
      //     </div>;

      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      let currentSection =
        this.state.infoSidebar === "info" ? (
          <div>
            <div className="left-sidebar">
              <div className="left-homepage-sidebar">
                <div className="left-homepage-sidebar-inner">
                  <div className="party-title-wrapper">
                    <h1>{this.props.party.title}</h1>
                  </div>

                  <div className="star-ratings">
                    {/* <StarRatings
                    rating={
                      this.props.opinion.avgRating
                        ? this.props.opinion.avgRating
                        : 0
                    }
                    starRatedColor="yellow"
                    starDimension={"20px"}
                    changeRating={this.changeRating}
                    numberOfStars={5}
                    name="rating"
                  /> */}
                  </div>

                <div className="thumbs-up-thumbs-down">
                  <span>
                    {this.state.upvotePercentage}% <i className="far fa-thumbs-up" />
                  </span>
                  <span>
                    {this.state.downvotePercentage}% <i className="far fa-thumbs-down" />
                  </span>
                </div>
                <div className="party-icon-bar">
                  {this.retrieveLogos()}
                </div>
                <Zoom {...zoomOutProperties}>
                  {images.map((each, index) => (
                    <img
                      className="left-sidebar-slideshow-img"
                      key={index}
                      src={each}
                    />
                  ))}
                </Zoom>

                {/* <div className="party-icon-bar">
                  <img
                    className="emoji-icon"
                    src={require("../../images/mood/637646.png")}
                  />
                  <img
                    className="emoji-icon"
                    src={require("../../images/theme/673890.png")}
                  />
                  <img
                    className="emoji-icon"
                    src={require("../../images/music/1184619.png")}
                  />
                  <img
                    className="emoji-icon"
                    src={require("../../images/food/931959.svg")}
                  />
                  <img
                    className="emoji-icon"
                    src={require("../../images/drugs/991884.png")}
                  />
                </div>
                <div className="five-star">
                  <img
                    className="five-star-icons"
                    src={require("../../images/header/149765.png")}
                  />
                  <img
                    className="five-star-icons"
                    src={require("../../images/header/149765.png")}
                  />
                  <img
                    className="five-star-icons"
                    src={require("../../images/header/149765.png")}
                  />
                  <img
                    className="five-star-icons"
                    src={require("../../images/header/149765.png")}
                  />
                  <img
                    className="five-star-icons"
                    src={require("../../images/header/149765.png")}
                  />
                </div>
                <div className="see-more">See more</div> */}
                </div>
              </div>
              {chatRoom}
            </div>
            <div>
              <div className="info-middle-bar">
                <div
                  onClick={() => this.leftSidebarChange("info")}
                  className="info-rectangle"
                >
                  <i className="fas fa-info-circle" />
                </div>
                <div
                  onClick={() => this.leftSidebarChange("create")}
                  className="create-rectangle"
                >
                  <i className="fas fa-marker" />
                </div>
              </div>
              <Link className="close-sidebar" to="/">
                <div className="info-white-middle-bar-toggle">
                  <i className="fas fa-angle-left" />
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="left-homepage-sidebar">
              <form className="left-create-homepage-sidebar-inner" onSubmit={this.handleSubmit}>
                <h1>Party Survey</h1>
                <div className="five-star-section">
                  <span className="bold">Rate the party:</span>
                  <div className="form-five-star">
                    <i
                      onClick={() => this.rate("one-star")}
                      className={`${oneStar} fas fa-star`}
                    />
                    <i
                      onClick={() => this.rate("two-star")}
                      className={`${twoStar} fas fa-star`}
                    />
                    <i
                      onClick={() => this.rate("three-star")}
                      className={`${threeStar} fas fa-star`}
                    />
                    <i
                      onClick={() => this.rate("four-star")}
                      className={`${fourStar} fas fa-star`}
                    />
                    <i
                      onClick={() => this.rate("five-star")}
                      className={`${fiveStar} fas fa-star`}
                    />
                  </div>
                </div>
                <div className="select-dropdown">
                  <span className="bold">Select the mood:</span>
                  <i className="fas fa-caret-down" />
                  <select className="mood-dropdown" onChange={this.setFeeling}>
                    <option>-- SELECT ONE --</option>
                    <option>Aggressive</option>
                    <option>Angry</option>
                    <option>Calm</option>
                    <option>Cheesy</option>
                    <option>Celebratory</option>
                    <option>Confident</option>
                    <option>Dark</option>
                    <option>Energetic</option>
                    <option>Fancy</option>
                    <option>Funky</option>
                    <option>Happy</option>
                    <option>Introspective</option>
                    <option>Mellow</option>
                    <option>Pumped-up</option>
                    <option>Romantic</option>
                    <option>Rawdy</option>
                    <option>Sad</option>
                    <option>Sexy</option>
                    <option>Spacey</option>
                    <option>Trippy</option>
                  </select>
                </div>
                <div className="select-dropdown">
                  <span className="bold">Select the music:</span>
                  <i className="music-caret fas fa-caret-down" />
                  <select className="mood-dropdown" onChange={this.setMusic}>
                    <option>-- SELECT ONE --</option>
                    <option>Alternative/Indie</option>
                    <option>Blues</option>
                    <option>Bollywood & Indian</option>
                    <option>Children's Music</option>
                    <option>Christian</option>
                    <option>Christmas</option>
                    <option>Classical</option>
                    <option>Country</option>
                    <option>Dance & Electronic</option>
                    <option>Folk & Americana</option>
                    <option>Hip-Hop/Rap</option>
                    <option>Jazz</option>
                    <option>K-Pop</option>
                    <option>Latin</option>
                    <option>Metal</option>
                    <option>New Age</option>
                    <option>Oldies</option>
                    <option>Opera</option>
                    <option>Pop</option>
                    <option>Punk</option>
                    <option>R&B</option>
                    <option>Reggae</option>
                    <option>Rock</option>
                    <option>Singer-Songwriter</option>
                    <option>Soul</option>
                    <option>Soundtracks</option>
                    <option>Easy Listening</option>
                    <option>World</option>
                  </select>
                </div>
                <div className="left-sidebar-mf-ratio-slider">
                  <p>
                    M:F <i className="fas fa-male" />:
                    <i className="fas fa-female" /> Ratio
                  </p>
                  {/* <Slider min={0} max={100} defaultValue={50} tipFormatter={value => `${value / 10}:${(100 - value) / 10}`} handle={this.slider}/> */}
                  <Slider
                    min={0}
                    max={100}
                    defaultValue={this.state.malePercentage}
                    trackStyle={{ backgroundColor: "blue", height: 10 }}
                    handleStyle={{
                      borderColor: "green",
                      height: 28,
                      width: 28,
                      marginLeft: -14,
                      marginTop: -9,
                      backgroundColor: "#00bc66"
                    }}
                    railStyle={{ backgroundColor: "red", height: 10 }}
                    value={this.state.malePercentage}
                    tipFormatter={value =>
                      `${value / 10}:${(100 - value) / 10}`
                    }
                    onChange={this.onSliderChange}
                    onAfterChange={this.onAfterChange}
                  />
                </div>

                {/* <div className="select-dropdown">
              <span className="bold">Drug of choice:</span>
              <i className="drug-caret fas fa-caret-down" />
              <select className="mood-dropdown">
                <option>Ecstasy</option>
                <option>Marijuana</option>
              </select>
            </div>
            <div className="select-dropdown">
              <span className="bold">Food & Drink of choice:</span>
              <i className="food-drink-caret fas fa-caret-down" />
              <select className="mood-dropdown">
                <option>Beer</option>
                <option>Champagne</option>
                <option>Cocktail</option>
                <option>Cupcakes</option>
                <option>Martini</option>
                <option>Pizza</option>
                <option>Wine</option>
              </select>
            </div>
            <div className="select-dropdown">
              <span className="bold">Type of party:</span>
              <i className="type-party-caret fas fa-caret-down" />
              <select className="mood-dropdown">
                <option>Bachelor</option>
                <option>Bachelorette</option>
                <option>BBQ</option>
                <option>Birthday</option>
                <option>Casino</option>
                <option>Christmas</option>
                <option>Cocktail</option>
                <option>Costume</option>
                <option>Dance</option>
                <option>Dinner</option>
                <option>Easter</option>
                <option>Fourth of July</option>
                <option>Frat</option>
                <option>Game Day</option>
                <option>Halloween</option>
                <option>Magic Show</option>
                <option>New Year's Eve</option>
                <option>Office</option>
                <option>Pinata</option>
                <option>Pool</option>
                <option>Tea</option>
                <option>Thanksgiving</option>
                <option>Valentine's Day</option>
                <option>Wedding</option>
              </select>
            </div> */}
                <input type="submit" value="SUBMIT" className='left-sidebar-submit' />
              </form>
            </div>
            <div>
              <div className="middle-bar">
                <div
                  onClick={() => this.leftSidebarChange("info")}
                  className="info-rectangle"
                >
                  <i className="fas fa-info-circle" />
                </div>
                <div
                  onClick={() => this.leftSidebarChange("create")}
                  className="create-rectangle"
                >
                  <i className="fas fa-marker" />
                </div>
              </div>
              <Link className="create-page-close-sidebar" to="/">
                <div className="create-white-middle-bar-toggle">
                  <i className="fas fa-angle-left" />
                </div>
              </Link>
            </div>
          </div>
        );

      // let currentUser = this.props.currentUser === undefined ? null : this.props.currentUser.id

      console.log("this is the party on the show page", this.props.party);

      return <div>{currentSection}</div>;
    } else {
      return <div />;
    }
  }

  retrieveLogos() {
    let feelingImage = `mood/637609.png`; //TODO: put the default images here
    let musicImage = `music/1184633.svg`;

    switch (this.state.feeling) {
      case `Aggressive`:
        feelingImage = `mood/637609.png`;
        break;
      case `Angry`:
        feelingImage = `mood/637592.png`;
        break;
      case `Calm`:
        feelingImage = `mood/637591.png`;
        break;
      case `Cheesy`:
        feelingImage = `mood/637641.png`;
        break;
      case `Celebratory`:
        feelingImage = `mood/637598.png`;
        break;
      case `Confident`:
        feelingImage = `mood/637595.png`;
        break;
      case `Dark`:
        feelingImage = `mood/637631.png`;
        break;
      case `Energetic`:
        feelingImage = `mood/637600.png`;
        break;
      case `Fancy`:
        feelingImage = `mood/637628.png`;
        break;
      case `Funky`:
        feelingImage = `mood/637601.png`;
        break;
      case `Happy`:
        feelingImage = `mood/637595.png`;
        break;
      case `Introspective`:
        feelingImage = `mood/637612.png`;
        break;
      case `Mellow`:
        feelingImage = `mood/637641.png`;
        break;
      case `Pumped-up`:
        feelingImage = `mood/637627.png`;
        break;
      case `Romantic`:
        feelingImage = `mood/637605.png`;
        break;
      case `Rawdy`:
        feelingImage = `mood/637633.png`;
        break;
      case `Sad`:
        feelingImage = `mood/637617.png`;
        break;
      case `Sexy`:
        feelingImage = `mood/637619.png`;
        break;
      case `Spacey`:
        feelingImage = `mood/637611.png`;
        break;
      case `Trippy`:
        feelingImage = `mood/637601.png`;
        break;
    }

    switch (this.state.music) {
      case `Alternative/Indie`:
        musicImage = `music/1184633.svg`;
        break;
      case `Blues`:
        musicImage = `music/1184624.svg`;
        break;
      case `Bollywood & Indian`:
        musicImage = `music/1184650.svg`;
        break;
      case `Children's Music`:
        musicImage = `music/1184637.svg`;
        break;
      case `Christian`:
        musicImage = `music/1184614.svg`;
        break;
      case `Christmas`:
        musicImage = `music/1184645.svg`;
        break;
      case `Classical`:
        musicImage = `music/1184629.svg`;
        break;
      case `Country`:
        musicImage = `music/1184612.svg`;
        break;
      case `Dance & Electronic`:
        musicImage = `music/1184611.svg`;
        break;
      case `Folk & Americana`:
        musicImage = `music/1184615.svg`;
        break;
      case `Hip-Hop/Rap`:
        musicImage = `music/1184638.svg`;
        break;
      case `K-Pop`:
        musicImage = `music/1184616.svg`;
        break;
      case `Latin`:
        musicImage = `music/1184639.svg`;
        break;
      case `Metal`:
        musicImage = `music/1184646.svg`;
        break;
      case `New Age`:
        musicImage = `music/1184618.svg`;
        break;
      case `Oldies`:
        musicImage = `music/1184636.svg`;
        break;
      case `Opera`:
        musicImage = `music/1184640.svg`;
        break;
      case `Sexy`:
        musicImage = `music/1184613.svg`;
        break;
      case `Pop`:
        musicImage = `music/1184620.svg`;
        break;
      case `Punk`:
        musicImage = `music/1184649.svg`;
        break;
    }

    // <option>R&B</option> //Todo.... add these...
    // <option>Reggae</option>
    // <option>Rock</option>
    // <option>Singer-Songwriter</option>
    // <option>Soul</option>
    // <option>Soundtracks</option>
    // <option>Easy Listening</option>
    // <option>World</option>

    let logos = [feelingImage, musicImage];
    return logos.map((logoLoc, i) => {
      return (
        <img
          key={`logo-${i}`}
          className="emoji-icon"
          alt=""
          src={require(`../../images/${logoLoc}`)}
        />
      );
    });
  }
}

export default LeftSidebar;
