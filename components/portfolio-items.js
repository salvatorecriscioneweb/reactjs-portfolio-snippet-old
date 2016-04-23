var PortfolioItem = React.createClass({

  getInitialState: function() {
    return {
      expanded: false,
      topOffset: Math.round(jQuery('#portfolio').offset().top) + 90
    };
  },

  handleClickPost: function(event) {
    var that = this;

    event.preventDefault();
    jQuery('.post').addClass('postlist-goaway');


    setTimeout(function() {
      that.props.postClick(that.props.nindex);
    }, 900);
  },

  handleBackPost: function(event) {
    event.preventDefault();
    var that = this;
    jQuery('.postopen').addClass('post-goaway');
    setTimeout(function() {
      that.props.back();
    }, 900);

  },

  moveViewportToGood: function() {
    if ( this.props.expanded ) {
      // console.log('target reached');

      var target = jQuery('#portfolio');
      target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html, body').animate({
          scrollTop: target.offset().top
        }, 200);
      }
    }
  },

  componentDidUpdate: function() {
    setTimeout(function() {
      fixContactMenu();
    }, 1000);
  },

  render: function() {
    this.moveViewportToGood();

    var postDetails = JSON.parse(this.props.post);
    var heroImage = postDetails['image'].url,
        title = postDetails.title,
        brief = {
          __html : postDetails['content'].brief
        },
        extended = {
          __html: postDetails['content'].extended
        };
    var classPost, postStyles, innerStyle, buttonStyle;

    if ( this.props.expanded ) {
      classPost = "postopen post-animation"
      postStyles = {
        backgroundImage: 'none',
        backgroundSize: 'cover'
      };
      innerStyle = "col s12";
      if ( viewport_width > 991 && viewport_width !== 0 ) {
        buttonStyle = {
          top: this.state.topOffset
        };
      } else {
        buttonStyle = {};
      }
    } else {
      classPost = "post postlist-animation";
      postStyles = {
        backgroundImage: 'url(' + heroImage + ')',
        backgroundSize: 'cover'
      };
      innerStyle = "col s10 m6 offset-s1 offset-m3 z-depth-4 card carddescription";
      buttonStyle = {
        top: 0
      };
    }
    //console.log('inner style', innerStyle);
    //console.log(extended.__html)
    return (
        <div className={classPost} key={this.props.nindex} style={ postStyles }>
          <div className="postContent" id="contentPortfolio">
            <div className="row">
              <div className={innerStyle}>
                <h5 className={
                  this.props.expanded ?
                    "postTitle" :
                    "postTitle card-title"
                }>{title}</h5>

                {
                  !this.props.expanded ?
                    <p className="postDescription" dangerouslySetInnerHTML={brief} />
                  :
                    <p></p>
                }
                <center>
                {
                  !this.props.expanded ?
                    <a className="btn-floating btn-large waves-effect waves-light red gotopost" onClick={this.handleClickPost} style={buttonStyle}>
                      <i className="fa fa-chevron-right"></i>
                    </a>
                  :
                    <a className="btn-floating btn-large waves-effect waves-light red backtosite" onClick={this.handleBackPost} style={buttonStyle}>
                      <i className="fa fa-chevron-left"></i>
                    </a>
                }
                </center>
                { !this.props.expanded ? <div /> : <div dangerouslySetInnerHTML={extended}></div> }
              </div>
            </div>
          </div>
        </div>
    );
  }
});
